import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  getCountries,
  getCountryCallingCode,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import { FaCaretDown } from "react-icons/fa";
import { signIn } from "next-auth/react";
type SignInForm = {
  emailPhone: string;
  password: string;
};
const Login: NextPage = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [country, setCountry] = useState<any>("AL");
  const [isCountrySelectShown, setIsCountrySelectShown] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const { control, handleSubmit } = useForm<SignInForm>();
  const router = useRouter();
  const handleShowPassword = () => {
    setIsPasswordShown(!isPasswordShown);
    if (ref.current) {
      ref.current.focus();
    }
    setIsPasswordShown(!isPasswordShown);
  };

  const handleSignIn = async (data: SignInForm) => {
    console.log(data);
    const res = await signIn("credentials", {
      email: data.emailPhone,
      password: data.password,
      redirect: false,
    });
    console.log("sign in res", res);
    // router.push("/browse");
  };
  const regionNames = new Intl.DisplayNames(["us"], { type: "region" });
  return (
    <div className="flex min-h-screen flex-row items-center justify-center bg-black sm:bg-[url('/images/login-bg.png')] bg-no-repeat bg-cover  relative md:py-20">
      <div className="absolute z-10 top-0 left-0 w-full h-full bg-black opacity-50"></div>
      <form
        action="#"
        className="w-full sm:w-[30rem] z-20 relative py-20 px-5 sm:px-16 pb-32"
      >
        <div className="absolute hidden sm:block z-30 top-0 left-0 w-full h-full bg-black opacity-80  rounded-sm"></div>
        <div className="relative z-40">
          <h3 className="text-white text-3xl sm:text-4xl mb-8 font-bold">
            Sign In
          </h3>
          <div className="-space-y-px rounded-md shadow-sm">
            <Controller
              control={control}
              name="emailPhone"
              rules={{
                required: {
                  value: true,
                  message: "Please enter a valid email or phone number.",
                },
                minLength: {
                  value: 10,
                  message: "Please enter a valid email or phone number.",
                },
              }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <div className="relative my-4 ">
                  <div
                    className={` w-full text-xs text-gray-100 sm:text-lg rounded-md border border-[#333333] appearance-none  bg-[#333333] ${
                      error ? " border-b-orange-400" : ""
                    } flex flex-row items-center`}
                  >
                    <input
                      type="text"
                      id="emailPhone"
                      value={value}
                      onChange={onChange}
                      className={`block px-5 pb-1 pt-5 flex-1 bg-inherit text-inherit focus:outline-none focus:ring-0 peer`}
                      placeholder=" "
                      autoComplete="off"
                    />
                    {/^[0-9]+$/.test(value) && (
                      <p
                        className="text-sm text-gray-400  align-middle hover:cursor-pointer"
                        onClick={() =>
                          setIsCountrySelectShown(!isCountrySelectShown)
                        }
                      >
                        {`+${getCountryCallingCode(country)}`}
                        <FaCaretDown className="inline" />
                      </p>
                    )}
                    <div
                      className={`absolute top-full left-0 right-0 z-30 bg-neutral-600 overflow-y-scroll rounded-md transition-all duration-400 slide-down ${
                        isCountrySelectShown ? "h-[15rem] p-5" : "h-0 p-0"
                      }`}
                    >
                      {getCountries().map((c: any) => (
                        <p
                          key={c}
                          className="py-2 px-3 hover:bg-neutral-500 hover:cursor-pointer text-sm"
                          onClick={() => {
                            setCountry(c);
                            setIsCountrySelectShown(false);
                          }}
                        >
                          {regionNames.of(c)}
                        </p>
                      ))}
                    </div>
                    <label
                      htmlFor="email"
                      className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-[0.7] top-[0.9rem] z-10 origin-[0] left-5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.7] peer-focus:-translate-y-3"
                    >
                      Email or phone number
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
                    className={`block px-5 pb-1 pt-5 w-full text-xs text-gray-100 sm:text-lg rounded-md border border-[#333333]  appearance-none focus:outline-none focus:ring-0 peer bg-[#333333] ${
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
          </div>

          <button
            type="submit"
            className="group relative flex w-full mt-10 justify-center rounded-md border border-transparent bg-netflix py-3 px-4 sm:text-lg font-medium text-white hover:bg-red-700 focus:outline-none "
            onClick={(e: any) => {
              e.preventDefault();
              handleSubmit(handleSignIn)();
            }}
          >
            Sign in
          </button>
          <div className="flex items-center justify-between gap-5 mt-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="accent-white mr-1"
              />
              <label htmlFor="remember-me" className="text-gray-400 text-sm">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className=" text-gray-400 hover:underline">
                Need help
              </a>
            </div>
          </div>
          <p className="text-gray-500 my-5 text-md">
            New to Netflix?
            <Link href="/">
              <span className="text-white ml-1">Sign up now</span>
            </Link>
            .
          </p>
          <p className="text-gray-500 my-3 text-sm">
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <Link href="#">
              <span className="text-blue-500">Learn more.</span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
