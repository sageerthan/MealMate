import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
export const Navbar = ({setShowLogin}) => {

     const navigate=useNavigate();
     const[menu,setMenu]=useState('home');

     const{getTotalCartAmount,token,setToken}=useContext(StoreContext)

     const logout=()=>{
       localStorage.removeItem('token');
       setToken('');
       navigate('/');
     }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt='MealMate' className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setMenu('home')} className={menu==='home'?'active':''}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu('menu')} className={menu==='menu'?'active':''}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu('mobile-app')} className={menu==='mobile-app'?'active':''}>Mobile-app</a>
        <a href='#footer' onClick={()=>setMenu('contact-us')} className={menu==='contact-us'?'active':''}>Contact us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt=''/>
        <div className='navbar-search'>
          <Link to='/cart'><img src={assets.basket} alt=''/></Link>
          <div className={getTotalCartAmount()>0?"dot":""}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
        :<div className='navbar-profile'>
            <img src={assets.profile_icon} alt=''/>
            <ul className='nav-profile-dropdown'>
              <li onClick={()=>navigate('/myorders')}><i class="fa fa-shopping-bag" aria-hidden="true"></i><p>Orders</p></li>
              <hr/>
              <li onClick={logout}><i class="fa fa-sign-out" aria-hidden="true"></i><p>Logout</p></li>
            </ul>

        </div>
        }
      </div>
    </div>
  )
}
