/**
 * Typed predicate that allows undefined items to be filtered out.
 */
export function isNotUndefined<T>(item: T | undefined): item is T {
  return item !== undefined
}
