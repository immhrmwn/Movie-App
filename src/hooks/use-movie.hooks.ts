import React from 'react';

import {getMovieDetail, getMovieList, Movie, searchMovieList, voteMovie} from 'src/lib/api/movie';

type Meta = {
  page: number;
  totalPage: number;
  totalResult: number;
};

export const useMovieHook = () => {
  const [movie, setMovie] = React.useState<Movie | null>(null);
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [meta, setMeta] = React.useState<Meta | null>(null);
  const [isLoading, setIsloading] = React.useState<boolean>(false);
  const [isVoteLoading, setIsVoteloading] = React.useState<boolean>(false);
  const [isSearch, setIsSearch] = React.useState<boolean>(false);

  const fetchMovieList = async (page = 1): Promise<void> => {
    try {
      setIsloading(true);

      const result = await getMovieList(page);

      if (page > 1) {
        setMovies(prevItem => [...prevItem, ...result.results]);
      } else {
        setMovies(result.results);
      }

      const newMeta = {
        page: result.page,
        totalPage: result.total_pages,
        totalResult: result.total_results,
      };
      setMeta(newMeta);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const searchMovies = async (query: string, page = 1): Promise<void> => {
    try {
      setIsloading(true);
      setIsSearch(true);
      const result = await searchMovieList(page, query);

      if (isSearch && page > 1) {
        setMovies(prevItem => [...prevItem, ...result.results]);
      } else {
        setMovies(result.results);
      }

      const newMeta = {
        page: result.page,
        totalPage: result.total_pages,
        totalResult: result.total_results,
      };
      setMeta(newMeta);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const fetchMovieDetail = async (movieId: string): Promise<void> => {
    try {
      setIsloading(true);
      const result = await getMovieDetail(movieId);
      setMovie(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleVoteMovie = async (
    movieId: string,
    rating: number,
    callback?: () => void,
  ): Promise<void> => {
    try {
      setIsVoteloading(true);
      const result = await voteMovie(movieId, rating);
      console.log(result);
      callback && callback();
    } catch (error) {
      console.log(error);
    } finally {
      setIsVoteloading(false);
    }
  };

  const hasMore = (): boolean => {
    if (meta) return meta?.page < meta?.totalPage;
    return false;
  };

  return {
    setIsSearch,
    isSearch,
    searchMovies,
    page: meta?.page,
    hasMore,
    handleVoteMovie,
    fetchMovieList,
    fetchMovieDetail,
    movie,
    movies,
    meta,
    isLoading,
    isVoteLoading,
  };
};
