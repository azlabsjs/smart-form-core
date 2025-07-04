/** @description Converts expression into a 1 dimensional list of expressions */
function flattenExpression(expression: string | string[]) {
  const _expression = Array.isArray(expression) ? expression : [expression];
  return _expression.reduce((carry, current) => {
    return carry.concat(...current.split(';'));
  }, [] as string[]);
}

/**
 * @description Create an evaluation function that join conditions using `and` operator.
 * The evaluation returns true if all conditions returns true
 */
export function createLogicalAnd(expression: string | string[]) {
  return createEvalCall(expression, false);
}

/**
 *  @description Create an evaluation function that join conditions using `or` operator
 *  The evaluation returns true if one of the conditions returns true
 */
export function createLogicalOr(expression: string | string[]) {
  return createEvalCall(expression, true);
}

/** @description Create a condition evaluation function on object properties */
function createEvalCall(expression: string | string[], or = false) {
  return <T extends Record<string, unknown> = Record<string, unknown>>(
    memory: T,
    getValueFn?: (v: T, p: keyof T) => unknown
  ) => {
    // Case the memory is not defined, we simply return false
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

    const _expressions = flattenExpression(expression);
    let _result = or === true ? false : true;
    for (const _expression of _expressions) {
      const _propIndex = _expression.indexOf('}');
      if (_propIndex === -1) {
        throw new Error('Invalid expression');
      }
      const _prop = _expression
        .substring(0, _propIndex)
        .replace(/(\})|(\{)/, '');
      let _condition = _expression.substring(_propIndex + 1);
      let _negate = false;
      if (_condition.trim().startsWith('.not')) {
        _negate = true;
        const _exceptNot = _condition.substring('.not'.length + 1).trim();
        _condition = _exceptNot.substring(0, _exceptNot.length - 1);
        _condition = _condition.startsWith('.') ? _condition : `.${_condition}`;
      }
      if (!_condition.startsWith('.')) {
        throw new Error(
          'Expression error, condition syntax is invalid. Expect: .operator(value) where operator in [=,>,<,>=,<=,lt,gt,lte,gte,eq,regex]'
        );
      }
      for (const _op of Object.keys(EXPRESSIONS)) {
        if (_condition.startsWith(`${_op}(`)) {
          const propValue = getValueFn(memory, _prop);
          const _value = _condition.replace(
            new RegExp(`(${_op}\\()|(\\))`, 'g'),
            ''
          );
          const typeofVal = typeof propValue;
          const _a = (
            typeofVal !== 'string' && typeofVal !== 'number'
              ? JSON.stringify(propValue)
              : propValue
          ) as string;
          const _b = (
            typeofVal === 'number' ? Number(_value) : _value
          ) as string;
          const _operator = _op as keyof typeof EXPRESSIONS;
          const _expressionResult = EXPRESSIONS[_operator](_a, _b);
          _result = _negate ? !_expressionResult : _expressionResult;
          break;
        }
      }
      // when the result evaluates to false, we drop from the context, as it's an and evaluation
      if (
        (or === true && _result === true) ||
        (or === false && _result === false)
      ) {
        break;
      }
    }
    return _result;
  };
}
