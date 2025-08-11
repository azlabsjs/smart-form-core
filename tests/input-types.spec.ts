import {
  buildBase,
  buildDateInput,
  buildFileInput,
  buildHiddenInput,
  buildNumberInput,
  buildTextInput,
  buildTimeInput,
} from '../src/inputs';
import { InputTypes } from '../src/types';
import {
  birthDate,
  computableInput,
  descriptionText,
  profileImage,
  startTime,
  totalNumber,
  userSelect,
} from './inputs';

// formId?: number;
describe('Test input types builder functions', () => {
  it('should test build base type function', () => {
    const input = buildBase(userSelect);
    expect(input.classes).toEqual('clr-input');
    expect(input.index).toEqual(1);
    expect(input.name).toBe('user');
    expect(input.isRepeatable).toEqual(false);
    expect(input.placeholder).toBe('...');
    expect(input.hidden).toEqual(false);
    expect(input.disabled).toEqual(false);
    expect(input.description).toEqual(undefined);
  });

  it('should test build date input', () => {
    const input = buildDateInput(birthDate);
    expect(input.classes).toEqual('clr-input');
    expect(input.index).toEqual(3);
    expect(input.name).toBe('birthdate');
    expect(input.containerClass).toEqual('clr-col-sm-12 clr-col-md-6');
    expect(input.minDate).toEqual('1994-05-10');
    expect(input.maxDate).toBe(
      new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    );
    expect(input.type).toBe(InputTypes.DATE_INPUT);
  });

  it('should build a file input', () => {
    const input = buildFileInput(profileImage);
    expect(input.type).toBe(InputTypes.FILE_INPUT);
    expect(input.uploadUrl).toEqual(
      'https://storage.lik.tg/api?name=cjhi783r2398h9r2yi2bccwhiuwc'
    );
    expect(input.read).toBe('id');
  });

  it('should build a hidden input', () => {
    const input = buildHiddenInput({
      id: 10,
      controlName: 'hidden-control',
      type: InputTypes.HIDDEN_INPUT,
      value: 'Hello world',
    });
    expect(input.type).toBe(InputTypes.HIDDEN_INPUT);
    expect(input.hidden).toEqual(true);
    expect(input.value).toEqual('Hello world');
  });

  it('should build a number input', () => {
    const input = buildNumberInput(totalNumber);
    expect(input.type).toEqual(InputTypes.NUMBER_INPUT);
    expect(input.min).toEqual(2);
    expect(input.rules?.min).toBe(true);
    expect(input.rules?.max).toBe(false);
  });

  it('should build a text input', () => {
    const input = buildTextInput(descriptionText);
    expect(input.type).toEqual(InputTypes.TEXT_INPUT);
    expect(input.minLength).toEqual(2);
    expect(input.maxLength).toEqual(255);
    expect(input.rules?.minLength).toBe(true);
    expect(input.rules?.maxLength).toBe(true);
  });

  it('should build a time input', () => {
    const input = buildTimeInput(startTime);
    expect(input.type).toEqual(InputTypes.TIME_INPUT);
    expect(input.min).toEqual('08:00'); //
    expect(input.max).toEqual('10:00');
    expect(input.rules?.min).toBe(true);
    expect(input.rules?.max).toBe(true);
  });

  it('should build mark input as disabled if compte property is provided', () => {
    const input = buildNumberInput(computableInput);
    expect(input.type).toEqual(InputTypes.NUMBER_INPUT);
    expect(
      !!input.constraints &&
        'disabled' in input.constraints &&
        input.constraints.disabled
    ).toEqual(true);
    expect((input.compute as { fn: string; args: string[] }).fn).toEqual('avg');
    expect((input.compute as { fn: string; args: string[] }).args).toEqual([
      '[stakeholders.*.gpg]',
    ]);
  });
});
