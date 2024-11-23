import { Fragment } from "react";
import { StatusBar } from "expo-status-bar";

import Home from "./src/screens/Home";

export default function App() {
  return (
    <Fragment>
      <StatusBar
        style="light"
        translucent
      />

      <Home />
    </Fragment>
  )
}