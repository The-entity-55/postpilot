import api from './api';

export interface AnalyticsTrend {
  date: string;
  value: number;
}

// Description: Get analytics trends data
// Endpoint: GET /api/analytics/trends
// Request: {}
// Response: { trends: { [key: string]: AnalyticsTrend[] } }
export const getAnalyticsTrends = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        trends: {
          followers: [
            { date: '2024-03-01', value: 100000 },
            { date: '2024-03-08', value: 105000 },
            { date: '2024-03-15', value: 112000 },
            { date: '2024-03-22', value: 118000 },
          ],
          engagement: [
            { date: '2024-03-01', value: 4.2 },
            { date: '2024-03-08', value: 4.5 },
            { date: '2024-03-15', value: 4.8 },
            { date: '2024-03-22', value: 4.6 },
          ],
          impressions: [
            { date: '2024-03-01', value: 250000 },
            { date: '2024-03-08', value: 280000 },
            { date: '2024-03-15', value: 310000 },
            { date: '2024-03-22', value: 350000 },
          ]
        }
      });
    }, 500);
  });
};