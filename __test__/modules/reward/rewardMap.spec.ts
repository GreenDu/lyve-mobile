import { rewardMap } from '../../../src/modules/reward/rewardMap';
import { RewardType } from '../../../src/modules/reward/types';

jest.mock('../../../assets/rewards/popsicle.png', () => 'mocked_popsicle_asset');
jest.mock('../../../assets/rewards/pizza.png', () => 'mocked_pizza_asset');
jest.mock('../../../assets/rewards/gift.png', () => 'mocked_gift_asset');
jest.mock('../../../assets/rewards/rocket.png', () => 'mocked_rocket_asset');
jest.mock('../../../assets/rewards/star.png', () => 'mocked_star_asset');
jest.mock('../../../assets/rewards/cake.png', () => 'mocked_cake_asset');
jest.mock('../../../assets/rewards/crown.png', () => 'mocked_crown_asset');
jest.mock('../../../assets/rewards/heart.png', () => 'mocked_heart_asset');
jest.mock('../../../assets/rewards/bouquet.png', () => 'mocked_bouquet_asset');
jest.mock('../../../assets/rewards/cat.png', () => 'mocked_cat_asset');

describe('rewardMap', () => {
  it('contains all the expected reward types', () => {
    const expectedKeys: RewardType[] = [
      'popsicle',
      'pizza',
      'gift',
      'rocket',
      'star',
      'cake',
      'crown',
      'heart',
      'bouquet',
      'lucky_cat',
    ];

    expect(Object.keys(rewardMap)).toEqual(expectedKeys);
  });

  it('has the correct cost and asset for each reward type', () => {
    const expectedValues = {
      popsicle: { asset: 'mocked_popsicle_asset', cost: 1 },
      pizza: { asset: 'mocked_pizza_asset', cost: 4 },
      gift: { asset: 'mocked_gift_asset', cost: 10 },
      rocket: { asset: 'mocked_rocket_asset', cost: 20 },
      star: { asset: 'mocked_star_asset', cost: 50 },
      cake: { asset: 'mocked_cake_asset', cost: 99 },
      crown: { asset: 'mocked_crown_asset', cost: 150 },
      heart: { asset: 'mocked_heart_asset', cost: 180 },
      bouquet: { asset: 'mocked_bouquet_asset', cost: 380 },
      lucky_cat: { asset: 'mocked_cat_asset', cost: 1500 },
    };

    for (const [key, value] of Object.entries(expectedValues)) {
      expect(rewardMap[key as RewardType]).toEqual(value);
    }
  });
});
