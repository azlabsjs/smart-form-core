import { buildBase } from './base';
import { ControlInterface } from '../compact';
import { buildRequiredIfConfig } from '../helpers/builders';
import {
  ComposedOptionsConfigSource,
  OptionsConfigDefinition,
  OptionsInputConfigInterface,
  OptionsConfig,
  InputOption,
  InputTypes,
  InputConfigInterface,
} from '../types';
import { getObjectProperty } from '@azlabsjs/js-object';

function isValidHttpUrl(uri: string) {
  try {
    const url = new URL(uri);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

/**
 * @internal
 * @description Build checkbox options from generic object returned by
 * the options configuration loader
 *
 * @param values
 */
export function basicInputOptions(values: string[] | string) {
  const _values =
    typeof values === 'string' ? values.split('|') : (values as string[]);
  return _values?.map((current) => {
    if (current.indexOf(':') !== -1) {
      const state = current.split(':');
      return {
        value: state[0].trim(),
        description: state[1].trim(),
        name: state[1].trim(),
      } as InputOption;
    } else {
      return {
        value: isNaN(+current.trim()) ? current.trim() : +current.trim(),
        description: current.trim(),
        name: current.trim(),
      } as InputOption;
    }
  });
}

export function createInputOptionsFromList(
  input: InputConfigInterface,
  source: string[] | string
) {
  switch (input.type) {
    case InputTypes.CHECKBOX_INPUT:
    case InputTypes.RADIO_INPUT:
    case InputTypes.SELECT_INPUT:
      return basicInputOptions(source);
    default:
      return [];
  }
}

export function createInputOptionsFromQueryResult(
  input: OptionsInputConfigInterface,
  values: { [prop: string]: any }[]
) {
  const optionsConfig = input.optionsConfig;
  if (typeof optionsConfig === 'undefined' || optionsConfig === null) {
    return [];
  }
  return values
    ? values.map((current) => {
        return {
          value: getObjectProperty(
            current,
            optionsConfig.definitions?.keyBy || ''
          ),
          description: getObjectProperty(
            current,
            optionsConfig.definitions?.valueBy || ''
          ),
          name: getObjectProperty(
            current,
            optionsConfig.definitions?.valueBy || ''
          ),
          type:
            optionsConfig.definitions?.groupBy &&
            optionsConfig.definitions?.keyBy !==
              optionsConfig.definitions?.groupBy &&
            optionsConfig.definitions?.valueBy !==
              optionsConfig.definitions?.groupBy
              ? current[optionsConfig.definitions?.groupBy]
              : undefined,
        } as InputOption;
      })
    : [];
}

// @internal
function createOptionsConfigFromDefinitions(definition: string) {
  const components = definition.split('|') || [];
  //#region Initialize components
  let keyBy!: string;
  let groupBy!: string;
  let valueBy!: string;
  let collection!: string;
  let model!: string;
  //#endregion Initialiaze components
  for (const component of components) {
    if (component.match(/keyfield:/)) {
      keyBy = component.replace('keyfield:', '');
      continue;
    }
    if (component.match(/valuefield:/)) {
      valueBy = component.replace('valuefield:', '');
      continue;
    }

    if (component.match(/groupfield:/)) {
      groupBy = component.replace('groupfield:', '');
    }

    if (component.match(/table:/)) {
      collection = component.replace('table:', '');
    }

    if (component.match(/model:/)) {
      model = component.replace('model:', '');
    }
  }
  return {
    definitions: {
      keyBy,
      valueBy,
      groupBy,
    } as OptionsConfigDefinition,
    source: {
      collection,
      model,
    } as ComposedOptionsConfigSource,
  } as OptionsConfig;
}

function createOptionsConfigFromDefault(definition: string) {
  return {
    definitions: {
      groupBy: 'id',
      valueBy: 'label',
      keyBy: 'id',
    },
    source: {
      collection: definition,
    },
  } as OptionsConfig;
}

export function createOptionsConfig(source: Partial<ControlInterface>) {
  // Compile for deprecated properties definition

  const optionsConfig =
    source.selectableModel ??
    source.optionsConfig ??
    source.selectableValues ??
    undefined;
  if (typeof optionsConfig === 'undefined' || optionsConfig === null) {
    return undefined;
  }

  // Case an HTTP url is configured as option config definition
  if (isValidHttpUrl(optionsConfig)) {
    return createOptionsConfigFromDefault(optionsConfig);
  }

  // Case option configuration is configured on a model based configuration
  if (optionsConfig.match(/table:/) && optionsConfig.match(/keyfield:/)) {
    return createOptionsConfigFromDefinitions(optionsConfig);
  }

  // Default case
  return createOptionsConfigFromDefault(optionsConfig);
}

/**
 * Creates an instance of {@see OptionsInputConfigInterface} interface
 *
 * @param source
 */
export function buildSelectableInput(source: Partial<ControlInterface>) {
  const options = source.options || [];
  const optionsConfig = createOptionsConfig(source);
  return {
    ...buildBase(source),
    optionsConfig: options.length > 0 ? undefined : optionsConfig,
    requiredIf: buildRequiredIfConfig(source.requiredIf ?? ''),
    rules: {
      isRequired: Boolean(source.required),
    },
    options,
  } as OptionsInputConfigInterface;
}
