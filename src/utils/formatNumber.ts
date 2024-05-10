/**
 * Format a number into a human-readable abbreviated format.
 * For example, 1200 -> 1.2k, 12400 -> 12.4k, 1430000 -> 1.4M, 1234567890 -> 1.2B.
 * Negative numbers are formatted with the appropriate prefix '-'.
 * @param {number} number - The number to be formatted.
 * @returns {string} The formatted number as a string.
 */
export const formatNumber = (number: number): string => {
  if (isNaN(number) || number === null) return "0";

  let absNumber: number = Math.abs(number);
  const abbrev: string[] = ["", "k", "M", "B", "T"];
  let index = 0;

  while (absNumber >= 1000 && index < abbrev.length - 1) {
    absNumber /= 1000;
    index++;
  }

  const formattedNumber: string = absNumber.toFixed(1).replace(/\.0$/, "");
  return (number < 0 ? "-" : "") + formattedNumber + abbrev[index];
};
