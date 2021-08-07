import Page from "../layout/Page/page";
import React, { useEffect, useRef, useState } from "react";
import { useStyles } from "./styles";
import { Avatar, Button, Grid, Input, Typography } from "@material-ui/core";
import Flex from "../shared/components/Flex";
import axios from "../api";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { io } from "socket.io-client";
import moment from "moment";
import StripePayment from "../shared/components/StripePayment/stripePayment";

const socket = io("http://localhost:4000", {
  path: "/chat-server/",
  userId: 1234,
});

socket.on("connect", () => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});

const STATUS_MAP = {
  COMPLETED: 'Completed',
  NOT_STARTED: 'Not Started',
  IN_PROGRESS: 'In Progress',
}


function Chat() {
  const classes = useStyles();
  const { profile } = useSelector((state) => state.user);
  const [appointments, setAppointmnets] = useState([]);
  const [chat, setChat] = useState([]);
  const { appointmentId } = useParams();
  const [messageText, setMessageText] = useState('');
  const [selectedAppointment, setSelectedAppointment]  = useState(null);
  const messagesEndRef = useRef(null)
  const history = useHistory();

  useEffect(() => {
    if(profile)
    socket.emit('register-session', profile._id);
  }, [profile]);

  useEffect(() => {
    async function fetchAppointments() {
      if (profile) {
        const res = await axios.get(`/appointments/${profile._id}`);
        setAppointmnets(res.data.data);
      }
    }
    fetchAppointments();
  }, [profile]);

  useEffect(() => {
    async function fetchChat() {
      if (appointmentId) {
        const res = await axios.get(`/v1/chat/${appointmentId}`);
        setChat(res.data.data);
        scrollToBottom();
      }
    }
    fetchChat();
  }, [appointmentId]);

  useEffect(() => {
    if(appointments && appointmentId){
      const apmt = appointments.find((rec) => rec._id === appointmentId);
      if(apmt)
      setSelectedAppointment(apmt);
    }
  }, [appointmentId, appointments])

  const onChange = (e) => {
    setMessageText(e.target.value);
  };

  const scrollToBottom = () => {
    if(!!messagesEndRef && !!messagesEndRef.current){
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  };

  const onSendHandler = () => {
    const msg = {
      author: profile._id,
      body: messageText,
      appointmentId,
      date: new Date(),
    };
    socket.emit('message', msg, selectedAppointment.doctorId._id === profile._id ? selectedAppointment.clientId._id : selectedAppointment.doctorId._id );
    setChat([...chat, msg]);
    setMessageText('');
    setTimeout(0,scrollToBottom);
  };

  socket.on('message', (msg) => {
    console.log('msg received',msg);
    setChat([...chat, msg]);
    scrollToBottom();
  });

  useEffect(()=> scrollToBottom(),[]);

  const onAppointmentSelectHandler = (apmt) => {
    if(selectedAppointment){
      history.push(apmt._id);
    } else {
      history.push(`chat/${apmt._id}`);
    }
    setSelectedAppointment(apmt);
  };

  return (
    <Page>
      <div className={classes.root}>
        <Grid container className={classes.main}>
          <Grid item xs={selectedAppointment ? 4 : 12} className={classes.chatList}>
            <Typography className={classes.statusTitle}>ONGOING CONSULTATIONS</Typography>
            {appointments.map((apt) => (
              <Flex className={`${classes.chatCardWrapper} ${apt._id===appointmentId ? classes.chatCardSelected:''}`} onClick={() => onAppointmentSelectHandler(apt)}>
                <Avatar style={{ margin: "8px" }} src={profile._id === apt.doctorId._id ? `${apt.clientId.imageUrl}`:`${apt.doctorId.imageUrl}`} />
                <Flex column>
                  <Typography variant="h6">
                    {profile._id === apt.clientId._id ? `Dr. ${apt.doctorId.firstName} ${apt.doctorId.lastName}`
                     :`Dr. ${apt.clientId.firstName} ${apt.clientId.lastName}`}
                  </Typography>
                  <Typography variant="caption">{STATUS_MAP[apt.appointmentStatus]}</Typography>
                </Flex>
              </Flex>
            ))}
          </Grid>
          {selectedAppointment && <Grid item xs={selectedAppointment ? 8 : 0} style={{height: '100%'}}>
            <Flex column style={{ height: "100%", alignItems: 'center' }}>
              <Flex className={classes.chartHeader} centerY>
                <Avatar style={{ margin: "8px" }} src={profile._id === selectedAppointment.doctorId._id ? `${selectedAppointment.clientId.imageUrl}`:`${selectedAppointment.doctorId.imageUrl}`} />
                <Typography className={classes.chatTitle}>{profile._id === selectedAppointment.doctorId._id ? `${selectedAppointment.clientId.firstName} ${selectedAppointment.clientId.lastName}`:`${selectedAppointment.doctorId.firstName} ${selectedAppointment.doctorId.lastName}`}</Typography>
              </Flex>
              <Flex className={classes.chatBody} column>
                {chat.map((message) => (
                  <Flex column key={message._id} className={`${profile._id !== message.author ? classes.chatLeft:classes.chatRight}`}>
                    <Typography variant="h6">{message.body.toString()}</Typography>
                    <Typography variant="caption">{moment(message.date).fromNow()}</Typography>
                  </Flex>
                ))}
                <div ref={messagesEndRef}><div style={{height: '10px'}}/></div>
              </Flex>
              <Flex row center className={classes.chatFooter}>
                <input placeholder="Type your problem here..." className={classes.textboxWrapper} type="text" onChange={onChange} value={messageText}/>
                <Button className={classes.sendButton} onClick={onSendHandler} variant="contained" color="primary" size="small">Send</Button>
              </Flex>
            </Flex>
          </Grid>
          }
        </Grid>
      </div>
    </Page>
  );
}

export default Chat;
