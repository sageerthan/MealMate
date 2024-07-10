import { assets } from '../../assets/assets';
import './Sidebar.css';
import { Link } from 'react-router-dom';
export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
        <Link to='/add' className='sidebar-option'>
          <img src={assets.add_icon} alt=''/>
          <p>Add Items</p>
        </Link>
        <Link to='/list' className='sidebar-option'>
          <img src={assets.order_icon} alt=''/>
          <p>List Items</p>
        </Link>
        <Link to='/orders' className='sidebar-option'>
          <i className="fa fa-cutlery custom-size" ></i> 
          <p>Orders</p>
        </Link>
      </div>

    </div>
  )
}
