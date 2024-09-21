import axios from "axios";
import { useContext } from "react";
import Cookies from "universal-cookie";
import { LoadingContext } from "../LoadingContext";
// import { LoadingContext } from "../LoadingContext";
const cookies = new Cookies();


const dns= (process.env.REACT_APP_ENV=='development')? 'http://localhost:6001':process.env.REACT_APP_BACKEND_CONTEXT;

const axiosInstance = axios.create({
  baseURL : `${dns}/api`,
  headers: {
    "Content-Type": "application/json",
    timeout : 4000,
    authorization:`Bearer ${cookies.get('TOKEN')}` 
  }, 
});

export const axiosInstanceUpload = axios.create({
  baseURL : `${dns}/api`,
  headers: {
    "Content-Type": 'multipart/form-data',
    authorization:`Bearer ${cookies.get('TOKEN')}` 
  }, 
});

export const useAxiosInterceptors = () => {
  const { setLoading } = useContext(LoadingContext);

  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      setLoading(true); // Start loading before request is sent
      return config;
    },
    (error) => {
      setLoading(false); // Stop loading if request error occurs
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      setLoading(false); // Stop loading after response is received
      return response;
    },
    (error) => {
      setLoading(false); // Stop loading if response error occurs
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;