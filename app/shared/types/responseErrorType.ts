export type RegistrationResponseSuccessType = {
  acessToken: string;
};
export type ResponseErrorType = {
  errors: [
    {
      field: string;
      code: number;
      message: string;
    }
  ];
};
