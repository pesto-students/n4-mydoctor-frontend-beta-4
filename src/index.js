import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./state";
import i18n from "./translations/en/i18n";

i18next.init({
    interpolation: { escapeValue: false },
    lng: 'en',
    resources: {
        en: {
          i18n: i18n
        }
    },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
