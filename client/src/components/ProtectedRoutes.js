import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import { setUser } from '../redux/features/userSlice';

export default function ProtectedRoutes({children}) {
  const dispatch = useDispatch();
  const {user} =useSelector(state=>state.user)
  
  //get user
  const getUser = async()=>{
    try {
      dispatch(showLoading())
      const res = await axios.post('http://localhost:5000/userDetails',
      {
        token:localStorage.getItem('userToken')
      },
      {
        headers:{
          Authorization:`Bearer ${localStorage.getItem('userToken')}`
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        console.log(`this is response.data ====>>>>>>>>> ${JSON.stringify(res)}`);
        dispatch(setUser(res.data.data))
      }else{
        <Navigate to='/login'/>
        localStorage.clear()
      }
    } catch (error) {
      dispatch(hideLoading())
      localStorage.clear()
      console.log(error);
    }
  }

  useEffect(()=>{
    if(!user){
      getUser()
    }
  },[user,getUser])

  if(localStorage.getItem('userToken')){
    return children
  }else{
    return <Navigate to='/login'/>
  }
}

