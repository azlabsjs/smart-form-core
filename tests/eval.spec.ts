import { createLogicalAnd, createLogicalOr } from '../src';

describe('Evaluation implementation test', () => {
  it('should test createLogicalAnd returns true if none of the expressions returns false', () => {
    const _object = {
      age: 32,
      name: 'John doe',
      email: 'azandrewdevelopper@gmail.com',
    };

    const _fn = createLogicalAnd([
      '{age}.gte(32);{name}.regex(John);{email}.regex(\\w+@gmail.com)',
    ]);

    expect(_fn(_object)).toBe(true);
  });

  it('should test createLogicalAnd returns false if any of the expressions returns false', () => {
    const _object = {
      age: 32,
      name: 'John doe',
      email: 'azandrewdevelopper',
    };

    const _fn = createLogicalAnd([
      '{age}.gte(32);{name}.regex(John);{email}.regex(\\w+@gmail.com)',
    ]);

    expect(_fn(_object)).toBe(false);
  });

  it('should test createLogicalOr returns true if any of the expressions return true', () => {
    const _fn = createLogicalOr([
      `{grades}.eq(${JSON.stringify(['A', 'B', 'F'])});{name}.regex(Marylin)`,
    ]);
    const _student = {
      name: 'Rose Marylin',
      grades: ['A', 'B', 'E'],
    };
    expect(_fn(_student)).toBe(true);
  });

  it('should test createLogicalOr returns false if all expression returns false', () => {
    const _fn = createLogicalOr([
        `{grades}.eq(${JSON.stringify(['A', 'B', 'F'])});{name}.regex(Marylin)`,
      ]);
      const _student = {
        name: 'John Doe',
        grades: ['A', 'B', 'E'],
      };
      expect(_fn(_student)).toBe(false);
  });
});
