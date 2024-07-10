import React from 'react'
import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Orders } from './pages/Orders/Orders';
import { List } from './pages/List/List';
import { Add } from './pages/Add/Add';
import {HelmetProvider} from 'react-helmet-async';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dashboard } from './pages/Dashboard/Dashboard';
const App = () => {
  const url='http://localhost:8000';
  return (
    <Router>
      <div>
        <HelmetProvider>
        <Navbar />
        <ToastContainer theme='colored' position='top-center'/>
        <div className='app-content'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Dashboard url={url}/>}/>
            <Route path='/add' element={<Add url={url}/>}/>
            <Route path='/list' element={<List url={url}/>}/>
            <Route path='/orders' element={<Orders url={url}/>}/>                                                  
          </Routes>
        </div>
        </HelmetProvider>
      </div>
    </Router>

  )
}

export default App