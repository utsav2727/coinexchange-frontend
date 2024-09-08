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
import TradePage from "../pages/TradePage";
import TradeDetailPage from "../pages/TradeDetailsPage";
import ChatWindow from "../pages/TradeChatPage";
import MyTrades from "../pages/MyTrades";

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
           <Route path="/trade" element={<AuthRequire><TradePage/></AuthRequire>}/>
           <Route path="/tradeDetails" element={<AuthRequire><TradeDetailPage/></AuthRequire>}/>
           <Route path="/trade-details/buy/:tradeId" element={<AuthRequire><TradeDetailPage/></AuthRequire>}/>
           <Route path="/tradeChat/:tradeId/:tradeItemId" element={<AuthRequire><ChatWindow/></AuthRequire>}/>
           <Route path="/mytrades" element={<AuthRequire><MyTrades/></AuthRequire>}/>
          </Routes>
      </>
  );
}

export default RoutePage;
