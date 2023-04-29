import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState, MouseEvent } from "react";
import { eSessionStatus } from "enums";

const SignUpHeader: NextPage = () => {
  const [isUserSignedIn, setIsUserSIgnedIn] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === eSessionStatus.Authenticated) setIsUserSIgnedIn(true);
  }, [status]);

  const handleSignOut = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await signOut();
  };

  return (
    <div className="flex flex-row justify-between px-6 py-2 border border-b-slate-300 items-center">
      <div>
        <Image src="/images/logo.png" alt="Logo" width="160" height="50" />
      </div>
      <Link
        href="/login"
        onClick={(e: MouseEvent<HTMLAnchorElement>) =>
          isUserSignedIn && handleSignOut(e)
        }
      >
        <p className="font-bold text-xl">
          {isUserSignedIn ? "Sign Out" : "Sing In"}
        </p>
      </Link>
    </div>
  );
};

export default SignUpHeader;
