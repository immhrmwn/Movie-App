import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles<Theme>(theme =>
  createStyles({
    root: {
      padding: '2px 4px',
      height: 52,
      borderRadius: 10,
      border: '1px solid black',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }),
);
