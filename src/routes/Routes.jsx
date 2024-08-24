import {
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import React from 'react';
import LandingPage from '../pages/LandingPage';
import SignIn from '../pages/SigninPage';
import ErrorPage from "../pages/ErrorPage";
import SignUp from "../pages/SignupPage";
import Auth from "../helper/Auth";
import ProfilePage from "../pages/ProfilePage";
import AuthRequire from "../helper/AuthRequire";
import WalletPage from "../pages/WalletPage";

const RoutePage = () => {
  return (
      <>
          <Routes>
           <Route path="/" element={<LandingPage />} />
           <Route path="/signin" element={<Auth><SignIn /></Auth>} />
           <Route path="*" element={<ErrorPage />} />
           <Route path="/signup" element={<Auth><SignUp /></Auth>} />
           <Route path="/profile" element={<AuthRequire><ProfilePage/></AuthRequire>}/>
           <Route path="/wallet" element={<AuthRequire><WalletPage/></AuthRequire>}/>
          </Routes>
      </>
  );
}

export default RoutePage;
