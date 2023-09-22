import { useState } from "react";

/* Component imports */
import Slider from "../Slider";

/* Util imports */
import { api } from "~/utils/api";
import { ClipLoader } from "react-spinners";

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
  const [currentOption, setCurrentOption] = useState(options[0]);

  const fetchOne = api.tmbd.fetchTMDB.useQuery({
    categorie: categories[0] ?? "",
    header: headers[0] ?? "",
  });

  const fetchTwo = api.tmbd.fetchTMDB.useQuery({
    categorie: categories[1] ?? categories[0] ?? "",
    header: headers[1] ?? headers[0] ?? "",
  });

  return (
    <div>
      <div className="flex items-center">
        <h2 className="text-2xl font-medium">{title}</h2>

        <div className="w-4" />

        {options.length != 1 ? (
          <div className="relative flex items-center gap-4 overflow-hidden rounded-full border border-red-600 px-2 py-1">
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
              } rounded-full bg-red-600 transition-transform duration-200 ease-in-out`}
            />
          </div>
        ) : null}
      </div>

      <div className="h-2" />

      {/* Slider */}
      {fetchOne.isLoading ? (
        <div className="flex h-full w-full items-center justify-center px-8">
          <ClipLoader
            color="rgba(220, 38 ,38, 1)"
            loading={true}
            size={128}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : fetchTwo.isLoading ? (
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
          data={
            currentOption == options[0]
              ? fetchOne.data?.results
              : fetchTwo.data?.results
          }
          sliderId={title}
        />
      )}
    </div>
  );
};

export default SliderModule;
