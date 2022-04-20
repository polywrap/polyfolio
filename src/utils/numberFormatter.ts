export default function numberFormatter({value, size}: {value: string, size: number}) {
  if (value)
    return value === '777' ? '???' : Number(value).toLocaleString('en-US', {minimumFractionDigits: size});
  else return '0'
}
