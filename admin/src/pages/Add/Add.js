import { assets } from '../../assets/assets';
import './Add.css';
import { MetaData } from '../../components/MetaData'
import { useState,Fragment } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
export const Add = ({url}) => {

    
    const[image,setImage]=useState(false);
    const[data,setData]=useState({
       name:'',
       price:'',
       description:'',
       category:'Salad'
    })
    const changeHandler=(e)=>{
      setData(data=>({...data,[e.target.name]:e.target.value}))
    }
    const submitHandler=async(e)=>{
      e.preventDefault();
      const formData=new FormData();
      formData.append('name',data.name);
      formData.append('price',Number(data.price));
      formData.append('description',data.description);
      formData.append('category',data.category);
      formData.append('image',image);

      const response=await axios.post(`${url}/api/v1/addfood`,formData);
      if(response.data.success){
        toast.success(response.data.message)
        setData({
           name:'',
           description:'',
           price:'',
           category:'Salad'
        })
        setImage(false)
      }
      else{
        toast.error(response.data.message)
      }

    }
    
  return (
    <Fragment>
      <MetaData title='Add product' />
      <div className='add'>
        <h2 className='title'>Add Product</h2>
        <form className='flex-col' onSubmit={submitHandler}>
          <div className='add-img-upload flex-col'>
            <p>Upload Image</p>
            <label htmlFor='image'>
              <img src={image?URL.createObjectURL(image): assets.upload_area} alt='' />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
          </div>
          <div className='add-product-name flex-col'>
            <p>Product name</p>
            <input type='text' 
            name='name' 
            placeholder='Product name'
            value={data.name}
            onChange={changeHandler} />
          </div>
          <div className='add-product-description flex-col'>
            <p>Product description</p>
            <textarea name='description'
             rows='6'
             placeholder='Write content here'
             value={data.description}
             onChange={changeHandler}></textarea>
          </div>
          <div className='add-category-price'>
            <div className='add-category flex-col'>
              <p>Product category</p>
              <select name='category' onChange={changeHandler}>
                <option value='Salad'>Salad</option>
                <option value='Rolls'>Rolls</option>
                <option value='Deserts'>Deserts</option>
                <option value='Sandwich'>Sandwich</option>
                <option value='Cake'>Cake</option>
                <option value='Pure Veg'>Pure Veg</option>
                <option value='Pasta'>Pasta</option>
                <option value='Noodles'>Noodles</option>
                <option value='Kothu'>Kothu</option>
              </select>
            </div>
            <div className='add-price flex-col'>
              <p>Product price</p>
              <input type='Number'
               name='price'
               value={data.price}
               onChange={changeHandler}
                />
            </div>
          </div>
          <button type='submit' className='add-btn'>ADD</button>
        </form>
      </div>
    </Fragment>
  )
}
