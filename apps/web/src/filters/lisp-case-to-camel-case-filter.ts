/**
 * @Description lispCase To CamelCase, receives one string like: 'hello-word' and return 'helloWord'
 */
export const lispCaseToCamelCaseFilter = (input: string) =>
  input
    ? input
        .trim()
        .replace(/[\-_](\w)/g, (match) => match.charAt(1).toUpperCase())
    : '';
