import { useState } from "react";

/* Components imports */
import Card from "~/components/item-card";

/* Icons imports */
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

/* React spinners imports */
import { ClipLoader } from "react-spinners";

const data: any = null;

const Slider = ({ sliderId }: any) => {
  const [showControls, setShowControls] = useState(false);

  /* Scrolls the slider to the left */
  const slideToLeft = () => {
    const slider: any = document.getElementById(sliderId);
    slider.scrollLeft = slider.scrollLeft - 512;
  };

  /* Scrolls the slider to the right */
  const slideToRight = () => {
    const slider: any = document.getElementById(sliderId);
    slider.scrollLeft = slider.scrollLeft + 512;
  };

  return (
    <div
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      className="relative"
    >
      {/* Slide to left button */}
      <button
        onClick={slideToLeft}
        className={`absolute bottom-1/2 left-0 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-red-600 text-lg text-white ${
          showControls ? "opacity-100" : "opacity-0"
        } transition duration-200 ease-in-out hover:bg-red-500`}
      >
        <FaChevronLeft />
      </button>

      {/* Slide to right button */}
      <button
        onClick={slideToRight}
        className={`absolute bottom-1/2 right-0 z-10 flex h-8 w-8 translate-x-1/2 items-center justify-center rounded-full bg-red-600 text-lg text-white ${
          showControls ? "opacity-100" : "opacity-0"
        } transition duration-200 ease-in-out hover:bg-red-500`}
      >
        <FaChevronRight />
      </button>

      {/* Slider content */}
      <div
        id={sliderId}
        className="flex flex-nowrap gap-4 overflow-x-scroll scroll-smooth p-4 scrollbar-none"
      >
        {data ? (
          data.map((item: any, index: number) => (
            <Card key={index} data={item} />
          ))
        ) : (
          <div className="flex h-64 w-full items-center justify-center">
            {/* Spinner */}
            <ClipLoader
              color="rgba(220, 38 ,38, 1)"
              loading={true}
              size={128}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slider;
