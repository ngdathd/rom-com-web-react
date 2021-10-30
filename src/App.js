// 🐹 🐹 🐹 🐹 🐹 🐹

import { useContext, useRef, useEffect } from "react";
import { Container } from "reactstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./argon/vendor/nucleo/css/nucleo.css";
// import "./argon/vendor/font-awesome/css/font-awesome.min.css";
import "./argon/css/argon-design-system-react.css";
import "./styles.css";

import TopMenu from "./components/TopMenu";
import DemoNavBar from "./components/DemoNavBar";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Titles from "./components/Titles";
import AddTitle from "./components/Title/Add.js";
import Title from "./components/Title/index.js";
import AuthProvider from "./Context/AuthProvider";

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
    // mainEle.current.scrollTop = 0;
    // console.log(document);
  }, [])
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <AppProvider> */}
        <DemoNavBar />
        <main>
          <Switch>
            <Route path="/titles" component={Titles} />
            <Route exact path="/title/add">
              <AddTitle />
            </Route>
            <Route path="/title/:id" component={Title} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={HomePage} />
          </Switch>
        </main>
        {/* <AddRoomModal />
        <InviteMemberModal /> */}
        {/* </AppProvider> */}
      </AuthProvider>
    </BrowserRouter>
  );
}
