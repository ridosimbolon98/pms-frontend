import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Moment from 'moment';
import Loader from './Loader';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';

const Task = () => {
  const [pending, setPending] = useState(true);
  const [tasks, setTasks] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  let uuid = '';
  let id = '';
  if(user !== null){
    uuid = user.uuid;
    id = user.id;
  }

  const columns = [
    {
      name: 'PROJECT',
      selector: row => row.projectname,
      sortable: true,
      wrap: true
    },
    {
      name: 'TASKID',
      selector: row => row.taskid,
      sortable: true
    },
    {
      name: 'TASK',
      selector: row => row.task_name,
      sortable: true
    },
    {
      name: 'PROGRESS',
      selector: row => row.progress,
      sortable: true,
      wrap: true
    },
    {
      name: 'STATUS',
      selector: row => row.t_status,
      sortable: true
    },
    {
      name: 'START DATE',
      selector: row => row.startdate,
      sortable: true
    },
    {
      name: 'DUE DATE',
      selector: row => row.due_date,
      sortable: true
    }
  ];
  
  const getAllTask = async () => {
    setTasks([]);
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/mytasks/${id}`);
      response.data.forEach((items,idx) => {
        let dataRow = { 
          id: idx,
          projectname: items.projectname, 
          taskid: <Link to={`../projects/detail/${items.projectid}`}>{items.taskid}</Link>, 
          task_name: items.task_name.toUpperCase(), 
          progress: <div className="progress">
                      <div className="progress-bar bg-info" role="progressbar" style={{width: 100+'%'}} aria-valuenow={items.progress} aria-valuemin={0} aria-valuemax={100}>{items.progress}%</div>
                    </div>, 
          t_status: items.t_status ? 'CLOSE' : 'OPEN', 
          startdate: Moment(items.startdate).format('DD-MM-YYYY HH:mm'),
          due_date: Moment(items.due_date).format('DD-MM-YYYY HH:mm') 
        };
        setTasks(oldArray => [...oldArray,dataRow]);
      });
    } catch (error) {
      toast.error(<small>Gagal reload data task! msg: {error}</small>, {
        theme: "colored"
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
			getAllTask();
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
  }, []);

  
  return (
    <div className="container-fluid mt-4">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-3 text-gray-800">All My Tasks</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
            <li className="breadcrumb-item active" aria-current="page">Task</li>
          </ol>
        </nav>
      </div>
      
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">

          <DataTable
            title="Task List"
            columns={columns}
            data={tasks}
            progressPending={pending}
            progressComponent={<Loader />}
            pagination
          />
        
          </div>
        </div>
      </div>

      <ToastContainer icon={false} autoClose={3000}/>

    </div>
  );
}

export default Task;
