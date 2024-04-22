import { HttpErrorResponse } from '@angular/common/http';

export const getErrorArray = (err: HttpErrorResponse) => {
  const errorArray: { name: string; errors: string[] }[] = [];
  const errors: Record<string, Array<string>> = err.error.errors;

  const keys = Object.keys(errors);

  keys.forEach((key) => errorArray.push({ name: key, errors: errors[key] }));

  return errorArray;
};
