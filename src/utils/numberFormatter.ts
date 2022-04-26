export default function numberFormatter({value, size}: {value: string | number, size: number}) {
  if (value)
    return Number(value).toLocaleString('en-US', {minimumFractionDigits: size});
  else return '???' // temporary
}
