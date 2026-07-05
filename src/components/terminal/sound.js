let _actx;

function ctx() {
  _actx = _actx || new (window.AudioContext || window.webkitAudioContext)();
  if (_actx.state === "suspended") _actx.resume();
  return _actx;
}

export function tone(freq = 660, dur = 0.08, vol = 0.05, type = "square", delay = 0) {
  try {
    const c = ctx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    const t = c.currentTime + delay;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  } catch {
    /* */
  }
}

let _lh = 0;
export function hoverTick() {
  const n = typeof performance !== "undefined" ? performance.now() : 0;
  if (n - _lh < 60) return;
  _lh = n;
  tone(900, 0.028, 0.02, "triangle");
}

export function blip(freq = 600, dur = 0.05, vol = 0.04) {
  tone(freq, dur, vol, "square");
}

export function confirm() {
  tone(540, 0.055, 0.05, "square");
  tone(820, 0.09, 0.05, "square", 0.055);
}

export function back() {
  tone(620, 0.055, 0.045, "square");
  tone(360, 0.1, 0.045, "square", 0.055);
}

export function toggle() {
  tone(700, 0.04, 0.038, "square");
}

export function chime() {
  tone(587, 0.12, 0.045, "sine");
  tone(880, 0.18, 0.045, "sine", 0.12);
}

export function sweep(f0 = 120, f1 = 600, dur = 0.4, vol = 0.05, type = "sawtooth") {
  try {
    const c = ctx();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    const t = c.currentTime;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  } catch {
    /* */
  }
}

export function powerOn() {
  tone(68, 0.6, 0.06, "sine");
  sweep(110, 540, 0.5, 0.05, "sawtooth");
  tone(330, 0.32, 0.03, "triangle", 0.06);
}

export function makeDrone() {
  let o1, o2, f, g, started = false;
  const ensure = () => {
    const c = ctx();
    if (!started) {
      o1 = c.createOscillator();
      o2 = c.createOscillator();
      f = c.createBiquadFilter();
      g = c.createGain();
      o1.type = "sine";
      o2.type = "sine";
      o1.frequency.value = 160;
      o2.frequency.value = 240;
      o2.detune.value = 5;
      f.type = "lowpass";
      f.frequency.value = 700;
      f.Q.value = 0.6;
      g.gain.value = 0;
      o1.connect(f);
      o2.connect(f);
      f.connect(g).connect(c.destination);
      o1.start();
      o2.start();
      started = true;
    }
    return c;
  };
  return {
    move(ny, speed) {
      const c = ensure();
      const t = c.currentTime;
      const base = 130 + (1 - ny) * 150;
      o1.frequency.setTargetAtTime(base, t, 0.1);
      o2.frequency.setTargetAtTime(base * 1.5, t, 0.1);
      f.frequency.setTargetAtTime(560 + speed * 1100, t, 0.08);
      g.gain.setTargetAtTime(0.024, t, 0.06);
    },
    leave() {
      if (!started) return;
      const c = ctx();
      g.gain.cancelScheduledValues(c.currentTime);
      g.gain.setTargetAtTime(0, c.currentTime, 0.05);
    },
    stop() {
      if (!started) return;
      try {
        o1.stop();
        o2.stop();
        o1.disconnect();
        o2.disconnect();
        f.disconnect();
        g.disconnect();
      } catch {
        /* */
      }
      started = false;
    },
  };
}
