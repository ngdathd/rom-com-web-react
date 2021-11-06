// 🐹 🐹 🐹 🐹 🐹 🐹

import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/argon/vendor/nucleo/css/nucleo.css";
// import "./argon/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/argon/css/argon-design-system-react.css";
import "./styles.css";

import TopMenu from "./components/UI/TopMenu";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Titles from "./components/Titles";
import FavoriteTitles from "./components/Titles/Favorite";
import AddEditTitle from "./components/Title/AddEdit";
import Title from "./components/Title";
import AuthProvider from "./Context/AuthProvider";

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <AppProvider> */}
        <TopMenu />
        <main>
          <Switch>
            <Route path="/titles/favorite" component={FavoriteTitles} />
            <Route path="/titles" exact component={Titles} />
            <Route exact path="/title/add" component={AddEditTitle} />
            <Route path="/title/:id/edit" component={AddEditTitle} />
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
