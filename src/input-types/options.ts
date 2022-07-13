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

/**
 * @internal
 * @description Build checkbox options from generic object returned by
 * the options configuration loader
 *
 * @param values
 */
function checkboxInputOptions(values: string[]) {
  return values?.map((current, index) => {
    if (current.indexOf(':') !== -1) {
      const state = current.split(':');
      return {
        value: state[0].trim(),
        checked: index === 0,
        description: state[1].trim(),
      };
    } else {
      return {
        value: isNaN(+current.trim()) ? current.trim() : +current.trim(),
        checked: index === 0,
        description: current.trim(),
      };
    }
  });
}

// @internal
/**
 * @description Build a radio input configuration from a list of options
 *
 * @param values
 */
function radioInputOptions(values: string[]) {
  return values.map((current, index) => {
    if (current.indexOf(':') !== -1) {
      const state = current.split(':');
      return {
        value: state[0].trim(),
        checked: index === 0,
        description: state[1].trim(),
      };
    } else {
      return {
        value: isNaN(+current.trim()) ? current.trim() : +current.trim(),
        checked: index === 0,
        description: current.trim(),
      };
    }
  });
}

// @internal
/**
 * @description Build select option config from generic option configuration
 * returned the option values configuration loader loader
 *
 * @param values
 */
function selectInputOptions(values: string[]) {
  return values.map((current: string) => {
    if (current.indexOf(':') !== -1) {
      const state = current.split(':');
      return {
        value: state[0].trim(),
        name: state[1].trim(),
        description: state[1].trim(),
      } as InputOption;
    } else {
      return {
        value: isNaN(+current.trim()) ? current.trim() : +current.trim(),
        name: current.trim(),
        description: current.trim(),
      } as InputOption;
    }
  });
}

export function createInputOptionsFromList(
  input: InputConfigInterface,
  source: string[]
) {
  switch (input.type) {
    case InputTypes.CHECKBOX_INPUT:
      return checkboxInputOptions(source);
    case InputTypes.RADIO_INPUT:
      return radioInputOptions(source);
    case InputTypes.SELECT_INPUT:
      return selectInputOptions(source);
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

function createOptionsConfig(source: Partial<ControlInterface>) {
  // Compile for deprecated properties definition
  if (
    typeof source.selectableModel !== 'undefined' &&
    source.selectableModel !== null
  ) {
    return createOptionsConfigFromDefinitions(source.selectableModel ?? '');
  }

  if (
    typeof source.optionsConfig !== 'undefined' &&
    source.optionsConfig !== null
  ) {
    return createOptionsConfigFromDefinitions(source.optionsConfig ?? '');
  }

  return {
    definitions: {
      groupBy: 'id',
      valueBy: 'label',
      keyBy: 'id',
    },
    source: source.selectableValues,
  } as OptionsConfig;
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
