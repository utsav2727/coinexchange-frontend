import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance"

export const transactionList= async ()=>{
    try {
        const response = await axiosInstance.get('/transaction');

        const data = response.data.map((item)=>{
            item.username = item.userId.username;
            return item
        })
        console.log('response', response);
        return data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}