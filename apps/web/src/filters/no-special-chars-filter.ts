/**
 * @Description  All special chars are replaced by spaces.
 * */
export const noSpecialCharsFilter = (input: string) =>
  input
    ? String(input)
        .replace(/[^a-zá-źA-ZÁ-Ź0-9]/g, ' ')
        .trim()
        .replace(/\s{2,}/g, ' ')
    : '';
