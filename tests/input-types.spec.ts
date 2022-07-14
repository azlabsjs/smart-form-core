import { buildBase } from '../src/input-types/base';
import { birthDate, descriptionText, profileImage, startTime, totalNumber, userSelect } from './inputs';
import { buildDateInput } from '../src/input-types/date';
import { buildFileInput } from '../src/input-types/file';
import { buildHiddenInput } from '../src/input-types/hidden';
import { buildNumberInput } from '../src/input-types/number';
import { buildTextInput } from '../src/input-types/text';
import { buildTimeInput } from '../src/input-types/time';
import { InputTypes } from '../src/types';

// formId?: number;
describe('Test input types builder functions', () => {
  it('should test build base type function', () => {
    const input = buildBase(userSelect);
    expect(input.classes).toEqual('clr-input');
    expect(input.index).toEqual(1);
    expect(input.name).toBe('user');
    expect(input.isRepeatable).toEqual(false);
    expect(input.multiple).toEqual(false);
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
    expect(input.uploadUrl).toEqual('https://storage.lik.tg/api?name=cjhi783r2398h9r2yi2bccwhiuwc');
  });

  it('should build a hidden input', () => {
    const input = buildHiddenInput({
        type: InputTypes.HIDDEN_INPUT,
        value: 'Hello world'
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
});
