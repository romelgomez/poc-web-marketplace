import { truncate } from 'lodash';
import { capitalizeFilter } from './capitalize-filter';

/**
 * @Description Truncates string if it’s longer than the given maximum string length.
 * The last characters of the truncated string are replaced with the omission string which defaults to "…".
 * */
export const lodashTruncatesFilter = (text: string, length: number) => {
  const _text = truncate(text, {
    length: length,
    separator: /,? +/,
  });
  return capitalizeFilter(_text);
};
