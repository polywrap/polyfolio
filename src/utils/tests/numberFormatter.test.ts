import numberFormatter from "utils/numberFormatter";

describe('Number formatter', () => {
  test('Number formatter on different predicted inputs', () => {
    const resultWithNumberInput = numberFormatter(10000);
    const resultWithStringInput = numberFormatter('10000');

    const resultWithMinFractionOption = numberFormatter(10000, {minimumFractionDigits: 2});

    const resultWithMaxFractionOption_1 = numberFormatter(10000, {maximumFractionDigits: 2});
    const resultWithMaxFractionOption_2 = numberFormatter(10000.0, {maximumFractionDigits: 2});
    const resultWithMaxFractionOption_3 = numberFormatter(10000.1, {maximumFractionDigits: 2});
    const resultWithMaxFractionOption_4 = numberFormatter(10000.15, {maximumFractionDigits: 2});
    const resultWithMaxFractionOption_5 = numberFormatter(10000.153, {maximumFractionDigits: 2});

    const resultWithMaxAndMinFractionOption_1 = numberFormatter(
      10000.153,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    );
    const resultWithMaxAndMinFractionOption_2 = numberFormatter(
      10000.1,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    );
    const resultWithMaxAndMinFractionOption_3 = numberFormatter(
      10000,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    );
  
    expect(resultWithNumberInput).toBe('10,000');
    expect(resultWithStringInput).toBe('10,000');

    expect(resultWithMinFractionOption).toBe('10,000.00');

    expect(resultWithMaxFractionOption_1).toBe('10,000');
    expect(resultWithMaxFractionOption_2).toBe('10,000');
    expect(resultWithMaxFractionOption_3).toBe('10,000.1');
    expect(resultWithMaxFractionOption_4).toBe('10,000.15');
    expect(resultWithMaxFractionOption_5).toBe('10,000.15');

    expect(resultWithMaxAndMinFractionOption_1).toBe('10,000.15');
    expect(resultWithMaxAndMinFractionOption_2).toBe('10,000.10');
    expect(resultWithMaxAndMinFractionOption_3).toBe('10,000.00');
  })

  test('Number formatter on different unpredicted inputs', () => {
    const resultWithUndefinedValue = numberFormatter(undefined);
    const resultWithNullValue = numberFormatter(null);

    expect(resultWithUndefinedValue).toBe('0');
    expect(resultWithNullValue).toBe('0');
  })

  test('Number formatter on zero values', () => {
    const resultWithZeroValueAndNonZeroSize = numberFormatter(0);
    const resultWithMinFractionOption = numberFormatter(0, {minimumFractionDigits: 2});
    const resultWithMaxFractionOption = numberFormatter(0, {maximumFractionDigits: 2});
    const resultWithZeroMaxFractionOption = numberFormatter(0.14567, {maximumFractionDigits: 0});

    expect(resultWithZeroValueAndNonZeroSize).toBe('0');
    expect(resultWithMinFractionOption).toBe('0');
    expect(resultWithMaxFractionOption).toBe('0');
    expect(resultWithZeroMaxFractionOption).toBe('0');
  })
})
