import { getObjectProperty } from '@azlabsjs/js-object';
import { ControlInterface } from '../compact';
import { isValidHttpUrl } from '../helpers';
import { buildRequiredIfConfig } from '../helpers/builders';
import {
  InputOption,
  OptionsConfig,
  OptionsConfigParams,
  OptionsConfigSource,
  OptionsInputConfigInterface as OptionsInput
} from '../types';
import { buildBase } from './base';

type UIPropertiesType = { keyBy: string; groupBy?: string; valueBy: string };

// @internal
function createOptionsConfigFromDefinitions(
  raw: string,
  properties: UIPropertiesType
) {
  const components = raw.split('|') || [];
  //#region Initialize components
  // By default we use id for item key property and label for their value property
  let { keyBy, groupBy, valueBy } = properties;
  let resource!: string;
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
      raw,
    } as OptionsConfigSource,
  } as OptionsConfig;
}

/**
 * @internal
 */
function createOptionsConfigFromDefault(
  raw: string,
  properties: UIPropertiesType
) {
  return {
    params: properties,
    source: {
      resource: raw,
      raw: raw,
    },
  } as OptionsConfig;
}

// @internal
export function createOptionsConfig(source: Partial<ControlInterface>) {
  // Compile for deprecated properties definition

  //#region Variables initialization
  const optionsConfig =
    source.selectableModel ??
    source.optionsConfig ??
    source.selectableValues ??
    undefined;
  const uiProperties = {
    keyBy: source?.keyfield ?? 'id',
    groupBy: source.groupfield,
    valueBy: source?.valuefield ?? 'label',
  };
  //#endregion Variables initialization

  if (typeof optionsConfig === 'object' && optionsConfig !== null) {
    return optionsConfig as OptionsConfig;
  }
  if (typeof optionsConfig === 'undefined' || optionsConfig === null) {
    return undefined;
  }
  // Case an HTTP url is configured as option config definition
  if (isValidHttpUrl(optionsConfig)) {
    return createOptionsConfigFromDefault(optionsConfig, uiProperties);
  }
  // Case option configuration is configured on a model based configuration
  if (optionsConfig.match(/table:/) && optionsConfig.match(/keyfield:/)) {
    return createOptionsConfigFromDefinitions(optionsConfig, uiProperties);
  }
  // Default case
  return createOptionsConfigFromDefault(optionsConfig, uiProperties);
}

/**
 * @internal
 *
 * Creates an instance of {@see OptionsInputConfigInterface} interface
 *
 * @param source
 */
export function buildSelectableInput(source: ControlInterface) {
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

// @internal
export function mapIntoInputOptions(
  optionsConfig: OptionsConfig,
  values: Record<string, any>[]
) {
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

//@internal
export function mapStringListToInputOptions(values: string[] | string) {
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
