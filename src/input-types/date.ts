import { ControlInterface } from '../compact/types';
import { DateInput, InputTypes } from '../types';
import { buildBase } from './base';

/** @description Date format constant */
const format = { year: 'numeric', month: '2-digit', day: '2-digit' } as any;

/** @description Today template identifiers constant */
const todayRef = ['now', 'today', 'TODAY', 'NOW'];

/** @internal */
type ToSecond = () => number;

/** @internal */
type HigherOrderToSecond = () => (_date: Date) => number;

/** @internal */
type ToSecondType = ToSecond | HigherOrderToSecond;

/**
 * @description Compute the boolean value from the value of the year
 * and return true if year is a leap year or false otherwise
 */
function isLeapYear(year: number) {
  return (0 == year % 4 && 0 != year % 100) || 0 == year % 400;
}

/** @description Custom date factory function */
function createDateValue(_value: string, _ref: string) {
  const _expression = _value.substring(_ref.length).trim();
  const _today = new Date();
  const computesecondsPerYr = (_date: Date) => (isLeapYear(_date.getFullYear()) ? 366 * 24 * 60 * 60 : 366 * 24 * 60 * 60);
  const _toSeconds: Record<string, ToSecondType> = {
      s: () => 1,
      sec: () => 1,
      secs: () => 1,
      seconds: () => 1,
      second: () => 1,
      min: () => 60,
      mins: () => 60,
      minutes: () => 60,
      minute: () => 60,
      h: () => 60 * 60,
      hrs: () => 60 * 60,
      hour: () => 60 * 60,
      hours: () => 60 * 60,
      d: () => 60 * 60 * 24,
      day: () => 60 * 60 * 24,
      days: () => 60 * 60 * 24,
      month: () => (_date: Date) => Math.floor(computesecondsPerYr(_date) / 12),
      months: () => (_date: Date) => Math.floor(computesecondsPerYr(_date) / 12),
      year: () => computesecondsPerYr,
      years: () => computesecondsPerYr,
  };

  if (_expression.length !== 0) {
      const _operator = _expression.substring(0, 1).trim();
      if (['+', '-'].indexOf(_operator) === -1) {
          throw new Error('Bad custom date format!');
      }
      const _timeUnitExpr = _expression.substring(1).trim();
      const _match = _timeUnitExpr.match(/(\d+)/);
      const numeric = _match ? _match[0] : undefined;
      const _timeUnit = numeric
          ? _timeUnitExpr.substring(numeric.length).trim()
          : _timeUnitExpr;
      const _fn = _toSeconds[_timeUnit] ?? (() => 0);
      const _fnResult = _fn();
      const _seconds = Number(numeric ?? 0) * (typeof _fnResult === 'function' ? _fnResult(_today) : _fnResult);
      _operator === '+'
          ? _today.setSeconds(_today.getSeconds() + _seconds)
          : _today.setSeconds(_today.getSeconds() - _seconds);
  }
  return _today.toLocaleDateString('en-US', format);
}

/** @description Creates an instance of the {@see DateInput} interface */
export function buildDateInput(source: ControlInterface) {
  const { min, max, minDate, maxDate, required } = source;
  const _min = min ?? minDate;
  const _max = max ?? maxDate;
  const _base = buildBase(source);
  const minIndex = todayRef.indexOf(String(_min));
  const maxIndex = todayRef.indexOf(String(_max));

  return {
    ..._base,
    // TODO: Remove the rules constraint in version 0.3.x
    rules: {
      isRequired: Boolean(required),
      maxDate: Boolean(_min),
      minDate: Boolean(_max),
    },
    type: InputTypes.DATE_INPUT,
    minDate:
      minIndex !== -1
        ? createDateValue(String(_min), todayRef[minIndex])
        : _min,
    maxDate:
      maxIndex !== -1
        ? createDateValue(String(_max), todayRef[maxIndex])
        : _max,
    currentDate: new Date().toLocaleDateString('en-US', format),
    inputFormat: 'dd/mm/yyyy',
    constraints: { ...(_base.constraints ?? {}), min: _min, max: _max },
  } as DateInput;
}
