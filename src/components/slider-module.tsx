import { useEffect, useState } from "react";

/* Components imports */
import Slider from "./slider";

/* React spinners imports */
import { ClipLoader } from "react-spinners";

/* Util imports */
import { api } from "~/utils/api";

/* Types imports */
import { Movie, TVShow } from "types";

const SliderModule = ({
  title,
  categories,
  headers,
  options,
}: {
  title: string;
  categories: string[];
  headers: string[];
  options: string[];
}) => {
  const [dataOne, setDataOne] = useState<Movie[] | TVShow[] | null>(null);
  const [dataTwo, setDataTwo] = useState<Movie[] | TVShow[] | null>(null);
  const [currentOption, setCurrentOption] = useState(options[0]);

  const requestOne = api.tmbd.fetchTMDB.useQuery({
    categorie: categories[0] ?? "",
    header: headers[0] ?? "",
  });

  const requestTwo = api.tmbd.fetchTMDB.useQuery(
    {
      categorie: categories[1] ?? categories[0] ?? "",
      header: headers[1] ?? headers[0] ?? "",
    },
    { enabled: options[1] ? true : false },
  );

  useEffect(() => {
    if (requestOne.data?.results) {
      setDataOne(requestOne.data.results);
    }
    if (requestTwo.data?.results) {
      setDataTwo(requestTwo.data.results);
    }
  }, [requestOne.data, requestTwo.data]);

  return (
    <div>
      <div className="flex items-center">
        <h2 className="text-2xl font-medium">{title}</h2>

        <div className="w-4" />

        {options.length != 1 ? (
          <div className="border-clr-one relative flex items-center gap-4 overflow-hidden rounded-full border px-2 py-1">
            {/* First option */}
            <button
              onClick={() => {
                setCurrentOption(options[0]);
              }}
              className={`${
                currentOption == options[0] ? "text-white" : "text-black"
              } w-20 transition-colors duration-200 ease-in-out`}
            >
              {options[0]}
            </button>

            {/* Second option */}
            <button
              onClick={() => {
                setCurrentOption(options[1]);
              }}
              className={`${
                currentOption == options[0] ? "text-black" : "text-white"
              } w-20 transition-colors duration-200 ease-in-out`}
            >
              {options[1]}
            </button>

            {/* Option background */}
            <div
              className={`absolute left-0 top-0 -z-10 h-full w-1/2 ${
                currentOption == options[0] ? null : "translate-x-full"
              } bg-clr-one rounded-full transition-transform duration-200 ease-in-out`}
            />
          </div>
        ) : null}
      </div>

      <div className="h-2" />

      {/* Slider */}
      {requestOne.isLoading ? (
        <div className="flex h-full w-full items-center justify-center px-8">
          <ClipLoader
            color="rgba(220, 38 ,38, 1)"
            loading={true}
            size={128}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : requestTwo.isLoading ? (
        <div className="flex h-full w-full items-center justify-center px-8">
          <ClipLoader
            color="rgba(220, 38 ,38, 1)"
            loading={true}
            size={128}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <Slider
          data={currentOption == options[0] ? dataOne : dataTwo}
          sliderId={title}
        />
      )}
    </div>
  );
};

export default SliderModule;
