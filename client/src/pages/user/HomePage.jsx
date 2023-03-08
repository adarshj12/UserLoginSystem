import axios from 'axios'
import React, { useEffect } from 'react'
import Layout from '../../components/Layout'
import { useSelector } from 'react-redux'


const HomePage = () => {
  const {user} = useSelector(state=>state.user)
  const check =user?.isAdmin
  console.log(check);
  //login user data
  const getUserData=async()=>{
    try {
      const res = await axios.post('http://localhost:5000/userDetails',
      {},
      {
        headers:{
          Authorization:"Bearer "+localStorage.getItem('userToken')
        }
      })
    } catch (error) {
      console.log(`error=> ${error.message}`);
    }
  }

  useEffect(()=>{
    getUserData();
  },[])

  return (
    <Layout>
      {
        check? 
        <img src="https://png.pngtree.com/background/20211217/original/pngtree-blue-round-technology-dashboard-picture-image_1598386.jpg" style={{width:'1000px',height:'680px'}} alt="" />:
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCyS7HrY2__fl6OR0PFSqeDI_bHPGvjYhHAA&usqp=CAU" style={{width:'1000px',height:'680px'}} alt="" />
      }
      
    </Layout>
  )
}

export default HomePage
