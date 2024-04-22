import { Validators } from '@angular/forms';
import { urlValidator } from '../validators/url.directive';

export const getListOfValidators = (socialName: string) => {
  const validators = [];
  validators.push(Validators.required);

  if (socialName === 'email') {
    validators.push(Validators.email);
  }

  if (socialName !== 'email') {
    validators.push(urlValidator());
  }

  return validators;
};
