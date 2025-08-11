import { ControlInterface } from '../compact/types';
import { DateInput, InputTypes } from '../types';
import { buildBase } from './base';

/** @description Date format constant */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
 * @description compute the boolean value from the value of the year
 * and return true if year is a leap year or false otherwise
 */
function isLeapYear(year: number) {
  return (0 == year % 4 && 0 != year % 100) || 0 == year % 400;
}

/** custom date factory function */
function createDateValue(v: string, ref: string) {
  const expr = v.substring(ref.length).trim();
  const t = new Date();
  const computesecondsPerYr = (_date: Date) =>
    isLeapYear(_date.getFullYear()) ? 366 * 24 * 60 * 60 : 366 * 24 * 60 * 60;
  const tosecond: Record<string, ToSecondType> = {
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

  if (expr.length !== 0) {
    const _operator = expr.substring(0, 1).trim();
    if (['+', '-'].indexOf(_operator) === -1) {
      throw new Error('Bad custom date format!');
    }
    const timeunitexpr = expr.substring(1).trim();
    const _match = timeunitexpr.match(/(\d+)/);
    const numeric = _match ? _match[0] : undefined;
    const timeunit = numeric
      ? timeunitexpr.substring(numeric.length).trim()
      : timeunitexpr;
    const fn = tosecond[timeunit] ?? (() => 0);
    const fnresult = fn();
    const seconds =
      Number(numeric ?? 0) *
      (typeof fnresult === 'function' ? fnresult(t) : fnresult);
    if (_operator === '+') {
      t.setSeconds(t.getSeconds() + seconds);
    } else {
      t.setSeconds(t.getSeconds() - seconds);
    }
  }
  return t.toLocaleDateString('en-US', format);
}

/** creates an instance of the {@see DateInput} interface */
export function buildDateInput(source: ControlInterface) {
  const base = buildBase(source);

  const { min: minimum, max: maximum, minDate, maxDate, required } = source;
  let min = minimum ?? minDate;
  let max = maximum ?? maxDate;
  const minIndex = todayRef.indexOf(String(min));
  const maxIndex = todayRef.indexOf(String(max));

  min =
    minIndex !== -1 ? createDateValue(String(min), todayRef[minIndex]) : min;
  max =
    maxIndex !== -1 ? createDateValue(String(max), todayRef[maxIndex]) : max;

  return {
    ...base,
    // TODO: remove the rules constraint in version 0.3.x
    rules: {
      isRequired: Boolean(required),
      maxDate: Boolean(min),
      minDate: Boolean(max),
    },
    type: InputTypes.DATE_INPUT,
    minDate: min,
    maxDate: max,
    currentDate: new Date().toLocaleDateString('en-US', format),
    inputFormat: 'dd/mm/yyyy',
    constraints: { ...(base.constraints ?? {}), min, max },
  } as DateInput;
}
