import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { useEffect } from 'react'
import axios from 'axios'

import Home from './components/pages/Home'
import Login from './components/pages/auth/Login'
import Register from './components/pages/auth/Register'
import ProductSingle from './components/pages/products/ProductSingle'
import ProductNew from './components/pages/products/ProductNew'
import PageNavbar from './components/common/PageNavbar'
import Profile from './components/pages/profile/Profile'
import CommentSingle from './components/pages/CommentSingle'
import NotFound from './components/pages/NotFound'
import About from './components/pages/About'
import EditProfile from './components/pages/profile/EditProfile'
import EditProduct from './components/pages/products/EditProduct'
import DeleteProduct from './components/pages/products/DeleteProduct'
import DeleteProfile from './components/pages/profile/DeleteProfile'
import AreYouSure from './components/pages/AreYouSure'
import HomeUser from './components/pages/HomeUser'
import ProductSingleUser from './components/pages/products/ProductSingleUser'

const App = () => {

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios.get('/api/products/') // * <-- replace with your endpoint
  //     console.log(data)
  //   }
  //   getData()
  // })

  return (
    <div className='site-wrapper'>
      <BrowserRouter >
        <PageNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home-user" element={<HomeUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/new" element={<ProductNew />} />
          <Route path="/products/:productId" element={<ProductSingle />} />
          <Route path="/products/:productId/:postcodeUser" element={<ProductSingleUser />} />
          <Route path="/edit-product/:productId" element={<EditProduct />} />
          <Route path="/delete-product" element={<DeleteProduct />} />
          <Route path="/comments/:commentId" element={<CommentSingle />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile/:userId" element={<EditProfile />} />
          <Route path="/are-you-sure" element={<AreYouSure />} />
          <Route path="/delete-account" element={<DeleteProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/products/:productId" element={<ProductSingle />} /> */}
        </Routes>
      </BrowserRouter >
    </div>
  )
}

export default App
