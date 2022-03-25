import React from "react";
import { Provider } from "react-redux";
import Application from "./Application";
import "./locales/i18n";
import store from "./redux/configureStore";

export default function App() {
  return (
    <Provider store={store}>
      <Application />
    </Provider>
  );
}
