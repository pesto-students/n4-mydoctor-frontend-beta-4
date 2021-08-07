import React from "react";
import { useStore, useDispatch } from "react-redux";
import ProtectedPage from "../layout/Page/protectedpage";
import i18n from "../translations/en/i18n.json";
import { Container, Paper, Card, Grid, Avatar, Button } from "@material-ui/core";
import { useStyles } from "./styles";
import { fetchAppointmentDetails } from "../state/appointment/slice";
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';

const ConsultationChat = ({ match, appointment }) => {
  const { appointmentId } = match.params;
  const userId = localStorage.getItem("user-id");

  const store = useStore();
  const dispatch = useDispatch();

  const [appointmentData, setAppointmentData] = React.useState(appointment);

  React.useEffect(() => {
    if (!appointmentData) {
      dispatch(fetchAppointmentDetails({ userId, appointmentId }));
    }
  });

  store.subscribe(() => {
    const userAppointments = store.getState().appointment.appointments[userId];
    if (userAppointments) {
      const targetAppointment = userAppointments.find((a) => a._id === appointmentId);
      if (targetAppointment) setAppointmentData(targetAppointment);
    }
  });

  const classes = useStyles();
  return (
    <ProtectedPage>
      <Container maxWidth="md">
        {appointmentData &&
          <Paper elevation={1} className={classes.container}>
            <div className={classes.heading}>
              <ForumOutlinedIcon />
              <span>Consultation Chat</span>
            </div>
            <div className="chatContainer">
              <div className={classes.doctorCard}>
                <Avatar className={classes.doctorAvatarLarge} alt={getDoctorName(appointmentData)} src={getDoctorProfileImageURL(appointmentData)} />
                <div className="title">
                  {getDoctorName(appointmentData)}
                </div>
              </div>
              <div className="conversationBox">

              </div>
              <div className="chatBox">
              </div>
            </div>
          </Paper>
        }
      </Container>
    </ProtectedPage>
  );
};

export default ConsultationChat;


function getDoctorName(appointmentData) {
  return `${i18n['consultationChat']['doctorSalutation']} ${appointmentData.doctorId.firstName} ${appointmentData.doctorId.lastName}`;
}

function getDoctorProfileImageURL(appointmentData) {
  return appointmentData.doctorId.imageUrl;
}

function getPatientName(appointmentData) {
  const isSelf = !appointmentData.otherName;
  if (isSelf) {
    return i18n['consultationChat']['self'];
  }
  const otherName = appointmentData.otherName;
  const otherMobileNumber = appointmentData.otherMobileNumber ? `(${appointmentData.otherMobileNumber})` : "";
  return `${otherName} ${otherMobileNumber}`;
}

function getAppointmentDate(appointmentData) {
  const date = new Date(appointmentData.date);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}

function getAppointmentTiming(appointmentData) {
  const date = new Date();
  const startTime = [
    parseInt(appointmentData.startTime.slice(0, 2)),
    parseInt(appointmentData.startTime.slice(2))
  ];
  const endTime = [
    parseInt(appointmentData.endTime.slice(0, 2)),
    parseInt(appointmentData.endTime.slice(2))
  ];
  date.setHours(startTime[0], startTime[1]);
  const formattedStartTime = date.toLocaleTimeString('en-GB', { hour12: true, hour: '2-digit', minute: '2-digit' }).toUpperCase();
  date.setHours(endTime[0], endTime[1]);
  const formattedEndTime = date.toLocaleTimeString('en-GB', { hour12: true, hour: '2-digit', minute: '2-digit' }).toUpperCase();
  return `${formattedStartTime} - ${formattedEndTime}`;
}