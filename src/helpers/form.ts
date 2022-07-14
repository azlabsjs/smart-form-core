import { JSObject } from '@azlabsjs/js-object';
import { ControlInterface, FormInterface } from '../compact/types';
import { FormConfigInterface } from '../types';
import { createInput } from './input-types';
import { JSArray } from '@azlabsjs/collections';

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
        ? JSArray.sort(controls.map(createInput), 'index', 1)
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

// @internal
// Set child controls of a given control group
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

// @internal
// Sort form control by their index
export function sortControlsBy(
  controls: ControlInterface[],
  property: keyof ControlInterface,
  order = 1
) {
  return JSArray.sort(controls, property, order);
}
