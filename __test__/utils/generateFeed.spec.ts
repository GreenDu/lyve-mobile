import { generateFeed } from '../../src/utils/generateFeed';

describe('generateFeed', () => {
  it('generates a feed with the specified length', () => {
    const feedLength = 5;
    const feed = generateFeed(feedLength);
    expect(feed.length).toBe(feedLength);
  });

  it('generates feed items with valid structure', () => {
    const feedLength = 2;
    const feed = generateFeed(feedLength);

    feed.forEach((item) => {
      // Check if item has required properties
      expect(item.id).toBeTruthy();
      expect(item.serverId).toBeTruthy();
      expect(item.active).toBeDefined();
      expect(item.streamerId).toBeTruthy();
      expect(item.viewerCount).toBeGreaterThanOrEqual(0);
      expect(item.previewImgUrl).toMatch(/^$|https?:\/\//); // Empty or valid URL
      expect(item.created_at).toBeInstanceOf(Date);
      expect(item.ended_at).toBeNull();
      expect(item.duration).toBe(0);
      expect(item.genre).toBeTruthy();
      expect(typeof item.genre).toBe('string');

      // Check streamer structure
      const streamer = item.streamer;
      expect(streamer).toBeTruthy();
      expect(streamer.id).toBeTruthy();
      expect(streamer.username).toBeTruthy();
      expect(streamer.dispname).toBeTruthy();
      expect(streamer.avatar_url).toMatch(/^https?:\/\//);
      expect(streamer.followerCount).toBeGreaterThanOrEqual(0);
      expect(streamer.promotionPoints).toBeGreaterThanOrEqual(0);
      expect(streamer.level).toBeGreaterThanOrEqual(1);
      expect(streamer.subscribed).toBeDefined();
    });
  });
});
