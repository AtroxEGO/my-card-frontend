import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationErrorsCodes } from '../errors/errorCodes';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalid = !control?.value?.match(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]{8,15}$/,
    );
    return invalid ? [ValidationErrorsCodes.INVALID_PHONE] : null;
  };
}
