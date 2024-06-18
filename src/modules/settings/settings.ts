import { SectionTitle } from './types';

export const settingSectionsMap: {
  [Key in SectionTitle]: string[];
} = {
  Account: ['Profile', 'Security', 'Shares', 'Permissions'],
  'Livestream Settings': ['Preferences', 'Chat Options'],
  'Privacy and Safety': ['Privacy', 'Content Moderation', 'Blocked Users'],
  Notifications: ['General', 'Livestream'],
  'Support and Feedback': ['Help Center', 'Report a Problem', 'Rate Us'],
  Legal: ['Terms of Service', 'Privacy Policy', 'Community Guidelines'],
  About: ['Version', 'Developer Info', 'Release Notes', 'Join Beta Program'],
  Logout: ['Logout'],
};
