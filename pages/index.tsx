import type { NextPage } from "next";
import Link from "next/link";
import { useRef, useState } from "react";

const Index: NextPage = () => {

  return (
    <div className="flex min-h-screen flex-row items-center justify-center bg-[url('/images/login-bg.png')] bg-no-repeat bg-cover bg-blend-darken relative">
      <Link href='/login'><p className="text-white rounded-md bg-black py-6 px-20">Sign in</p></Link>
    </div>
  );
};

export default Index;
