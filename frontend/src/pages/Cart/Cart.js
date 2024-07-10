import React, { Fragment, useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { MetaData } from '../../components/MetaData';
import {useNavigate} from 'react-router-dom'
export const Cart = () => {
  const { cartItems, foodList, removeComplete, getTotalCartAmount, url} = useContext(StoreContext);
  const navigate=useNavigate();
  return (
    <Fragment>
      <MetaData title={'Ordered Items'}/>
    <div className='cart'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          foodList.map((item, index) => {
            if (cartItems[item._id]) {
              return (
                <div>
                  <div className='cart-items-title cart-items-item'>

                    <img src={`${url}/images/${item.image}`} alt='' />
                    <p>{item.name}</p>
                    <p>Rs {item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>{item.price * cartItems[item._id]}</p>
                    <p className='remove' onClick={() => removeComplete(item._id)}>X</p>
                  </div>
                  <hr />
                </div>
              )
            }
          })
        }
      </div>
      <div className='cart-bottom'>
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
          <button onClick={()=>navigate('/order')}>Checkout</button>
        </div>
        
      </div>
    </div>
    </Fragment>
  )
}
