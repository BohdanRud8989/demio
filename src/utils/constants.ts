import { FormValues } from '../types';
import { app } from '../config';

export const initialFormValue = {
    passwordFirst: undefined,
    passwordSecond: undefined,
    gdpr: false,
    company: app.companyName,
    email: undefined,
    location: undefined,
} as unknown as FormValues;
