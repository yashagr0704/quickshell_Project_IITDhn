/**
 * Generates a random hexadecimal color code.
 * @returns {string} A random hexadecimal color code.
 */
export function generateRandomColor() {
  const hexDigits = "0123456789abcdef";

  let colorCode = "#";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * hexDigits.length);
    colorCode += hexDigits[randomIndex];
  }

  return colorCode;
}


/**
 * Generates a contrasting color based on the provided hexadecimal color code.
 * @param {string} hex - A hexadecimal color code.
 * @returns {string} A contrasting hexadecimal color code.
 * @throws {Error} If the provided color code is invalid.
 */
export function generateColorContrast(hex) {
  if (typeof hex !== "string") {
    throw new Error("Invalid HEX color: not a string.");
  }

  if (!/^#([0-9A-Fa-f]{3}){1,2}$/.test(hex)) {
    throw new Error("Invalid HEX color: not in the correct format.");
  }

  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  if (hex.length !== 6) {
    throw new Error("Invalid HEX color: not 3 or 6 digits long.");
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    throw new Error("Invalid HEX color: contains non-hexadecimal characters.");
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

