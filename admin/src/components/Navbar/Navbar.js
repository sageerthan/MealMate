import './Navbar.css';
import {assets} from '../../assets/assets';
import {Link} from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to ='/'>
        <img className='logo' src={assets.logo} alt=""/>
      </Link>
        <img className='profile' src={assets.profile_image} alt=""/>
    </div>
  )
}
