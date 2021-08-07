import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 900,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
    },
    searchSection: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing(3),
    },
    content: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    pageNation: {
      marginBottom: theme.spacing(5),
    },
  })
);
