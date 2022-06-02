import numberFormatter from "utils/numberFormatter";

describe('Testing number formatter', () => {
  test('Testing number formatter on different predicted inputs', () => {
    const resultWithNumberInput = numberFormatter({value: 10000, size: 2});
    const resultWithStringInput = numberFormatter({value: '10000', size: 2});
    const resultWithZeroSize = numberFormatter({value: 10000, size: 0});
  
    expect(resultWithNumberInput).toBe('10,000.00');
    expect(resultWithStringInput).toBe('10,000.00');
    expect(resultWithZeroSize).toBe('10,000');
  })

  test('Testing number formatter on different unpredicted inputs', () => {
    const resultWithUndefinedValue = numberFormatter({value: undefined, size: 2});
    const resultWithNullValue = numberFormatter({value: null, size: 2});

    expect(resultWithUndefinedValue).toBe('0');
    expect(resultWithNullValue).toBe('0');
  })

  test('Testing number formatter on zero values', () => {
    const resultWithZeroValueAndNonZeroSize = numberFormatter({value: 0, size: 2});
    const resultWithZeroValueAndZeroSize = numberFormatter({value: 0, size: 0});

    expect(resultWithZeroValueAndNonZeroSize).toBe('0');
    expect(resultWithZeroValueAndZeroSize).toBe('0');
  })
})
