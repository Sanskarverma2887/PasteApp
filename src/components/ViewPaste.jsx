import React from 'react'
import './ViewPaste.css'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
const ViewPaste = () => {
  const [searchParams] =  useSearchParams()
  const pasteId = searchParams.get("pasteId") 
  const allPastes = useSelector((state)=>state.paste.pastes);
  const myPaste = allPastes.find((paste)=>paste.id===pasteId);
  console.log(myPaste)
  return (
    <div className='viewPaste-container'>
      <div className='VPcard-container'>
      <h1 className='vp-title'>{myPaste.title}</h1>
      <p className='vp-content'>{myPaste.content}</p>
      </div>
    </div>
  )
}

export default ViewPaste
