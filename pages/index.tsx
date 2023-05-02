import { UserDTO } from "dtos";
import { eAuthStatus, eSessionStatus } from "enums";
import { useAuth } from "hooks";
import type { GetServerSidePropsContext, NextPage } from "next";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { authOptions } from "./api/auth/[...nextauth]";
import { Spinner } from "components";
type GetStartedForm = {
  email: string;
};
type Question = {
  id: number;
  title: string;
  ans: string;
};
const QUESTIONS: Question[] = [
  {
    id: 1,
    title: "What is Netflix?",
    ans: `Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.

  You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!
  
  `,
  },
  {
    id: 2,
    title: "How much does Netflix cost?",
    ans: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from EUR4.99 to EUR9.99 a month. No extra costs, no contracts.",
  },
];
const Index: NextPage = () => {
  const { control, handleSubmit } = useForm<GetStartedForm>();
  const { control: control1, handleSubmit: handleSubmit1 } =
    useForm<GetStartedForm>();
  const [selectedId, setSelectedId] = useState<number>(-1);
  const [isRegistering, setIsRegistering] = useState(false);
  const { handleRegister, auth } = useAuth();
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      console.log("WHY IS IT NOT AUTHENTICATED");
    },
  });

  useEffect(() => {
    if (status === eSessionStatus.Authenticated) router.push("/browse");
  }, [status]);

  const handleGetStarted = async (data: GetStartedForm) => {
    setIsRegistering(true);
    const res = await handleRegister(data);
    setIsRegistering(false);
    res && router.push("/signup/registration");
  };

  useEffect(() => {
    const user: UserDTO = session?.user as UserDTO;
    if (user) {
      user.plan ? router.push("/browse") : router.push("/signup/planform");
    }
  }, [session]);

  return (
    <div className="bg-[#080A1B]">
      <div className="flex min-h-screen flex-row items-center justify-center bg-[url('/images/login-bg.png')] bg-no-repeat bg-cover bg-blend-darken relative">
        <div className="fixed z-10 top-0 left-0 right-0 bottom-0  bg-gradient-to-tr from-[#080A1B] opacity-40"></div>
        <div className="absolute z-20 top-0 left-0 right-0  bg-gradient-to-t to-[rgba(8,10,27,0.70)] from-[#080A1B] via-[#080A1B]">
          <div className="flex flex-row justify-between items-center p-5 md:px-10">
            <div>
              <Image src="/images/logo.png" alt="me" width="160" height="50" />
            </div>
            <Link href="/login">
              <button className="bg-netflix text-white rounded px-4 py-1 hover:cursor-pointer hover:bg-red-700">
                Sing In
              </button>
            </Link>
          </div>
          <div className="px-9  md:px-[10%] py-10 md:py-14 lg:max-w-[80%]">
            <h1 className="text-white text-4xl md:text-5xl xl:text-6xl font-bold leading-8">
              Unlimited movies, TV shows, and more.
            </h1>
            <p className="text-white my-4 text-lg">
              Plans now start at EUR4.99/month
            </p>
            <p className="text-white text-lg">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <form action="#" className="z-20 relative flex flex-row gap-3 mt-4">
              <Controller
                control={control}
                name="email"
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "Please enter a valid email.",
                  },
                  validate: (value: string) =>
                    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/.test(value) ||
                    "Please enter a valid email.",
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <div className="relative  w-80">
                    <input
                      type="email"
                      id="email"
                      value={value}
                      onChange={onChange}
                      className={`block px-5 pb-1 pt-5 w-full text-xs text-gray-100 sm:text-lg rounded-md border border-[#333333]  appearance-none focus:outline-none focus:ring-0 peer bg-transparent ${
                        error ? " border-red-600" : ""
                      }`}
                      placeholder=" "
                      autoComplete="off"
                      ref={ref}
                    />
                    {error && (
                      <p className="text-red-600  text-xs mt-2">
                        {error.message}
                      </p>
                    )}
                    <label
                      htmlFor="email"
                      className="absolute text-md text-gray-400 duration-300 transform -translate-y-3 scale-[0.7] top-[0.9rem] z-10 origin-[0] left-5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.7] peer-focus:-translate-y-3"
                    >
                      Email address
                    </label>
                  </div>
                )}
              />

              <div>
                <button
                  type="submit"
                  className="group w-full min-w-[9rem] justify-center rounded-md border border-transparent bg-netflix py-3 px-5 sm:text-xl font-medium text-white hover:bg-red-700 focus:outline-none "
                  onClick={(e: any) => {
                    e.preventDefault();
                    handleSubmit(handleGetStarted)();
                  }}
                >
                  {isRegistering ? <Spinner /> : "Get Started"}
                </button>
              </div>
            </form>
          </div>
          <div className="p-10 md:px-[10%] text-white bg-gradient-to-tl from-blue-900 via-blue-900 to-netflix mx-8 rounded-md mt-5">
            <div className="flex flex-row items-center flex-wrap">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold">Enjoy on your TV.</h2>
                <p className="mt-3">
                  Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
                  Blu-ray players, and more.
                </p>
              </div>
              <img
                className="w-full md:w-1/2"
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/cards/v2.1/enjoyOnTv/en.png"
              />
            </div>
            <div className="p-[0.2rem] bg-[#080A1B] rounded-sm my-5"></div>
            <div className="flex flex-row items-center flex-wrap">
              <img
                className="w-full md:w-1/2"
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/cards/v2.1/watchEverywhere/en.png"
              />
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold">Watch everywhere.</h2>
                <p className="mt-3">
                  Stream unlimited movies and TV shows on your phone, tablet,
                  laptop, and TV without paying more.
                </p>
              </div>
            </div>
            <div className="p-[0.2rem] bg-[#080A1B] rounded-sm my-5"></div>
            <div className="flex flex-row items-center flex-wrap">
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold">
                  Create profiles for kids.
                </h2>
                <p className="mt-3">
                  Send kids on adventures with their favorite characters in a
                  space made just for them—free with your membership.
                </p>
              </div>
              <img
                className="w-full md:w-1/2"
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/cards/v2.1/kids/en.png"
              />
            </div>
            <div className="p-[0.2rem] bg-[#080A1B] rounded-sm my-5"></div>
            <div className="flex flex-row items-center flex-wrap">
              <img
                className="w-full md:w-1/2"
                src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/cards/v2.1/download/en.png"
              />
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl font-bold">
                  Download your shows to watch offline.
                </h2>
                <p className="mt-3">
                  Save your favorites easily and always have something to watch.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-20 w-[80%] mx-auto">
            <h1 className="text-white text-3xl lg:text-4xl font-bold my-10">
              Frequently Asked Questions
            </h1>
            {QUESTIONS.map((question: Question) => (
              <div key={question.id} className="h-fit my-5">
                <div
                  className="flex flex-row justify-between items-center text-white bg-slate-800 p-6 rounded-sm hover:bg-slate-600 hover:cursor-pointer"
                  onClick={() =>
                    setSelectedId(selectedId === question.id ? -1 : question.id)
                  }
                >
                  <p className="text-lg lg:text-2xl">{question.title}</p>
                  {selectedId !== question.id ? (
                    <AiOutlinePlus className="text-3xl" />
                  ) : (
                    <IoMdClose className="text-3xl" />
                  )}
                </div>
                <div
                  className={`overflow-hidden rounded-sm transition-all duration-500 slide-down text-white bg-slate-800 mt-[0.5px] ${
                    selectedId === question.id ? "h-fit" : "h-0"
                  }`}
                >
                  <p className="p-5 lg:text-lg">{question.ans}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-2/3 px-[10%] my-3">
            <p className="text-white text-lg">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <form
              action="#"
              className="z-20 relative flex flex-row gap-3 mt-4 "
            >
              <Controller
                control={control1}
                name="email"
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: "Please enter an email.",
                  },
                  validate: (value: string) =>
                    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/.test(value) ||
                    "Please enter a valid email.",
                }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <div className="relative w-80">
                    <input
                      type="email"
                      id="email"
                      value={value}
                      onChange={onChange}
                      className={`block px-5 pb-1 pt-5 w-full text-xs text-gray-100 sm:text-lg rounded-md border border-[#333333]  appearance-none focus:outline-none focus:ring-0 peer bg-transparent ${
                        error ? " border-red-600" : ""
                      }`}
                      placeholder=" "
                      autoComplete="off"
                      ref={ref}
                    />
                    {error && (
                      <p className="text-red-600  text-xs mt-2">
                        {error.message}
                      </p>
                    )}
                    <label
                      htmlFor="email"
                      className="absolute text-md text-gray-400 duration-300 transform -translate-y-3 scale-[0.7] top-[0.9rem] z-10 origin-[0] left-5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-[0.7] peer-focus:-translate-y-3"
                    >
                      Email address
                    </label>
                  </div>
                )}
              />
              <div>
                <button
                  type="submit"
                  className="group w-full min-w-[9rem] justify-center rounded-md border border-transparent bg-netflix py-3 px-5 sm:text-xl font-medium text-white hover:bg-red-700 focus:outline-none "
                  onClick={(e: any) => {
                    e.preventDefault();
                    handleSubmit(handleGetStarted)();
                  }}
                >
                  {isRegistering ? <Spinner /> : "Get Started"}
                </button>
              </div>
            </form>
          </div>
          <div className="px-[10%] my-20 text-white ">
            <a
              href="https://help.netflix.com/en/contactus"
              className="my-7 block"
            >
              Questions? Contact us.
            </a>
            <div className="flex flex-row flex-wrap">
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col gap-2">
                <a href="#" className="text-sm">
                  FAQ
                </a>
                <a href="#" className="text-sm">
                  Investor Relations
                </a>
                <a href="#" className="text-sm">
                  Privacy
                </a>
                <a href="#" className="text-sm">
                  Speed Test
                </a>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col gap-2">
                <a href="#" className="text-sm">
                  Help Center
                </a>
                <a href="#" className="text-sm">
                  Jobs
                </a>
                <a href="#" className="text-sm">
                  Cookie Preferences
                </a>
                <a href="#" className="text-sm">
                  Legal Notices
                </a>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col gap-2">
                <a href="#" className="text-sm">
                  Account
                </a>
                <a href="#" className="text-sm">
                  Ways to Watch
                </a>
                <a href="#" className="text-sm">
                  Coorporate Information
                </a>
                <a href="#" className="text-sm">
                  Only on Netflix
                </a>
              </div>
              <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex flex-col gap-2">
                <a href="#" className="text-sm">
                  Media Center
                </a>
                <a href="#" className="text-sm">
                  Terms of Use
                </a>
                <a href="#" className="text-sm">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
