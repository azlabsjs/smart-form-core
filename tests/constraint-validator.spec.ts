import {
  createExistsConstraint,
  createUniqueConstraint,
} from '../src';

const _object = {
  age: 32,
  name: 'John doe',
  email: 'azandrewdevelopper@gmail.com',
};

describe('Constraints validator', () => {
  it('should test createExistsConstraint returns true if value resolver returns a value', async () => {
    const valueResolver$ = () => _object;
    const validator$ = createExistsConstraint();
    const _result = await validator$(valueResolver$);
    expect(_result).toBe(true);
  });

  it('should test createExistsConstraint returns true if value resolver returns a promise of value', async () => {
    const valueResolver$ = () => new Promise((_resolve) => _resolve(_object));
    const validator$ = createExistsConstraint();
    const _result = await validator$(valueResolver$);
    expect(_result).toBe(true);
  });

  it('should test createExistsConstraint returns true if value resolver returns a promise of value that passes conditions', async () => {
    const valueResolver$ = () => new Promise((_resolve) => _resolve(_object));
    const validator$ = createExistsConstraint(['{age}.gte(32);{name}.regex(John);{email}.regex(\\w+@gmail.com)']);
    const _result = await validator$(valueResolver$);
    expect(_result).toBe(true);
  });

  it('should test createExistsConstraint returns false if value resolver returns a promise of value that does not pass conditions', async () => {
    const valueResolver$ = () => new Promise((_resolve) => _resolve(_object));
    const validator$ = createExistsConstraint(['{age}.gte(32);{name}.regex(John);{email}.regex(\\w+@hotmail.com)']);
    const _result = await validator$(valueResolver$);
    expect(_result).toBe(false);
  });

  it('should test createUniqueConstraint returns false if value resolver returns a value', async () => {
    const valueResolver$ = () => _object;
    const validator$ = createUniqueConstraint();
    const _result = await validator$(valueResolver$);
    expect(_result).toBe(false);
  });

  it('should test createUniqueConstraint returns false if value resolver returns a promise of value', async () => {
    const valueResolver$ = () => new Promise((_resolve) => _resolve(_object));
    const validator$ = createUniqueConstraint();
    const _result = await validator$(valueResolver$);
    expect(_result).toBe(false);
  });

  it('should test createUniqueConstraint returns true if value resolver returns null or undefined', async () => {
    const valueResolver$ = () => new Promise((_resolve) => _resolve(null));
    const validator$ = createUniqueConstraint();
    const _result = await validator$(valueResolver$);
    expect(_result).toBe(true);
  });

  it('should test createUniqueConstraint returns false if value resolver returns a promise of value that passes conditions', async () => {
    const valueResolver$ = () => new Promise((_resolve) => _resolve(_object));
    const validator$ = createUniqueConstraint(['{age}.gte(32);{name}.regex(John);{email}.regex(\\w+@gmail.com)']);
    const _result = await validator$(valueResolver$);
    expect(_result).toBe(false);
  });

  it('should test createUniqueConstraint returns true if resolver returns a promise of value that does not pass conditions', async () => {
    const valueResolver$ = () => new Promise((_resolve) => _resolve(_object));
    const validator$ = createUniqueConstraint(['{age}.gte(32);{name}.regex(John);{email}.regex(\\w+@hotmail.com)']);
    const _result = await validator$(valueResolver$);
    expect(_result).toBe(true);
  });
});
