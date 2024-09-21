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

export const alltrade= async ()=>{
    try {
        const response = await axiosInstance.get('/trades/');
        console.log('response', response.data);

        const modified = response.data.map((item)=>{
            item.seller = item.seller?.username;
            item.buyer = item.buyer?.username;
            return item
        })

        return modified;
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
export const tradeItemsById= async (id)=>{
    try {
        const response = await axiosInstance.get(`/trades/tradeitems/${id}`);
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

export const createChatBuyServiceSell = async (body)=>{
    try {
        body.type='sell';
        console.log('body-->', body);
        const response = await axiosInstance.post('/trades/createTradeItemSell/',body);
        console.log('response', response);
        window.location.href = `/tradeChat/${response.data.tradeId}/${response.data._id}`;
        return response.data
    } catch (error) {
        console.log('err', error)
        toast.error(error.response.data.message)
        return null
    }
}


export const cancelTradeLineItem = async (tradeLineItemId) => {
    try {
      // Send PUT request to cancel the TradeLineItem
      const response = await axiosInstance.put(`/trades/cancelTradeLineItem/${tradeLineItemId}`);
      
      // Log and return the response
      console.log('TradeLineItem cancelled successfully:', response.data);

      window.location.href = "/mytrades";
      return response.data;
    } catch (error) {
      // Handle errors
      toast.error(error.response.data.message)
      return null;
    }
  };



export const paidTradeLineItem = async (tradeLineItemId) => {
    try {
      // Send PUT request to cancel the TradeLineItem
      const response = await axiosInstance.post(`/trades/paidbuttonTradeLineItem/${tradeLineItemId}`);
      
      // Log and return the response
      console.log('TradeLineItem cancelled successfully:', response.data);

      toast.success("Item Marked as Buyer Paid.")
        window.location.reload();
      return response.data;
    } catch (error) {
      // Handle errors
      toast.error(error.response.data.message)
      return null;
    }
  };

export const receivedTradeLineItem = async (tradeLineItemId) => {
    try {
      // Send PUT request to cancel the TradeLineItem
      const response = await axiosInstance.post(`/trades/recievebuttonTradeLineItem/${tradeLineItemId}`);
      
      // Log and return the response
      console.log('TradeLineItem cancelled successfully:', response.data);

      toast.success("Payment released to buyer.")
        window.location.reload();
      return response.data;
    } catch (error) {
      // Handle errors
      toast.error(error.response.data.message)
      return null;
    }
  };  

