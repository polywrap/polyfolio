interface INumberFormatterOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export default function numberFormatter(value: string | number, options?: INumberFormatterOptions) {
  if (value)
    return Number(value).toLocaleString('en-US',
      {
        minimumFractionDigits: options?.minimumFractionDigits ?? 0,
        maximumFractionDigits: options?.maximumFractionDigits ?? 2
      }
    );
  else return '0';
}

export function toFixed(value: string | number, size: number): string {
  const split = value.toString().split('.');
  if (split.length <= 1) return value.toString();

  const int = split[0];
  const decimals = split[1].slice(0, size);

  return `${int}.${decimals}`;
}
