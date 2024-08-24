import axiosInstance from "./axiosInstance"

export const fetchProfileData= async (id)=>{
    try {
        const response = await axiosInstance.get(`/users/${id}`);
        return response.data
    } catch (error) {
        console.log('err', error)
        return null
    }
}