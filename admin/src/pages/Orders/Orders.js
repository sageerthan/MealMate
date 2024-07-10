import './Orders.css'
import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { MetaData } from '../../components/MetaData'
export const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);


  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/v1/listorders`);
    if (response.data.success) {
      setOrders(response.data.orders);
    }
    else {
      toast.error('Error!')
    }
  }
  
  const statusHandler=async(e,orderId)=>{
     const response=await axios.put(`${url}/api/v1/updatestatus`,{orderId,status:e.target.value})
     if(response.data.success){
      toast.success("Status updated successfully");
      await fetchAllOrders(); 
     } 
  }

  useEffect(() => {
    fetchAllOrders();
  }, [])
  return (
  <Fragment>
     <MetaData title='Orders' />
    <div className='order add'>
      <h3>Orders Page</h3>
      <div className='order-list'>
        {
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt='' />
              <div>
                <p className='order-item-food'>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity
                    }
                    else {
                      return item.name + " x " + item.quantity + ", "
                    }
                  })
                  }
                </p>
                <p className="order-item-name">
                  {order.address.firstName + " " + order.address.lastName}
                </p>
                <div className="order-item-address">
                  <p>{order.address.address + ", "}</p>
                  <p>{order.address.city + ", " + order.address.postalCode}</p>
                </div>
                <p className="order-item-phone">{order.address.phoneNo}</p>
              </div>
              <p>Items:{order.items.length}</p>
              <p>Amount: Rs{order.amount}</p>
              <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        }
      </div>
    </div>
  </Fragment>
  )
}
