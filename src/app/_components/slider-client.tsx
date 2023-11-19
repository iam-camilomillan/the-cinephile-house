/* React imports */
import { useRef, useState } from "react";

/* NextUI imports */
import { Button } from "@nextui-org/react";

/* Components imports */
import CardClient from "~/app/_components/card-client";

/* Icons imports */
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

/* Types imports */
import { type DiscoverMovieResult, type DiscoverTVShowResult } from "types";

export default function SliderClient({
  data,
}: {
  data: DiscoverMovieResult[] | DiscoverTVShowResult[];
}) {
  /* State to show controls */
  const [showLeftControl, setShowLeftControl] = useState(false);
  const [showRightControl, setShowRightControl] = useState(false);

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
      onMouseEnter={() => {
        setShowLeftControl(true);
        setShowRightControl(true);
      }}
      onMouseLeave={() => {
        setShowLeftControl(false);
        setShowRightControl(false);
      }}
      className="relative flex items-center"
    >
      {/* Previous button */}
      <Button
        onPress={handleClickPrevious}
        color="primary"
        radius="full"
        isIconOnly
        className={`absolute left-0 z-20 ${
          showLeftControl ? "flex" : "hidden"
        } -translate-x-1/2 hover:bg-primary-200 hover:opacity-100`}
      >
        <IconChevronLeft />
      </Button>

      {/* Cards container */}
      <div
        ref={sliderRef}
        className="flex gap-x-4 overflow-x-scroll scroll-smooth px-2 pb-4 pt-2 scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-800"
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
          showRightControl ? "flex" : "hidden"
        } translate-x-1/2`}
      >
        <IconChevronRight />
      </Button>
    </div>
  );
}
