export default function numberFormatter({value, size}: {size: number; value: number}) {
  return value.toLocaleString('en-US', {minimumFractionDigits: size});
}
