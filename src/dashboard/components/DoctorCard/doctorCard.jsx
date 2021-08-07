import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import moment from "moment";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Typography, Avatar } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Flex from "../../../shared/components/Flex";
import { useStyles } from "./styles";
import { useHistory } from "react-router-dom";

export default function DoctorCard({ data }) {
  const classes = useStyles();
  const { t } = useTranslation("i18n");
  const history = useHistory();
  var a = moment([new Date().getFullYear(), 0]);
  var b = moment([new Date(data.practicingFrom).getFullYear(), 0]);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Flex>
          <Avatar src={data.imageUrl} className={classes.avatar} />
          <Flex column style={{ marginLeft: "16px" }}>
            <Typography
              className={classes.title}
              color="textPrimary"
              gutterBottom
            >
              {`${data.firstName} ${data.lastName}`}
            </Typography>
            <Typography
              className={classes.subTitle}
              color="primary"
              gutterBottom
            >
              {data.specializations.join(",")} | {a.diff(b, "years")} years exp
            </Typography>
            <Flex column>
              <Typography
                className={classes.subTitle}
                color="primary"
                gutterBottom
              >
                Fee: {`${data.consultationFee} ${data.consultationFeeCurrency}`}
              </Typography>
            </Flex>
          </Flex>
        </Flex>
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          size="small"
          onClick={() => {
            history.push(`/doctor/${data._id}`);
          }}
          variant="contained"
          color="primary"
        >
          {t("dashboard.book_appointment")}
        </Button>
      </CardActions>
    </Card>
  );
}
