import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import DoctorsInfo from "./components/DoctorsInfo/DoctorsInfo";
import SlotBooking from "./components/SlotBooking/SlotBooking";
import DoctorDetails from "./components/DoctorDetails/DoctorDetails";
import Page from "../layout/Page/page";
import { useStyles } from "./styles";
import StripePayment from "../shared/components/StripePayment/stripePayment";

const DoctorsDetailAndBooking = (props) => {
  const classes = useStyles();
  const [doctorInfos, setDoctorInfos] = React.useState(null);
  const [bookedSlots, setBookedSlots] = React.useState(null);
  const { doctorId } = props.match.params;

  console.log("Logging props : ", doctorId);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/doctor/${doctorId}`)
      .then((response) => response.json())
      .then((data) => setDoctorInfos(data.message[0]));

    fetch(`http://localhost:4000/appointments/${doctorId}`)
      .then((response) => response.json())
      .then((data) => setBookedSlots(data.data));
  }, []);

  if (doctorInfos == null) {
    return (
      <Page>
        <div>Loading...</div>
      </Page>
    );
  }

  return (
    <Page>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <DoctorsInfo data={doctorInfos} />
          </Grid>
          <Grid item xs={6}>
            <SlotBooking data={doctorInfos} bookedSlots={bookedSlots} />
          </Grid>
          <Grid item xs={12}>
            <DoctorDetails data={doctorInfos} />
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

export default DoctorsDetailAndBooking;
