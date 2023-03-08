import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../../styles/Register.css'

import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../../redux/features/alertSlice'


const Register = () => {
    const navigate = useNavigate();
    const dispatch= useDispatch()
    const handleSubmit = async(event) => {
        event.preventDefault();
        //console.log(event.target[0].value)
        //console.log(event.target.elements.name.value)

        try {
            console.log(event.target.name.value)
            console.log(event.target.email.value)
            console.log(event.target.password.value)
            const name=event.target.name.value;
            const email=event.target.email.value;
            const password=event.target.password.value;
            const body = {
                name,
                email,
                password
            }
            dispatch(showLoading())
            const res = await axios.post('http://localhost:5000/register',body);
            dispatch(hideLoading())
            if(res.data.success){
                alert('registration successful');
                navigate('/login')
            }else{
                alert('error')
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
                    <h3 className='text-center'>Resister Form</h3>
                    <div class="mb-3">
                        <label  className="form-label">User Name</label>
                        <input type="text" name="name" className="form-control" id="exampleInputName" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label  className="form-label">Password</label>
                        <input type="password" name='password' className="form-control" id="exampleInputPassword1" />
                    </div>
                    <h6 className='ms-5 px-'><Link to='/login' ><em>LOGIN</em></Link></h6>
                    <button type="submit" className="btn btn-primary">REGISTER</button>
                </form>
            </div>
        </>
    )
}

export default Register
