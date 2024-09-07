export type FormValues = {
  passwordFirst: string;
  passwordSecond: string;
  gdpr: boolean;
  company: string;
  email?: string;
  location?: string;
};

export type ValueOf<T> = T[keyof T];

export type PasswordValidationDescription = {
  valid: boolean;
  details?: {
    exceedsMinLength: boolean;
    containsUpperCase: boolean;
    containsLowerCase: boolean;
    containsSpecialChar: boolean;
    containsDigit: boolean;
  };
};

export type SaveDataResponsePayload = {
  success: boolean;
  error: string;
};

export type SaveDataRequestPayload = Partial<FormValues> & {
  sessionTime?: number;
  engagementPercentage?: string;
};

export type SaveGdprRequestPayload = Omit<
  FormValues,
  "passwordFirst" | "passwordSecond"
> & {
  sessionTime: number;
  engagementPercentage: string;
};
