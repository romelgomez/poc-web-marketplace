/**
 * @Description Replace part of the string.
 * */
export const stringReplaceFilter = (
  string: string,
  changeThis: string,
  forThis: string,
) => string.split(changeThis).join(forThis);
