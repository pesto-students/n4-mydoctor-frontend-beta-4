import React, { useMemo, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useStyles } from './styles';
import { debounce } from 'lodash';


export default function SearchBar({onSearch}) {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const search = debounce((v) => onSearch(v), 1000);

  const onChangeHandler  = (e) => {
    setValue(e.target.value);
    search(e.target.value);
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search for doctors..."
        inputProps={{ 'aria-label': 'search for doctors' }}
        onChange={onChangeHandler}
        value={value}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}