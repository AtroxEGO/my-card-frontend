export enum ValidationErrorsCodes {
  INVALID_EMAIL = 'errors.invalid.email',
  INVALID_PHONE = 'errors.invalid.phone',
  INVALID_LINK = 'errors.invalid.link',
  INVALID_COLOR = 'errors.invalid.color',
  REQUIRED = 'errors.invalid.required',
}

export enum CardErrorCodes {
  NOT_FOUND = 'errors.card.not_found',
}

export enum AuthErrorCodes {
  INVALID_CREDENTIALS = 'errors.general.invalidCredentails',
  UNAUTHORIZED = 'errors.general.unauthorized',
}

export enum GeneralErrorCodes {
  NOT_FOUND = 'errors.general.notFound',
  SERVICE_DOWN = 'errors.general.serviceDown',
  BAD_REQUEST = 'errors.general.badRequest',
  TOO_MANY_RETRIES = 'errors.general.tooManyRetries',
  UNEXPECTED = 'errors.general.unexpected',
}
