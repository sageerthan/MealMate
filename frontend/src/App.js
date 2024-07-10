import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Navbar } from './components/navbar/Navbar';
import { Cart } from './pages/Cart/Cart'
import { PlaceOrder } from './pages/PlaceOrder/PlaceOrder';
import { StoreContextProvider } from './context/StoreContext';
import { Footer } from './components/Footer/Footer';
import { Login } from './components/Login/Login';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Verify } from './pages/Verify/Verify';
import { MyOrders } from './pages/MyOrders/MyOrders';
function App() {
  const [showLogin,setShowLogin]=useState(false);
  return (
    <Router>
      <div className="App">
        <StoreContextProvider>
          <HelmetProvider>
            {showLogin?<Login  setShowLogin={setShowLogin}/>:<></>}
            <Navbar setShowLogin={setShowLogin}/>
            <ToastContainer theme='colored' position='top-center'/>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/order' element={<PlaceOrder />} />
              <Route path='/verify' element={<Verify/>}/>
              <Route path='/myorders' element={<MyOrders/>}/>
            </Routes>
            <Footer/>
          </HelmetProvider>
        </StoreContextProvider>
      </div>
    </Router>
  );
}

export default App;
