import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "hooks";

const SignUpHeader: NextPage = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-row justify-between px-6 py-2 border border-b-slate-300 items-center">
      <div>
        <Image src="/images/logo.png" alt="Logo" width="160" height="50" />
      </div>
      <Link href="/login">
        <p className="font-bold text-xl">{user ? "Sign Out" : "Sing In"}</p>
      </Link>
    </div>
  );
};

export default SignUpHeader;
