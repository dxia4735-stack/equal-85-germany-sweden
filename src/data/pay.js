import dataset from '../../public/data/eurostat-sdg-05-20.json';
// Decode the source snapshot instead of maintaining a second hand-entered series.
const years = Object.keys(dataset.dimension.time.category.index);
const count = years.length;
export const PAY_SERIES = years.map((year, index) => ({
  year: Number(year),
  de: dataset.value[index],
  se: dataset.value[count + index],
  deStatus: dataset.status?.[index] || '',
  seStatus: dataset.status?.[count + index] || '',
}));
export const LATEST = PAY_SERIES[PAY_SERIES.length - 1];
export const RETRIEVED = '16 September 2026';
export const SOURCE_UPDATED = '26 February 2026';
export const payRatio = (gap) => (100 - gap).toFixed(1);
