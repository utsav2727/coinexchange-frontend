import {
  createBrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import React from 'react';
import LandingPage from '../pages/LandingPage';
import SignIn from '../pages/SigninPage';
import ErrorPage from "../pages/ErrorPage";

const RoutePage = () => {
  return (
      <>
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </>
  );
}

export default RoutePage;
