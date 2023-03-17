import React from "react";
import { Home } from "app/presentation/home/Home";
import { initialHomeViewState } from "app/presentation/home/HomeReducer";

function App() {
  return <Home {...initialHomeViewState.commonViewState}/>;
}

export default App;
