export type Movie = {
  adult: boolean;
  backdropPath: string;
  belongsToCollection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdbID: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  releaseDate: Date;
  revenue: number;
  runtime: number;
  spokenLanguages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logoPath: string;
  name: string;
  originCountry: string;
};

export type ProductionCountry = {
  iso3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  englishName: string;
  iso639_1: string;
  name: string;
};

export type TVShow = {
  adult: boolean;
  backdropPath: string;
  createdBy: CreatedBy[];
  episodeRunTime: number[];
  firstAirDate: Date;
  genres: Genre[];
  homepage: string;
  id: number;
  inProduction: boolean;
  languages: string[];
  lastAirDate: Date;
  lastEpisodeToAir: LastEpisodeToAir;
  name: string;
  nextEpisodeToAir: null;
  networks: Network[];
  numberOfEpisodes: number;
  numberOfSeasons: number;
  originCountry: string[];
  originalLanguage: string;
  originalName: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: Network[];
  productionCountries: ProductionCountry[];
  seasons: Season[];
  spokenLanguages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  voteAverage: number;
  voteCount: number;
};

export type CreatedBy = {
  id: number;
  creditID: string;
  name: string;
  gender: number;
  profilePath: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type LastEpisodeToAir = {
  id: number;
  name: string;
  overview: string;
  voteAverage: number;
  voteCount: number;
  airDate: Date;
  episodeNumber: number;
  episodeType: string;
  productionCode: string;
  runtime: number;
  seasonNumber: number;
  showID: number;
  stillPath: string;
};

export type Network = {
  id: number;
  logoPath: string;
  name: string;
  originCountry: string;
};

export type ProductionCountry = {
  iso3166_1: string;
  name: string;
};

export type Season = {
  airDate: Date | null;
  episodeCount: number;
  id: number;
  name: string;
  overview: string;
  posterPath: string;
  seasonNumber: number;
  voteAverage: number;
};

export type SpokenLanguage = {
  englishName: string;
  iso639_1: string;
  name: string;
};
