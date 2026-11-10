import { createOptions, extractOptionsFromString } from '../src';

describe('Test option input builder and helperr functions', () => {
  it('extractOptionsFromString should create list of InputOption', () => {
    const values = extractOptionsFromString('1:Oui|0:Non');
    expect(values[0].value).toBe('1');
    expect(values[0].description).toBe('Oui');
    expect(values[1].value).toBe('0');
    expect(values[1].description).toBe('Non');
  });

  it('extractOptionsFromString should create list of InputOption if simple values are passed as parameters', () => {
    const values = extractOptionsFromString('Oui|Non');
    expect(values[0].value).toBe('Oui');
    expect(values[0].description).toBe('Oui');
    expect(values[1].value).toBe('Non');
    expect(values[1].description).toBe('Non');
  });

  it('extractOptionsFromString should return an array of input config if input type is checkbox, select or radio', () => {
    const values = extractOptionsFromString('Oui|Non');
    expect(values[0].name).toEqual('Oui');
    expect(values[1].name).toEqual('Non');
  });

  it('createOptions should return an array of input config if input type is checkbox, select or radio', () => {
    const values = createOptions(
      { source: 'https://auth.lik.tg/api/v2/users', params: { keyBy: 'id', valueBy: 'name' } },
      [
        {
          id: 1,
          name: 'ayiek18',
        },
        {
          id: 10,
          name: 'asmyns14',
        },
        {
          id: 11,
          name: 'benji20',
        },
      ]
    );
    expect(values[0].name).toEqual('ayiek18');
    expect(values[1].name).toEqual('asmyns14');
  });
});
