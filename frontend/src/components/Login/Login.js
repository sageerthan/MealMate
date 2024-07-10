import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {toast} from 'react-toastify';
export const Login = ({setShowLogin}) => {
    const {url,setToken}=useContext(StoreContext)
    const[currentState,setCurrentState]=useState('Login');
    const[data,setData]=useState({
        name:'',
        email:'',
        password:''
    })
    const changeHandler=(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const submitHandler=async(e)=>{
          e.preventDefault();
          let response;
          if(currentState==='Login') 
            {
             response=await axios.post(`${url}/api/v1/login`,data);
            }
            else{
             response=await axios.post(`${url}/api/v1/register`,data);
            }
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token)
            setShowLogin(false)
        }
        else{
            toast(response.data.message,{
                type:'error'
            })
        }  

    }

  return (
    <div className='login-popup'>
        <form className='login-popup-container' onSubmit={submitHandler}>
            <div className='login-popup-title'>
                <h2>{currentState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=''/>               
            </div>
            <div className='login-popup-inputs'>
                {currentState==='Login'?<></>:<input type='text' name='name' onChange={changeHandler} value={data.name} placeholder='Your name' required/>}
                <input type='email' name='email' onChange={changeHandler} value={data.email} placeholder='Your email' required/>
                <input type='password' name='password' onChange={changeHandler} value={data.password} placeholder='Password' required/>
            </div>
            <button> {currentState ==='Login'?'Login':'Create account'}</button>
            <div className='login-popup-condition'>
                <input type='checkbox' required/>
                <p>By continuing, I agree the terms of use & privacy policy</p>
            </div>
            {currentState ==='Login'
            ? <p>Create a new account?<span onClick={()=>setCurrentState('Register')}>Click Here</span></p>
            : <p>Already have an account?<span onClick={()=>setCurrentState('Login')}>Login</span></p>
            }  
        </form>
    </div>
  )
}
