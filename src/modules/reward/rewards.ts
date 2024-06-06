import { RewardType } from './types';

export const rewards: { [Key in RewardType]: { path: string } } = {
  popsicle: { path: './assets/rewards/popsicle.png' },
  pizza: { path: './assets/rewards/pizza.png' },
  gift: { path: './assets/rewards/gift.png' },
  rocket: { path: './assets/rewards/rocket.png' },
  star: { path: './assets/rewards/star.png' },
  cake: { path: './assets/rewards/cake.png' },
  crown: { path: './assets/rewards/crown.png' },
  heart: { path: './assets/rewards/heart.png' },
  bouquet: { path: './assets/rewards/bouquet.png' },
  lucky_cat: { path: './assets/rewards/cat.png' },
};
