/* Component imports */
import ContentModule from "~/components/ContentModule";

const Content = () => {
  return (
    <section className="px-8">
      {/* Content block */}
      <div className="mx-auto max-w-7xl">
        {/* Popular movies and shows */}
        <ContentModule
          title="Trending"
          categories={["movie", "tv"]}
          headers={["popular"]}
          options={["Movies", "TV Shows"]}
        />

        <div className="h-4" />

        {/* Shows on air */}
        <ContentModule
          title="Shows on air"
          categories={["tv"]}
          headers={["on_the_air"]}
          options={["This Week"]}
        />

        <div className="h-4" />

        {/* Top rated movies and shows */}
        <ContentModule
          title="Top rated"
          categories={["movie", "tv"]}
          headers={["top_rated"]}
          options={["Movies", "TV Shows"]}
        />

        <div className="h-4" />

        {/* Movies on theatres */}
        <ContentModule
          title="On theatres"
          categories={["movie"]}
          headers={["now_playing"]}
          options={["Movies"]}
        />

        <div className="h-4" />

        {/* Coming soon movies */}
        <ContentModule
          title="Coming soon"
          categories={["movie"]}
          headers={["upcoming"]}
          options={["Movies"]}
        />
      </div>
    </section>
  );
};

export default Content;
