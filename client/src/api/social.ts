import api from './api';

export interface SocialMetrics {
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
  engagement: number;
}

export interface SocialPost {
  id: string;
  platform: 'instagram' | 'facebook' | 'twitter';
  content: string;
  image: string;
  metrics: SocialMetrics;
  postedAt: string;
}

// Description: Get analytics data for all connected social accounts
// Endpoint: GET /api/analytics/overview
// Request: {}
// Response: { platforms: { instagram: SocialMetrics, facebook: SocialMetrics, twitter: SocialMetrics } }
export const getAnalyticsOverview = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        platforms: {
          instagram: {
            likes: 12500,
            comments: 1200,
            shares: 450,
            impressions: 45000,
            engagement: 5.2
          },
          facebook: {
            likes: 8900,
            comments: 780,
            shares: 320,
            impressions: 32000,
            engagement: 4.8
          },
          twitter: {
            likes: 15600,
            comments: 890,
            shares: 2300,
            impressions: 89000,
            engagement: 6.1
          }
        }
      });
    }, 500);
  });
};

// Description: Get recent posts from all platforms
// Endpoint: GET /api/posts/recent
// Request: {}
// Response: { posts: SocialPost[] }
export const getRecentPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        posts: [
          {
            id: '1',
            platform: 'instagram',
            content: 'Check out our latest product launch! 🚀',
            image: 'https://picsum.photos/400/400',
            metrics: {
              likes: 1200,
              comments: 89,
              shares: 45,
              impressions: 5600,
              engagement: 4.8
            },
            postedAt: '2024-03-20T10:30:00Z'
          },
          {
            id: '2',
            platform: 'facebook',
            content: 'Exciting news coming soon! Stay tuned 👀',
            image: 'https://picsum.photos/400/400',
            metrics: {
              likes: 890,
              comments: 67,
              shares: 34,
              impressions: 4300,
              engagement: 3.9
            },
            postedAt: '2024-03-19T15:45:00Z'
          }
        ]
      });
    }, 500);
  });
};

// Description: Get AI-powered content recommendations
// Endpoint: GET /api/ai/recommendations
// Request: {}
// Response: { recommendations: Array<{ type: string, content: string, confidence: number }> }
export const getAIRecommendations = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        recommendations: [
          {
            type: 'timing',
            content: 'Best posting time: Weekdays between 6-8 PM',
            confidence: 0.89
          },
          {
            type: 'content',
            content: 'Include more video content to increase engagement',
            confidence: 0.92
          },
          {
            type: 'hashtags',
            content: 'Use trending hashtags: #TechTrends #Innovation',
            confidence: 0.85
          }
        ]
      });
    }, 500);
  });
};