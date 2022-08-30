import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

import {useNavigate} from 'react-router-dom';
import {useMovieHook} from 'src/hooks/use-movie.hooks';
import {SearchBox} from 'src/components/Search/Search';

export const DashboardComponent: React.FC = () => {
  const navigate = useNavigate();
  const {movies, isLoading, fetchMovieList, hasMore, page, searchMovies, isSearch, setIsSearch} =
    useMovieHook();
  const [query, setQuery] = React.useState<string>('');
  React.useEffect(() => {
    fetchMovieList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpenDetail = (id: string) => {
    navigate(`/movie/${id}`);
  };

  const handleLoadMore = () => {
    if (isSearch) {
      page && searchMovies(query, page + 1);
    }
    page && fetchMovieList(page + 1);
  };

  const LoadingComponent = () => {
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  };

  const onSearch = (_query: string) => {
    const sanitizedQuery = _query.trim();

    setQuery(sanitizedQuery);
    if (!_query.length) {
      fetchMovieList();
      setIsSearch(false);
    } else {
      searchMovies(sanitizedQuery);
    }
  };

  return (
    <Container style={{marginTop: 24, maxWidth: 1140, padding: 0, marginBottom: 24}}>
      <Typography style={{marginTop: 46, marginBottom: 14, textAlign: 'center'}} variant="h4">
        Daftar Movie Terpopuler
      </Typography>
      <div style={{maxWidth: '50%', margin: 'auto', marginBottom: 16}}>
        <SearchBox onSubmit={onSearch} />
      </div>
      {isLoading && !page && <LoadingComponent />}
      {!movies.length && !isLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 500,
          }}>
          <Typography variant="h5">Movie not found</Typography>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 32,
          marginBottom: 24,
        }}>
        {movies.map((movie, i) => (
          <Paper
            key={`${movie.id}${i}`}
            style={{width: 200, cursor: 'pointer', background: '#222731', color: 'white'}}
            onClick={() => handleOpenDetail(movie.id)}>
            <CardMedia
              style={{height: 300, width: ' 100%', objectFit: 'cover', borderRadius: 4}}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              title={movie.title}
            />
            <div style={{padding: '0px 16px 16px 16px'}}>
              <Typography
                variant="h6"
                style={{
                  marginBottom: 4,
                  width: '100%',
                  wordBreak: 'break-word',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                {movie.title}
              </Typography>
              <Typography variant="caption">{movie.release_date.toString().slice(0, 4)}</Typography>
            </div>
          </Paper>
        ))}
      </div>
      {isLoading && <LoadingComponent />}
      {hasMore() && !isLoading && (
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button variant="contained" color="secondary" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </Container>
  );
};
