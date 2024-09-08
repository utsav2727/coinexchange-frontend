import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance"

export const tradeList= async (type)=>{
    try {
        const response = await axiosInstance.post('/trades/list',{type:type});
        console.log('response', response);
        return response.data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}

export const tradeById= async (id)=>{
    try {
        const response = await axiosInstance.get(`/trades/${id}`);
        console.log('response', response);
        return response.data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}


export const createSellTrade =async (body)=>{
    try {
        const response = await axiosInstance.post('/trades/',body);
        console.log('response', response);
        toast.success('your request registered.')
        return response.data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}

export const createBuyTrade =async (body)=>{
    try {
        body.message = `Hi, I want to buy $${body.sourceAmount} at exchange rate ${body.exchangeRate}`
        const response = await axiosInstance.post('/trades/',body);
        console.log('response', response);
        toast.success('your request registered.')
        return response.data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}

export const createChatBuyService = async (body)=>{
    try {
        body.type='buy';

        // {
        //     "type":"buy",
        //     "seller":"66cb1bcf52d1bfc642b94ecd",
        //     "tradeId":"66dc5bba934f178dfa242780",
        //     "message":"I am buyer"
        //   }
        console.log('body-->', body);
        const response = await axiosInstance.post('/trades/createTradeItem/',body);
        console.log('response', response);
        window.location.href = `/tradeChat/${response.data.tradeId}/${response.data._id}`;
        return response.data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}