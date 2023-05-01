import Image from "next/image";
import Link from "next/link";
import { BiBell } from "react-icons/bi";
const Navbar = () => {
  return (
    <div className="bg-black flex flex-row gap-8 justify-between px-12 py-2 text-white">
      <div className="flex flex-row gap-8 items-center">
        <Image
          src="/images/logo.png"
          width={120}
          height={60}
          alt="Netflix Logo"
        />
        <div className="flex flex-row gap-5 text-sm">
          <Link href="/browse">Home</Link>
          <Link href="/browse/genre">TV Shows</Link>
          <Link href="/browse/genre">Movies</Link>
          <Link href="/browse/latest">Latest</Link>
          <Link href="/browse/my-list">My List</Link>
        </div>
      </div>
      <div className="flex flex-row items-center gap-5">
        <Link href="/kids">Kids</Link>
        <BiBell className="text-xl" />
        <Image
          src="http://occ-0-6035-114.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY5cwIbM7shRfcXmfQg98cqMqiZZ8sReZnj4y_keCAHeXmG_SoqLD8SXYistPtesdqIjcsGE-tHO8RR92n7NyxZpqcFS80YfbRFz.png?r=229"
          width={30}
          height={30}
          alt="Profile Pic"
        />
      </div>
    </div>
  );
};
export default Navbar;
