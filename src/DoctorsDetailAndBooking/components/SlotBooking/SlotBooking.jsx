import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Chip from "@material-ui/core/Chip";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAppointmentData } from "../../../state/appointment/slice.js";
import moment from "moment";
import JSONResult from "../../../translations/en/i18n.json";
import Store from "../../../state/index.js";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

let isSlotAvailable = (slotId, bookedSlots) => {
  const bookedSlotsList = bookedSlots?.map((a) => a.timeId);
  var res = bookedSlotsList?.findIndex((s) => s === slotId);
  return res === -1;
};

const SlotBooking = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [showLoginMessage, setShowLoginMessage] = React.useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  let { availableSlots } = props.data;
  let { bookedSlots } = props;
  const doctorId = props.data._id;
  const consultationFee = props.data.consultationFee;

  console.log("booked slots : ");
  console.log(bookedSlots?.map((a) => a.timeId));

  // useEffect(() => {
  //   //dispatch(setAppointmentData({}));
  // }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function getLoginMessage() {
    const msgParts =
      JSONResult["doctors_appointment"]["login_message"].split("%s");
    return (
      <div style={{ color: "red" }}>
        {msgParts[0]}
        <Link style={{ textDecoration: "none" }} to="/login">
          {JSONResult["doctors_appointment"]["sign_in"]}
        </Link>
        {msgParts[1]}
        <Link style={{ textDecoration: "none" }} to="/login?v=1">
          {JSONResult["doctors_appointment"]["register"]}
        </Link>
        {msgParts[2]}
      </div>
    );
  }

  function selectSlot(slotId, timeId) {
    if (!Store.getState().user.loggedIn) {
      setShowLoginMessage(true);
      return;
    }
    const idxSlot = availableSlots.findIndex((s) => s._id === slotId);
    const idxTime = availableSlots[idxSlot].time.findIndex(
      (t) => t._id === timeId
    );
    const date = new Date(availableSlots[idxSlot].date);
    const startTime = availableSlots[idxSlot].time[idxTime].startTime;
    const endTime = availableSlots[idxSlot].time[idxTime].endTime;

    dispatch(
      setAppointmentData({
        slotId: slotId,
        timeId: timeId,
        date: formatDate(date),
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
        doctorId,
        consultationFee,
      })
    );
    history.push(`/self-appointment`);
  }

  function formatTime(time) {
    const parts = time.split(":");
    const hours = parseInt(parts[0]);
    const mins = parseInt(parts[1]);
    return `${String(hours).padStart(2, "0")}${String(mins).padStart(2, "0")}`;
  }

  function formatDate(dateObj) {
    const year = dateObj.getFullYear();
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;
  }

  return (
    <React.Fragment>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          {availableSlots.map((slotInfo, index) => (
            <Tab
              label={moment(slotInfo.date).format("MMM DD, YYYY")}
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>
      {availableSlots.map((slotInfo, index) => (
        <TabPanel value={value} index={index}>
          <div className={classes.root}>
            {slotInfo.time.map(
              (slot) =>
                isSlotAvailable(slot._id, bookedSlots) && (
                  <Chip
                    variant="outlined"
                    label={slot.startTime + " - " + slot.endTime}
                    clickable
                    onClick={() => {
                      selectSlot(slotInfo._id, slot._id);
                    }}
                    color="primary"
                  />
                )
            )}
          </div>
        </TabPanel>
      ))}
      {showLoginMessage && getLoginMessage()}
    </React.Fragment>
  );
};

export default SlotBooking;
