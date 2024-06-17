import { getRandomLightHexColor } from '../../src/utils/getRandomLightHexColor';

describe('getRandomLightHexColor', () => {
  it('generates a hex color string', () => {
    const hexColor = getRandomLightHexColor();
    expect(hexColor).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it('generates a different hex color on subsequent calls', () => {
    const hexColor1 = getRandomLightHexColor();
    const hexColor2 = getRandomLightHexColor();
    expect(hexColor1).not.toBe(hexColor2);
  });
});
