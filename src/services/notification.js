// /users/notification/:id

import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance"
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const notificationToken= async (body)=>{
    try {
        const response = await axiosInstance.put(`/users/notification`, body);
        return response.data
    } catch (error) {
        console.log('err', error);
        return null
    }
}
