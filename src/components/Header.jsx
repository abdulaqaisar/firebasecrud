import React,{useEffect,useState} from 'react'
import {Link ,  useLoaderData,  useLocation } from 'react-router-dom'
import './Header.css'
const Header = () => {
    const[activeTab,setActiveTab] = useState("Home")
    const location = useLocation();
    useEffect(()=>{
        if (location.pathname==='/') {
            setActiveTab("Home")
        }
        else if (location.pathname==='about') {
            setActiveTab("About")
        }
        if (location.pathname==='add') {
            setActiveTab("AddContact")
        }
    },[location])
  return (
    <div className='header'>
        <p className="logo">Contact App</p>
        <div className="header-right">
            <Link to={'/'}>
               <p className={`${activeTab==="Home" ? "active" : ""}`} onClick={()=>{
                setActiveTab("Home")
               }}>
                    Home
               </p>
            </Link>
            <Link to={'/add'}>
               <p className={`${activeTab==="AddContact" ? "active" : ""}`} onClick={()=>{
                setActiveTab("AddContact")
               }}>
                    Add Contact
               </p>
            </Link>
            <Link to={'/about'}>
               <p className={`${activeTab==="About" ? "active" : ""}`} onClick={()=>{
                setActiveTab("About")
               }}>
                    About
               </p>
            </Link>
            <Link to={'/storeimg'}>
               <p className={`${activeTab==="Storeimagetext" ? "active" : ""}`} onClick={()=>{
                setActiveTab("Storeimagetext")
               }}>
                    Store Image Text
               </p>
            </Link>
        </div>
    </div>
  )
}

export default Header