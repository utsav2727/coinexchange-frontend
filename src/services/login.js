import axiosInstance from "./axiosInstance";
import { toast } from 'react-toastify';
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const loginUser = async (body) => {
    try {
        const response = await axiosInstance.post('/auth/login', body);

        if (response.data.status == true)
            toast.success('Login success');
        cookies.set("TOKEN", response.data.token, {
            path: "/",
        });
        console.log('response.data', response.data);
        setTimeout(() => {
            window.location.href = "/"
        }, 1000)
        return response.data;
    } catch (error) {
        console.log('error', error)
        toast.error(error.response.data.msg)
        return null;
    }
}   