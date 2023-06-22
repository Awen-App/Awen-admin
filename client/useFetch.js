import React ,{useEffect ,useState } from "react";
import axios from "axios";
const useFetch=(url,dependencies)=>{
    const[data,setData] =useState([]);
    const [error,setError]=useState(null)
    const fetch = async() => {
        const response=await axios.get(url).catch(error => {
            console.log(error)
            setError(error)});
            setData(response.data)
            
      };
      useEffect(()=>{
        fetch();
      },[url,...dependencies])
      return {data,error}
}
export default useFetch;