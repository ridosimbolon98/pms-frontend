/**
 * @author Rido Martupa Simbolon
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import SubTask from './SubTask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/project.css';
import '../css/dp.css';
import { useSelector } from 'react-redux';

const TaskDetails = () => {
  const { taskid } = useParams(); 
  const [taskDetail, setTaskDetail] = useState([]);
  const [taskName, setTaskName] = useState("");
  let uuid = '';
  let userid = '';
  let role = '';

  const {user} = useSelector((state) => state.auth);
  if(user !== null){
    uuid = user.uuid;
    role = user.role;
    userid = user.id;
  }

  const getDetailTask = async() => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/taskdetail/${taskid}`);
      setTaskDetail(response.data);
      setTaskName(response.data[0].task_name);
    } catch (error) {
      if (error.response) {
        toast.error(<small>{error.response.data.msg}</small>, {
          theme: "colored"
        });
      }
    }
  }

  useEffect(() => {
    getDetailTask();
  }, []);

  const updateTask = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/taskupdate`, {
        taskid: taskid,
        task_name: taskName
      });
      if (response.status === 200) {
        toast.success(<small>Task berhasil diupdate. Msg: {response.status} - {response.msg}</small>, {
          theme: "colored"
        });
      } else {
        toast.error(<small>Task gagal diupdate. Msg: {response.status} - {response.msg}</small>, {
          theme: "colored"
        });
      }
    } catch (error) {
      toast.error(<small>{error.response.data.msg}</small>, {
        theme: "colored"
      });
    }
  }

  return (
    <>
      <div className="container-fluid mt-4">
        {/* Page Heading */}
        <div className="d-sm-flex align-items-center justify-content-between mb-2">
          <h1 className="h3 mb-3 text-gray-800">Task Details</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
              <li className="breadcrumb-item active" aria-current="page">Task Details</li>
            </ol>
          </nav>
        </div>
        <div className="card card-body">
          <div className="my-2">
            <form onSubmit={updateTask}>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Task </label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Task PIC</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" disabled value={taskDetail[0] && taskDetail[0].name } />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Sub Task</label>
                <div className="col-sm-10">
                  <SubTask taskid={taskid} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Action</label>
                <div className="col-sm-10">
                  { 
                    role === 'admin' ?
                    <>
                      <button type="submit" className="btn btn-primary shadow">
                        <i className="fa fa-pencil-square mr-2"></i>
                        Update Task 
                      </button>
                    </>
                    :
                    <>
                      <button type="submit" className="btn btn-primary shadow">
                        <i className="fa fa-pencil-square mr-2"></i>
                        Update Task 
                      </button>
                    </>
                  }
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer icon={false} autoClose={3000}/>
    </>
  );
}

export default TaskDetails;
