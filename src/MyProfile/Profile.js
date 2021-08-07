import { Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Page from "../layout/Page/page";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { useSelector } from "react-redux";

const Profile = (props) => {
  const [profileInfo, setProfileInfo] = React.useState({});
  const classes = useStyles();

  const profile = useSelector((state) => {
    return state.user.profile;
  });

  const clientId = profile._id;

  useEffect(() => {
    fetch(`http://localhost:4000/v1/user/${clientId}`)
      .then((response) => response.json())
      .then((data) => setProfileInfo(data.message));
  }, []);

  if (profileInfo == null) {
    return (
      <Page>
        <div>Loading...</div>
      </Page>
    );
  }

  return (
    <Page>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={profileInfo.profileImage}
            title="Doctor image"
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              Name :
            </Typography>
            <Typography gutterBottom variant="h4" component="h2">
              {profileInfo.firstName + " " + profileInfo.lastName}
            </Typography>
            <Typography gutterBottom variant="h6">
              E-Mail :
            </Typography>
            <Typography gutterBottom variant="h4" component="h2">
              {profileInfo.email}
            </Typography>
            <Typography gutterBottom variant="h6">
              Gender :
            </Typography>
            <Typography gutterBottom variant="h4" component="h2">
              {profileInfo.gender}
            </Typography>
            <Typography gutterBottom variant="h6">
              Mobile :
            </Typography>
            <Typography gutterBottom variant="h4" component="h2">
              {profileInfo.contactNumber}
            </Typography>
            {profileInfo.alternateNumber && (
              <div>
                <Typography gutterBottom variant="h6">
                  Alternate Mobile :
                </Typography>
                <Typography gutterBottom variant="h4" component="h2">
                  {profileInfo.alternateNumber}
                </Typography>
              </div>
            )}
            {profileInfo.address && (
              <div>
                <Typography gutterBottom variant="h6">
                  Address :
                </Typography>
                <Typography gutterBottom variant="h4" component="h2">
                  {profileInfo.address}
                </Typography>
              </div>
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    </Page>
  );
};

export default Profile;
