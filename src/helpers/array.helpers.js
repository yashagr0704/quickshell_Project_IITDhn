

/**
 * Finds and returns an array of duplicate items in the given array.
 *
 * @param {Array} array - The array to search for duplicates.
 * @returns {Array} - An array of duplicate items.
 */
export const findDuplicates = (array) => {
  if (!Array.isArray(array)) {
    throw new Error('Input is not an array');
  }

  const duplicates = array.filter((item, index) => array.indexOf(item) !== index);

  if (duplicates.length === 0) {
    console.warn('No duplicates found in array');
  }

  return duplicates;
};
