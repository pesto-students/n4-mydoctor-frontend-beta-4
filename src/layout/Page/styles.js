import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
  createStyles({
    main: {
      width: "100%",
      minHeight: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {},
    appBar: {
      backgroundColor: "transparent",
      boxShadow: "none",
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      height: 50,
      cursor: "pointer",
    },
    avatar: {
      width: 50,
      height: 50,
    },
  })
);
