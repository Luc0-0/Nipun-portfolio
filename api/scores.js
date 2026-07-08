let cache = { at: 0, body: null };

export default async function handler(req, res) {
  const KEY = process.env.FOOTBALL_DATA_KEY;
  if (!KEY) return res.status(204).end();
  if (Date.now() - cache.at < 60000 && cache.body) {
    res.setHeader("Cache-Control", "s-maxage=60");
    return res.status(200).json(cache.body);
  }
  try {
    const today = new Date().toISOString().slice(0, 10);
    const to = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
    const r = await fetch(`https://api.football-data.org/v4/matches?dateFrom=${today}&dateTo=${to}`, {
      headers: { "X-Auth-Token": KEY },
    });
    if (!r.ok) throw new Error(String(r.status));
    const j = await r.json();
    const ms = j.matches || [];
    const live = ms.find((m) => m.status === "IN_PLAY" || m.status === "PAUSED");
    const pick = live || ms.filter((m) => m.status === "TIMED" || m.status === "SCHEDULED").sort((a, b) => a.utcDate.localeCompare(b.utcDate))[0];
    let body = null;
    if (pick) {
      body = {
        id: pick.id || null,
        live: !!live,
        comp: pick.competition?.code || pick.competition?.name || "",
        home: pick.homeTeam?.tla || pick.homeTeam?.shortName || "?",
        away: pick.awayTeam?.tla || pick.awayTeam?.shortName || "?",
        hs: pick.score?.fullTime?.home ?? pick.score?.halfTime?.home ?? null,
        as: pick.score?.fullTime?.away ?? pick.score?.halfTime?.away ?? null,
        minute: pick.minute || null,
        status: pick.status,
        utcDate: pick.utcDate,
        matchday: pick.matchday || null,
        stage: pick.stage || null,
        goals: [],
      };
      if (pick.id) {
        try {
          const d = await fetch(`https://api.football-data.org/v4/matches/${pick.id}`, { headers: { "X-Auth-Token": KEY } });
          if (d.ok) {
            const dj = await d.json();
            const gs = dj.goals || dj.match?.goals || [];
            body.goals = gs.slice(-6).map((g) => ({
              m: g.minute,
              p: (g.scorer?.name || "").split(" ").slice(-1)[0],
              side: g.team?.id === pick.homeTeam?.id ? "h" : "a",
            }));
            const st = dj.match?.venue || dj.venue;
            if (st) body.venue = st;
          }
        } catch {
          /* goals optional */
        }
      }
    }
    cache = { at: Date.now(), body };
    res.setHeader("Cache-Control", "s-maxage=60");
    return res.status(200).json(body);
  } catch {
    if (cache.body) return res.status(200).json(cache.body);
    return res.status(204).end();
  }
}
