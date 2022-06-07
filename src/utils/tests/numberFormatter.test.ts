import numberFormatter from 'utils/numberFormatter';

describe('Number formatter', () => {
  test('Number formatter on different predicted inputs', () => {
    const resultWithNumberInput = numberFormatter(10000);
    const resultWithStringInput = numberFormatter('10000');
    const resultWithZeroSize = numberFormatter(10000);

    expect(resultWithNumberInput).toBe('10,000.00');
    expect(resultWithStringInput).toBe('10,000.00');
    expect(resultWithZeroSize).toBe('10,000');
  });

  test('Number formatter on different unpredicted inputs', () => {
    const resultWithUndefinedValue = numberFormatter(undefined);
    const resultWithNullValue = numberFormatter(null);

    expect(resultWithUndefinedValue).toBe('0');
    expect(resultWithNullValue).toBe('0');
  });

  test('Number formatter on zero values', () => {
    const resultWithZeroValueAndNonZeroSize = numberFormatter(0);
    const resultWithZeroValueAndZeroSize = numberFormatter(0);

    expect(resultWithZeroValueAndNonZeroSize).toBe('0');
    expect(resultWithZeroValueAndZeroSize).toBe('0');
  });
});
