/**
 * @Description Slug or lispCase; All letters are downCased and spaces and specialChars are replaced by hyphens '-'.
 *
 * EXAMPLE: {{ 'Your best days are not behind you; your best days are out in front of you.' | slug }} // your-best-days-are-not-behind-you-your-best-days-are-out-in-front-of-you
 *
 * */
export const slugFilter = (input: string) =>
  input
    ? String(input)
        .toLowerCase()
        .replace(/[^a-zá-źA-ZÁ-Ź0-9]/g, ' ')
        .trim()
        .replace(/\s{2,}/g, ' ')
        .replace(/\s+/g, '-')
    : '';
