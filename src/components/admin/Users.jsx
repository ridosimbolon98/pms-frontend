/**
 * @author Rido Martupa Simbolon
 */

import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from "axios";
import Moment from 'moment';
import '../../css/project.css';
import { ToastContainer, toast } from 'react-toastify';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [konfPass, setKonfPass] = useState("");
  const [role, setRole] = useState("");
  const [isValid, setIsValid] = useState(false);

  const getUsers = async () => {
    const response = await axios.get("http://192.168.10.30:9000/users");
    setUsers(response.data);
  };
  
  useEffect(() => {
    getUsers();
  }, []);

  // cek pass dan konfPass sudah sesuai
  const cekPassKonf = (e) => {
    setKonfPass(e);
    password === e ? setIsValid(true) : setIsValid(false);
  }

  const saveUser = async (e) => {   
    e.preventDefault();     
    // submit user ke server
    try {
      const response = await axios.post("http://192.168.10.30:9000/create_user", {
        name: name,
        email: email,
        password: password,
        confPassword: konfPass,
        role: role
      });
      if (response.data.status === 201) {
        setName('');
        setEmail('');
        setPassword('');
        setKonfPass('');
        toast.success(<small>{response.data.msg}</small>, {
          theme: "colored"
        });
        setTimeout(() => {
          navigate('/users');
        }, 2000);
      } else if (response.data.status === 200){
        toast.error(<small>{response.data.msg}</small>, {
          theme: "colored"
        });
        setTimeout(() => {
          navigate('/users');
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        toast.error(<small>{error.response.data.msg}</small>, {
          theme: "colored"
        });
        setTimeout(() => {
          navigate('/users');
        }, 3000);
      }
    }
  }

  return (
    <div className="container-fluid mt-4">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-3 text-gray-800">All Users</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><NavLink href="/dashboard">Dashboard</NavLink></li>
            <li className="breadcrumb-item active" aria-current="page">Users</li>
          </ol>
        </nav>
      </div>
      <div className="card card-body">
        <div className="my-1">
          <button className="d-sm-inline-block btn btn-sm btn-primary shadow-sm mb-3" data-toggle="modal" data-target="#newUser"><i className="fas fa-plus-square fa-sm text-white-50" /> Create New User</button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Role</th>
              <th scope="col">CreatedAt</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>

          {users.map((user, index) => (
            <tr key={index}>
              <td className="text-center">{user.uuid}</td>
              <td className="text-bold text-center">
                <Link className="text-lead toltip" to={`/users/detail/${user.uuid}`}>{user.name}
                  <small className="tooltiptext">click for detail task</small>
                </Link>
              </td>
              <td className="text-center">{user.email}</td>
              <td className="text-center">{user.role}</td>
              <td className="text-center">{Moment(user.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
              <td className="text-center">
                <button className="btn btn-sm btn-danger" title="Reset Password User"><i className="fa fa-pen-square"></i> Reset</button>
              </td>
            </tr>
          ))}

          </tbody>
        </table>
      </div>

      {/* Modal Add Item Task */}
      <div className="modal fade" id="newUser" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="newUserModalLabel">New User Account</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">

              <form onSubmit={(e) => saveUser(e)}>
                <div className="form-group">
                  <label htmlFor="name">Nama</label>
                  <input type="text" className="form-control" id="name" aria-describedby="emailHelp" 
                  placeholder="silakan input nama anda" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email/Username</label>
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" 
                  placeholder="silakan input email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="input password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="konfirmasiPass">Confirmation Password</label>
                  <input type="password" className="form-control" id="konfirmasiPass" placeholder="input konfirmasi password" 
                  value={konfPass}
                  onChange={(e) => cekPassKonf(e.target.value)}
                  />
                {isValid ? <small id="note" className="form-text text-success">password dan konfirmasi password sama</small> : <small id="note" className="form-text text-danger">password dan konfirmasi password tidak sama!</small>}
                </div>
                <div className="form-group">
                  <label htmlFor="konfirmasiPass">Role</label>
                  <select className="form-control" value={role}
                  onChange={(e) => setRole(e.target.value)}>
                    <option value='user'>USER</option>
                    <option value='admin'>ADMIN</option>
                  </select>
                </div>
                
                <button type="submit" className="btn btn-primary my-2"><i className="fa fa-plus-square"></i> Submit</button>
              </form>

            </div>
          </div>
        </div>
      </div>
      {/* End Modal Add Item Task */}
      <ToastContainer icon={false} autoClose={3000}/>

    </div>
  );
}

export default Users;
