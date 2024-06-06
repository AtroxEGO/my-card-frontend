import { Validators } from '@angular/forms';
import { urlValidator } from '../validators/url.directive';
import { phoneNumberValidator } from '../validators/phone.directive';

const phoneRegex = new RegExp(
  '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]{8,15}$',
);

export const getListOfValidators = (socialName: string) => {
  const validators = [];
  validators.push(Validators.required);

  switch (socialName) {
    case 'email': {
      validators.push(Validators.email);
      break;
    }
    case 'phone': {
      validators.push(phoneNumberValidator());
      break;
    }
    default: {
      validators.push(urlValidator());
      break;
    }
  }

  return validators;
};
// {name: 'socials.linkedin', errors: Array(1)}
