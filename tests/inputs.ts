export const userSelect = {
  formId: 1,
  controlName: 'user',
  controlIndex: 1,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 1,
  label: 'UTILISATEUR',
  placeholder: '...',
  type: 'select',
  classes: 'clr-input',
  optionsConfig: 'https://auth.lik.tg/api/v2/users',
  multiple: false,
  options: [],
  keyfield: 'id',
  valuefield: 'name',
  groupfield: 'id',
};

export const authorizationsSelectMultiple = {
  formId: 1,
  controlName: 'authorizations',
  controlIndex: 2,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 2,
  label: 'AUTORISATIONS',
  placeholder: '...',
  type: 'select',
  classes: 'clr-input',
  optionsConfig:
    'table:https://auth.lik.tg/api/v2/authorizations|keyfield:id|groupfield:id|valuefield:label',
  multiple: true,
  options: [],
};

export const birthDate = {
  formId: 1,
  controlName: 'birthdate',
  controlIndex: 3,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 3,
  label: 'DATE DE NAISSANCE',
  placeholder: '...',
  type: 'date',
  classes: 'clr-input',
  minDate: '1994-05-10',
  maxDate: 'now',
  multiple: false,
  options: [],
};

export const startTime = {
  formId: 1,
  controlName: 'start_time',
  controlIndex: 4,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 5,
  label: 'HEURE DE DÉBUT',
  placeholder: '...',
  type: 'time',
  classes: 'clr-input',
  min: '08:00',
  max: '10:00',
  multiple: false,
  options: [],
};

export const observationTextArea = {
  formId: 1,
  controlName: 'observation',
  controlIndex: 5,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 6,
  label: 'OBSERVATIONS',
  placeholder: '...',
  type: 'textarea',
  classes: 'clr-input',
  multiple: false,
  options: [],
};

export const totalNumber = {
  formId: 1,
  controlName: 'total',
  controlIndex: 6,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 7,
  label: 'TOTAL',
  placeholder: '...',
  type: 'number',
  classes: 'clr-input',
  min: '2',
  multiple: false,
  options: [],
};

export const descriptionText = {
  formId: 1,
  controlName: 'description',
  controlIndex: 7,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 8,
  label: 'DESCRIPTION',
  placeholder: '...',
  type: 'text',
  classes: 'clr-input',
  min: '2',
  max: '255',
  multiple: false,
  options: [],
};
export const passwordPassword = {
  formId: 1,
  controlName: 'password',
  controlIndex: 8,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  pattern: '\\W{8,32}',
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 9,
  label: 'MOT DE PASSE',
  placeholder: '...',
  type: 'password',
  classes: 'clr-input',
  min: '8',
  max: '255',
  multiple: false,
  options: [],
};

export const phoneNumber = {
  formId: 1,
  controlName: 'phonenumber',
  controlIndex: 9,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 10,
  label: 'NUMÉRO DE TÉlÉPHONE',
  placeholder: '...',
  type: 'phone',
  classes: 'clr-input',
  min: '20',
  max: '255',
  multiple: false,
  options: [],
};

export const email = {
  formId: 1,
  controlName: 'email',
  controlIndex: 10,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 11,
  label: 'ADRESSE MAIL',
  placeholder: '...',
  type: 'email',
  classes: 'clr-input',
  min: '20',
  max: '199',
  multiple: false,
  options: [],
};

export const profileImage = {
  formId: 1,
  controlName: 'profile_image',
  controlIndex: 12,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 12,
  label: 'IMAGE DE PROFILE',
  placeholder: '...',
  type: 'file',
  classes: 'clr-input',
  multiple: false,
  options: [],
  uploadURL: 'https://storage.lik.tg/api?name=cjhi783r2398h9r2yi2bccwhiuwc',
};

export const subscribeRadio = {
  formId: 1,
  controlName: 'subscribe',
  controlIndex: 13,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 13,
  label: 'SOUSCRIRE À LA NEWSLETTER?',
  placeholder: '...',
  type: 'radio',
  classes: 'clr-input',
  optionsConfig: '1:OUI|0:NON',
  multiple: false,
  options: [],
};

export const authorizationGroupsCheckbox = {
  formId: 1,
  controlName: 'authorization_groups',
  controlIndex: 14,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 14,
  label: "GROUPE D'AUTORISATIONS",
  placeholder: '...',
  type: 'checkbox',
  classes: 'clr-input',
  optionsConfig: '2:ADMIN|3:STANDARD|4:OPÉRATEUR',
  multiple: true,
  options: [],
};

export const computableInput = {
  formId: 1,
  controlName: 'compute',
  controlIndex: 14,
  required: true,
  disabled: false,
  readonly: false,
  unique: false,
  isRepeatable: false,
  containerClass: 'clr-col-sm-12 clr-col-md-6',
  id: 14,
  label: 'COMPUTABLE INPUT',
  placeholder: '...',
  type: 'checkbox',
  classes: 'clr-input',
  optionsConfig: '2:ADMIN|3:STANDARD|4:OPÉRATEUR',
  multiple: true,
  compute: {
    fn: 'avg',
    args: ['[stakeholders.*.gpg]'],
  },
  options: [],
};
