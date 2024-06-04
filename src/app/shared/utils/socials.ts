import { Validators } from '@angular/forms';
import { urlValidator } from '../validators/url.directive';

export const getListOfValidators = (socialName: string) => {
  const validators = [];
  validators.push(Validators.required);

  switch (socialName) {
    case 'email': {
      validators.push(Validators.email);
      break;
    }
    case 'phone': {
      // TODO: Add Regex For Phone Number
      // validators.push(Validators.)
      break;
    }
    default: {
      validators.push(urlValidator());
      break;
    }
  }

  return validators;
};
