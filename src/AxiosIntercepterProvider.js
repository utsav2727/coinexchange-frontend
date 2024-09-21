// AxiosInterceptorProvider.js
import { useEffect, useContext } from 'react';
import axiosInstance from '../src/services/axiosInstance';
import { LoadingContext } from './LoadingContext';

const AxiosInterceptorProvider = ({ children }) => {
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        setLoading(true); // Start loading before request is sent
        return config;
      },
      (error) => {
        setLoading(false); // Stop loading if request error occurs
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        setLoading(false); // Stop loading after response is received
        return response;
      },
      (error) => {
        setLoading(false); // Stop loading if response error occurs
        return Promise.reject(error);
      }
    );

    // Cleanup on unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [setLoading]);

  return children; // Render children (your app)
};

export default AxiosInterceptorProvider;
