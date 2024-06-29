/**
 * @Description trim
 */
export const trimFilter = (value: string) => {
  return value.replace(/^\s+|\s+$/g, ''); // you could use .trim, but it's not going to work in IE<9
};
