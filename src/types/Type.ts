export type ErrorMessages =
  | "userId_duplicated"
  | "email_duplicated"
  | "No recipients defined"
  | "reCAPTCHA failed";

export type ReceivedErrors = {
  data: Array<ErrorMessages>;
};
