import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationErrorsCodes } from '../errors/errorCodes';

export function requiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalid = !control?.value;
    return invalid ? [ValidationErrorsCodes.REQUIRED] : null;
  };
}
