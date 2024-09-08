import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance"

export const withdraw= async (body)=>{
    try {
        const response = await axiosInstance.post(`/withdraw`, body);
        console.log('response', response);
        toast.success('Withdraw Request submitted');
        return response.data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}

export const withdrawHistory= async ()=>{
    try {
        const response = await axiosInstance.get(`/withdraw/withdrawByUser`);
        let modified = response.data.map((item)=>{
            item.currencyId = item.currencyId.tag;
            item.status = item.status.name;
            return item
        })
        return modified
    } catch (error) {
        console.log('err', error)
        toast.error(error);
        return null
    }
}


