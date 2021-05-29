import { isUserLoggedIn } from "actions";
import "App.css";
import { MainRouter } from "components";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth]);
  return (
    <div className="App">
      <MainRouter />
    </div>
  );
}

export default App;
