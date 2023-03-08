import React, { useEffect, useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { Link,useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../redux/features/userSlice'
import '../styles/Layout.css'
import { AdminMenu, UserMenu } from './Menu'




const Layout = ({children}) => {
    console.log( AdminMenu, UserMenu);
    const [color,setColor] =useState('rgb(9, 2, 34)')
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user)
    //const currentUser = user.user
    const location = useLocation()
    const handleLogout =()=>{
        localStorage.clear();
        dispatch(logout())
        navigate('/login')
    }
    //rendering menu list
    const check =user?.isAdmin
    console.log(check,"this is admin");
    const Sidebar=check? AdminMenu:UserMenu
    useEffect(()=>{

    },[user])
   
  return (
    <>
    <div className="main" >
        <div className="layout" >
            <div className="sidebar" style={{color}}>
                <div className="logo" style={{color:'white'}}>
                    <h6><em>LOGO</em></h6>
                </div>
                {
                    check? <h1>admin</h1>:<h2>user</h2>
                }
                <div className="menu" >
                      {Sidebar.map(menu=>{
                        const isActive =location.pathname==menu.path
                        return (
                            <>
                            <div className={`menu-item ${isActive&&"active"}`}>
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                            </>
                        )
                      })}
                       <div className={`menu-item`} onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <Link to='/login'>Logout</Link>
                       </div>


                </div>
            </div>
            <div className="content">
                <div className="header">
                    <div className="header-content">
                    {/* <i class="fa-sharp fa-solid fa-bell"></i> */}
                    <h4><em>{user?.name}</em></h4>
                    </div>
                </div>
                <div className="body">{children}</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Layout
