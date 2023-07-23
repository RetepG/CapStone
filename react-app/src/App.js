import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage"
import ItemDetails from "./components/ItemById";
import CreateItem from "./components/CreateItem";
import UpdateItem from "./components/UpdateItems";
import MyPage from "./components/MyPage";
import UserCart from "./components/Cart/UserCart";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/items/new">
            <CreateItem />
          </Route>
          <Route path="/mypage">
            <MyPage />
          </Route>
          <Route path="/user/cart">
            <UserCart />
          </Route>
          <Route path="/items/:itemId/update">
            <UpdateItem />
          </Route>
          <Route path="/items/:itemId">
            <ItemDetails />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
