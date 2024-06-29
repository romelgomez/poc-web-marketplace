/**
 * @Description receives one array like: [1,2,3] and return [3,2,1]
 * */
export function reverseFilter<T>(items: T[]) {
  return Array.isArray(items) ? items.slice().reverse() : [];
}
