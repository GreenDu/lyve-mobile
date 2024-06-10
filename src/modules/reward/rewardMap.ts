import { RewardType } from './types';

export const rewardMap: { [Key in RewardType]: { asset: any; cost: number } } = {
  popsicle: { asset: require('../../../assets/rewards/popsicle.png'), cost: 1 },
  pizza: { asset: require('../../../assets/rewards/pizza.png'), cost: 4 },
  gift: { asset: require('../../../assets/rewards/gift.png'), cost: 10 },
  rocket: { asset: require('../../../assets/rewards/rocket.png'), cost: 20 },
  star: { asset: require('../../../assets/rewards/star.png'), cost: 50 },
  cake: { asset: require('../../../assets/rewards/cake.png'), cost: 99 },
  crown: { asset: require('../../../assets/rewards/crown.png'), cost: 150 },
  heart: { asset: require('../../../assets/rewards/heart.png'), cost: 180 },
  bouquet: { asset: require('../../../assets/rewards/bouquet.png'), cost: 380 },
  lucky_cat: { asset: require('../../../assets/rewards/cat.png'), cost: 1500 },
};
