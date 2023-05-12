import Image from "next/image";
import { useEffect, useState, useCallback, MouseEvent, useRef } from "react";
import { api } from "config";
import { MovieDTO } from "dtos";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type MoviesByGenreProps = {
  genre: string;
};

const MoviesByGenre = (props: MoviesByGenreProps) => {
  const { genre } = props;
  const [movies, setMovies] = useState<MovieDTO[]>([]);
  const [hoveredMovie, setHoveredMovie] = useState<MovieDTO>();
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleGetMovies = useCallback(async () => {
    const res = await api.get(`/api/movies?genre=${genre}`);
    if (res?.data) {
      setMovies(res.data);
    }
  }, [genre]);

  const handleHoverMovie = (
    movie: MovieDTO,
    e: MouseEvent<HTMLDivElement>,
    hovered: boolean
  ) => {
    const target: Element = e.target as Element;
    const scrollContainer: HTMLElement = ref?.current as HTMLElement;
    setHoveredMovie(
      target.id === `${genre}${movie._id}` && hovered ? movie : undefined
    );
    setShowLeftArrow(scrollContainer.scrollLeft === 0 ? false : true);
    setShowRightArrow(scrollContainer.scrollLeft === 0 ? true : false);
  };

  const smoothScroll = (
    container: HTMLElement,
    distance: number,
    duration: number
  ) => {
    let start: number | null = null;
    const initialScroll = container?.scrollLeft || 0;

    if (container) {
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const newScrollPosition =
          initialScroll + (distance * progress) / duration;
        container.scrollLeft = newScrollPosition;

        if (progress < duration) window.requestAnimationFrame(step);
      };

      window.requestAnimationFrame(step);
    }
  };

  const handleScrollMovies = (e: MouseEvent<HTMLDivElement>, left: boolean) => {
    const target: HTMLElement = ref?.current as HTMLElement;
    if (target) {
      const dimensions = target.getBoundingClientRect();
      smoothScroll(target, left ? dimensions.width : -dimensions.width, 400);
    }
    console.log(target);
  };

  useEffect(() => {
    handleGetMovies();
  }, [handleGetMovies]);

  return (
    <div className="relative">
      <div
        className={`grid grid-flow-col gap-2 py-3 z-10 mb-6 ${
          hoveredMovie ? "overflow-x-clip" : "overflow-x-scroll"
        }`}
        ref={ref}
      >
        <div
          className={`absolute  ${
            showLeftArrow ? "w-fit p-3" : "w-0 p-0"
          } left-0 z-50 text-4xl hover:bg-black/40 hover:cursor-pointer h-full  flex items-center transition-colors duration-500`}
          onClick={(e: MouseEvent<HTMLDivElement>) =>
            handleScrollMovies(e, true)
          }
        >
          <IoIosArrowBack />
        </div>
        <div
          className={`absolute  ${
            showRightArrow ? "w-fit p-3" : "w-0 p-0"
          } right-0 z-50 text-4xl hover:bg-black/40 hover:cursor-pointer h-full  flex items-center transition-colors duration-500`}
          onClick={(e: MouseEvent<HTMLDivElement>) =>
            handleScrollMovies(e, false)
          }
        >
          <IoIosArrowForward />
        </div>
        {movies.length === 0 && (
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-2 bg-slate-700 rounded"></div>
              <div className="h-2 bg-slate-700 rounded"></div>
            </div>
          </div>
        )}
        {movies.map((movie: MovieDTO, i: number) => (
          <div
            key={`${genre}${movie._id}`}
            className="w-[13rem] h-[7rem] relative"
            onMouseEnter={(e: MouseEvent<HTMLDivElement>) =>
              handleHoverMovie(movie, e, true)
            }
            onMouseLeave={(e: MouseEvent<HTMLDivElement>) =>
              handleHoverMovie(movie, e, false)
            }
          >
            <div
              className={`w-[13rem] h-[7rem] rounded-sm cursor-pointer transform transition-all duration-500 ${
                hoveredMovie?._id === movie._id
                  ? `absolute -translate-y-1/2 scale-150 rounded-t-md ${
                      i === 0 ? "translate-x-12 z-40" : "z-20"
                    }`
                  : "scale-100"
              }`}
            >
              <Image
                src={`${movie.poster}`}
                id={`${genre}${movie._id}`}
                width={780}
                height={80}
                alt={movie.title}
                className="max-w-full max-h-full object-cover rounded-sm"
              />
              <div
                className={`bg-zinc-900 p-3 text-xs rounded-b-md ${
                  hoveredMovie?._id === movie._id ? "block" : "hidden"
                }`}
              >
                <p className="text-[12px] flex flex-row justify-between gap-3">
                  {movie.title}
                  <span className="text-[8px] text-gray-600">{movie.type}</span>
                </p>
                <p className="text-[9px] mt-1 text-gray-400">
                  {movie.genre?.split(", ").join(" ~ ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesByGenre;
