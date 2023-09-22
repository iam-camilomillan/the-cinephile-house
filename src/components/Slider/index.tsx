import { useState } from "react";

/* Component imports */
import Card from "../Card";

/* Icon imports */
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Slider = ({ data, sliderId }: any) => {
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
        {data
          ? data.map((item: any, index: number) => (
              <Card key={index} data={item} />
            ))
          : "Loading..."}
      </div>
    </div>
  );
};

export default Slider;
