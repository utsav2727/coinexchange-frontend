import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance"

export const manualDeposit= async (body)=>{
    try {
        const response = await axiosInstance.post(`/deposits`, body);
        console.log('response', response);
        toast.success('Desposit Request submitted');
        return response.data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}

export const depositHistory= async ()=>{
    try {
        const response = await axiosInstance.get(`/deposits/depositByUser`);
        let modified = response.data.map((item)=>{
            item.currencyId = item.currencyId?.tag;
            item.status = item.status?.name;
            return item
        })
        return modified
    } catch (error) {
        console.log('err', error)
        toast.error(error);
        return null
    }
}


