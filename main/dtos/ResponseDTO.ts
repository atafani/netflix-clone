export type ResponseDTO<T> = {
  data?: T;
  error?: Error;
  message?: string;
};
