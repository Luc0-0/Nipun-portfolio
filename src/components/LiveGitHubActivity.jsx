import React, { useState, useEffect } from 'react';

export default function LiveGitHubActivity({ username = "Luc0-0" }) {
  const [repos, setRepos] = useState([]);
  const [activity, setActivity] = useState([]);
  const [commitInfo, setCommitInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const fetchGitHubActivity = async () => {
      try {
        const token = import.meta.env.VITE_GITHUB_TOKEN;
        const headers = token ? { 'Authorization': `token ${token}` } : {};

        // Get recent activity
        const response = await fetch(`https://api.github.com/users/${username}/events?per_page=5`, { headers });
        const data = await response.json();
        
        // Check for rate limiting
        if (response.status === 403 || data.message?.includes('API rate limit')) {
          throw new Error('Rate limited');
        }

        const processedActivity = (Array.isArray(data) ? data : []).slice(0, 3).map(event => ({
          id: event.id,
          type: event.type,
          repo: event.repo.name.split('/')[1],
          repoFull: event.repo.name,
          time: new Date(event.created_at).toLocaleTimeString(),
          action: getActionText(event.type)
        }));
        setActivity(processedActivity);

        // Fetch commit info for PushEvents
        for (const item of processedActivity) {
          if (item.type === 'PushEvent') {
            try {
              const commitRes = await fetch(`https://api.github.com/repos/${item.repoFull}/commits?per_page=1`, { headers });
              const commitData = await commitRes.json();
              if (commitData && commitData[0]) {
                setCommitInfo(prev => ({
                  ...prev,
                  [item.repo]: {
                    avatar: commitData[0].author?.avatar_url,
                    name: commitData[0].commit?.author?.name,
                    message: commitData[0].commit?.message,
                    sha: commitData[0].sha?.slice(0,7),
                    time: new Date(commitData[0].commit?.author?.date).toLocaleTimeString()
                  }
                }));
              }
            } catch {}
          }
        }

        // Fetch latest repos
        try {
          const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`, { headers });
          const repoData = await repoRes.json();
          setRepos(Array.isArray(repoData) ? repoData.slice(0, 4) : []);
        } catch {}
      } catch (error) {
        console.log('GitHub API rate limited, using mock data');
        setActivity([
          { id: 1, type: 'PushEvent', repo: 'ai-portfolio', repoFull: `${username}/ai-portfolio`, time: '2:30 PM', action: 'pushed code' },
          { id: 2, type: 'CreateEvent', repo: 'neural-network', repoFull: `${username}/neural-network`, time: '1:15 PM', action: 'created repo' },
          { id: 3, type: 'IssuesEvent', repo: 'ml-toolkit', repoFull: `${username}/ml-toolkit`, time: '12:45 PM', action: 'closed issue' }
        ]);
        setCommitInfo({
          'ai-portfolio': {
            avatar: 'https://avatars.githubusercontent.com/u/9919?v=4',
            name: 'Nipun Sujesh',
            message: 'Initial commit',
            sha: 'abc1234',
            time: '2:30 PM'
          }
        });
        setRepos([
          { id: 1, name: 'ai-portfolio', html_url: '#', description: 'Portfolio site', updated_at: '2025-09-17' },
          { id: 2, name: 'neural-network', html_url: '#', description: 'Neural net experiments', updated_at: '2025-09-16' },
          { id: 3, name: 'ml-toolkit', html_url: '#', description: 'ML toolkit', updated_at: '2025-09-15' },
          { id: 4, name: 'vision-app', html_url: '#', description: 'Vision project', updated_at: '2025-09-14' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubActivity();
    const interval = setInterval(fetchGitHubActivity, 300000); // Update every 5 minutes
    
    return () => clearInterval(interval);
  }, [username]);

  const getActionText = (type) => {
    const actions = {
      'PushEvent': 'pushed code',
      'CreateEvent': 'created repo',
      'IssuesEvent': 'worked on issue',
      'PullRequestEvent': 'made PR',
      'WatchEvent': 'starred repo'
    };
    return actions[type] || 'contributed';
  };

  const getActionColor = (type) => {
    const colors = {
      'PushEvent': 'text-green-400',
      'CreateEvent': 'text-blue-400',
      'IssuesEvent': 'text-yellow-400',
      'PullRequestEvent': 'text-purple-400',
      'WatchEvent': 'text-pink-400'
    };
    return colors[type] || 'text-gray-400';
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
        <span>Loading GitHub activity...</span>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gray-950/80 p-3 shadow-md border border-gray-900 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-2 text-cyan-400 text-xs font-semibold">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span>Live GitHub Activity</span>
      </div>
      {activity.map((item, index) => (
        <div
          key={item.id}
          className="flex items-center justify-between py-1 px-2 rounded hover:bg-gray-900/60 transition-all text-xs text-gray-300"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center gap-2 min-w-0">
            {/* Avatar */}
            {item.type === 'PushEvent' && commitInfo[item.repo]?.avatar && (
              <img src={commitInfo[item.repo].avatar} alt={commitInfo[item.repo].name} title={commitInfo[item.repo].name}
                className="w-5 h-5 rounded-full border border-cyan-400" />
            )}
            {/* Action & Repo */}
            <span className={`font-medium truncate ${getActionColor(item.type)}`}>{item.action}</span>
            <span className="text-gray-400 truncate">@{item.repo}</span>
            {/* Commit info */}
            {item.type === 'PushEvent' && commitInfo[item.repo] && (
              <span className="ml-1 px-1 rounded bg-gray-900/70 text-cyan-300 font-mono truncate" title={commitInfo[item.repo].message}>
                {commitInfo[item.repo].sha}
              </span>
            )}
          </div>
          <span className="text-gray-500 whitespace-nowrap">{item.time}</span>
        </div>
      ))}
      {/* Latest Repos List */}
      <div className="mt-4">
        <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold mb-1">
          <div className="w-2 h-2 bg-indigo-400 rounded-full" />
          <span>Latest Repositories</span>
        </div>
        <ul className="divide-y divide-gray-800">
          {repos.map(repo => (
            <li key={repo.id || repo.name} className="py-2 px-1 flex flex-col hover:bg-gray-900/60 rounded transition-all">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-cyan-300 font-mono text-sm truncate font-semibold">
                {repo.name}
              </a>
              <span className="text-gray-400 text-xs truncate">{repo.description || 'No description'}</span>
              <span className="text-gray-600 text-xs">Updated: {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : ''}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}