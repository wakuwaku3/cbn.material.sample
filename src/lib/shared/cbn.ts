import { SortDirection } from '../models/types';

export const delay = (ms: number) =>
  new Promise(r => setTimeout(() => r(), ms));
export const compare = (v1, v2, d: SortDirection) => {
  if (v1 === v2) { return 0; }
  if (v1 >= v2) { return d === 'asc' ? 1 : -1; }
  if (v1 <= v2) { return d === 'asc' ? -1 : 1; }
};
export const sort = <T>(selector: (v: T) => any, d: SortDirection) => (
  v1: T,
  v2: T,
) => {
  return compare(selector(v1), selector(v2), d);
};
