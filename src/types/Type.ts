export type ErrorMessages =
  | "userId_duplicated"
  | "email_duplicated"
  | "No recipients defined";

export type ReceivedErrors = {
  data: Array<ErrorMessages>;
};
