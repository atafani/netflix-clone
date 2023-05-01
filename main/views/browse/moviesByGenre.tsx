import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState, MouseEvent, useCallback } from "react";
import { eSessionStatus } from "enums";
import axios from "axios";
import { Navbar } from "components";
type MoviesByGenreProps = {
  genreId: number;
};
const moviesDbKey = process.env.MOVIESDB_KEY!;
const MoviesByGenre = (props: MoviesByGenreProps) => {
  const { genreId } = props;
  const [movies, setMovies] = useState([]);

  const handleGetMovies = useCallback(async () => {
    // /movie/popular
    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=21773f739f2c79d204754f82c4645dd9&language=en-US&include_adult=true&include_video=true&page=1&with_genres=${genreId}`
    );
    console.log(res);
    if (res?.data?.results) {
      setMovies(res.data.results);
    }
  }, [genreId]);

  useEffect(() => {
    handleGetMovies();
  }, [handleGetMovies]);

  return (
    <div className="flex flex-row gap-10 overflow-x-hidden">
      {movies.map((movie: any) => {
        return (
          <div key={movie.id} className="w-1/6">
            <Image
              src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
              width={780}
              height={750}
              alt={movie.title}
              className="w-full"
            />
          </div>
        );
      })}
    </div>
  );
};

export default MoviesByGenre;
