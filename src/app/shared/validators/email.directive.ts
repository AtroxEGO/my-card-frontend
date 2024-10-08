import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationErrorsCodes } from '../errors/errorCodes';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalid = !control?.value?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    return invalid ? [ValidationErrorsCodes.INVALID_EMAIL] : null;
  };
}
