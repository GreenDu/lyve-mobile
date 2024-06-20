import { settingSectionsMap } from '../../../src/modules/settings/settings';

describe('settingSectionMap', () => {
  it('Should have expected Keys', () => {
    expect(Object.keys(settingSectionsMap)).toHaveLength(8);
    expect(Object.keys(settingSectionsMap)).toEqual([
      'Account',
      'Livestream Settings',
      'Privacy and Safety',
      'Notifications',
      'Support and Feedback',
      'Legal',
      'About',
      'Logout',
    ]);
  });

  it('Key value should have expected length', () => {
    const valueLength = [4, 2, 3, 2, 3, 3, 4, 1];

    Object.keys(settingSectionsMap).forEach((key, index) => {
      expect(settingSectionsMap[key]).toHaveLength(valueLength[index]);
    });
  });

  it('Key should have expected value', () => {
    expect(settingSectionsMap.Account).toEqual(['Profile', 'Security', 'Shares', 'Permissions']);
    expect(settingSectionsMap['Livestream Settings']).toEqual(['Preferences', 'Chat Options']);
    expect(settingSectionsMap['Privacy and Safety']).toEqual([
      'Privacy',
      'Content Moderation',
      'Blocked Users',
    ]);
    expect(settingSectionsMap.Notifications).toEqual(['General', 'Livestream']);
    expect(settingSectionsMap['Support and Feedback']).toEqual([
      'Help Center',
      'Report a Problem',
      'Rate Us',
    ]);
    expect(settingSectionsMap.Legal).toEqual([
      'Terms of Service',
      'Privacy Policy',
      'Community Guidelines',
    ]);
    expect(settingSectionsMap.About).toEqual([
      'Version',
      'Developer Info',
      'Release Notes',
      'Join Beta Program',
    ]);
    expect(settingSectionsMap.Logout).toEqual(['Logout']);
  });
});
