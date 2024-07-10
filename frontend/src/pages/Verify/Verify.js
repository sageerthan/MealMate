import { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'
import { toast } from 'react-toastify';
export const Verify = () => {
    const[searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get('success');
    const orderId=searchParams.get('orderId');
    const{url}=useContext(StoreContext);
    const navigate=useNavigate();
    const verifyPayment=async()=>{
        const response=await axios.post(`${url}/api/v1/verifyorder`,{success,orderId});
        
        if(response.data.success){
            toast.success('Payment Success');
            navigate('/myorders');  
        }
        else{
            toast.error('Payment Fail');
            navigate('/')
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
    return (
    <div className='verify'>
      <div className='loader'>

      </div>
    </div>
  )
}
