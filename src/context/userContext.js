import { createContext } from 'react';

export const UserContext = createContext({
    isLoggedIn:false,
    userData:{},
    setLoggedIn:(user)=>{},
    setLoggedOut:()=>{},
});