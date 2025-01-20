import api from './api';

export interface AudienceMetric {
  label: string;
  value: number;
  change: number;
}

// Description: Get audience overview metrics
// Endpoint: GET /api/audience/overview
// Request: {}
// Response: { metrics: AudienceMetric[] }
export const getAudienceOverview = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        metrics: [
          { label: 'Total Followers', value: 125000, change: 12.5 },
          { label: 'New Followers', value: 2500, change: 8.3 },
          { label: 'Active Users', value: 45000, change: 15.2 },
          { label: 'Engagement Rate', value: 4.8, change: -2.1 },
        ]
      });
    }, 500);
  });
};

export interface Demographics {
  age: { label: string; value: number }[];
  gender: { label: string; value: number }[];
  location: { country: string; value: number }[];
}

// Description: Get audience demographics
// Endpoint: GET /api/audience/demographics
// Request: {}
// Response: Demographics
export const getAudienceDemographics = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        age: [
          { label: '18-24', value: 25 },
          { label: '25-34', value: 45 },
          { label: '35-44', value: 20 },
          { label: '45+', value: 10 }
        ],
        gender: [
          { label: 'Male', value: 48 },
          { label: 'Female', value: 51 },
          { label: 'Other', value: 1 }
        ],
        location: [
          { country: 'United States', value: 45 },
          { country: 'United Kingdom', value: 15 },
          { country: 'Canada', value: 10 },
          { country: 'Australia', value: 8 },
          { country: 'Other', value: 22 }
        ]
      });
    }, 500);
  });
};