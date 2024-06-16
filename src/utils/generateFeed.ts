import { faker } from '@faker-js/faker';
import { genres } from '@modules/stream/genres';

// Define the Streamer type
function generateStreamer() {
  const username = faker.internet.userName().slice(0, 8);
  return {
    id: faker.string.uuid(),
    username,
    dispname: username,
    avatar_url: faker.image.avatar(),
    followerCount: faker.number.int({ min: 0, max: 1000000 }),
    promotionPoints: faker.number.int({ min: 0, max: 10000 }),
    level: faker.number.int({ min: 1, max: 20 }),
    subscribed: faker.datatype.boolean(0.5),
  };
}

// Helper function to get random unique genres
function getRandomGenres() {
  const numGenres = faker.number.int({ min: 1, max: 3 });
  const selectedGenres = new Set<string>();

  while (selectedGenres.size < numGenres) {
    const genre = genres[faker.number.int({ min: 0, max: genres.length - 1 })];

    if (genre) {
      selectedGenres.add(genre.text);
    }
  }

  let result = '';

  for (const g of selectedGenres) {
    result += g + ',';
  }

  return result.slice(0, -1);
}

// Define the Stream type
function generateStream(streamerId: string) {
  return {
    id: faker.string.uuid(),
    serverId: faker.string.uuid(),
    active: faker.datatype.boolean(),
    streamerId,
    viewerCount: faker.number.int({ min: 0, max: 10000 }),
    previewImgUrl: faker.datatype.boolean(0.7)
      ? faker.image.urlPicsumPhotos({ width: 500, height: 720 })
      : '',
    created_at: new Date(),
    ended_at: null,
    duration: 0,
    genre: getRandomGenres(),
    mostViewers: 0,
  };
}

// Generate a single feed item
function generateFeedItem() {
  const streamer = generateStreamer();
  const stream = generateStream(streamer.id);

  return {
    ...stream,
    streamer: {
      ...streamer,
      subscribed: faker.datatype.boolean(),
    },
  };
}

export function generateFeed(feedLength: number) {
  return Array.from({ length: feedLength }, generateFeedItem);
}
