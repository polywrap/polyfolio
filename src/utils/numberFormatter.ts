export default function numberFormatter({value, size}) {
  if (value)
    return Number(value).toLocaleString('en-US', {minimumFractionDigits: size});
  else return '???'
}
