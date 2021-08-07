import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import Page from "./page";

const ProtectedPage = ({ redirectUrl = "/login", children }) => {
  const history = useHistory();
  const userLoggedIn = useSelector((state) => {
    return state.user.loggedIn;
  });

  if (!userLoggedIn) {
    console.warn(`Unauthenticated user trying to access protected page. Redirecting to ${redirectUrl} ...`);
    history.push(redirectUrl);
  }

  return (
    <Page>
      {children}
    </Page>
  );
};

export default ProtectedPage;