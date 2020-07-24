export const formatPhoneNumber = (phoneNumberString: string) => {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
};

export const normalizePhoneNumber = (phoneNumberString: string) => {
  phoneNumberString = phoneNumberString.replace(/[^\d+]+/g, '');
  phoneNumberString = phoneNumberString.replace(/^00/, '+');
  if (phoneNumberString.match(/^1/)) phoneNumberString = '+' + phoneNumberString;
  if (!phoneNumberString.match(/^\+/)) phoneNumberString = '+1' + phoneNumberString;

  return phoneNumberString;
};
