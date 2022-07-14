function getConfigValues(config: string) {
  // Split using | operator if it was used
  if (config.indexOf('|') !== -1) {
    return config.split('|');
  }

  // Split using , if it was used
  if (config.indexOf(',') !== -1) {
    return config.split(',');
  }

  // Split using ; operator if it was used
  if (config.indexOf(';') !== -1) {
    return config.split(';');
  }

  return [config];
}

// @internal
function transform(values: string[]) {
  // Map each value of the list and return a valid js value type
  //
  return values.map((state) => {
    if (
      state === 'NULL' ||
      state === 'null' ||
      state === 'undefined' ||
      state === 'UNDEFINED'
    ) {
      return undefined;
    }
    if (state === 'true' || state === 'TRUE') {
      return true;
    }

    if (state === 'false' || state === 'FALSE') {
      return false;
    }
    return state;
  });
}

// @internal
// Used this function to parse and transform requiredIf configuration
// string
export function buildRequiredIfConfig(config: string) {
  if (config?.indexOf(':') === -1) {
    return undefined;
  }
  // split the string into the two parts
  const parts = config.split(':');
  let values: (string | undefined | number | boolean)[] = [];
  const result = transform(getConfigValues(parts[1]));
  for (const part of result) {
    values = [...values, part];
  }
  return {
    name: parts[0].trim(),
    values,
  };
}
