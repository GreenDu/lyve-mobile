export const getRandomLightHexColor = () => {
  // Generate random values for red, green, and blue components
  // Ensure they are light by setting a minimum value (e.g., 128) to avoid dark colors
  const r = Math.floor(Math.random() * 128 + 128);
  const g = Math.floor(Math.random() * 128 + 128);
  const b = Math.floor(Math.random() * 128 + 128);

  // Convert the RGB values to a hex string
  const toHex = (value: number) => value.toString(16).padStart(2, '0');
  const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;

  return hexColor;
};
