import type { NextPage } from "next";
import { SignUpFooter, SignUpHeader } from "views";
import Image from "next/image";

const Registration: NextPage = () => {
  return (
    <div className="relative">
      <SignUpHeader />
      <div className="my-40 flex flex-col justify-center items-center">
        <div className="w-1/2 lg:w-1/4 text-center">
          <Image
            src="https://assets.nflxext.com/ffe/siteui/acquisition/simplicity/Devices.png"
            alt="Screens"
            width={300}
            height={100}
            className="mx-auto"
          />
          <p className="text-xl uppercase mt-8">Step 1 of 3</p>
          <h1 className="text-2xl my-2">Finish setting up your account</h1>
          <p>Netflix is personaliyed for you.</p>
          <p>Create a password to watch on any device anytime.</p>
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

export default Registration;
