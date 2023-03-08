import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { imageUrl } from '../../constants'
import { setUser } from '../../redux/features/userSlice'
import jwtDecode from 'jwt-decode'
import axios from 'axios'

const UserProfile = () => {
    const dispatch=useDispatch()
     const {user}=useSelector(state=> state.user)
    //  console.log(user);
    //  console.log(user?._id);
    //  console.log(user?.name);
    const [image,setImage]=useState('');
    const handleChange=(e)=>{
        setImage(e.target.files[0]);
    }
    console.log(image);
     let token = localStorage.getItem('userToken')
     let decoded=jwtDecode(token)
     const imagePath=imageUrl+decoded.id.profile
     console.log(imagePath);
     const handleApi =async()=>{
        const formData=new FormData();
        formData.append('image',image);
        let imgResponse =await axios.post(`http://localhost:5000/changeProfile`,formData,
        {
            headers:{
              Authorization:"Bearer "+token
            }
          })
        console.log(imgResponse);
    }
    useEffect(()=>{
    },[user])
    return (
        <>
            <div className="card text-center" >
                <div className="card-header">
                    <h4>{user?.name}'s Profile Image</h4>
                </div>
                <div className="card-body">
                    <div className="input-upload">
                    <img class="rounded-circle mt-5" width={150} height={150} src={imagePath}  alt="profile photo" />
                        <br />
                        <input className=" " type="file" onChange={handleChange} id='profile' />
                    </div>
                    <button className="btn btn-primary" onClick={handleApi} >CHANGE PROFILE IMAGE</button>
                </div>
            </div>
        </>
    )
}

export default UserProfile
