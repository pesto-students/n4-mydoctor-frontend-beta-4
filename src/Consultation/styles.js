import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0.5rem 1rem",
    margin: "1rem",
    height: "80vh",
  },
  chatContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "auto 1fr auto"
  },
  heading: {
    display: "flex",
    color: theme.palette.primary.main,
    fontWeight: "bold",
    marginBottom: "1rem",
    "& span": {
      marginLeft: "0.28rem",
    }
  },
  doctorAvatarLarge: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "1rem",
  },
  doctorCard: {
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center",
    "& .title": {
      color: theme.palette.primary.main,
      fontWeight: 500,
    },
  },
  conversationBox: {
    overflowX: "hidden",
    overflowY: "auto",
    backgroundColor: theme.palette.grey[200]
  },
  chatBox: {

  }

}));