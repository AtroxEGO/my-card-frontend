import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthErrorCodes, GeneralErrorCodes } from '../errors/errorCodes';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  constructor() {}

  getErrorArray(err: HttpErrorResponse) {
    const errorArray: { name: string; errors: string[] }[] = [];
    const errors: Record<string, Array<string>> = err.error.errors;

    const keys = Object.keys(errors);

    keys.forEach((key) => errorArray.push({ name: key, errors: errors[key] }));

    return errorArray;
  }

  // Transforms error into string used as translation key
  formatError(err: HttpErrorResponse) {
    switch (err.status) {
      case 400:
        return GeneralErrorCodes.BAD_REQUEST;
      case 401:
        return AuthErrorCodes.UNAUTHORIZED;
      case 404:
        return GeneralErrorCodes.NOT_FOUND;
      case 429:
        return GeneralErrorCodes.TOO_MANY_RETRIES;
      case 0:
        return GeneralErrorCodes.SERVICE_DOWN;
      default:
        return GeneralErrorCodes.UNEXPECTED;
    }
  }

  setFormErrorFromHttpError(err: HttpErrorResponse, form: FormGroup) {
    const errors = this.getErrorArray(err);
    errors.forEach((error) => {
      const errorPathFragments = error.name.split('.');

      const isDeepError = errorPathFragments.length > 1;

      if (!isDeepError) {
        form.get(error.name)?.setErrors(error.errors);
        return;
      }
    });
  }
}
