import { FormValues } from "../types";
import { app } from "../config";

// The default state of the main form
export const initialFormValue = {
  passwordFirst: undefined,
  passwordSecond: undefined,
  gdpr: false,
  company: app.companyName,
  email: undefined,
  location: undefined,
} as unknown as FormValues;
