import { ControlInterface, FormInterface } from '../compact/types';
import { FormConfigInterface } from '../types';
import { createInput } from './input-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnknownType = any;

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

  return [...list].sort((a: UnknownType, b: UnknownType) => {
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

/** @internal */
function sortBy(
  controls: ControlInterface[],
  property: keyof ControlInterface,
  order = 1
) {
  return sort(controls, property, order);
}

/** helper function for creating form objects from a server object definition */
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

/** Helper method for creating a new dynmaic form */
export function createform(form: FormConfigInterface) {
  return { ...form } as FormConfigInterface;
}

// #Forms Soring function

// @internal sort form loaded from backend server by control index
export const sortRawFormControls = (value: FormInterface) => {
  return {
    ...value,
    controls: sortBy(value.controls ?? [], 'controlIndex', 1),
  } as FormInterface;
};

/** group controls by property of the control interface type */
export function groupControlsBy(
  controls: ControlInterface[],
  property: keyof ControlInterface
) {
  return controls.reduce(
    (carry, current) => {
      const key = (current[property] ?? 'root') as string;
      if (!carry[key]) {
        carry[key] = [];
      }
      carry[key].push(current);
      return carry;
    },
    {} as { [index: string]: UnknownType }
  );
}

/** @internal */
export function setControlChildren(value: FormInterface) {
  return (
    groupBy: (
      values: ControlInterface[],
      property: keyof ControlInterface
    ) => { [index: string]: ControlInterface[] }
  ) => {
    const controls = groupBy(value.controls, 'controlGroupKey');
    const values = sortBy(controls['root'] ?? [], 'controlIndex').map(
      (current) => {
        return {
          ...current,
          children: sortBy(
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
