import { ePlanType } from "enums";

export type UserDTO = {
  id?: number;
  email: string;
  phone?: string;
  password?: string;
  emailSpecialOffers?: boolean;
  cardNumber?: number;
  expDate?: string;
  cvva?: string;
  plan?: ePlanType;
  token?: string;
  registered?: boolean;
};
