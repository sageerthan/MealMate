import { useContext } from 'react';
import { assets } from '../../assets/assets';
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext';

export const FoodItem = ({ id, name, price, description, image }) => {
    const{cartItems={},addToCart,reduceFromCart,url}=useContext(StoreContext);
    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img className='food-item-img' src={`${url}/images/${image}`} alt={name} />
                {
                    !cartItems[id]?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>
                    :<div className='food-item-counter'>
                        <img  onClick={()=>reduceFromCart(id)} src={assets.remove_icon_red} alt=""/>
                        <p>{cartItems[id]}</p>
                        <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=""/>
                    </div>
                }
            </div>
            <div className="food-item-info">
                <p  className='food-item-name'>{name}</p>
                <p className='food-item-desc'>{description}</p>
                <p className="food-item-price">Rs{price}</p>
            </div>
        </div>
    )
}
