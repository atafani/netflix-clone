import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState, MouseEvent, useCallback } from "react";
import { eSessionStatus } from "enums";
import axios from "axios";
import { Navbar } from "components";
import MoviesByGenre from "./moviesByGenre";
type Genre = {
  id: number;
  name: string;
};
const Home = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const handleGetMovies = useCallback(async () => {
    const res = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list?api_key=21773f739f2c79d204754f82c4645dd9"
    );
    if (res?.data?.genres) {
      setGenres(res.data.genres);
    }
  }, []);

  useEffect(() => {
    handleGetMovies();
  }, [handleGetMovies]);

  return (
    <div className="min-h-full bg-black text-white">
      <Navbar />
      <div className="px-16">
        {genres.length > 0 &&
          genres.map((genre: Genre) => {
            return (
              <div key={genre.id}>
                <p className="text-xl">{genre.name}</p>
                <MoviesByGenre genreId={genre.id} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
