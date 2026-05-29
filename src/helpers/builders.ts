/** @internal */
function getConfigValues(config: string) {
  if (config.indexOf('|') !== -1) {
    return config.split('|');
  }

  if (config.indexOf(',') !== -1) {
    return config.split(',');
  }

  if (config.indexOf(';') !== -1) {
    return config.split(';');
  }

  return [config];
}

/** @internal */
function transform(values: string[]) {
  return values.map((state) => {
    if (state === 'NULL' || state === 'null' || state === 'undefined' || state === 'UNDEFINED') {
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
export function buildRequiredIfConfig(config: string) {
  if (config?.indexOf(':') === -1) {
    return undefined;
  }

  const parts = config.split(':');
  let values: (string | undefined | number | boolean)[] = [];
  const result = transform(getConfigValues(parts[1]));
  for (const part of result) {
    values = [...values, part];
  }

  return { name: parts[0].trim(), values };
}
