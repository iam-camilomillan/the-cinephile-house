import { useEffect, useState } from "react";

/* Context imports */
import { useAuth } from "~/context/AuthContext";
import { useData } from "~/context/DataContext";

/* Icons imports */
import { FaRegStar, FaStar } from "react-icons/fa";

/* Types imports */
import type { Movie } from "types";

const RateButton = ({ movie }: { movie: Movie }) => {
  /* Context */
  const { user } = useAuth();
  const { getUserData, addRating } = useData();

  /* Rating state */
  const [rating, setRating] = useState(0);

  /* Options state */
  const [showOptions, setShowOptions] = useState(false);
  const [hoverOption, setHoverOption] = useState<number>(0);
  const rateOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  /* Handles when click on a rate option */
  const handleRate = async (option: number) => {
    await addRating(user.email, movie.id, option);
    setRating(option);
  };

  /* Change the default rating if the movie is already rated */
  useEffect(() => {
    if (user) {
      getUserData(user.email).then((data: any) => {
        setRating(data?.movies[movie.id]?.rating ?? 0);
      });
    }
  }, [user]);

  return (
    <>
      {/* Rating from TMDB */}
      <span className="text-sm opacity-80">
        TMDB: <span className="text-base font-bold">{movie.vote_average}</span>
        /10
      </span>
      <span>&#8226;</span>
      {/* User rating */}
      <div className="relative flex items-center justify-center gap-1">
        {/* Shows rating and toggle to show options */}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="flex items-center justify-start gap-1 rounded-md px-1 transition-colors duration-200 ease-in-out hover:bg-white/10"
        >
          <FaRegStar className="text-xl " />
          <FaStar
            className={`absolute text-xl transition duration-200 ease-in-out ${
              rating > 0 ? "text-yellow-400 opacity-100" : "opacity-0"
            }`}
          />
          {/* Rating */}
          <div className="opacity-80 transition-opacity duration-200 ease-in-out hover:opacity-100">
            {hoverOption > 0 ? hoverOption : rating}/10
          </div>
        </button>

        {/* Rating options */}
        <div
          className={`absolute ${
            showOptions ? "flex" : "hidden"
          } -top-9 rounded-md border bg-black p-1`}
        >
          {rateOptions.map((value) => (
            <button
              key={value}
              onMouseEnter={() => setHoverOption(value)}
              onMouseLeave={() => setHoverOption(0)}
              onClick={() => {
                handleRate(value);
                setShowOptions(false);
              }}
              className="relative flex items-center justify-center"
            >
              <FaRegStar className="text-xl " />
              <FaStar
                className={`absolute text-xl transition duration-200 ease-in-out ${
                  value <= hoverOption ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default RateButton;
