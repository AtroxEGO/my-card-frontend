export enum ValidationErrorsCodes {
  INVALID_EMAIL = 'errors.invalid.email',
  INVALID_PHONE = 'errors.invalid.phone',
  INVALID_LINK = 'errors.invalid.link',
  INVALID_COLOR = 'errors.invalid.color',
  REQUIRED = 'errors.invalid.required',
  PASSWORD_TOO_SHORT = 'errors.invalid.password.tooShort',
  PASSWORD_UPPER_CASE_REQUIRED = 'errors.invalid.password.upperCaseRequired',
  PASSWORD_LOWER_CASE_REQUIRED = 'errors.invalid.password.lowerCaseRequired',
  PASSWORD_NUMBER_REQUIRED = 'errors.invalid.password.numberRequired',
  PASSWORD_DO_NOT_MATCH = 'errors.invalid.password.doNotMatch',
}

export enum CardErrorCodes {
  NOT_FOUND = 'errors.card.not_found',
}

export enum AuthErrorCodes {
  INVALID_CREDENTIALS = 'errors.general.invalidCredentails',
  UNAUTHORIZED = 'errors.general.unauthorized',
  FORBIDDEN = 'errors.general.forbidden',
}

export enum GeneralErrorCodes {
  NOT_FOUND = 'errors.general.notFound',
  SERVICE_DOWN = 'errors.general.serviceDown',
  BAD_REQUEST = 'errors.general.badRequest',
  TOO_MANY_RETRIES = 'errors.general.tooManyRetries',
  UNEXPECTED = 'errors.general.unexpected',
}
