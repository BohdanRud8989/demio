import { PasswordValidationDescription } from "../types";

export const validatePassword = (
  value: string,
  analyze = false
): PasswordValidationDescription => {
  const exceedsMaxLength = value.length > 255;
  const exceedsMinLength = value.length >= 8;
  const containsNonASCII = /[^\x20-\x7F]/.test(value);
  if (!analyze) {
    const unitedPattern =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[*.!@#$%^&(){}:;,.?~_=|<>/[\]+\-\\])(?!.*\s).*$/;
    return {
      valid:
        !containsNonASCII && exceedsMinLength && !exceedsMaxLength
          ? unitedPattern.test(value)
          : false,
    };
  }
  const containsWhitespace = /\s/.test(value);
  const containsUpperCase = /[A-Z]/.test(value);
  const containsLowerCase = /[a-z]/.test(value);
  const containsSpecialChar = /[*.!@#$%^&(){}[\]:;<>,?/~_+\-=|\\]/.test(value);
  const containsDigit = /\d/.test(value);

  return {
    valid:
      !containsNonASCII &&
      exceedsMinLength &&
      containsUpperCase &&
      containsDigit,
    details: {
      exceedsMinLength: exceedsMinLength && !exceedsMaxLength,
      containsUpperCase: containsUpperCase && !containsNonASCII,
      containsLowerCase: containsLowerCase && !containsNonASCII,
      containsSpecialChar: containsSpecialChar && !containsWhitespace,
      containsDigit
    },
  };
};

export function omitKeys<T, K extends keyof NonNullable<T>>(
    targetObject: NonNullable<T>,
    targetKeys: K[]
): Omit<NonNullable<T>, K> {
  const filteredEntries = Object.entries(targetObject).filter(
      ([key]) => !targetKeys.includes(key as K)
  );

  return Object.fromEntries(filteredEntries) as Omit<NonNullable<T>, K>;
}
