import { Fragment, useEffect, useState } from "react"
import { MetaData } from '../../components/MetaData'
import './Dashboard.css'
import axios from 'axios';
export const Dashboard = ({url}) => {
    const[foods,setFoods]=useState('');
    const[orders,setOrders]=useState('');
      const fetchFoods=async()=>{
        const response=await axios.get(`${url}/api/v1/getfoods`);
        setFoods(response.data.foods)
      }
      const fetchAllOrders = async () => {
          const response = await axios.get(`${url}/api/v1/listorders`);
          setOrders(response.data.orders);
      }
      let totalAmount=0;
      if(orders.length>0){
        orders.forEach(order=>{
            totalAmount+=order.amount
        })
      }

      useEffect(()=>{
        fetchFoods();
        fetchAllOrders();
      },[])
  return (
    <Fragment>
        <MetaData title='Dashboard'/>
        <div className='dashboard'>
            <div className='dashboard-items'>
                <div className='foods'>
                    <div style={{color:'white'}}>Foods <i className="fa fa-cutlery" aria-hidden="true"><br/></i>   
                    </div>
                    <div>
                    <b>{foods.length}</b>
                    </div>
                </div>
                <div className='orders'>
                    <div style={{color:'white'}}>Orders <i className="fa fa-shopping-bag" aria-hidden="true"><br/></i>   
                    </div>
                    <div>
                    <b>{orders.length}</b>
                    </div>
                </div>
                <div className='amount'>
                    <div style={{color:'white'}}>Total Amount <i className="fa fa-money" aria-hidden="true"><br/></i>   
                    </div>
                    <div>
                    <b>Rs {totalAmount}</b>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
   
  )
}
