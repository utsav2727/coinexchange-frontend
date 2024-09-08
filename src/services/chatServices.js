import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance";

export const chatMsgs= async (tradeId, tradeItemId)=>{
    try {
        // http://localhost:6001/api/chat/fetch/66dc5bba934f178dfa242780/66dc69250b3acb8c9d3ec73c
        const response = await axiosInstance.get(`/chat/fetch/${tradeId}/${tradeItemId}`);
        console.log('response', response);
        return response.data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}


export const createMsg= async (to, message, tradeLineItem)=>{
    try {
        // http://localhost:6001/api/chat/fetch/66dc5bba934f178dfa242780/66dc69250b3acb8c9d3ec73c
        const response = await axiosInstance.post(`/chat/createChat`, {
            to:to,
            message:message,
            tradeLineItem: tradeLineItem
        });
        console.log('response', response);
        return response.data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}

