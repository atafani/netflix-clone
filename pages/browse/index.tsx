import axios from "axios";
import { api } from "config";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Home } from "views";
type Profile = {
  id: number;
  name: string;
  img: string;
};
const PROFILES: Profile[] = [
  {
    id: 1,
    name: "Anxhela",
    img: "http://occ-0-6035-114.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY5cwIbM7shRfcXmfQg98cqMqiZZ8sReZnj4y_keCAHeXmG_SoqLD8SXYistPtesdqIjcsGE-tHO8RR92n7NyxZpqcFS80YfbRFz.png?r=229",
  },
  {
    id: 2,
    name: "Kids",
    img: "http://occ-0-6035-114.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdCemZ64K8SshrRuXpQ_cGA5j6EDCD-sE1eNV0of8K9ipVocEYtkD0g9MmicVHY185FVSgU3jsnzF9Ii7dVH1ubuGhFXs37HzCjN.png?r=b36",
  },
];
const Browse: NextPage = () => {
  const [selectedProfile, setSelectedProfile] = useState<Profile>(PROFILES[0]);
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/");
    },
  });
  const handleGetMovies = useCallback(async () => {
    const res = await api.get("/api/movies");
    console.log("moveis res", res);
  }, []);
  useEffect(() => {
    handleGetMovies();
  }, [handleGetMovies]);
  return !selectedProfile ? (
    <div className="flex min-h-screen flex-col items-center gap-10 justify-center bg-black relative md:py-20">
      <h1 className="text-white text-5xl">Who's watching?</h1>
      <div className="flex flex-row justify-center align-middle gap-10">
        {PROFILES.map((profile: Profile, index: number) => (
          <div
            key={profile.id}
            onClick={() => setSelectedProfile(profile)}
            className="hover:cursor-pointer"
          >
            <p
              className={`${
                index === 0 ? "text-white" : "text-gray-400"
              } text-center text-lg mt-3`}
            >
              {profile.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>
      <Home />
    </div>
  );
};

export default Browse;
