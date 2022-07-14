import { buildRequiredIfConfig } from '../src/helpers/builders';
import { buildFormSync } from '../src';

describe('Test helper global functions', () => {
  it('should returns an object containing a formControlName and values as property', () => {
    const result = buildRequiredIfConfig('has_password:true,1');
    expect(result?.name).toEqual('has_password');
    expect(result?.values).toEqual([true, '1']);
  });

  it('should returns an object containing a formControlName and values as property if | operator is used', () => {
    const result = buildRequiredIfConfig('has_password:true|1');
    expect(result?.name).toEqual('has_password');
    expect(result?.values).toEqual([true, '1']);
  });

  it('should return undefined for empty string', () => {
    const result = buildRequiredIfConfig('');
    expect(result).toEqual(undefined);
  });

  it('should build an instance of FormConfigInterface from FormInterface', () => {
    const result = buildFormSync({
      title: "CREATION DE COMPTE",
      url: 'http://127.0.0.1:9800',
      controls: [],
      'id': 3
    });

    expect(result?.endpointURL).toEqual('http://127.0.0.1:9800');
    expect(result?.title).toEqual('CREATION DE COMPTE');
    expect(result?.controlConfigs).toEqual([]);

  });
});
