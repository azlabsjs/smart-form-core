import {
  basicInputOptions,
  buildSelectableInput,
  mapStringListToInputOptions,
  mapIntoInputOptions,
  createOptionsConfig,
} from '../src/input-types/options';
import { buildTextInput } from '../src/input-types/text';
import { InputTypes, OptionsInputConfigInterface } from '../src/types';
import { descriptionText, userSelect } from './inputs';

describe('Test option input builder and helperr functions', () => {
  it('basicInputOptions should create list of InputOption', () => {
    const values = basicInputOptions('1:Oui|0:Non');
    expect(values[0].value).toBe('1');
    expect(values[0].description).toBe('Oui');
    expect(values[1].value).toBe('0');
    expect(values[1].description).toBe('Non');
  });

  it('basicInputOptions should create list of InputOption if simple values are passed as parameters', () => {
    const values = basicInputOptions('Oui|Non');
    expect(values[0].value).toBe('Oui');
    expect(values[0].description).toBe('Oui');
    expect(values[1].value).toBe('Non');
    expect(values[1].description).toBe('Non');
  });

  it('basicListToInputOptions should empty array if input type neither checkbox, nor select nor radio', () => {
    const values = mapStringListToInputOptions(
      buildTextInput(descriptionText),
      'Oui|Non'
    );
    expect(values).toEqual([]);
  });

  it('basicListToInputOptions should return an array of input config if input type is checkbox, select or radio', () => {
    const values = mapStringListToInputOptions(
      {
        label: '',
        name: '',
        type: InputTypes.CHECKBOX_INPUT,
      } as OptionsInputConfigInterface,
      'Oui|Non'
    );
    expect(values[0].name).toEqual('Oui');
    expect(values[1].name).toEqual('Non');
  });

  it('createInputOptionsFromQueryResult should return an array of input config if input type is checkbox, select or radio', () => {
    const values = mapIntoInputOptions(
      buildSelectableInput(userSelect),
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
  }); //

  it('createOptionsConfig should return an Option Config type', () => {
    const config = createOptionsConfig(userSelect);
    expect(config?.params?.groupBy).toEqual('id');
    expect(config?.params?.keyBy).toEqual('id');
    expect(config?.params?.valueBy).toEqual('name');
    expect(config?.source?.resource).toEqual(
      'https://auth.lik.tg/api/v2/users'
    );
    expect(config?.source?.type).toEqual(undefined);
  });

  it('createOptionsConfig should return an Option Config type when called on url', () => {
    const config = createOptionsConfig({
      selectableValues: 'https://auth.lik.tg/api/v2/users',
    });
    expect(config?.params?.groupBy).toEqual('id');
    expect(config?.params?.keyBy).toEqual('id');
    expect(config?.params?.valueBy).toEqual('label');
    expect(config?.source?.resource).toEqual(
      'https://auth.lik.tg/api/v2/users'
    );
    expect(config?.source.type).toEqual(undefined);
  });

  it('createOptionsConfig should return an Option Config type when called on option model configurations', () => {
    const config = createOptionsConfig({
      selectableModel:
        'table:users|model:\\App\\Models\\Users|keyfield:id|valuefield:name',
    });
    expect(config?.params?.groupBy).toEqual(undefined);
    expect(config?.params?.keyBy).toEqual('id');
    expect(config?.params?.valueBy).toEqual('name');
    expect(config?.source?.resource).toEqual('users');
    expect(config?.source.type).toEqual('\\App\\Models\\Users');
  });

  it('createOptionsConfig should return an Option Config type when called on an inline list configuration', () => {
    const config = createOptionsConfig({
      selectableValues: 'table:Table|chair:Chair',
    });
    expect(config?.params?.groupBy).toEqual('id');
    expect(config?.params?.keyBy).toEqual('id');
    expect(config?.params?.valueBy).toEqual('label');
    expect(config?.source?.resource).toEqual('table:Table|chair:Chair');
    expect(config?.source.type).toEqual(undefined);
  });

  it('createOptionsConfig should return an Option Config type when called on a pre-build option config object', () => {
    const config = createOptionsConfig({
      optionsConfig: {
        params: {
          keyBy: 'id',
          groupBy: 'id',
          valueBy: 'label',
          filters: undefined,
        },
        source: {
          resource: 'table:Table|chair:Chair',
          raw: 'table:Table|chair:Chair',
        },
      },
    });
    expect(config?.params?.groupBy).toEqual('id');
    expect(config?.params?.keyBy).toEqual('id');
    expect(config?.params?.valueBy).toEqual('label');
    expect(config?.source?.resource).toEqual('table:Table|chair:Chair');
    expect(config?.source.type).toEqual(undefined);
  });
});
