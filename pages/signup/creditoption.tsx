import type { NextPage } from "next";
import { SignUpFooter, SignUpHeader } from "views";
import { Controller, useForm } from "react-hook-form";
import { BsCreditCard2Back } from "react-icons/bs";
import Cleave from "cleave.js/react";
import Image from "next/image";
import Link from "next/link";

type CreditOptionForm = {
  cardNumber: string;
  expDate: string;
  cvv: string;
  firstName: string;
  lastName: string;
  agreeToTerms: boolean;
};

const CreditOption: NextPage = () => {
  const { control, handleSubmit } = useForm<CreditOptionForm>();
  const handleStartMembership = (data: CreditOptionForm) => {
    console.log(data);
  };
  return (
    <div className="relative">
      <SignUpHeader />
      <div className="my-10 flex flex-col justify-center items-center">
        <div className="w-full px-[2rem] md:w-1/2 md:px-0 lg:w-1/3 ">
          <p className="text-xl uppercase mt-8">Step 3 of 3</p>
          <h1 className="text-2xl my-2">Set up your credit or debit card</h1>
          <div className="flex flex-row gap-3 my-4">
            <Image
              src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/VISA.png"
              alt="Visa"
              width={30}
              height={10}
            />
            <Image
              src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/MASTERCARD.png"
              alt="Mastercard"
              width={30}
              height={10}
            />
            <Image
              src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/AMEX.png"
              alt="Amex"
              width={30}
              height={10}
            />
          </div>
          <Controller
            control={control}
            name="cardNumber"
            rules={{
              required: {
                value: true,
                message: "Please enter a valid card number.",
              },
              minLength: {
                value: 10,
                message: "Please enter a valid credit card number.",
              },
            }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <div className="relative my-2">
                <div
                  className={` w-full text-xs sm:text-lg rounded-sm border appearance-none ${
                    error ? "border-red-400" : "border-gray-300"
                  } flex flex-row items-center`}
                >
                  <Cleave
                    placeholder=" "
                    id="cardNumber"
                    options={{ creditCard: true }}
                    value={value}
                    onChange={onChange}
                    className={`block px-4 pb-1 pt-5 flex-1 bg-inherit text-inherit focus:outline-none focus:ring-0 peer text-gray-400`}
                  />
                  <label
                    htmlFor="cardNumber"
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-[0.7] top-[0.99rem] z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.7] peer-focus:-translate-y-3"
                  >
                    Card Number
                  </label>
                  <BsCreditCard2Back className="mr-4 text-2xl text-gray-400" />
                </div>
                {error && (
                  <p className="text-red-500 text-xs mt-2">{error.message}</p>
                )}
              </div>
            )}
          />
          <div className="flex flex-row">
            <Controller
              control={control}
              name="expDate"
              rules={{
                required: {
                  value: true,
                  message: "PPlease enter an expiration date.",
                },
              }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <div className="relative w-1/2 pr-1">
                  <div
                    className={` w-full text-xs sm:text-lg rounded-sm border appearance-none ${
                      error ? "border-red-400" : "border-gray-300"
                    } flex flex-row items-center`}
                  >
                    <Cleave
                      placeholder=" "
                      id="expDate"
                      options={{
                        date: true,
                        delimiter: "/",
                        datePattern: ["m", "y"],
                      }}
                      value={value}
                      onChange={onChange}
                      className={`block px-4 pb-1 pt-5 flex-1 bg-inherit text-inherit focus:outline-none focus:ring-0 peer text-gray-400`}
                    />
                    <label
                      htmlFor="expDate"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-[0.7] top-[0.99rem] z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.7] peer-focus:-translate-y-3"
                    >
                      Expiration Date
                    </label>
                    <BsCreditCard2Back className="mr-4 text-2xl text-gray-400" />
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-2">{error.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              control={control}
              name="cvv"
              rules={{
                required: {
                  value: true,
                  message: "Please enter a CVV.",
                },
              }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <div className="relative w-1/2 pl-1">
                  <div
                    className={` w-full text-xs sm:text-lg rounded-sm border appearance-none ${
                      error ? "border-red-400" : "border-gray-300"
                    } flex flex-row items-center`}
                  >
                    <input
                      type="text"
                      id="cvv"
                      value={value}
                      onChange={onChange}
                      className={`block px-4 pb-1 pt-5 flex-1 bg-inherit text-inherit focus:outline-none focus:ring-0 peer text-gray-400`}
                      placeholder=" "
                      autoComplete="off"
                    />
                    <label
                      htmlFor="cvv"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-[0.7] top-[0.99rem] z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.7] peer-focus:-translate-y-3"
                    >
                      CVV
                    </label>
                    <BsCreditCard2Back className="mr-4 text-2xl text-gray-400" />
                  </div>
                  {error && (
                    <p className="text-red-500 text-xs mt-2">{error.message}</p>
                  )}
                </div>
              )}
            />
          </div>
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: {
                value: true,
                message: "Please enter a first name.",
              },
            }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <div className="relative my-2">
                <div
                  className={` w-full text-xs sm:text-lg rounded-sm border appearance-none ${
                    error ? "border-red-400" : "border-gray-300"
                  } flex flex-row items-center`}
                >
                  <input
                    type="text"
                    id="firstName"
                    value={value}
                    onChange={onChange}
                    className={`block px-4 pb-1 pt-5 flex-1 bg-inherit text-inherit focus:outline-none focus:ring-0 peer text-gray-400`}
                    placeholder=" "
                    autoComplete="off"
                  />
                  <label
                    htmlFor="firstName"
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-[0.7] top-[0.99rem] z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.7] peer-focus:-translate-y-3"
                  >
                    First Name
                  </label>
                </div>
                {error && (
                  <p className="text-red-500 text-xs mt-2">{error.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <div className="relative my-2">
                <div
                  className={` w-full text-xs sm:text-lg rounded-sm border appearance-none ${
                    error ? "border-red-400" : "border-gray-300"
                  } flex flex-row items-center`}
                >
                  <input
                    type="text"
                    id="lastName"
                    value={value}
                    onChange={onChange}
                    className={`block px-4 pb-1 pt-5 flex-1 bg-inherit text-inherit focus:outline-none focus:ring-0 peer text-gray-400`}
                    placeholder=" "
                    autoComplete="off"
                  />
                  <label
                    htmlFor="lastName"
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-[0.7] top-[0.99rem] z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.7] peer-focus:-translate-y-3"
                  >
                    Last Name
                  </label>
                </div>
                {error && (
                  <p className="text-red-500 text-xs mt-2">{error.message}</p>
                )}
              </div>
            )}
          />
          <div className="flex flex-row justify-between items-center p-4 bg-gray-100 rounded-md my-3">
            <div>
              <p className="font-medium">EUR9.99/month</p>
              <p className="text-md text-gray-500">Premium</p>
            </div>
            <Link href="/signup/planform" className="text-blue-600 font-medium">
              Change
            </Link>
          </div>
          <p className="text-xs text-gray-400 my-2">
            By clicking the “Start Paid Membership” button below, you agree to
            our
            <Link
              href="https://help.netflix.com/legal/termsofuse"
              className="text-blue-400 mx-1"
            >
              Terms of Use
            </Link>
            and that you are over 18 and acknowledge the
            <Link
              href="https://help.netflix.com/legal/privacy"
              className="text-blue-400 mx-1"
            >
              Privacy Statement
            </Link>
            . Netflix will automatically continue your membership and charge the
            membership fee (currently EUR4.99/month) to your payment method
            until you cancel. You may cancel at any time to avoid future charges
          </p>
          <Controller
            control={control}
            name="agreeToTerms"
            defaultValue={false}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  className="accent-white mr-2"
                  checked={value}
                  onChange={onChange}
                />
                <label htmlFor="remember-me" className="text-gray-400 text-md">
                  I agree.
                </label>
              </div>
            )}
          />
          <button
            type="submit"
            className="group relative flex w-full mt-10 justify-center rounded-sm border border-transparent bg-netflix py-3 px-7 sm:text-lg font-medium text-white hover:bg-red-700 focus:outline-none "
            onClick={(e: any) => {
              e.preventDefault();
              handleSubmit(handleStartMembership)();
            }}
          >
            Start Paid Membership
          </button>
        </div>
      </div>
      <SignUpFooter />
    </div>
  );
};

export default CreditOption;
