import { toast } from "react-toastify";
import axiosInstance from "./axiosInstance"

export const updateProfileData= async (id, body)=>{
    try {
        const response = await axiosInstance.put(`/users/${id}`, body);
        toast.success('Profile updated.')
        return response.data
    } catch (error) {
        console.log('err', error)
        toast.error(error);
        return null
    }
}