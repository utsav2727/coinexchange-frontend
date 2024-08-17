import { toast } from "react-toastify";
import Cookies from "universal-cookie";



export const logout = ()=>{
    const cookie = new Cookies();
    cookie.remove('TOKEN');
    toast.info('Logged out..');
    setTimeout(() => {
        window.location.href = "/"
    }, 1000)
}