import api from './api';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  platform: 'instagram' | 'facebook' | 'twitter';
  scheduledAt: string;
  status: 'scheduled' | 'published' | 'draft';
}

// Description: Get scheduled posts
// Endpoint: GET /api/calendar/events
// Request: {}
// Response: { events: CalendarEvent[] }
export const getCalendarEvents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        events: [
          {
            id: '1',
            title: 'Product Launch Post',
            description: 'Announcing our new feature release',
            platform: 'instagram',
            scheduledAt: '2024-03-25T10:00:00Z',
            status: 'scheduled'
          },
          {
            id: '2',
            title: 'Weekly Tips Thread',
            description: 'Social media marketing tips for beginners',
            platform: 'twitter',
            scheduledAt: '2024-03-26T14:30:00Z',
            status: 'draft'
          },
          {
            id: '3',
            title: 'Customer Success Story',
            description: 'Featuring client testimonial video',
            platform: 'facebook',
            scheduledAt: '2024-03-27T16:00:00Z',
            status: 'scheduled'
          }
        ]
      });
    }, 500);
  });
};