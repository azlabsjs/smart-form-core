/** converts expression into a 1 dimensional list of expressions */
function flattenExpression(expression: string | string[]) {
  const _expression = Array.isArray(expression) ? expression : [expression];
  return _expression.reduce((carry, current) => {
    return carry.concat(...current.split(';'));
  }, [] as string[]);
}

/**
 * create an evaluation function that join conditions using `and` operator.
 * The evaluation returns true if all conditions returns true
 */
export function createLogicalAnd(expression: string | string[]) {
  return createEvalCall(expression, false);
}

/**
 *  create an evaluation function that join conditions using `or` operator
 *  The evaluation returns true if one of the conditions returns true
 */
export function createLogicalOr(expression: string | string[]) {
  return createEvalCall(expression, true);
}

/** create a condition evaluation function on object properties */
function createEvalCall(expression: string | string[], or = false) {
  return <T extends Record<string, unknown> = Record<string, unknown>>(
    memory: T,
    getValueFn?: (v: T, p: keyof T) => unknown
  ) => {
    // case the memory is not defined, we simply return false
    if (!memory) {
      return false;
    }

    getValueFn =
      getValueFn ??
      ((_object, prop) => {
        return _object[prop];
      });

    const EXPRESSIONS = {
      '.=': (a: string | number, b: string | number) => {
        return a === b;
      },
      '.<=': (a: string | number, b: string | number) => {
        return a <= b;
      },
      '.>=': (a: string | number, b: string | number) => {
        return a >= b;
      },
      '.<': (a: string | number, b: string | number) => {
        return a < b;
      },
      '.>': (a: string | number, b: string | number) => {
        return a > b;
      },
      '.eq': (a: string | number, b: string | number) => {
        return a === b;
      },
      '.lte': (a: string | number, b: string | number) => {
        return a <= b;
      },
      '.gte': (a: string | number, b: string | number) => {
        return a >= b;
      },
      '.lt': (a: string | number, b: string | number) => {
        return a < b;
      },
      '.gt': (a: string | number, b: string | number) => {
        return a > b;
      },
      '.regex': (a: string, pattern: string) => {
        return null !== a.match(pattern);
      },
    };

    const expressions = flattenExpression(expression);
    let result = or === true ? false : true;
    for (const expr of expressions) {
      const index = expr.indexOf('}');
      if (index === -1) {
        throw new Error('invalid expression');
      }
      const prop = expr.substring(0, index).replace(/(\})|(\{)/, '');
      let cond = expr.substring(index + 1);
      let negate = false;
      if (cond.trim().startsWith('.not')) {
        negate = true;
        const exceptnot = cond.substring('.not'.length + 1).trim();
        cond = exceptnot.substring(0, exceptnot.length - 1);
        cond = cond.startsWith('.') ? cond : `.${cond}`;
      }
      if (!cond.startsWith('.')) {
        throw new Error(
          'expression error, condition syntax is invalid. Expect: .operator(value) where operator in [=,>,<,>=,<=,lt,gt,lte,gte,eq,regex]'
        );
      }
      for (const op of Object.keys(EXPRESSIONS)) {
        if (cond.startsWith(`${op}(`)) {
          const propValue = getValueFn(memory, prop);
          const v = cond.replace(new RegExp(`(${op}\\()|(\\))`, 'g'), '');
          const typeofVal = typeof propValue;
          const _a = (
            typeofVal !== 'string' && typeofVal !== 'number'
              ? JSON.stringify(propValue)
              : propValue
          ) as string;
          const _b = (typeofVal === 'number' ? Number(v) : v) as string;
          const _operator = op as keyof typeof EXPRESSIONS;
          const _expressionResult = EXPRESSIONS[_operator](_a, _b);
          result = negate ? !_expressionResult : _expressionResult;
          break;
        }
      }
      // when the result evaluates to false, we drop from the context, as it's an and evaluation
      if (
        (or === true && result === true) ||
        (or === false && result === false)
      ) {
        break;
      }
    }
    return result;
  };
}
