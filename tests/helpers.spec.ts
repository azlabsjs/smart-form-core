import { buildConditional } from '../src/helpers';

describe('Test helper global functions', () => {
  it('should returns an object containing a formControlName and values as property', () => {
    const result = buildConditional('has_password:true,1');
    expect(result?.name).toEqual('has_password');
    expect(result?.values).toEqual([true, '1']);
  });

  it('should returns an object containing a formControlName and values as property if | operator is used', () => {
    const result = buildConditional('has_password:true|1');
    expect(result?.name).toEqual('has_password');
    expect(result?.values).toEqual([true, '1']);
  });

  it('should return undefined for empty string', () => {
    const result = buildConditional('');
    expect(result).toEqual(undefined);
  });
});
