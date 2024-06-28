/**
 * @Description Receives one string like: 'hello word' and return 'Hello word'
 * @param {String}
 * @return {String}
 */
export const capitalizeFirstCharFilter = (input: string) =>
  input
    ? input
        .trim()
        .replace(/(^\w?)/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1))
    : '';
