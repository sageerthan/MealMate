import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css';

export const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img src={assets.logo} alt='' className='logo' />
                    <p>At MealMate, we're passionate about bringing delicious meals to your doorstep.
                       Explore a wide range of mouth-watering dishes, from gourmet meals to comfort food classics, all prepared with the freshest ingredients by our top-rated chefs.</p>

                    <p>MealMate – Your Perfect Dining Companion.</p>
                    
                    <div className='footer-social-icon'>
                        <img src={assets.facebook_icon} alt='' />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>Get in touch</h2>
                    <ul>
                        <li>+94775689123</li>
                        <li>mealmate@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright 2024 &copy;Mealmate -All Right Reserved</p>
        </div>
    )
}
