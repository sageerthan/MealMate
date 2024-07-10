import './List.css';
import axios from 'axios';
import { MetaData } from '../../components/MetaData'
import { useEffect, useState, Fragment } from 'react';
import { toast } from 'react-toastify';
export const List = ({url}) => {

  const[list,setList]=useState([]);

  const fetchList=async()=>{
    const response=await axios.get(`${url}/api/v1/getfoods`);
    if(response.data.success){
      setList(response.data.foods);
    }
    else{
      toast.error(response.data.message)
    }
  }
  const removeFood =async(foodId)=>{
     const response=await axios.delete(`${url}/api/v1/removefood/${foodId}`);
     console.log(response);

   if(response.data.success){
    toast.success(response.data.message)
    await fetchList();
   }
   else {
    toast.error(response.data.message);
  }
  
  
  }

  useEffect(()=>{
     fetchList();
  },[])
  return (
    <Fragment>
      <MetaData title='All products' />
    <div className='list add flex-col'>
      <h3>All Foods List</h3>
      <div className='list-table'>
        <div className='list-table-format title'>
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {
          list.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/${item.image}`} alt=''/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>Rs {item.price}</p>
                <p onClick={()=>removeFood(item._id)}><i className="fa fa-trash" style={{color:'red',cursor:'pointer'}}></i></p>
              </div>
            )
          })
        }
      </div>
    </div>
    </Fragment>
  )
}
