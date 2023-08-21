import {
  buildBase,
  buildDateInput,
  buildFileInput,
  buildNumberInput,
  buildTextAreaInput,
  buildTextInput,
  buildTimeInput,
} from '../src/input-types';

describe('Constraints builder tests', () => {
  it('should add default constraint if configuration provided', () => {
    const input = buildBase({
      id: 1,
      controlName: 'my-control',
      type: 'text',
      required: true,
      disabled: true,
      readonly: true,
      unique: true,
      uniqueOn: 'https://127.0.0.1:8200/api/users',
      controlIndex: 1,
      equals: 'my-control-2',
    });

    expect(input.constraints).not.toBeUndefined();
    expect(input.constraints).not.toBeNull();
    expect(typeof input.constraints).toBe('object');
    expect(input.constraints?.required).toBe(true);
    expect(input.constraints?.disabled).toBe(true);
    expect(input.constraints?.unique?.fn).toBe(
      'https://127.0.0.1:8200/api/users'
    );
    expect(input.constraints?.equals?.fn).toBe('my-control-2');
  });

  it('should create a date input with min and max constraints', () => {
    const input = buildDateInput({
      id: 1,
      controlName: 'my-control',
      type: 'text',
      controlIndex: 1,
      minDate: '2023-08-21',
      maxDate: '2024-08-20',
    });

    expect(input.constraints?.required).toBe(false);
    expect(input.constraints?.min).toBe('2023-08-21');
    expect(input.constraints?.max).toBe('2024-08-20');
  });

  it('should create a file input with pattern constraints', () => {
    const input = buildFileInput({
      id: 1,
      controlName: 'my-control',
      type: 'text',
      controlIndex: 1,
      pattern: 'image/*',
    });

    expect(input.constraints?.required).toBe(false);
    expect(input.constraints?.pattern?.fn).toBe('image/*');
  });

  it('should create a number input with min and max constraints', () => {
    const input = buildNumberInput({
      id: 1,
      controlName: 'my-control',
      type: 'text',
      controlIndex: 1,
      required: true,
      min: 1,
      max: 99,
    });

    expect(input.constraints?.required).not.toBe(false);
    expect(input.constraints?.max).toBe(99);
    expect(input.constraints?.min).toBe(1);
  });

  it('should create a text input with the required constraints', () => {
    const input = buildTextInput({
      id: 1,
      controlName: 'my-control',
      type: 'text',
      controlIndex: 1,
      required: true,
      min: 2,
      max: 255,
      pattern: '/d{1,}/',
    });

    expect(input.constraints?.required).not.toBe(false);
    expect(input.constraints?.max).toBe(255);
    expect(input.constraints?.min).toBe(2);
    expect(input.constraints?.pattern.fn).toBe('/d{1,}/');

    const input2 = buildTextInput({
      id: 1,
      controlName: 'my-control',
      type: 'email',
      controlIndex: 1,
    });

    expect(input2.constraints?.email).toBe(true);
  });

  it('should create a textarea input with maxLength constraint', () => {
    const input = buildTextAreaInput({
      id: 1,
      controlName: 'my-control',
      type: 'textarea',
      controlIndex: 1,
      required: true,
      max: 255,
    });

    expect(input.constraints?.required).not.toBe(false);
    expect(input.constraints?.max).toBe(255);
  });

  it('should create a time input with min and max constraint', () => {
    const input = buildTimeInput({
      id: 1,
      controlName: 'my-control',
      type: 'textarea',
      controlIndex: 1,
      required: true,
      min: '01:00',
      max: '12:00',
    });

    expect(input.constraints?.required).not.toBe(false);
    expect(input.constraints?.min).toBe('01:00');
    expect(input.constraints?.max).toBe('12:00');
  });
});
