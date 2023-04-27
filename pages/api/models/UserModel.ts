import { ePlanType } from "enums";
import { Schema, model, models } from "mongoose";

interface IUser {
  email?: string;
  phone?: string;
  password?: string;
  salt?: string;
  emailSpecialOffers?: boolean;
  cardNumber?: string;
  expDate?: string;
  cvv?: string;
  plan?: string;
  token?: string;
}
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  salt: {
    type: String,
    required: false,
  },
  emailSpecialOffers: {
    type: Boolean,
    required: false,
  },
  cardNumber: {
    type: Number,
    required: false,
  },
  expDate: {
    type: String,
    required: false,
  },
  cvv: {
    type: String,
    required: false,
  },
  plan: {
    type: String,
    enum: [...Object.values(ePlanType)],
    required: false,
  },
  token: {
    type: String,
    required: false,
  },
});

const User = models.User || model("User", userSchema);
export default User;
export type { IUser };
