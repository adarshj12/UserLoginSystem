import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';

const NewUser = () => {
    const navigate = useNavigate();
    const dispatch= useDispatch()
    const handleSubmit = async(event) => {
        event.preventDefault();

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
                navigate('/viewusers')
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
    <div className="form-container" style={{height:'70vh',border:'none'}}>
        <form className='card p-4 register-form' onSubmit={handleSubmit} >
            <h3 className='text-center'>Add New User</h3>
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
            
            <button type="submit" className="btn btn-primary">REGISTER</button>
        </form>
    </div>
</>
  )
}

export default NewUser
