import { ePlanType } from "enums";

export type UserDTO = {
  _id?: number;
  email?: string;
  phone?: string;
  password?: string;
  emailSpecialOffers?: boolean;
  cardNumber?: number;
  expDate?: string;
  cvv?: string;
  plan?: ePlanType;
  token?: string;
  registered?: boolean;
  agreedToTerms?: boolean;
};
