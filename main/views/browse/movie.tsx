import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState, MouseEvent, useCallback } from "react";
import { eSessionStatus } from "enums";
import axios from "axios";
import { Navbar } from "components";
type MovieProps = {
  movieId: number;
};
const moviesDbKey = process.env.MOVIESDB_KEY!;
const Movie = (props: MovieProps) => {
  const { movieId } = props;
  const [movies, setMovies] = useState([]);

  const handleGetMovies = useCallback(async () => {
    // /movie/popular
    const res = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=21773f739f2c79d204754f82c4645dd9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${movieId}`
    );
    console.log(res);
    if (res?.data?.results) {
      setMovies(res.data.results);
    }
  }, [movieId]);

  useEffect(() => {
    handleGetMovies();
  }, [handleGetMovies]);

  return (
    <div className="flex flex-row gap-10">
      {movies.map((movie: any) => {
        return (
          <div key={movie.id} className="my-3">
            {movie.title}
            <Image
              src={`https://image.tmdb.org/t/p/${movie.poater_path}`}
              width={200}
              height={60}
              alt={movie.title}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Movie;
