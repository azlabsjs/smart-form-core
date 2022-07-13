import {
  OptionInterface,
  ControlInterface,
  FormInterface,
} from '../compact/types';

// Class representing structure of control configuration
// returned by API Server
export class Control implements ControlInterface {
  id!: number;
  formId!: number;
  formFormControlId!: number;
  label!: string;
  placeholder!: string;
  type!: string;
  classes!: string;
  required!: number;
  disabled!: number;
  readonly!: number;
  unique!: number;
  pattern!: string;
  description!: string;
  maxLength!: number;
  minLength!: number;
  min!: number;
  max!: number;
  minDate!: string;
  maxDate!: string;
  selectableValues!: string;
  selectableModel!: string;
  modelFilters!: string;
  multiple!: number;
  controlGroupKey!: string;
  controlName!: string;
  controlIndex!: number;
  options!: object[];
  rows!: number;
  columns!: number;
  value!: string;
  requiredIf!: string;
  uploadURL!: string;
  isRepeatable!: number;
  children!: ControlInterface[];
  uniqueOn!: string;
  containerClass!: string;
  valuefield!: string;
  groupfield!: string;
  keyfield!: string;

  public static getJsonableProperties(): {
    [index: string]: keyof Control | { name: string; type: any };
  } {
    return {
      id: 'id',
      formId: 'formId',
      formFormControlId: 'formFormControlId',
      label: 'label',
      placeholder: 'placeholder',
      type: 'type',
      classes: 'classes',
      required: 'required',
      disabled: 'disabled',
      readonly: 'readonly',
      unique: 'unique',
      pattern: 'pattern',
      description: 'description',
      maxLength: 'maxLength',
      minLength: 'minLength',
      min: 'min',
      max: 'max',
      minDate: 'minDate',
      maxDate: 'maxDate',
      selectableValues: 'selectableValues',
      selectableModel: 'selectableModel',
      multiple: 'multiple',
      controlGroupKey: 'controlGroupKey',
      controlName: 'controlName',
      controlIndex: 'controlIndex',
      options: 'options',
      rows: 'rows',
      columns: 'columns',
      value: 'value',
      requiredIf: 'requiredIf',
      uploadURL: 'uploadURL',
      isRepeatable: 'isRepeatable',
      children: { name: 'children', type: Control },
      uniqueOn: 'uniqueOn',
      containerClass: 'containerClass',
      dynamicControlContainerClass: 'containerClass',
      valuefield: 'valuefield',
      groupfield: 'groupfield',
      keyfield: 'keyfield',
    };
  }
}

// Class representing structure of control request type
export class ControlRequest {
  label!: string;
  placeholder!: string;
  type!: string;
  classes!: string;
  description!: string;
  maxLength!: number;
  minLength!: number;
  min!: number;
  max!: number;
  minDate!: string;
  maxDate!: string;
  selectableValues!: string;
  selectableModel!: string;
  modelFilters!: string;
  multiple!: boolean;
  columns!: number;
  rows!: number;

  public static getJsonableProperties(): {
    [prop: string]: keyof ControlRequest;
  } {
    return {
      label: 'label',
      placeholder: 'placeholder',
      type: 'type',
      classes: 'classes',
      description: 'description',
      max_length: 'maxLength',
      min_length: 'minLength',
      min: 'min',
      max: 'max',
      min_date: 'minDate',
      max_date: 'maxDate',
      selectable_values: 'selectableValues',
      selectable_model: 'selectableModel',
      model_filters: 'modelFilters',
      multiple: 'multiple',
      columns: 'columns',
      rows: 'rows',
    };
  }

  public toSerialize(): { [prop: string]: any } {
    const serialized: { [index: string]: any } = {};
    Object.entries(ControlRequest.getJsonableProperties()).forEach(
      ([key, value]) => {
        serialized[key] = this[value];
      }
    );
    return serialized;
  }
}

// Class representing form control request type
export class FormControlRequest {
  formId!: number;
  formControlId!: number;
  controlName!: string;
  groupID!: number | string;
  index!: number;
  value!: string | number;
  required!: boolean;
  disabled!: boolean;
  readOnly!: boolean;
  unique!: boolean;
  pattern!: string;
  requiredIf!: string;
  uploadUrl!: string;
  repeatable!: boolean;
  uniqueOn!: string;
  containerClass!: string;

  public static getJsonableProperties(): {
    [prop: string]: keyof FormControlRequest;
  } {
    return {
      form_id: 'formId',
      form_control_id: 'formControlId',
      control_name: 'controlName',
      group_id: 'groupID',
      index: 'index',
      value: 'value',
      required: 'required',
      disabled: 'disabled',
      read_only: 'readOnly',
      unique: 'unique',
      pattern: 'pattern',
      required_if: 'requiredIf',
      upload_url: 'uploadUrl',
      repeatable: 'repeatable',
      unique_on: 'uniqueOn',
      container_class: 'containerClass',
    };
  }

  public toSerialize(): { [prop: string]: any } {
    const serialized: { [index: string]: any } = {};
    Object.entries(FormControlRequest.getJsonableProperties()).forEach(
      ([key, value]) => {
        serialized[key] = this[value];
      }
    );
    return serialized;
  }
}


// Class representing API server form instance
export class Form implements FormInterface {
  id!: number;
  title!: string;
  parentId!: string;
  description!: string;
  controls: ControlInterface[] = [];
  url!: string;
  status!: number;
  appcontext!: string;

  public static getJsonableProperties(): {
    [index: string]: keyof Form | { name: string; type: any };
  } {
    return {
      title: 'title',
      parentId: 'parentId',
      description: 'description',
      children: { name: 'children', type: Form },
      controls: { name: 'controls', type: Control },
      url: 'url',
      status: 'status',
      id: 'id',
      appcontext: 'appcontext',
    };
  }
}


// Class representing API server option instance
export class Option implements OptionInterface {
  id!: number;
  table!: string;
  keyfield!: string;
  groupfield!: string;
  description!: string;
  displayLabel!: string;

  static getJsonableProperties():
    | { [index: string]: keyof Option }
    | { [index: string]: { name: string; type: any } } {
    return {
      id: 'id',
      table: 'table',
      keyfield: 'keyfield',
      groupfield: 'groupfield',
      valuefield: 'description',
      display_label: 'displayLabel',
    };
  }
}
