import React, { useState, useEffect } from "react";
import { Paper, Tabs, Tab, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Login from "../Components/Login";
import Signup from "../Components/Signup";
import "../Styles/Loginregister.css";
import JSONResult from "../translations/en/i18n.json";
import { useLocation } from "react-router-dom";
import Flex from "../shared/components/Flex";

const SignInOutContainer = ({ field }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let tabIndex = parseInt(params.get("v"));
  if (!Number.isInteger(tabIndex) || tabIndex < 0 || tabIndex > 1) tabIndex = 0;
  const [value, setValue] = useState(tabIndex);

  const [loginPage, setLoginPage] = React.useState([]);
  const [message, setMessage] = React.useState("");

  function handleSignupSuccess(message) {
    setMessage(message);
    setValue(0);
  }

  function handleClearMessage() {
    setMessage("");
  }

  useEffect(() => {
    setLoginPage(JSONResult.loginPage);
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={2}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  return (
    <Flex row full>
      <Flex style={{width: '60%'}} center>
        <img src={"login_image.png"} alt="Logo" style={{display: 'block', height: '380px', width:'300px'}}/>
      </Flex>
      <Flex style={{width: '40%'}}>
        <Paper className="paperStyle2" elevation={1}>
          {message !== "" && <Alert severity="success">{message}</Alert>}
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab className="widthch" label={loginPage.login} />

            <Tab className="widthch" label={loginPage.register} />
          </Tabs>
          <TabPanel value={value} index={0} style={{ minHeight: 100 + "%" }}>
            <Login />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Signup
              field={field}
              onSuccess={handleSignupSuccess}
              onClear={handleClearMessage}
              onSignIn={() => {
                setValue(0);
              }}
            />{" "}
          </TabPanel>
        </Paper>
      </Flex>
    </Flex>
  );
};

export default SignInOutContainer;
