// GitHub API utility for fetching repositories
const GITHUB_USERNAME = 'Luc0-0';
const GITHUB_API_BASE = 'https://api.github.com';
// Read token from Vite env. Set `VITE_GITHUB_TOKEN` in `.env.local` to increase rate limits.
const GITHUB_TOKEN = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_GITHUB_TOKEN : undefined;

// Keywords for automatic categorization
const CATEGORY_KEYWORDS = {
  'AI/ML Projects': ['ai', 'ml', 'machine-learning', 'neural', 'deep-learning', 'tensorflow', 'pytorch', 'scikit', 'nlp', 'computer-vision', 'data-science'],
  'Web Development': ['react', 'vue', 'angular', 'javascript', 'typescript', 'html', 'css', 'node', 'express', 'next', 'portfolio', 'website'],
  'Mobile Development': ['android', 'ios', 'react-native', 'flutter', 'mobile', 'app'],
  'Data Science': ['data', 'analysis', 'visualization', 'pandas', 'numpy', 'jupyter', 'dataset', 'analytics', 'samarth'],
  'Mini Projects': ['mini', 'small', 'practice', 'learning', 'tutorial', 'demo', 'simple']
};

export const fetchGitHubRepos = async () => {
  try {
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'nipun-portfolio-client'
    };
    if (GITHUB_TOKEN) headers.Authorization = `token ${GITHUB_TOKEN}`;

    const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, { headers });

    // Inspect rate limit headers for diagnostics
    const limit = response.headers.get('x-ratelimit-limit');
    const remaining = response.headers.get('x-ratelimit-remaining');
    const reset = response.headers.get('x-ratelimit-reset');

    if (response.status === 403 || (remaining !== null && Number(remaining) === 0)) {
      console.warn('GitHub API rate limit or auth issue detected. Using fallback data.', { status: response.status, limit, remaining, reset });
      return getFallbackRepos();
    }

    if (!response.ok) throw new Error('Failed to fetch repositories');

    const repos = await response.json();
    
    // Filter out forks and private repos, then categorize
    return repos
      .filter(repo => !repo.fork && !repo.private)
      .map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description available',
        html_url: repo.html_url,
        language: repo.language,
        topics: repo.topics || [],
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        stargazers_count: repo.stargazers_count,
        category: categorizeRepo(repo)
      }))
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return getFallbackRepos();
  }
};

// Fallback data when API is rate-limited
const getFallbackRepos = () => {
  return [
    {
      id: 1,
      name: 'Task Manager Pro',
      description: 'Full-stack task management with real-time collaboration and gamification',
      html_url: 'https://github.com/Luc0-0/Task-manager-pro',
      language: 'JavaScript',
      topics: ['react', 'nodejs', 'task-management'],
      stargazers_count: 0,
      category: 'Web Development'
    },
    {
      id: 2,
      name: 'BLIP Auto Image Captioning',
      description: 'Auto-image captioning using BLIP for generating captions from images',
      html_url: 'https://github.com/Luc0-0/BLIP-auto-image-captioning',
      language: 'Python',
      topics: ['ai', 'computer-vision', 'blip'],
      stargazers_count: 0,
      category: 'AI/ML Projects'
    },
    {
      id: 3,
      name: 'Elevated Notes',
      description: 'Smart note-taking application with advanced search and organization',
      html_url: 'https://github.com/Luc0-0/Elevated-Notes',
      language: 'JavaScript',
      topics: ['notes', 'productivity', 'react'],
      stargazers_count: 0,
      category: 'Web Development'
    }
  ];
};

const categorizeRepo = (repo) => {
  const searchText = `${repo.name} ${repo.description || ''} ${repo.topics?.join(' ') || ''} ${repo.language || ''}`.toLowerCase();
  
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(keyword => searchText.includes(keyword))) {
      return category;
    }
  }
  
  // Default categorization based on language
  if (repo.language) {
    switch (repo.language.toLowerCase()) {
      case 'python':
        return 'AI/ML Projects';
      case 'javascript':
      case 'typescript':
      case 'html':
      case 'css':
        return 'Web Development';
      case 'java':
      case 'kotlin':
      case 'swift':
        return 'Mobile Development';
      case 'r':
      case 'jupyter notebook':
        return 'Data Science';
      default:
        return 'Mini Projects';
    }
  }
  
  return 'Mini Projects';
};

export const getReposByCategory = async () => {
  const repos = await fetchGitHubRepos();
  const categorized = {};
  
  repos.forEach(repo => {
    if (!categorized[repo.category]) {
      categorized[repo.category] = [];
    }
    categorized[repo.category].push(repo);
  });
  
  return categorized;
};