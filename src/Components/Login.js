import React from "react";
import {
  Grid,
  Paper,
  TextField,
  Checkbox,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FacebookIcon from "@material-ui/icons/Facebook";
import { Alert } from "@material-ui/lab";
import "../Styles/Loginregister.css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../state/user/slice";
import Store from "../state/index.js";
import JSONResult from "../translations/en/i18n.json";
import { useHistory } from "react-router";
import { CheckBox } from "@material-ui/icons";

const Login = () => {
  const [loginPage, setLoginPage] = React.useState([]);
  const [loginMap, setLoginMap] = React.useState(JSONResult.loginMap);
  const [error, setError] = React.useState(false);
  const [isDoctorLogin, setIsDoctorLogin] = React.useState(false);

  const history = useHistory();

  useEffect(() => {
    setLoginMap(JSONResult.loginMap);
  }, []);

  useEffect(() => {
    setLoginPage(JSONResult.loginPage);
  }, []);

  const profile = useSelector((state) => {
    return state.user.profile;
  });

  const dispatch = useDispatch();

  const userLoggedIn = useSelector((state) => {
    return state.user.loggedIn;
  });

  if (userLoggedIn) {
    history.push("/");
  }
  Store.subscribe(() => {
    setError(!!Store.getState().user.error);
    // const loginSuccessful =
    //   !!!Store.getState().user.error && Store.getState().user.token;
    // if (loginSuccessful) {
    //   history.push("/");
    // }
  });

  const refsMap = {};
  refsMap[loginMap[0]["data_id"]] = useRef();
  refsMap[loginMap[1]["data_id"]] = useRef();

  function getLoginDetails() {
    const username =
      refsMap["1"].current.getElementsByTagName("input")[0].value;
    const password =
      refsMap["2"].current.getElementsByTagName("input")[0].value;
    return {
      username,
      password,
    };
  }

  // function userAlreadyLoggedIn() {
  //   const isLoggedIn = Store.getState().user.profile?.loggedIn;
  //   return isLoggedIn;
  // }
  const loginStyle = { color: "white" };
  const colordark = { backgroundColor: "darkBlue", color: "white" };
  return (
    <>
      <Grid>
        {error && (
          <Alert severity="error">{JSONResult.loginPage["login_fail"]}</Alert>
        )}
        <Paper elevation={10} id="login" className="paperStylelogin" elevation={0}>
          {loginMap.map((datas) => {
            return (
              <>
                <label className="label">{datas.data_label}</label>
                <TextField
                  ref={refsMap[datas.data_id]}
                  variant="outlined"
                  type={datas.data_type}
                  placeholder={datas.data_placeholder}
                  fullWidth
                  required
                ></TextField>
                <br />
                <br />
              </>
            );
          })}
          <FormControlLabel
            control={
              <Checkbox
                checked={isDoctorLogin}
                onChange={() => setIsDoctorLogin((prev) => !prev)}
                name="checkedB"
                color="primary"
              />
            }
            label="Doctor Login"
          />

          <Typography>
            {/* <Link href="#" >
              {loginPage.forgot}
            </Link> */}
          </Typography>
          <Button
            fullWidth
            style={loginStyle}
            color="primary"
            variant="contained"
            onClick={() => {
              dispatch(
                login({
                  ...getLoginDetails(),
                  doctorLogin: isDoctorLogin,
                })
              );
            }}
          >
            {loginPage.login}
          </Button>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Paper>
      </Grid>
    </>
  );
};
export default Login;
