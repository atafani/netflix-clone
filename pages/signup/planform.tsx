import type { NextPage } from "next";
import Link from "next/link";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiCheck } from "react-icons/bi";
import { SignUpFooter, SignUpHeader } from "views";
enum PlanType {
  Basic,
  Standard,
  Premium,
}
type ChoosePlanForm = {
  type: PlanType;
};
const PLAN_DATA = [
  {
    id: 1,
    title: "Monthly Price",
    basic: "EUR4.99",
    standard: "EUR7.99",
    premium: "EUR9.99",
  },
  {
    id: 2,
    title: "Video Quality",
    basic: "Good",
    standard: "Better",
    premium: "Best",
  },
  {
    id: 3,
    title: "Resolution",
    basic: "720p",
    standard: "1080p",
    premium: "4K+HDR",
  },
];
const PlanForm: NextPage = () => {
  const { control, handleSubmit } = useForm<ChoosePlanForm>();
  return (
    <div className="relative">
      <SignUpHeader />
      <div className="flex flex-col justify-center items-center">
        <div className="w-full px-5 lg:px-0 lg:w-2/3 my-8">
          <p className="text-xl uppercase mt-8">Step 2 of 3</p>
          <h1 className="text-2xl font-bold my-2">
            Choose the plan that's right for you
          </h1>
          <div className="flex flex-row items-center">
            <BiCheck className="mr-2 text-3xl text-netflix" />
            <p className="text-start">Watch all you want. Ad-free.</p>
          </div>
          <div className="flex flex-row items-center">
            <BiCheck className="mr-2 text-3xl text-netflix" />
            <p className="text-start">Recommendations just for you.</p>
          </div>
          <div className="flex flex-row items-center">
            <BiCheck className="mr-2 text-3xl text-netflix" />
            <p className="text-start">Change or cancel your plan anytime .</p>
          </div>
          <Controller
            control={control}
            name="type"
            defaultValue={PlanType.Premium}
            rules={{
              required: {
                value: true,
                message: "Please choose a plan.",
              },
            }}
            render={({
              field: { onChange, onBlur, value, name, ref },
              fieldState: { invalid, isTouched, isDirty, error },
              formState,
            }) => (
              <div className="my-4 ">
                <table className="table-auto w-full">
                  <thead>
                    <tr>
                      <td className="hidden lg:table-cell"></td>
                      <td
                        className="p-1 lg:p-5"
                        onClick={() => onChange(PlanType.Basic)}
                      >
                        <div
                          className={`relative mx-auto text-white w-28 h-16 lg:h-28 flex justify-center items-center ${
                            value === PlanType.Basic
                              ? "bg-netflix"
                              : "bg-red-400 "
                          }`}
                        >
                          Basic
                          {value === PlanType.Basic && (
                            <div
                              className={`absolute top-full border-8  border-transparent border-t-netflix`}
                            ></div>
                          )}
                        </div>
                      </td>
                      <td
                        className="p-1 lg:p-5"
                        onClick={() => onChange(PlanType.Standard)}
                      >
                        <div
                          className={`relative mx-auto text-white w-28 h-16 lg:h-28 flex justify-center items-center ${
                            value === PlanType.Standard
                              ? "bg-netflix"
                              : "bg-red-400 "
                          }`}
                        >
                          Standard
                          {value === PlanType.Standard && (
                            <div
                              className={`absolute top-full border-8  border-transparent border-t-netflix`}
                            ></div>
                          )}
                        </div>
                      </td>
                      <td
                        className="p-1 lg:p-5"
                        onClick={() => onChange(PlanType.Premium)}
                      >
                        <div
                          className={`relative mx-auto text-white w-28 h-16 lg:h-28 flex justify-center items-center ${
                            value === PlanType.Premium
                              ? "bg-netflix"
                              : "bg-red-400 "
                          }`}
                        >
                          Premium
                          {value === PlanType.Premium && (
                            <div
                              className={`absolute top-full border-8  border-transparent border-t-netflix`}
                            ></div>
                          )}
                        </div>
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {PLAN_DATA.map((data: any) => (
                      <>
                        <tr className="lg:hidden">
                          <td colSpan={3} className="text-center text-sm pt-5">
                            {data.title}
                          </td>
                        </tr>
                        <tr className="border-b-[1px] border-b-slate-100 ">
                          <td className="p-3 hidden lg:table-cell">
                            {data.title}
                          </td>
                          <td
                            className={`p-3 text-center font-medium ${
                              value === PlanType.Basic
                                ? "text-netflix"
                                : "text-gray-600"
                            }`}
                            onClick={() => onChange(PlanType.Basic)}
                          >
                            {data.basic}
                          </td>
                          <td
                            className={`p-3 text-center font-medium ${
                              value === PlanType.Standard
                                ? "text-netflix"
                                : "text-gray-600"
                            }`}
                            onClick={() => onChange(PlanType.Standard)}
                          >
                            {data.standard}
                          </td>
                          <td
                            className={`p-3 text-center font-medium ${
                              value === PlanType.Premium
                                ? "text-netflix"
                                : "text-gray-600"
                            }`}
                            onClick={() => onChange(PlanType.Premium)}
                          >
                            {data.premium}
                          </td>
                        </tr>
                      </>
                    ))}
                    <tr className="lg:hidden">
                      <td colSpan={3} className="text-center text-sm pt-5">
                        Watch on your TV, computer, mobile phone and tablet
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 hidden lg:table-cell">
                        Watch on your TV, computer, mobile phone and tablet
                      </td>
                      <td
                        className="p-3"
                        onClick={() => onChange(PlanType.Basic)}
                      >
                        <BiCheck
                          className={`mx-auto text-3xl ${
                            value === PlanType.Basic
                              ? "text-netflix"
                              : "text-red-400"
                          }`}
                        />
                      </td>
                      <td
                        className="p-3"
                        onClick={() => onChange(PlanType.Standard)}
                      >
                        <BiCheck
                          className={`mx-auto text-3xl ${
                            value === PlanType.Standard
                              ? "text-netflix"
                              : "text-red-400"
                          }`}
                        />
                      </td>
                      <td
                        className="p-3"
                        onClick={() => onChange(PlanType.Premium)}
                      >
                        <BiCheck
                          className={`mx-auto text-3xl ${
                            value === PlanType.Premium
                              ? "text-netflix"
                              : "text-red-400"
                          }`}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p className="text-sm my-2 px-3 mt-6">
                  HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability
                  subject to your internet service and device capabilities. Not
                  all content is available in all resolutions. See our
                  <Link
                    href="https://help.netflix.com/legal/termsofuse"
                    className="text-blue-500 mx-1"
                  >
                    Terms of Use
                  </Link>
                  for more details.
                </p>
                <p className="text-sm my-2 px-3">
                  Only people who live with you may use your account. Watch on 4
                  different devices at the same time with Premium, 2 with
                  Standard and 1 with Basic.
                </p>
                {error && (
                  <p className="text-orange-500 text-xs mt-2">
                    {error.message}
                  </p>
                )}
              </div>
            )}
          />

          <button
            type="submit"
            className="group relative flex w-full max-w-md mx-auto mt-10 justify-center rounded-md border border-transparent bg-netflix py-3 px-7 sm:text-lg font-medium text-white hover:bg-red-700 focus:outline-none "
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

export default PlanForm;
