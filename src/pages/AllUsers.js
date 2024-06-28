import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import '../../src/App.css'


const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    role: "",
    name:"",
    _id: ""
  })

  const getAllUsers = async() => {
    const response = await fetch("http://localhost:5000/api/allusers", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = await response.json()
    console.log(data);
    if(data.success){
      setAllUsers(data.data)
    }
    if(data.error){
      toast.error(data.error)
    }
  }
  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div>
      <table className="w-full userTable">
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {
            allUsers.map((user) => (
              <tr key={user._id}>
                <td>{allUsers.indexOf(user) + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{moment(user.updatedAt).format("DD-MM-YYYY")}</td>
                <td>
                  <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                  onClick={() => {
                  setUpdateUserDetails(user); 
                  setOpenUpdateRole(true)
                  }}
                  >
                  <MdEdit/>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

      {
        openUpdateRole && (
          <div className='fixed top-0 left-0 right-0 bottom-0 absolute w-full h-full z-10 flex justify-center items-center'>
            <ChangeUserRole onClose={() => setOpenUpdateRole(false)}
              name={updateUserDetails.name}
              email={updateUserDetails.email}
              role={updateUserDetails.role}
              userId={updateUserDetails._id}
              callFunc={getAllUsers}
            />
          </div>
      )}
    </div>
  )
}

export default AllUsers
