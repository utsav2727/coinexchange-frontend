import { toast } from "react-toastify";
import axiosInstance, { axiosInstanceUpload } from "./axiosInstance";

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


export const createMsg = async (formData) => {
    try {
      const response = await axiosInstance.post(`/chat/createChat`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('response', response);
      return response.data;
    } catch (error) {
      console.log('err', error);
      toast.error(error.response?.data?.message || 'Error occurred');
      return null;
    }
  };

  

