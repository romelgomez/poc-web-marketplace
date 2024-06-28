/**
 * @Description Output plain text instead of html
 * Source: http://stackoverflow.com/a/17315483/2513972
 */
export const htmlToPlaintextFilter = (text: string) =>
  text
    ? String(text)
        .replace(/<[^>]+>/gm, ' ')
        .trim()
    : '';
