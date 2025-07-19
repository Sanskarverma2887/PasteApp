import React from 'react'
import {createBrowserRouter,  RouterProvider } from 'react-router-dom'
import ViewPaste from './components/ViewPaste'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Pastes from './components/Pastes'
import './App.css'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
     <div className='main-container'>
      <Navbar/>
      <Home/>
      </div>
    },
    {
      path:"/pastes",
      element:
      <div className='main-container'>
        <Navbar/>
        <Pastes/>
      </div>
    },
    {
      path:"/view-paste",
      element:
      <div className='main-container'>
        <Navbar/>
        <ViewPaste/>
      </div>
    },
  ]
)


const App = () => {
  return (
    <RouterProvider router = {router}/>
  )
}

export default App
