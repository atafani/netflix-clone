import type { NextPage } from "next";

const SignUpFooter: NextPage = () => {
  return (
    <div className="p-6 lg:px-20  text-gray-600 bg-gray-200 mt-40">
      <a href="https://help.netflix.com/en/contactus" className="mb-7 block">
        Questions? Contact us.
      </a>
      <div className="flex flex-row flex-wrap">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col gap-2">
          <a href="#" className="text-sm">
            FAQ
          </a>
          <a href="#" className="text-sm">
            Privacy
          </a>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col gap-2">
          <a href="#" className="text-sm">
            Help Center
          </a>
          <a href="#" className="text-sm">
            Cookie Preferences
          </a>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col gap-2">
          <a href="#" className="text-sm">
            Netflix Shop
          </a>
          <a href="#" className="text-sm">
            Coorporate Information
          </a>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col gap-2">
          <a href="#" className="text-sm">
            Terms of Use
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpFooter;
