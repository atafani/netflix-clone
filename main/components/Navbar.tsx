import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BiBell } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const Navbar = () => {
  const [isGroupHover, setIsGroupHover] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  return (
    <div className="sticky top-0 left-0 bg-black flex flex-row gap-8 justify-between items-center px-7 md:px-12 py-2 text-white z-40">
      <div className="flex flex-row gap-8 items-center relative">
        <div>
          <RxHamburgerMenu
            className="inline-block md:hidden text-2xl"
            onClick={() => setIsNavbarOpen(!isNavbarOpen)}
          />
          <Image
            src="/images/logo.png"
            width={120}
            height={60}
            alt="Netflix Logo"
            className="inline-block"
          />
        </div>
        <div
          className={`${
            isNavbarOpen ? "left-0" : "-left-full"
          } transition-all duration-500 gap-5 p-6 md:p-0 text-sm flex flex-col md:flex-row fixed top-16 h-full bottom-0 left-0 z-40 bg-black md:static`}
        >
          <div className="md:hidden bg-black/90 rounded-sm divide-y">
            <Link
              href="#"
              onClick={() => signOut()}
              className="block hover:underline border-t-white  my-2"
            >
              Account
            </Link>
            <Link
              href="#"
              onClick={() => signOut()}
              className="block hover:underline border-t-white  my-2"
            >
              Sign Out of Netflix
            </Link>
          </div>
          <Link href="#">Home</Link>
          <Link href="#">TV Shows</Link>
          <Link href="#">Movies</Link>
          <Link href="#">Latest</Link>
          <Link href="#">My List</Link>
        </div>
      </div>
      <div className="hidden md:flex flex-row items-center gap-5">
        <Link href="#">Kids</Link>
        <BiBell className="text-xl" />
        <div
          className="relative group hover:cursor-pointer"
          onMouseEnter={() => setIsGroupHover(true)}
          onMouseLeave={() => setIsGroupHover(false)}
        >
          <Image
            src="http://occ-0-6035-114.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY5cwIbM7shRfcXmfQg98cqMqiZZ8sReZnj4y_keCAHeXmG_SoqLD8SXYistPtesdqIjcsGE-tHO8RR92n7NyxZpqcFS80YfbRFz.png?r=229"
            width={34}
            height={34}
            alt="Profile Pic"
            className="inline rounded-sm"
          />
          {isGroupHover ? (
            <IoMdArrowDropup className="inline-block ml-1 text-xl" />
          ) : (
            <IoMdArrowDropdown className="inline-block ml-1 text-xl" />
          )}
          <div className="hidden pt-5 absolute top-full right-0 min-w-[11rem] hover:cursor-pointer text-center group-hover:block">
            <div className=" bg-black/90 rounded-sm divide-y">
              <Link
                href="#"
                onClick={() => signOut()}
                className="block hover:underline border-t-white p-3"
              >
                Sign Out of Netflix
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
