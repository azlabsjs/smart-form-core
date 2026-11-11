import { DateInput, FileInput, FormConfigInterface, InputConfigInterface, InputGroup, InputTypes, NumberInput, OptionsInput, TextInput } from "../types";

/** checks if type of `{InputConfigInterface}` has required attribute set to true */
export function isRequired(input: InputConfigInterface) {
    return !!input.constraints && 'required' in input.constraints && Boolean(input.constraints.required);
}

/** checks if type of `{InputConfigInterface}` has disabled attribute set to true */
export function isDisabled(input: InputConfigInterface) {
    return !!input.constraints && 'disabled' in input.constraints && Boolean(input.constraints.disabled);
}

/** checks if type of `{InputConfigInterface}` is a file input */
export function isPhoneInput(input: InputConfigInterface): input is TextInput {
    return input.type === InputTypes.PHONE_INPUT;
}

/** checks if type of `{InputConfigInterface}` is a select, checkbox or radio input input */
export function isOptionsInput(input: InputConfigInterface): input is OptionsInput {
    return input.type === InputTypes.CHECKBOX_INPUT || input.type === InputTypes.RADIO_INPUT || input.type === InputTypes.SELECT_INPUT;
}

/** checks if type of `{InputConfigInterface}` is a file input */
export function isFileInput(input: InputConfigInterface): input is FileInput {
    return input.type === InputTypes.FILE_INPUT;
}

/** checks if type of `{InputConfigInterface}` is a date input */
export function isDateConfig(input: InputConfigInterface): input is DateInput {
    return input.type === InputTypes.DATE_INPUT;
}

/** checks if type of `{InputConfigInterface}` is a number input */
export function isNumberConfig(input: InputConfigInterface): input is NumberInput {
    return input.type === InputTypes.NUMBER_INPUT;
}

/** checks if type of `{InputConfigInterface}` is a text, email or password input */
export function isTextInputConfig(input: InputConfigInterface): input is TextInput {
    return input.type === InputTypes.TEXT_INPUT || input.type === InputTypes.EMAIL_INPUT || input.type === InputTypes.PASSWORD_INPUT;
}

/** checks if type of `{InputConfigInterface}` is a hidden input */
export function isHiddenInput(input: InputConfigInterface): input is InputConfigInterface {
    return input.type === InputTypes.HIDDEN_INPUT;
}

/** checks if type of `{InputConfigInterface}` is an input group */
export function isInputGroup(input: InputConfigInterface): input is InputGroup {
    return (input.type === InputTypes.INPUT_GROUP || input.type === InputTypes.CONTROL_GROUP) && ('inputs' in input && Array.isArray(input.inputs));
}

/** checks if provided object is an instance of `{InputConfigInterface}` type  */
export function isInputConfig(value: unknown): value is InputConfigInterface {
    return typeof value === 'object' && value !== null && 'label' in value && typeof value['label'] === 'string' && 'type' in value && value['type'] === 'string' && 'name' in value && typeof value['name'] === 'string';
}


/** checks if provided object is an instance of `{FormConfigInterface}` type  */
export function isFormConfig(value: unknown): value is FormConfigInterface {

    if (typeof value !== 'object' || value === null) {
        return false;
    }

    if (!('inputs' in value)) {
        return false;
    }

    const { inputs } = value;

    if (!Array.isArray(inputs)) {
        return false;
    }

    for (const input of inputs) {
        if (!isInputConfig(input)) {
            return false;
        }
    }

    return true;
}