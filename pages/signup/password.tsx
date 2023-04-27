import { useAuth } from "hooks";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SignUpFooter, SignUpHeader } from "views";
type RegistrationForm = {
  email: string;
  password: string;
};
const Password: NextPage = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const { control, handleSubmit } = useForm<RegistrationForm>();
  const { auth, handleLogin } = useAuth();
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
    if (ref.current) {
      ref.current.focus();
    }
    setIsPasswordShown(!isPasswordShown);
  };

  const handleNext = async (data: RegistrationForm) => {
    handleLogin(data);
  };

  useEffect(() => {
    if (!auth?.user) {
      router.push("/singup");
    }
  }, [auth]);

  return (
    <div className="relative">
      <SignUpHeader />
      <div className="my-20 flex flex-col justify-center items-center">
        <div className="w-full px-[2rem] md:w-1/2 md:px-0 lg:w-1/4 ">
          <p className="text-xl uppercase mt-8">Step 1 of 3</p>
          <h1 className="text-2xl my-2">
            Welcome back! Joining Netflix is easy.
          </h1>
          <p>Enter your password and you'll be watching in no time.</p>
          <Controller
            control={control}
            name="email"
            defaultValue={auth.user?.email}
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
                  className={` w-full text-xs text-[#333333] sm:text-lg flex flex-row items-center`}
                >
                  <input
                    type="text"
                    id="email"
                    value={value}
                    onChange={onChange}
                    className={`block  pb-1 pt-5 flex-1 bg-inherit text-inherit focus:outline-none focus:ring-0 peer`}
                    placeholder=" "
                    autoComplete="off"
                    readOnly
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-md text-gray-700 duration-300 transform -translate-y-3 scale-[0.7] top-[0.9rem] z-10 origin-[0] left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.7] peer-focus:-translate-y-3"
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
                message: "Password is required.",
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
                  Enter your password
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

          <button
            type="submit"
            className="group relative flex w-full mt-10 justify-center rounded-md border border-transparent bg-netflix py-3 px-7 sm:text-lg font-medium text-white hover:bg-red-700 focus:outline-none "
            onClick={(e: any) => {
              e.preventDefault();
              handleSubmit(handleNext)();
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

export default Password;
