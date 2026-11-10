import { InputOption, ObservableOptionsConfig, OptionsConfig } from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnknownType = any;

/** @internal */
function getObjectProperty<T extends { [prop: string]: UnknownType }>(source: T, key?: string, seperator = '.') {
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
    const properties = key.split(seperator ?? '.');
    const current = source;

    return properties.reduce((carry, prop) => {
      if (carry) {
        carry = current !== null && !Array.isArray(current) && typeof current === 'object' && carry[prop] ? (carry[prop] ?? undefined) : undefined;
      }

      return carry;
    }, source);
  } else {
    return source ? source[key] : undefined;
  }
}


/** 
 * @deprecated use `{createOptions} instead`
 * @description map list of values to options input dictionary type declaration
 */
export function mapIntoInputOptions(config: OptionsConfig | ObservableOptionsConfig, values: Record<string, unknown>[]) {
  return createOptions(config, values);
}

/**
 * @deprecated use `{extractOptionsFromString}` instead
 * @description project string values to option input dictionary type declaration 
 */
export function mapStringListToInputOptions(p: string[] | string) {
  return extractOptionsFromString(p);
}


/** creates input options from a list of records */
export function createOptions(config: OptionsConfig | ObservableOptionsConfig, values: Record<string, unknown>[]) {
  const { params } = config;
  const { keyBy, valueBy, groupBy } = params ?? { keyBy: 'id', valueBy: 'label', groupBy: 'id' };

  return values ? values.map((current) => {
    return {
      value: getObjectProperty(current, keyBy),
      description: getObjectProperty(current, valueBy),
      name: getObjectProperty(current, valueBy),
      type: groupBy && keyBy !== groupBy && valueBy !== groupBy ? current[groupBy] : undefined,
    } as InputOption;
  }) : [];

}


/** creates list of options from a string template */
export function extractOptionsFromString(template: string[] | string) {
  const values = typeof template === 'string' ? template.split('|') : Array.isArray(template) ? template : [];
  return values.map((current) => {
    if (current.indexOf(':') !== -1) {
      const state = current.split(':');
      return { value: state[0].trim(), description: state[1].trim(), name: state[1].trim(), } as InputOption;
    } else {
      return { value: isNaN(+current.trim()) ? current.trim() : +current.trim(), description: current.trim(), name: current.trim() } as InputOption;
    }
  });
}