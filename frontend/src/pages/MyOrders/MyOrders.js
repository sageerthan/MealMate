import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext'
import './MyOrders.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export const MyOrders = () => {
    const {url,token}=useContext(StoreContext);
    const [data,setData]=useState([]);
    const navigate=useNavigate();
    const fetchOrders=async()=>{
        const response =await axios.post(`${url}/api/v1/userorders`,{},{headers:{token}});
        setData(response.data.data);
        console.log(response.data.data)
    }
    useEffect(()=>{
        if(token){
            fetchOrders();
        }
        else if(!token){
          navigate('/')
       }
    },[token])
  return (
    <div className='my-orders'>
       <h2>MyOrders</h2> 
       <div className='container'>
        {data.map((order,index)=>{
          return(
            <div key={index} className='my-orders-order'>
                <i className="fa fa-shopping-bag" aria-hidden="true" style={{fontSize:'20px'}}></i>
                <p>{order.items.map((item,index)=>{
                    if(index === order.items.length-1){
                      return item.name+" x "+item.quantity
                    }
                    else{
                      return item.name+" x "+item.quantity+", "
                    }
                })}</p>
                <p>Rs {order.amount}</p>
                <p>Items:{order.items.length}</p>
                <p style={{color:order.status==='Delivered'?'green':'orange'}}>{order.status}</p>
                <button onClick={fetchOrders}>Track Order</button>
            </div>
          )
        })}
       </div>
    </div>
  )
}

