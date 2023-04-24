import type { NextPage } from "next";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SignUpFooter, SignUpHeader } from "views";
type RegistrationForm = {
  email: string;
  password: string;
  isSendOffersSelected: boolean;
};
const RegForm: NextPage = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const { control, handleSubmit } = useForm<RegistrationForm>();
  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
    if (ref.current) {
      ref.current.focus();
    }
    setIsPasswordShown(!isPasswordShown);
  };
  return (
    <div className="relative">
      <SignUpHeader />
      <div className="my-20 flex flex-col justify-center items-center">
        <div className="w-full px-[2rem] md:w-1/2 md:px-0 lg:w-1/4 ">
          <p className="text-xl uppercase mt-8">Step 1 of 3</p>
          <h1 className="text-2xl my-2">
            Create a password to start your membership
          </h1>
          <p>Just a few more steps and you are done!</p>
          <p>We hate paperwork, too.</p>
          <Controller
            control={control}
            name="email"
            rules={{
              required: {
                value: true,
                message: "Please enter a valid email.",
              },
              minLength: {
                value: 10,
                message: "Please enter a valid email.",
              },
            }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <div className="relative my-4 ">
                <div
                  className={` w-full text-xs text-[#333333] sm:text-lg rounded-md border border-[#333333] appearance-none ${
                    error ? " border-b-orange-400" : ""
                  } flex flex-row items-center`}
                >
                  <input
                    type="text"
                    id="email"
                    value={value}
                    onChange={onChange}
                    className={`block px-5 pb-1 pt-5 flex-1 bg-inherit text-inherit focus:outline-none focus:ring-0 peer`}
                    placeholder=" "
                    autoComplete="off"
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-[0.7] top-[0.9rem] z-10 origin-[0] left-5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.7] peer-focus:-translate-y-3"
                  >
                    Email
                  </label>
                </div>
                {error && (
                  <p className="text-orange-500 text-xs mt-2">
                    {error.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: {
                value: true,
                message: "Please enter a valid password.",
              },
              minLength: {
                value: 4,
                message:
                  "Your password must contain between 4 and 60 characters.",
              },
              maxLength: {
                value: 60,
                message:
                  "Your password must contain between 4 and 60 characters.",
              },
            }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <div className="relative my-4 ">
                <input
                  type={isPasswordShown ? "text" : "password"}
                  id="password"
                  value={value}
                  onChange={onChange}
                  className={`block px-5 pb-1 pt-5 w-full text-xs text-[#333333] sm:text-lg rounded-md border border-[#333333]  appearance-none focus:outline-none focus:ring-0 peer ${
                    error ? " border-b-orange-400" : ""
                  }`}
                  placeholder=" "
                  autoComplete="off"
                  ref={ref}
                />
                {error && (
                  <p className="text-orange-500  text-xs mt-2">
                    {error.message}
                  </p>
                )}
                <label
                  htmlFor="password"
                  className="absolute text-md text-gray-400 duration-300 transform -translate-y-3 scale-[0.7] top-[0.9rem] z-10 origin-[0] left-5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.7] peer-focus:-translate-y-3"
                >
                  Password
                </label>
                <p
                  className="absolute invisible text-md text-gray-400 uppercase duration-200  transform top-4 z-10  right-5 peer-placeholder-shown:invisible peer-focus:visible hover:cursor-pointer focus:peer-focus"
                  onClick={handleShowPassword}
                >
                  {isPasswordShown ? "hide" : "show"}
                </p>
              </div>
            )}
          />
          <Controller
            control={control}
            name="isSendOffersSelected"
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
                <label htmlFor="remember-me" className="text-gray-700 text-md">
                  Please do not email me Netflix special offers.
                </label>
              </div>
            )}
          />

          <button
            type="submit"
            className="group relative flex w-full mt-10 justify-center rounded-md border border-transparent bg-netflix py-3 px-7 sm:text-lg font-medium text-white hover:bg-red-700 focus:outline-none "
            onClick={(e: any) => {
              e.preventDefault();
              //   handleSubmit(handleSignIn)();
            }}
          >
            Next
          </button>
        </div>
      </div>
      <SignUpFooter />
    </div>
  );
};

export default RegForm;
