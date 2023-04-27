import type { NextPage } from "next";
import { SignUpFooter, SignUpHeader } from "views";
import { BiCheck } from "react-icons/bi";
import { CiCircleCheck } from "react-icons/ci";
import { useRouter } from "next/router";

const SignUp: NextPage = () => {
  const router = useRouter();
  return (
    <div className="relative">
      <SignUpHeader />
      <div className="my-40 flex flex-col justify-center items-center">
        <div className="w-2/3 md:w-1/2 lg:w-1/4 xl:w-1/5 text-center">
          <CiCircleCheck className="text-netflix text-5xl font-light mx-auto mb-4" />
          <p className="text-xl uppercase">Step 2 of 3</p>
          <h1 className="text-3xl my-2 mb-5  font-medium">Choose your plan.</h1>
          <div className="flex flex-row items-center my-2">
            <BiCheck className="mr-2 text-3xl text-netflix" />
            <p className="text-start">No commitments, cancel anytime.</p>
          </div>
          <div className="flex flex-row items-center my-2">
            <BiCheck className="mr-2 text-3xl text-netflix" />
            <p className="text-start">
              Everything on Netflix for one low price.
            </p>
          </div>
          <div className="flex flex-row items-center my-2">
            <BiCheck className="mr-2 text-3xl text-netflix" />
            <p className="text-start">Unlimited viewing on all devices.</p>
          </div>
          <button
            type="button"
            className="group relative flex w-full mt-10 justify-center rounded-md border border-transparent bg-netflix py-3 px-7 sm:text-lg font-medium text-white hover:bg-red-700 focus:outline-none "
            onClick={() => router.push("/signup/planform")}
          >
            Next
          </button>
        </div>
      </div>
      <SignUpFooter />
    </div>
  );
};

export default SignUp;
