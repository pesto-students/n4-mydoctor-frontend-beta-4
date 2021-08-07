import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0.5rem 1rem",
    color: theme.palette.primary.main,
    margin: "1rem"
  },
  heading: {
    display: "flex",
    fontWeight: "bold",
    marginBottom: "1rem",
    "& span": {
      marginLeft: "0.28rem",
    }
  },
  doctorAvatarLarge: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: "1rem",
  },
  appointmentCard: {
    display: "grid",
    gridGap: "0.5rem",
    gridTemplateRows: "1fr",
    gridTemplateColumns: "1fr 2fr auto",
    padding: "0.5rem",
    alignItems: "center",
    "& .left": {
      display: "flex",
      flexFlow: "row wrap",
      alignItems: "center",
      "& .title": {
        color: theme.palette.primary.main,
        fontWeight: 500,
      },
    },
    "& .middle": {
      display: "flex",
      flexFlow: "column wrap",
      "& > .details": {
        display: "grid",
        gridTemplateRows: "1fr 1fr",
        gridTemplateColumns: "1fr 1fr",
        "& .data ": {
          fontSize: "0.9rem",
          color: theme.palette.grey[800],
          "& span.label": {
            color: theme.palette.primary.light,
          },
          "& span.status": {
            display: "inline-block",
            fontSize: "0.8rem",
            color: "#fff",
            padding: "0.25rem 0.5rem",
            borderRadius: "50rem",
          },
          "& span.status.not-started": {
            backgroundColor: theme.palette.info.light,
          },
          "& span.status.in-progress": {
            backgroundColor: theme.palette.secondary.light,
          },
          "& span.status.completed": {
            backgroundColor: theme.palette.success.light,
          }
        }
      },
    },
    "& .right": {

    }
  },
}));