export const app = {
  mockedApi: import.meta.env.VITE_REACT_APP_MOCKED_API === "true",
  emulateSuccessResponse:
    import.meta.env.VITE_REACT_APP_EMULATE_SUCCESS_RESPONSE === "true",
  redirectUrl: import.meta.env.VITE_REACT_APP_REDIRECT_URL,
  companyName: import.meta.env.VITE_REACT_APP_COMPANY_NAME,
};
