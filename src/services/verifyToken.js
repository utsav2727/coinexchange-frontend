import axiosInstance from "./axiosInstance";

export const verifyToken = async () => {
    try {
        const response = await axiosInstance.post('/auth/verifyToken');
        return response.data
    } catch (error) {
        return null;
    }
}   