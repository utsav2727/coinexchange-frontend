import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance"

export const myTrades= async ()=>{
    try {
        const response = await axiosInstance.get('/trades/mybuytrades');
        console.log('response', response);
        
        const data = response.data.map((item)=>{
            return {
                sellerName:item.seller.username,
                exchangeRate: item.tradeId.exchangeRate,
                amount: item.tradeId.sourceAmount,
                _id:item._id,
                tradeId:item.tradeId._id
            }
        })

        return data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}

export const mySellTrades= async ()=>{
    try {
        const response = await axiosInstance.get('/trades/myselltrades');
        console.log('response', response);
        
        const data = response.data.map((item)=>{
            return {
                buyer:item.buyer.username,
                exchangeRate: item.tradeId.exchangeRate,
                amount: item.tradeId.sourceAmount,
                _id:item._id,
                tradeId:item.tradeId._id
            }
        })

        return data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}