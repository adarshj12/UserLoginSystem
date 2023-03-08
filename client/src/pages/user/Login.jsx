import axios from 'axios'
import React from 'react'
import { useNavigate,Link } from 'react-router-dom'
import '../../styles/Register.css'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../../redux/features/alertSlice'
import Swal from 'sweetalert2'

const Login = () => {
  const navigate=useNavigate()
  const dispatch= useDispatch()
  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
        
        const email=event.target.email.value;
        const password=event.target.password.value;
        const body = {
            email,
            password
        }
        dispatch(showLoading())
        const res = await axios.post('http://localhost:5000/login',body);
        dispatch(hideLoading())
        if(res.data.success){
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Logged In',
                showConfirmButton: false,
                timer: 1500
              })
            localStorage.setItem('userToken',res.data.token)
            navigate('/')
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${res.data.message} !`,
              })
            console.log(res.data.message);
        }

    } catch (error) {
        dispatch(hideLoading())
        console.log(`error => ${error.message}`);
    }
}
  return (
    <>
    <div className="form-container">
        <form className='card p-4 register-form' onSubmit={handleSubmit}>
            <h3 className='text-center'>Login Form</h3>
           <div class="mb-3">
                <label  className="form-label">Email address</label>
                <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div class="mb-3">
                <label  className="form-label">Password</label>
                <input type="password" name='password' className="form-control" id="exampleInputPassword1"/>
            </div>
            <h6 className='ms-5 px-'><Link to='/register' ><em>REGISTER</em></Link></h6>
            <button type="submit" className="btn btn-primary">LOGIN</button>
        </form>
    </div>
</>
  )
}

export default Login
