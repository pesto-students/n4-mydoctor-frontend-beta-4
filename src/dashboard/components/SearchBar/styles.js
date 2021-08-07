import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
      border: `1px solid ${theme.palette.divider}`,
      height: '30px',
      boxShadow: 'none',
      borderTopLeftRadius: '0',
      borderBottomLeftRadius: '0'
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    }
  }),
);
