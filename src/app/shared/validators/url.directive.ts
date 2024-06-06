import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ValidationErrorsCodes } from '../errors/errorCodes';

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const invalid = !control?.value?.match(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
    );
    return invalid ? [ValidationErrorsCodes.INVALID_LINK] : null;
  };
}
