import { ControlInterface } from '../compact';
import { isValidHttpUrl } from '../helpers/uri';
import {
  InputOption,
  ObservableOptionsConfig,
  OptionsConfig,
  OptionsConfigParams,
  OptionsConfigSource,
  OptionsInput,
} from '../types';
import { buildBase } from './base';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnknownType = any;

/** @internal */
type UIPropertiesType = { keyBy: string; groupBy?: string; valueBy: string };

/** @internal */
function getObjectProperty<T extends { [prop: string]: UnknownType }>(
  source: T,
  key?: string,
  seperator = '.'
) {
  if (
    key === '' ||
    typeof key === 'undefined' ||
    key === null ||
    typeof source === 'undefined' ||
    source === null
  ) {
    return source ?? undefined;
  }

  if (key.includes(seperator ?? '.')) {
    // Creates an array of inner properties
    const properties = key.split(seperator ?? '.');
    const current = source;
    // Reduce the source object to a single value
    return properties.reduce((carry, prop) => {
      if (carry) {
        carry =
          current !== null &&
          !Array.isArray(current) &&
          typeof current === 'object' &&
          carry[prop]
            ? (carry[prop] ?? undefined)
            : undefined;
      }
      return carry;
    }, source);
  } else {
    return source ? source[key] : undefined;
  }
}

/** @internal */
function valueOr<T>(str: T | undefined, d?: T): T {
  if (typeof str === 'string' && str.length === 0) {
    return d as T;
  }
  return (str ?? d) as T;
}

/** @internal */
function createOptionsConfigFromDefinitions(
  raw: string,
  properties: UIPropertiesType
) {
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

/** @internal */
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

/** @internal */
export function createOptionsConfig(source: Partial<ControlInterface>) {
  // compile for deprecated properties definition

  const config = valueOr(
    source.selectableModel,
    valueOr(source.optionsConfig, valueOr(source.selectableValues))
  );
  const uiProperties = {
    keyBy: valueOr(source?.keyfield, 'id'),
    groupBy: valueOr(source.groupfield),
    valueBy: valueOr(source?.valuefield, 'label'),
  };

  if (typeof config === 'object' && config !== null) {
    return config as OptionsConfig;
  }
  if (typeof config === 'undefined' || config === null) {
    return undefined;
  }

  if (isValidHttpUrl(config)) {
    return createOptionsConfigFromDefault(config, uiProperties);
  }

  if (config.match(/table:/) && config.match(/keyfield:/)) {
    return createOptionsConfigFromDefinitions(config, uiProperties);
  }

  return createOptionsConfigFromDefault(config, uiProperties);
}

/**  @internal creates an instance of {@see OptionsInput} interface */
export function buildSelectableInput(
  source: ControlInterface,
  type: 'radio' | 'checkbox' | 'select'
) {
  const { options, multiple, required } = source;
  const o = options ?? [];
  const config = createOptionsConfig(source);
  const _base = buildBase(source);
  return {
    ..._base,
    // TODO: remove the rules constraint in version 0.3.x
    rules: { isRequired: Boolean(required) },
    multiple: Boolean(multiple),
    type,
    optionsConfig: o.length > 0 ? undefined : config,
    options: o,
  } as OptionsInput;
}

/** @description map list of values to options input dictionary type declaration */
export function mapIntoInputOptions(
  config: OptionsConfig | ObservableOptionsConfig,
  values: Record<string, unknown>[]
) {
  const { params } = config;
  const { keyBy, valueBy, groupBy } = params ?? {
    keyBy: 'id',
    valueBy: 'label',
    groupBy: 'id',
  };

  return values
    ? values.map((current) => {
        return {
          value: getObjectProperty(current, keyBy),
          description: getObjectProperty(current, valueBy),
          name: getObjectProperty(current, valueBy),
          type:
            groupBy && keyBy !== groupBy && valueBy !== groupBy
              ? current[groupBy]
              : undefined,
        } as InputOption;
      })
    : [];
}

/** @description project string values to option input dictionary type declaration */
export function mapStringListToInputOptions(p: string[] | string) {
  const values =
    typeof p === 'string' ? p.split('|') : Array.isArray(p) ? p : [];
  return values.map((current) => {
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
