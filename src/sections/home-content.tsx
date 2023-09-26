/* Components imports */
import SliderModule from "~/components/slider-module";

const HomeContent = () => {
  return (
    <section className="px-8">
      {/* Content block */}
      <div className="mx-auto max-w-7xl">
        {/* Popular movies and shows */}
        <SliderModule
          title="Trending"
          categories={["movie", "tv"]}
          headers={["popular"]}
          options={["Movies", "TV Shows"]}
        />

        <div className="h-4" />

        {/* Shows on air */}
        <SliderModule
          title="Shows on air"
          categories={["tv"]}
          headers={["on_the_air"]}
          options={["This Week"]}
        />

        <div className="h-4" />

        {/* Top rated movies and shows */}
        <SliderModule
          title="Top rated"
          categories={["movie", "tv"]}
          headers={["top_rated"]}
          options={["Movies", "TV Shows"]}
        />

        <div className="h-4" />

        {/* Movies on theatres */}
        <SliderModule
          title="On theatres"
          categories={["movie"]}
          headers={["now_playing"]}
          options={["Movies"]}
        />

        <div className="h-4" />

        {/* Coming soon movies */}
        <SliderModule
          title="Coming soon"
          categories={["movie"]}
          headers={["upcoming"]}
          options={["Movies"]}
        />
      </div>
    </section>
  );
};

export default HomeContent;
