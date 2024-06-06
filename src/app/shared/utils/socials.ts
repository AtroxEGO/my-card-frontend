import { urlValidator } from '../validators/url.directive';
import { phoneNumberValidator } from '../validators/phone.directive';
import { emailValidator } from '../validators/email.directive';
import { requiredValidator } from '../validators/required.directive';

export const getListOfValidators = (socialName: string) => {
  const validators = [];
  validators.push(requiredValidator());

  switch (socialName) {
    case 'email': {
      validators.push(emailValidator());
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
