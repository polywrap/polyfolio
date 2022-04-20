export default function numberFormatter({value, size}) {
  if (value)
    return value === '777' ? '???' : Number(value).toLocaleString('en-US', {minimumFractionDigits: size});
  else return '0'
}
