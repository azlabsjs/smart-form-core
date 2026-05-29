import { ControlInterface } from '../compact';
import { isValidHttpUrl } from '../helpers/uri';
import {
  InputOption,
  OptionsConfig,
  OptionsConfigParams,
  OptionsConfigSource,
  OptionsInputConfigInterface as OptionsInput,
} from '../types';
import { buildBase } from './base';

/** @internal */
type UIPropertiesType = { keyBy: string; groupBy?: string; valueBy: string };

/** @internal */
function getObjectProperty<T extends { [prop: string]: any }>(source: T, key: string, seperator = '.') {
  if (key === '' || typeof key === 'undefined' || key === null || typeof source === 'undefined' || source === null) {
    return source ?? undefined;
  }

  if (key.includes(seperator ?? '.')) {
    const properties = key.split(seperator ?? '.');
    const current = source;

    return properties.reduce((carry, prop) => {
      if (carry) {
        carry = current !== null && !Array.isArray(current) && typeof current === 'object' && carry[prop] ? carry[prop] ?? undefined : undefined;
      }

      return carry;
    }, source);
  } else {
    return source ? source[key] : undefined;
  }
}

/** @internal */
function valueOr<T>(str: T | undefined, default$?: any) {
  if (typeof str === 'string' && str.length === 0) {
    return default$;
  }
  return str ?? default$;
}

/** @internal */
function optionsConfigFromRegex(raw: string, properties: UIPropertiesType) {
  const components = raw.split('|') || [];

  let { keyBy, groupBy, valueBy } = properties;
  let resource!: string;
  let filters!: string;

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
  return { params: { keyBy, valueBy, groupBy, filters } as OptionsConfigParams, source: { resource, raw } as OptionsConfigSource } as OptionsConfig;
}

/** @internal */
function configsFromUrl(raw: string, properties: UIPropertiesType) {
  return { params: properties, source: { resource: raw, raw: raw } } as OptionsConfig;
}

/** @internal */
export function createOptionsConfig(source: Partial<ControlInterface>) {
  const optionsConfig = valueOr(source.selectableModel, valueOr(source.optionsConfig, valueOr(source.selectableValues)));
  const uiProperties = { keyBy: valueOr(source?.keyfield, 'id'), groupBy: valueOr(source.groupfield), valueBy: valueOr(source?.valuefield, 'label') };

  if (typeof optionsConfig === 'object' && optionsConfig !== null) {
    return optionsConfig as OptionsConfig;
  }

  if (typeof optionsConfig === 'undefined' || optionsConfig === null) {
    return undefined;
  }

  if (isValidHttpUrl(optionsConfig)) {
    return configsFromUrl(optionsConfig, uiProperties);
  }

  if (optionsConfig.match(/table:/) && optionsConfig.match(/keyfield:/)) {
    return optionsConfigFromRegex(optionsConfig, uiProperties);
  }

  return configsFromUrl(optionsConfig, uiProperties);
}

/**  @internal creates an instance of {@see OptionsInputConfigInterface} interface */
export function buildSelectableInput(source: ControlInterface, type: 'radio' | 'checkbox' | 'select') {
  const { options, multiple, required } = source;
  const _options = options ?? [];
  const optionsConfig = createOptionsConfig(source);
  const _base = buildBase(source);
  return {
    ..._base,
    // TODO: Remove the rules constraint in version 0.3.x
    rules: { isRequired: Boolean(required) },
    multiple: Boolean(multiple),
    type,
    optionsConfig: _options.length > 0 ? undefined : optionsConfig,
    options: _options,
  } as OptionsInput;
}

/** @description map list of values to options input dictionary type declaration */
export function mapIntoInputOptions(optionsConfig: OptionsConfig, values: Record<string, any>[]) {
  return values ? values.map((current) => {
    return {
      value: getObjectProperty(current, optionsConfig.params?.keyBy || ''),
      description: getObjectProperty(current, optionsConfig.params?.valueBy || ''),
      name: getObjectProperty(current, optionsConfig.params?.valueBy || ''),
      type: optionsConfig.params?.groupBy && optionsConfig.params?.keyBy !== optionsConfig.params?.groupBy && optionsConfig.params?.valueBy !== optionsConfig.params?.groupBy ? current[optionsConfig.params?.groupBy] : undefined,
    } as InputOption;
  }) : [];
}

/** @description project string values to option input dictionary type declaration */
export function mapStringListToInputOptions(values: string[] | string) {
  const _values =
    typeof values === 'string' ? values.split('|') : (values as string[]);
  return _values?.map((current) => {
    if (current.indexOf(':') !== -1) {
      const state = current.split(':');
      return { value: state[0].trim(), description: state[1].trim(), name: state[1].trim(), } as InputOption;
    } else {
      return {
        value: isNaN(+current.trim()) ? current.trim() : +current.trim(),
        description: current.trim(),
        name: current.trim(),
      } as InputOption;
    }
  });
}
