import { JSObject } from '@azlabsjs/js-object';
import { ControlInterface, FormInterface } from '../compact/types';
import { FormConfigInterface } from '../types';
import { createInput } from './input-types';

function sort<T>(
  list: T[],
  path?: string[] | string | ((a: T, b: T) => number),
  order = 1
) {
  order = order ?? 1;
  // Check if is not null
  if (typeof list === 'undefined' || list === null) {
    return [];
  }
  if (typeof path === 'function') {
    return [...list].sort(path);
  }

  if (typeof path === 'undefined' || path === null) {
    return [...list].sort((a, b) => (a > b ? order : order * -1));
  }

  return [...list].sort((a: any, b: any) => {
    // We go for each property followed by path
    if (path instanceof Array) {
      path.forEach((property) => {
        a = a[property];
        b = b[property];
      });
    } else {
      a = a[path];
      b = b[path];
    }
    // order * (-1): We change our order
    // Compare dates
    if (Date.parse(a as string) && Date.parse(b as string)) {
      a = new Date(a as string);
      b = new Date(b as string);
    }
    return a > b ? order : order * -1;
  });
}

// @internal
// Helper function for creating form objects from a server object definition
export function buildFormSync(instance: FormInterface) {
  if (typeof instance === 'undefined' || instance === null) {
    return undefined;
  }
  const { id, title, description, controls, url } = instance;
  return {
    id,
    title,
    description,
    endpointURL: url,
    controlConfigs:
      Array.isArray(controls) && controls?.length !== 0
        ? sort(controls.map(createInput), 'index', 1)
        : [],
  };
}

// # Forms Creators

/**
 * @description Creates a deep copy of the dynamic form object
 */
export const cloneform = (form: FormConfigInterface) =>
  JSObject.cloneDeep(form) as FormConfigInterface;

/**
 * @description Helper method for creating a new dynmaic form
 * @param form Object with the shape of the FormConfigInterface interface
 */
export function createform(form: FormConfigInterface) {
  return { ...form } as FormConfigInterface;
}

// @internal
// Create a new dynamic form from a copy of the user provided parameter
export function copyform(form: FormConfigInterface) {
  return JSObject.cloneDeep(form);
}

// #Forms Soring function

// @internal
// Sort form loaded from backend server by control index
export const sortRawFormControls = (value: FormInterface) => {
  return {
    ...value,
    controls: sortControlsBy(value.controls ?? [], 'controlIndex', 1),
  } as FormInterface;
};

//@internal
// Group controls by property of the control interface type
export function groupControlsBy(
  controls: ControlInterface[],
  property: keyof ControlInterface
) {
  return controls.reduce((carry, current) => {
    const key = (current[property] ?? 'root') as string;
    if (!carry[key]) {
      carry[key] = [];
    }
    carry[key].push(current);
    return carry;
  }, {} as { [index: string]: any });
}

/**
 * @internal
 */
export function setControlChildren(value: FormInterface) {
  return function (
    groupBy: (
      values: ControlInterface[],
      property: keyof ControlInterface
    ) => { [index: string]: ControlInterface[] }
  ) {
    const controls = groupBy(value.controls, 'controlGroupKey');
    const values = sortControlsBy(controls['root'] ?? [], 'controlIndex').map(
      (current) => {
        return {
          ...current,
          children: sortControlsBy(
            Array.from(
              new Set([
                ...(current.children ?? []),
                ...(controls[current['id']] ?? []),
              ])
            ),
            'controlIndex'
          ),
        };
      }
    );
    return { ...value, controls: values };
  };
}

/**
 * @internal
 */
export function sortControlsBy(
  controls: ControlInterface[],
  property: keyof ControlInterface,
  order = 1
) {
  return sort(controls, property, order);
}
