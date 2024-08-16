export type FormValues = {
    passwordFirst: string;
    passwordSecond: string;
    gdpr: boolean;
    company: string;
    email?: string;
    location?: string;
};

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

export type SaveDataResponse = {
    success: boolean;
    error: string;
};
