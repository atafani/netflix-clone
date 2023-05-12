import { useEffect, useState, useCallback } from "react";
import { Navbar } from "components";
import { api } from "config";
import MoviesByGenre from "./moviesByGenre";
import { MovieDTO } from "dtos";
import Image from "next/image";

const Home = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [showcaseMovie, setShowcaseMovie] = useState<MovieDTO>();

  const handleGenres = useCallback(async () => {
    const res = await api.get("/api/movies/genres");
    if (res?.data) {
      console.log(res.data);
      setGenres(res.data);
    }
  }, []);

  const handleGetShowcase = useCallback(async () => {
    const res = await api.get("/api/movies/showcase");
    if (res?.data) {
      setShowcaseMovie(res.data);
    }
  }, []);

  useEffect(() => {
    handleGenres();
  }, [handleGenres]);

  useEffect(() => {
    handleGetShowcase();
  }, [handleGetShowcase]);

  return (
    <div className="min-h-full bg-black text-white">
      <Navbar />
      {showcaseMovie ? (
        <div className="h-[75vh]">
          <Image
            src={`${showcaseMovie.poster}`}
            width={1400}
            height={1000}
            alt={showcaseMovie.title}
            className="w-full max-h-full object-contain rounded-sm"
          />
        </div>
      ) : (
        ""
      )}
      <div className="px-7 md:px-16">
        {genres.length > 0 &&
          genres.map((genre: string) => {
            return (
              <div key={genre}>
                <p className="text-xl">{genre}</p>
                <MoviesByGenre genre={genre} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
