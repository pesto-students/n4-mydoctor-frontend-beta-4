import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { Avatar, Menu } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/PersonOutline";
import AppointmentsIcon from "@material-ui/icons/CalendarToday";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { useStyles } from "./styles";
import { Link, useHistory } from "react-router-dom";

export default function ProfileSection({ profile, onLogoutClick }) {
  const classes = useStyles();
  const anchorRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {profile &&
        <div>
          <Avatar
            src={profile.profileImage}
            className={classes.avatar}
            ref={anchorRef}
            aria-haspopup="true"
            onClick={handleClick}
          />
          <Menu
            id="simple-menu"
            onClose={handleClose}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
          >
            <MenuItem
              onClick={() => {
                history.push("/profile");
              }}
            >
              <SearchIcon style={{ marginRight: "8px" }} /> Profile
            </MenuItem>
            <MenuItem onClick={() => {
              history.push('/appointments');
              handleClose();
            }}>
              <AppointmentsIcon style={{ marginRight: "8px" }} /> My Appointments
            </MenuItem>
            <MenuItem onClick={() => {
              setAnchorEl(null); if (!!onLogoutClick) onLogoutClick();
            }}>
              <LogoutIcon style={{ marginRight: "8px" }} /> Logout
            </MenuItem>
          </Menu>
        </div>
      }
    </div>
  );
}
