import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance"

export const checkBalance= async ()=>{
    try {
        const response = await axiosInstance.get('/wallet/walletByUser/');
        console.log('response', response);
        return response.data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}


