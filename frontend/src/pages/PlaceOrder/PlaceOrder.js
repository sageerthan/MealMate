import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
export const PlaceOrder = () => {
  const{getTotalCartAmount,token,foodList,cartItems,url}=useContext(StoreContext);
  const navigate=useNavigate();
  const[data,setData]=useState({
    firstName:'',
    lastName:'',
    email:'',
    address:'',
    city:'',
    postalCode:'',
    phoneNo:''
  })
  const onChangeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }
  const submitHandler=async(e)=>{
    e.preventDefault();
    let orderItems=[];
    foodList.forEach((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo['quantity']=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let formData={
         address:data,
         items:orderItems,
         amount:getTotalCartAmount()+100
    } 
    let response=await axios.post(`${url}/api/v1/placeorder`,formData,{headers:{token}});
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url);
      toast.success('Successfully proceed to payment')
    }
    else{
      toast.error('Failure in proceed to payment')
    }
  }
  useEffect(()=>{
    if(!token){
       navigate('/')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])
  return (
    <form className='place-order' onSubmit={submitHandler}>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input type='text'
           required
           placeholder='First name'
           name='firstName'
           value={data.firstName}
           onChange={onChangeHandler}/>

          <input type='text'
           required
           placeholder='Last name'
           name='lastName'
           value={data.lastName}
           onChange={onChangeHandler}/>
        </div>

        <input type='email'
         required
         placeholder='Email address'
         name='email'
         value={data.email}
         onChange={onChangeHandler}
         />
        <div className='multi-fields'>
          <input type='text' required placeholder='Address' name='address' value={data.address} onChange={onChangeHandler}/>
          <input type='text' required placeholder='City' name='city' value={data.city} onChange={onChangeHandler}/>
          <input type='text' required placeholder='PostalCode' name='postalCode' value={data.postalCode} onChange={onChangeHandler}/>
        </div>
        <input type='text' required placeholder='Phone No' name='phoneNo' value={data.phoneNo} onChange={onChangeHandler} />
      </div>

      <div className='place-order-right'>
      <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>Rs {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Charge</p>
              <p>Rs {getTotalCartAmount()===0?0:100}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Total</p>
              <p>Rs {getTotalCartAmount()===0?0:getTotalCartAmount()+100}</p>
            </div>            
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}
