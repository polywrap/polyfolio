export default function numberFormatter({value, size}) {
  return Number(value).toLocaleString('en-US', {minimumFractionDigits: size});
}
