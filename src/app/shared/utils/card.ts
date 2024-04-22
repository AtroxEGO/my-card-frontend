import removeAccents from 'remove-accents';

export const getCardIdFromSlug = (slug: string, strict: any = false) => {
  const slugParts = slug.split('-');

  // When strict get full slug as ID, else only the last part of slug
  const cardId = strict ? slug : slugParts[slugParts.length - 1];

  return cardId;
};

export const getCardSlugUrl = (fullName: string, cardID: string) => {
  const fullNameSlug = slugify(fullName || '');

  const url =
    fullName !== null || ''
      ? `/cards/${fullNameSlug}-${cardID}`
      : `/cards/${cardID}`;

  return url;
};

export const slugify = (value: string) => {
  return removeAccents(value)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
