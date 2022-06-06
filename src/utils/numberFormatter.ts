export default function numberFormatter({value, size}: {value: string | number; size: number}) {
  if (value && value != '???')
    return Number(value).toLocaleString('en-US', {minimumFractionDigits: size});
  else return '???'; // temporary
}

export function toFixed(value: string | number, size: number): string {
  const split = value.toString().split('.');
  if (split.length <= 1) return value.toString();

  const int = split[0];
  const decimals = split[1].slice(0, size);

  return `${int}.${decimals}`;
}
