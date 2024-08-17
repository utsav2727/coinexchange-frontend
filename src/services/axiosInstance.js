import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const dns= (process.env.REACT_APP_ENV==='development')? 'http://localhost:6001':'';

const axiosInstance = axios.create({
  baseURL : `${dns}/api`,
  headers: {
    "Content-Type": "application/json",
    timeout : 4000,
    authorization:`Bearer ${cookies.get('TOKEN')}` 
  }, 
});

export default axiosInstance;