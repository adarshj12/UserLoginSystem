import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UsersRegistered = () => {
  const [user, setUser] = useState('')

  const getUserData = async () => {
    try {
      const res = await axios.post('http://localhost:5000/allUsers',
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('userToken')
          }
        })
      console.log(res['data'].message);
      setUser(res['data'].message);
    } catch (error) {
      console.log(`error=> ${error.message}`);
    }
  }
  //console.log('this is users', user);
  const search = async (e) => {
    try {
    console.log(e.target.value);
    let key = e.target.value;
    if(key.trim().length===0){
      return getUserData()
    } 
      const res = await axios.get(`http://localhost:5000/search-user/${key}`)
      console.log(res);
      console.log(res.data.message);
      console.log(`response 1 => ${res}`);
      // if(res){
      //   setUser(res.data.message)
      // }else{
      //   getUserData();
      // }
       if(res){
        setUser(res.data.message)
      }else{
        getUserData();
      }
    } catch (error) {
      console.log(`error=> ${error.message}`);
    }

}
const deleteUser = async (id) => {
  console.log(id);
  await axios.delete(`http://localhost:5000/delete-user/${id}`)
     getUserData()
     alert('record deleted')
}
  useEffect(() => {
    getUserData();
  }, [])
  // return (
  //   <>
  //     <input type="text" name="" id="" placeholder='Search...' className='form-control' style={{ width: '25%' }} />
  //     <table className="table">
  //       <thead>
  //         <tr>
  //           <th scope="col">Sl.No. </th>
  //           <th scope="col">Name</th>
  //           <th scope="col">Email</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {/* {
  //           user.map((item, index) => {
  //             return <tr>
  //               <th >{index + 1}</th>
  //               <td>{item.name}</td>
  //               <td>{item.email}</td>
  //               <td><div className="btn btn-primary">EDIT</div></td>
  //               <td><div className="btn btn-danger">DELETE</div></td>
  //             </tr>
  //           }


  //           )} */}

  //       </tbody>
  //     </table>
  //   </>
  // )
  return (
    <div>

        <section className="content-main">
            <div className="content-header">
            </div>
            <div className="card mb-4">
                <header className="card-header">
                    <div className="row gx-3">
                        <div className="col-lg-4 col-md-6 me-auto search-bar">
                            <input type="text" placeholder="Search..." onChange={search}  className="form-control" />
                            <button className='btn btn-primary' ><Link to='/admin/adduser' style={{color:'white'}}>Add User</Link></button>
                        </div>
                      

                    </div>
                </header>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>

                                    <th scope="col" className="text-end"> Action </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                user.length>0?user.map((item, index) => <tr>
                                    <td>{index + 1}</td>
                                    <td><b>{item.name}</b></td>
                                    <td><b>{item.email}</b></td>



                                    <td className="text-end">
                                        <button className='btn btn-warning'><Link to={`/edituser/${item._id}`}>Edit</Link></button>

                                        <button  className='btn btn-danger' onClick={()=>{
                                          deleteUser(item._id)
                                        }} >Delete</button>

                                    </td>
                                </tr>):<h1>No result</h1>   }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </section>
    </div>
)
}

export default UsersRegistered
