import React from 'react';
import { FieldValidationErrors } from './field-validation-errors';
import { Label } from './label';
import { ValueFieldProps, FieldChangeCallback } from '../../FieldProps';
import { DateInputViewModel, ValueFormField } from '@sitecore-jss/sitecore-jss-forms';

const DateField: React.FunctionComponent<ValueFieldProps<DateInputViewModel>> = ({
  field,
  value,
  isValid,
  errors,
  onChange,
}) => (
  <React.Fragment>
    <Label field={field} isValid={isValid} />
    <input
      type="date"
      className={field.model.cssClass}
      id={field.valueField.id}
      name={field.valueField.name}
      value={formatValue(value)}
      min={formatValue(field.model.min)}
      max={formatValue(field.model.max)}
      onChange={(e) => handleOnChange(field, e.target.value, onChange)}
    />
    <FieldValidationErrors errors={errors} />
  </React.Fragment>
);

function formatValue(value?: string) {
  // dates are serialized from the API as full date/times (i.e. 2019-01-11T00:00:00)
  // but the date input expects only the date. Since the format is predictably long,
  // we can just take a substring.

  if (!value || value.length < 10) {
    return value;
  }
  return value.substring(0, 10);
}

function handleOnChange(field: ValueFormField, fieldValue: string, callback: FieldChangeCallback) {
  let valid = true;
  const errorMessages = [];

  // custom client validation logic here
  if (field.model.required && !fieldValue) {
    valid = false;
    errorMessages.push(`${field.model.title} is required`);
  }

  callback(field.valueField.name, fieldValue, valid, errorMessages);
}

export default DateField;
