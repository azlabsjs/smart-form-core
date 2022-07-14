import { buildBase } from './base';
import { ControlInterface } from '../compact';
import { buildRequiredIfConfig } from '../helpers/builders';
import {
  OptionsConfigSource,
  OptionsConfigParams,
  OptionsInputConfigInterface as OptionsInput,
  OptionsConfig,
  InputOption,
  InputTypes,
  InputConfigInterface,
} from '../types';
import { getObjectProperty } from '@azlabsjs/js-object';
import { isValidHttpUrl } from '../helpers/http';

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

/**
 * @internal
 *
 * @param input
 * @param source
 */
export function mapStringListToInputOptions(
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

// @internal
function createOptionsConfigFromDefinitions(raw: string) {
  const components = raw.split('|') || [];
  //#region Initialize components
  let keyBy!: string;
  let groupBy!: string;
  let valueBy!: string;
  let resource!: string;
  let type!: string;
  let filters!: string;
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
      continue;
    }

    if (component.match(/table:/)) {
      resource = component.replace('table:', '');
      continue;
    }

    if (component.match(/model:/)) {
      type = component.replace('model:', '');
      continue;
    } //
    if (component.match(/filters:/)) {
      filters = component.replace('filters:', '');
      continue;
    }
  }
  return {
    params: {
      keyBy,
      valueBy,
      groupBy,
      filters,
    } as OptionsConfigParams,
    source: {
      resource,
      type,
      raw,
    } as OptionsConfigSource,
  } as OptionsConfig;
}

// @internal
function createOptionsConfigFromDefault(definition: string) {
  return {
    params: {
      groupBy: 'id',
      valueBy: 'label',
      keyBy: 'id',
    },
    source: {
      resource: definition,
    },
  } as OptionsConfig;
}

// @internal
export function createOptionsConfig(source: Partial<ControlInterface>) {
  // Compile for deprecated properties definition

  const optionsConfig =
    source.selectableModel ??
    source.optionsConfig ??
    source.selectableValues ??
    undefined;

  if (typeof optionsConfig === 'object' && optionsConfig !== null) {
    return optionsConfig as OptionsConfig;
  }

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
 * @internal
 *
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
  } as OptionsInput;
}

/**
 * @description Map list of record of string to any into an input option object type
 *
 * @param input
 * @param values
 */
export function mapIntoInputOptions(
  input: OptionsInput,
  values: Record<string, any>[]
) {
  const optionsConfig = input.optionsConfig;
  if (typeof optionsConfig === 'undefined' || optionsConfig === null) {
    return [];
  }
  return values
    ? values.map((current) => {
        return {
          value: getObjectProperty(current, optionsConfig.params?.keyBy || ''),
          description: getObjectProperty(
            current,
            optionsConfig.params?.valueBy || ''
          ),
          name: getObjectProperty(current, optionsConfig.params?.valueBy || ''),
          type:
            optionsConfig.params?.groupBy &&
            optionsConfig.params?.keyBy !== optionsConfig.params?.groupBy &&
            optionsConfig.params?.valueBy !== optionsConfig.params?.groupBy
              ? current[optionsConfig.params?.groupBy]
              : undefined,
        } as InputOption;
      })
    : [];
}
