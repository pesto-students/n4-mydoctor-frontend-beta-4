import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";

const DoctorsInfo = (props) => {
  const classes = useStyles();
  const { t } = useTranslation("i18n");

  console.log("logging props.");
  console.log(props);

  let { firstName, lastName, imageUrl, practicingFrom, description } =
    props.data;

  function getDifferenceInDays(date1) {
    let currentDate = new Date();
    let chgdate = new Date(date1);
    const diffInMs = Math.abs(currentDate - chgdate);
    return Math.round(diffInMs / (1000 * 60 * 60 * 24 * 365));
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img src={imageUrl}></img>
          </Avatar>
        }
        title={
          t("doctors_appointment.doctor_salutation") +
          " " +
          firstName +
          " " +
          lastName
        }
        subheader={
          // doctorInfos?.qualifications[0].name +
          // ", " +
          // doctorInfos?.qualifications[1].name +
          // ", " +
          getDifferenceInDays(practicingFrom) +
          " " +
          t("doctors_appointment.years_of_experience")
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default DoctorsInfo;
