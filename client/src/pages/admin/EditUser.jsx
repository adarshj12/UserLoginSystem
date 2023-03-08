import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { hideLoading, showLoading } from '../../redux/features/alertSlice'


const EditUser = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(event.target[0].value)
    //console.log(event.target.elements.name.value)

    try {
      console.log(event.target.name.value)
      console.log(event.target.email.value)
      const name = event.target.name.value;
      const email = event.target.email.value;
      const body = {
        id: params.id,
        name,
        email,
      }
      dispatch(showLoading())
      const res = await axios.put(`http://localhost:5000/edit-user/${params.id}`,body)
      // const res = await axios.put(`http://localhost:5000/edit-user/${params.id}`, body,
      //   {
      //     headers: {
      //       Authorization: "Bearer " + localStorage.getItem('userToken')
      //     }
      //   })
      console.log(res);
      dispatch(hideLoading())
      if (res.data.success) {
        alert('registration successful');
        navigate('/viewusers')
      } else {
        alert('error')
        console.log(res.data.message);
      }

    } catch (error) {
      dispatch(hideLoading())
      console.log(`error => ${error.message}`);
    }
  }
  const [user, setUser] = useState('')
  const getUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/edit-user/${params.id}`)
      console.log(res['data'].message);
      setUser(res['data'].message);
    } catch (error) {
      console.log(`error=> ${error.message}`);
    }
  }
  useEffect(() => {
    console.log(`this is params=> ${params.id}`);
    getUser()
  }, [])
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="form-container" style={{ height: '70vh', border: 'none', marginTop: '5px' }}>
              <form className='card p-4 register-form' style={{ width: '100%' }} onSubmit={handleSubmit}>
                <h3 className='text-center'>Edit User</h3>
                <div class="mb-3">
                  <label className="form-label">User Name</label>
                  <input type="text" placeholder={user.name} name="name" className="form-control" id="exampleInputName" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                  <label className="form-label">Email address</label>
                  <input type="email" placeholder={user.email} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <button type="submit" className="btn btn-primary">EDIT</button>
              </form>
            </div>
          </div>
          <div className="col">
            <div className="card " style={{ marginTop: '74px' }}>
              <div className="card-header">
                <h4>{user.name}'s Profie Image</h4>
              </div>
              <div className="card-body">
                <div className="input-upload">
                  <img style={{ width: '200px' }} />
                  <input className="form-control" type="file" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EditUser
