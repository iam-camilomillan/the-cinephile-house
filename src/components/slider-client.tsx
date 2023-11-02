"use client";

/* React imports */
import { useRef, useState } from "react";

/* Components imports */
import CardClient from "./card-client";

/* NextUI imports */
import { Button } from "@nextui-org/react";

/* Icons imports */
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

/* Types imports */
import { type Movie, type TVShow } from "types";

export default function SliderClient({ data }: { data: Movie[] | TVShow[] }) {
  /* State to show controls */
  const [showControls, setShowControls] = useState(false);

  /* Reference to slider element */
  const sliderRef = useRef<HTMLDivElement>(null);

  /* Scrolls the slider to the left */
  const handleClickPrevious = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      slider.scrollLeft = slider.scrollLeft - 512;
    }
  };

  /* Scrolls the slider to the right */
  const handleClickNext = () => {
    if (sliderRef.current) {
      const slider = sliderRef.current;
      slider.scrollLeft = slider.scrollLeft + 512;
    }
  };

  return (
    <div
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      className="relative flex items-center"
    >
      {/* Previous button */}
      <Button
        onPress={handleClickPrevious}
        color="primary"
        radius="full"
        isIconOnly
        className={`absolute left-0 z-20 ${
          showControls ? "flex" : "hidden"
        } -translate-x-1/2`}
      >
        <IconChevronLeft />
      </Button>

      {/* Cards container */}
      <div
        ref={sliderRef}
        className="flex gap-x-4 overflow-x-scroll scroll-smooth px-2 pb-4 pt-2 scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-600"
      >
        {data.map((item, index) => (
          <CardClient key={index} data={item} />
        ))}
      </div>

      {/* Next button */}
      <Button
        onPress={handleClickNext}
        color="primary"
        radius="full"
        isIconOnly
        className={`absolute right-0 z-20 ${
          showControls ? "flex" : "hidden"
        } translate-x-1/2`}
      >
        <IconChevronRight />
      </Button>
    </div>
  );
}
