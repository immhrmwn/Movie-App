import React, {useState} from 'react';
import {SearchIcon} from '@heroicons/react/solid';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';

import {SearchBoxProps} from './search.interface';
import {useStyles} from './search.style';

import debounce from 'lodash/debounce';

export const SearchBox: React.FC<SearchBoxProps> = ({
  onSubmit,
  iconPosition = 'start',
  ...props
}) => {
  const style = useStyles();
  const [input, setInput] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const submitClickSearch = () => {
    const debouncedSubmit = debounce(() => {
      if (onSubmit) {
        onSubmit(input);
      }
    }, 300);

    debouncedSubmit();
  };

  const submitSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const debouncedSubmit = debounce(() => {
        if (onSubmit) {
          onSubmit(input);
        }
      }, 300);

      debouncedSubmit();
    }
  };

  return (
    <Grid
      container
      direction={'row-reverse'}
      className={style.root}
      component={Paper}
      elevation={0}>
      <IconButton className={style.iconButton} aria-label="search" onClick={submitClickSearch}>
        <SvgIcon component={SearchIcon} viewBox="0 0 20 20" />
      </IconButton>
      <InputBase
        onKeyUp={submitSearch}
        className={style.input}
        value={input}
        onChange={handleChange}
        placeholder={'Search Movie'}
        inputProps={{'aria-label': 'search-box'}}
        {...props}
      />
    </Grid>
  );
};
