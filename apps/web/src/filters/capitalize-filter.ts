/**
 *  @Description  All first letters of each word will be capital letters.
 *
 * */
export const capitalizeFilter = (input: string) =>
  input
    ? input.replace(
        /([^\W_]+[^\s-]*) */g,
        (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
      )
    : '';
