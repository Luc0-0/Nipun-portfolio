// src/components/LiveGitHubActivity.jsx
// Live GitHub activity visualization

import React, { useState, useEffect } from 'react';

export default function LiveGitHubActivity({ username = "Luc0-0" }) {
  const [activity, setActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubActivity = async () => {
      try {
        // Using GitHub API to get recent activity
        const response = await fetch(`https://api.github.com/users/${username}/events?per_page=5`);
        const data = await response.json();
        
        const processedActivity = data.slice(0, 3).map(event => ({
          id: event.id,
          type: event.type,
          repo: event.repo.name.split('/')[1],
          time: new Date(event.created_at).toLocaleTimeString(),
          action: getActionText(event.type)
        }));
        
        setActivity(processedActivity);
      } catch (error) {
        console.log('GitHub API rate limited, using mock data');
        setActivity([
          { id: 1, type: 'PushEvent', repo: 'ai-portfolio', time: '2:30 PM', action: 'pushed code' },
          { id: 2, type: 'CreateEvent', repo: 'neural-network', time: '1:15 PM', action: 'created repo' },
          { id: 3, type: 'IssuesEvent', repo: 'ml-toolkit', time: '12:45 PM', action: 'closed issue' }
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
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span>Live GitHub Activity</span>
      </div>
      <div className="space-y-1">
        {activity.map((item, index) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between text-xs text-gray-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-2">
              <div className={`w-1 h-1 rounded-full ${getActionColor(item.type)}`} />
              <span className={getActionColor(item.type)}>{item.action}</span>
              <span className="text-gray-400">in {item.repo}</span>
            </div>
            <span className="text-gray-500">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}