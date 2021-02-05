export const parseNumber = (value: number | string): number =>
  typeof value === 'number' ? value : parseInt(value, 10)
