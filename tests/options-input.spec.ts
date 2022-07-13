import {
  basicInputOptions,
  buildSelectableInput,
  createInputOptionsFromList,
  createInputOptionsFromQueryResult,
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

  it('createInputOptionsFromList should empty array if input type neither checkbox, nor select nor radio', () => {
    const values = createInputOptionsFromList(
      buildTextInput(descriptionText),
      'Oui|Non'
    );
    expect(values).toEqual([]);
  });

  it('createInputOptionsFromList should return an array of input config if input type is checkbox, select or radio', () => {
    const values = createInputOptionsFromList(
      {
        label: '',
        formControlName: '',
        type: InputTypes.CHECKBOX_INPUT,
      } as OptionsInputConfigInterface,
      'Oui|Non'
    );
    expect(values[0].name).toEqual('Oui');
    expect(values[1].name).toEqual('Non');
  });

  it('createInputOptionsFromQueryResult should return an array of input config if input type is checkbox, select or radio', () => {
    const values = createInputOptionsFromQueryResult(
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
    expect(config?.definitions?.groupBy).toEqual('id');
    expect(config?.definitions?.keyBy).toEqual('id');
    expect(config?.definitions?.valueBy).toEqual('name');
    expect(config?.source?.collection).toEqual(
      'https://auth.lik.tg/api/v2/users'
    );
    expect(config?.source?.model).toEqual(undefined);
  });

  it('createOptionsConfig should return an Option Config type when called on url', () => {
    const config = createOptionsConfig({
      selectableValues: 'https://auth.lik.tg/api/v2/users',
    });
    expect(config?.definitions?.groupBy).toEqual('id');
    expect(config?.definitions?.keyBy).toEqual('id');
    expect(config?.definitions?.valueBy).toEqual('label');
    expect(config?.source?.collection).toEqual(
      'https://auth.lik.tg/api/v2/users'
    );
    expect(config?.source.model).toEqual(undefined);
  });

  it('createOptionsConfig should return an Option Config type when called on option model configurations', () => {
    const config = createOptionsConfig({
      selectableModel:
        'table:users|model:\\App\\Models\\Users|keyfield:id|valuefield:name',
    });
    expect(config?.definitions?.groupBy).toEqual(undefined);
    expect(config?.definitions?.keyBy).toEqual('id');
    expect(config?.definitions?.valueBy).toEqual('name');
    expect(config?.source?.collection).toEqual('users');
    expect(config?.source.model).toEqual('\\App\\Models\\Users');
  });

  it('createOptionsConfig should return an Option Config type when called on an inline list configuration', () => {
    const config = createOptionsConfig({
      selectableValues: 'table:Table|chair:Chair',
    });
    expect(config?.definitions?.groupBy).toEqual('id');
    expect(config?.definitions?.keyBy).toEqual('id');
    expect(config?.definitions?.valueBy).toEqual('label');
    expect(config?.source?.collection).toEqual('table:Table|chair:Chair');
    expect(config?.source.model).toEqual(undefined);
  });

  it('createOptionsConfig should return an Option Config type when called on a pre-build option config object', () => {
    const config = createOptionsConfig({
      optionsConfig: {
        definitions: {
          keyBy: 'id',
          groupBy: 'id',
          valueBy: 'label',
          filters: undefined,
        },
        source: {
          collection: 'table:Table|chair:Chair',
        },
      },
    });
    expect(config?.definitions?.groupBy).toEqual('id');
    expect(config?.definitions?.keyBy).toEqual('id');
    expect(config?.definitions?.valueBy).toEqual('label');
    expect(config?.source?.collection).toEqual('table:Table|chair:Chair');
    expect(config?.source.model).toEqual(undefined);
  });
});
