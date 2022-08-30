import axios from 'axios';
const APIKey: string = process.env.REACT_APP_API_KEY as string;

interface Response {
  status_code: number;
  status_message: string;
  success?: boolean;
}

interface Genre {
  id: string;
  name: string;
}

interface Collection {
  id: string;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface ProductionCompanie {
  id: string;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountrie {
  iso_3166_1: string;
  name: string;
}

interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Movie {
  id: string;
  adult: number;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string | Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  belongs_to_collection?: Collection;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  imdb_id?: string;
  production_companies?: ProductionCompanie[];
  production_countries?: ProductionCountrie[];
  revenue?: number;
  runtime?: number;
  spoken_languages?: Language[];
  status?: string;
  tagline?: string;
}

type MovieList = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export const getMovieList = async (page = 1): Promise<MovieList> => {
  const {data} = await axios({
    url: `https://api.themoviedb.org/3/movie/popular`,
    method: 'GET',
    params: {
      api_key: APIKey,
      language: 'en-US',
      page,
    },
  });

  return data;
};

export const searchMovieList = async (page = 1, query: string): Promise<MovieList> => {
  const {data} = await axios({
    url: `https://api.themoviedb.org/3/search/movie`,
    method: 'GET',
    params: {
      api_key: APIKey,
      language: 'en-US',
      page,
      query,
    },
  });

  return data;
};

export const getMovieDetail = async (id: string): Promise<Movie> => {
  const {data} = await axios({
    url: `https://api.themoviedb.org/3/movie/${id}`,
    method: 'GET',
    params: {
      api_key: APIKey,
      language: 'en-US',
    },
  });

  return data;
};

// authentication needed to write data
export const voteMovie = async (id: string, rating: number): Promise<Response> => {
  const {data} = await axios({
    url: `https://api.themoviedb.org/3/movie/${id}/rating`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    data: {value: rating},
    params: {
      api_key: APIKey,
    },
  });

  return data;
};

// authentication needed to write data
export const cancelRating = async (id: string): Promise<Response> => {
  const {data} = await axios({
    url: `https://api.themoviedb.org/3/movie/${id}/rating`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
      api_key: APIKey,
    },
  });

  return data;
};
