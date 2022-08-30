import React from 'react';

import UserIcon from '@heroicons/react/solid/UserIcon';

import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';

import {useParams} from 'react-router-dom';
import {useMovieHook} from 'src/hooks/use-movie.hooks';

import StarRatings from 'react-star-ratings';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const MovieComponent = () => {
  const {id} = useParams();
  const {movie, isLoading, fetchMovieDetail, handleVoteMovie, isVoteLoading} = useMovieHook();
  const [open, setOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    id && fetchMovieDetail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSuccess = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  // TODO: authentication needed to vote
  const handleVote = (rating: number) => {
    id &&
      handleVoteMovie(id, rating, () => {
        handleSuccess();
      });
  };

  const LoadingComponent = () => {
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  };

  if (isLoading)
    return (
      <div style={{marginTop: 100}}>
        <LoadingComponent />
      </div>
    );

  if (!movie)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 500,
        }}>
        <Typography variant="h5">Movie not found</Typography>
      </div>
    );

  const getListOfGenres = (): string => {
    if (!movie.genres) return '';
    const genre = movie.genres.map(genre => genre.name).join(', ');
    return genre;
  };

  const getListOfProductionCompanies = (): string => {
    if (!movie.production_companies) return '';
    const companies = movie.production_companies.map(company => company.name).join(', ');
    return companies;
  };

  return (
    <Container style={{marginTop: 24, maxWidth: 1140, padding: 0}}>
      <div style={{position: 'relative', overflow: 'hidden'}}>
        <CardMedia
          style={{height: 300, width: '100%', objectFit: 'cover', borderRadius: 4}}
          image={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          title={movie.title}
        />
        <div
          style={{
            position: 'absolute',
            background: 'black',
            opacity: 0.6,
            bottom: 0,
            zIndex: 2,
            right: 0,
            left: 0,
            top: 0,
          }}
        />
      </div>
      <div
        style={{
          padding: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
        }}>
        <div style={{position: 'relative', height: 100, minWidth: 200}}>
          <CardMedia
            style={{
              position: 'absolute',
              objectFit: 'cover',
              borderRadius: 8,
              height: 300,
              width: 200,
              zIndex: 99,
              top: -200,
            }}
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            title={movie.title}
          />
        </div>
        <div style={{maxWidth: 700}}>
          <Typography variant="h6" style={{fontWeight: 'bold'}}>
            {movie.title} ({movie.release_date.toString().slice(0, 4)})
          </Typography>
          <Typography variant="body2" color="secondary">
            {getListOfGenres()}
          </Typography>
          <Typography variant="subtitle1" color="secondary">
            {getListOfProductionCompanies()}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {movie.overview}
          </Typography>
        </div>
        <div style={{width: 150}}>
          <Typography variant="body1" color="textSecondary" style={{fontWeight: 'bold'}}>
            Your vote:
          </Typography>
          <StarRatings
            rating={movie.vote_average}
            starRatedColor="black"
            starHoverColor="black"
            changeRating={handleVote}
            numberOfStars={10}
            name="rating"
            starDimension="15px"
            starSpacing="0px"
          />
          <div style={{display: 'flex', alignItems: 'start', gap: 5}}>
            <Typography variant="caption" color="textSecondary" style={{fontWeight: 'bold'}}>
              Vote: {movie.vote_average.toFixed(1)} / 10
            </Typography>
            <SvgIcon component={UserIcon} viewBox="0 0 20 20" style={{fontSize: 15}} />
            <Typography variant="caption" color="textSecondary" style={{fontWeight: 'bold'}}>
              ({movie.vote_count})
            </Typography>
          </div>
          <div>{isVoteLoading && <LoadingComponent />}</div>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}>
            <Alert onClose={handleClose} severity="success">
              Success vote!
            </Alert>
          </Snackbar>
        </div>
      </div>
    </Container>
  );
};
