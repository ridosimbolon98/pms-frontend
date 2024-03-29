/**
 * @author Rido Martupa Simbolon
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import SubTask from './SubTask';
import Moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import '../css/project.css';
import '../css/dp.css';
import { useSelector } from 'react-redux';
import Select from 'react-select'

const addSubTaskStyle = {
  content: {
    backgroundColor: '#fff',
    minWidth: '30%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const DetailProjects = () => {
  const navigate = useNavigate();
  const [picSubTaskSelected, setPicSubTaskSelected] = useState('');
  const [picTaskSelected, setPicTaskSelected] = useState('');
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [detailProject, setDetailProject] = useState([]);
  const [project, setProject] = useState("");
  const [subTask, setSubTask] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [taskId, setTaskId] = useState("");
  const [projectId, setProjectId] = useState("");
  const [options, setOptions] = useState([]);
  const [msg, setMsg] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskBobot, setTaskBobot] = useState("");
  const { projectid } = useParams();  
  let uuid = '';
  let userid = '';
  let role = '';

  const {user} = useSelector((state) => state.auth);
  
  if(user !== null){
    uuid = user.uuid;
    role = user.role;
    userid = user.id;
  }

  const getDataUser = async () => {
    setIsDisabled(false);
    setOptions([]);
    const dataUser = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
    dataUser.data.forEach(dtUsr => {
      let dataUsers = { label: dtUsr.name, value: dtUsr.id };
      setOptions(oldArray => [...oldArray, dataUsers]);
    });
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalNewIsOpen, setNewIsOpen] = useState(false);
  const openModalSubTask = (taskid) => {
    setTaskId(taskid);
    setIsOpen(true);
  }

  const openModalNewTask = (prjid) => {
    setProjectId(prjid);
    setNewIsOpen(true);
  }

  function closeModal() {
    setSubTask("");
    setIsOpen(false);
	getDataUser();
  }

  function closeNewModal() {
    setTaskDesc("");
    setTaskBobot("");
    setProjectId("");
    setStartDate("");
    setDueDate("");
    setNewIsOpen(false);
  }
  
  const getDetailProject = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/tasks/${projectid}`);
    setDetailProject(response.data);
    setProject(response.data[0]);
  };
  
  useEffect(() => {
    getDetailProject();
  }, []);

  
  const handleCloseTask = async (id) => {    
    await Swal.fire({
      text: 'Apakah anda yakin close Task dengan ID: '+id+'?',
      showCancelButton: true,
      confirmButtonText: 'Close',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.patch(`${process.env.REACT_APP_API_URL}/closetask/${id}`);
        if (response.status === 200) {
          toast.success(<small>Task berhasil di closed. Msg: {response.status} - {response.statusText}</small>, {
            theme: "colored"
          });
        } else {
          toast.error(<small>Task gagal di closed. Msg: {response.status} - {response.statusText}</small>, {
            theme: "colored"
          });
        }
        getDetailProject();
      }
    })
  }

  // delete task
  const handleDeleteTask = async (taskid) => {
    let response = 200;
    await Swal.fire({
      text: 'Apakah anda yakin delete Task dengan ID: '+taskid+'?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then(async(result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${taskid}`);
        if (response.status === 200) {
          toast.success(<small>Task berhasil di dihapus. Msg: {response.status} - {response.statusText}</small>, {
            theme: "colored"
          });
        } else {
          toast.error(<small>Task gagal di dihapus. Msg: {response.status} - {response.statusText}</small>, {
            theme: "colored"
          });
        }
        getDetailProject();
      }
    })
  }

  // delete project
  const handleDelete = async (idprj) => {
    await Swal.fire({
      text: 'Apakah anda yakin delete Project dengan ID: '+idprj+'?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/projects/${idprj}`);
        if (response.status === 200) {
          toast.success(<small>Project dengan ID: {idprj} berhasil dihapus. Msg: {response.status} - {response.statusText}</small>, {
            theme: "colored"
          });
          setTimeout(() => {
            navigate("/projects");
          }, 3000);
        } else {
          toast.error(<small>Project dengan ID: {idprj} gagal dihapus. Msg: {response.status} - {response.statusText}</small>, {
            theme: "colored"
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      } 
    })
  }

  // cancel project
  const handleCancel = async (idprj) => {
    let response = 200;
    await Swal.fire({
      text: 'Apakah anda yakin cancel Project dengan ID: '+idprj+'?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      if (result.isConfirmed) {
        toast.success(<small>Project dengan ID: {idprj} berhasil di cancel. Msg: {response} - {response}</small>, {
          theme: "colored"
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } 
    })
  }

  // add sub task by modal
  const addNewSubTask = async(e) => {
	e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/subtasks`, {
        taskid: taskId,
        subtask: subTask,
        pic: picSubTaskSelected.value,
        pid: project && projectid,
        from: uuid
      });

      if (response.status === 201) {
        toast.success(<small>Sub Task berhasil disubmit. Msg: {response.status} - {response.statusText}</small>, {
          theme: "colored"
        });
      } else {
        toast.error(<small>Sub Task gagal disubmit. Msg: {response.status} - {response.statusText}</small>, {
          theme: "colored"
        });
      }
  
      setTimeout(() => {
        window.location.reload();
      }, 3000);   
    } catch(error){
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  const handleChangePicTask = (selectedOption) => {
    setPicTaskSelected(selectedOption);
  };
  const handleChangePicSubTask = (selectedOption) => {
    setPicSubTaskSelected(selectedOption);
  };

  // tambah task baru
  const addNewTask = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, {
        projectid: projectId,
        taskdesc: taskDesc.toUpperCase(),
        taskbobot: taskBobot,
        startdate: startDate,
        duedate: dueDate,
        pic: picTaskSelected,
        from: uuid
      });
      console.log(response);
      if (response.status === 201) {
        toast.success(<small>New Task berhasil disubmit. Msg: {response.status} - {response.statusText}</small>, {
          theme: "colored"
        });
      } else {
        toast.error(<small>New Task gagal disubmit. Msg: {response.status} - {response.statusText}</small>, {
          theme: "colored"
        });
      }
  
      setTimeout(() => {
        window.location.reload();
      }, 3000); 
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }

  return (
    <>    
      <div className="container-fluid mt-4">
        {/* Page Heading */}
        <div className="d-sm-flex align-items-center justify-content-between mb-2">
          <h1 className="h3 mb-3 text-gray-800">Detail Projects</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
              <li className="breadcrumb-item"><a href="/projects">Project</a></li>
              <li className="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </nav>
        </div>
        <div className="card card-body">
          <div className="my-2">
            <div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Project Name</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control" value={project && project.projectname } />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Description</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control" value={project && project.description} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Periode</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control" value={Moment(project && project.startproj).format('YYYY')} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Owner Dept</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control" value={project && project.subbagdept} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Participant</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control" 
                    value={
                      project &&
                      JSON.parse(project.partisipant).data.map((item,index) => {
                        return(' '+ item.label + `\n`)
                      })
                    } 
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Status</label>
                <div className="col-sm-10">
                  <input type="text" readOnly className="form-control" value={project && project.status} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-2 col-form-label">Action</label>
                <div className="col-sm-10">
                  { 
                    role === 'admin' ?
                    <>
                      <button onClick={() => handleDelete(project && projectid)} disabled={(project && project.status === 'CLOSE') ? true : false} className="btn btn-danger shadow mr-2">
                        <i className="fa fa-lock mr-2"></i>
                        Delete Project
                      </button>
                      <button onClick={() => handleCancel(project && projectid)} disabled={(project && project.status === 'CANCEL') ? true : false} className="btn btn-secondary shadow mr-2">
                        <i className="fa fa-minus-square mr-2"></i>
                        Cancel Project
                      </button>
                      <button onClick={() => openModalNewTask(project && projectid)} disabled={( project && project.status === 'CLOSE') ? true : false} className="btn btn-primary shadow">
                        <i className="fa fa-plus-square mr-2"></i>
                        Add New Task 
                      </button>
                    </>
                    :
                    <>
                      <button onClick={() => handleCancel(project && projectid)} disabled={(project && project.status === 'CANCEL') ? true : false} className="btn btn-secondary shadow mr-2">
                        <i className="fa fa-minus-square mr-2"></i>
                        Cancel Project
                      </button>
                      <button onClick={() => openModalNewTask(project && projectid)} disabled={( project && project.status === 'CLOSE') ? true : false} className="btn btn-primary shadow">
                        <i className="fa fa-plus-square mr-2"></i>
                        Add New Task 
                      </button>
                    </>
                  }
                </div>
              </div>
            </div>
            <hr/>
            <h3>Tasks List</h3>
          </div>
          <table className="table table-bordered">
            <thead>
              <tr className="text-center">
                <th scope="col">#</th>
                <th scope="col">Task Name (Bobot)</th>
                <th scope="col">Sub Task (By)</th>
                <th scope="col">PIC</th>
                <th scope="col">Due Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

            {detailProject.map((task, index) => (
              <tr key={task.id}>
                <td className="text-center">{index + 1}</td>
                <td className="text-center" style={{maxWidth: 90+'px'}}>
                  {task.task_name+' ('+task.bobot+')'}
                  <span className={task.t_status ? 'badge badge-secondary badge-pill' : 'badge badge-info badge-pill'}>
                    <small className="text-white">{task.t_status ? 'CLOSED' : 'OPEN'}</small>
                  </span>
                </td>
                <td className="text-bold" style={{maxWidth: 220+'px'}}>
                  <SubTask taskid={task.taskid} />
                </td>
                <td className="text-center">{task.name}</td>
                <td className="text-center">{Moment(task.due_date).format('DD-MM-YYYY')}</td>
                
                { 
                  role === 'admin' ?
                    <td className="text-center">
                      <button onClick={() => openModalSubTask(task.taskid)} type="button" className="btn btn-info btn-sm mr-1 toltip">
                        <i className="fa fa-plus-square mr-1"></i>
                        <span className="tooltiptext">Add Sub Task</span>
                      </button>
                      <Link to={`/task/details/${task.taskid}`} type="button" className="btn btn-success btn-sm mr-1 toltip">
                        <i className="fa fa-list mr-1"></i>
                        <span className="tooltiptext">Detail Task</span>
                      </Link>
                      <button onClick={() => handleCloseTask(task.taskid)} type="button" className="btn btn-warning btn-sm mr-1 toltip">
                        <i className="fa fa-lock mr-1"></i>
                        <span className="tooltiptext">Close Task</span>
                      </button>
                      <button onClick={() => handleDeleteTask(task.taskid)} type="button" className="btn btn-danger btn-sm toltip">
                        <i className="fa fa-trash mr-1 "></i>
                        <span className="tooltiptext">Delete Task</span>
                      </button>
                    </td>
                  :
                    <td className="text-center">
                      <button onClick={() => openModalSubTask(task.taskid)} disabled={task.pic != `${userid}`} type="button" className="btn btn-info btn-sm mr-1 toltip">
                        <i className="fa fa-plus-square mr-1"></i>
                        <span className="tooltiptext">{task.pic != `${userid}` ? 'Disable Add Sub Task' : 'Add Sub Task'}</span>
                      </button>
                      <Link to={`/task/details/${task.taskid}`} disabled={task.pic != `${userid}`} type="button" className="btn btn-success btn-sm mr-1 toltip">
                        <i className="fa fa-list mr-1"></i>
                        <span className="tooltiptext">{task.pic != `${userid}` ? 'Disable Detail Task' : 'Detail Task'}</span>
                      </Link>
                      <button onClick={() => handleCloseTask(task.taskid)} disabled={task.pic != `${userid}`} type="button" className="btn btn-warning btn-sm mr-1 toltip">
                        <i className="fa fa-lock mr-1"></i>
                        <span className="tooltiptext">{task.pic != `${userid}` ? 'Disable Close Task' : 'Close Task'}</span>
                      </button>
                      <button onClick={() => handleDeleteTask(task.taskid)} disabled={task.pic != `${userid}`} type="button" className="btn btn-danger btn-sm toltip">
                        <i className="fa fa-trash mr-1 "></i>
                        <span className="tooltiptext">{task.pic != `${userid}` ? 'Disable Delete Task' : 'Delete Task'}</span>
                      </button>
                    </td>
                }
              </tr>
            ))}

            </tbody>
          </table>
        </div>
      </div>

      {/* modal untuk add sub task */}
      <Modal
        appElement={document.getElementById('page-top')}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={addSubTaskStyle}
        contentLabel="Add Sub Task"
      >   

        <small className="text-center text-warning">{msg}</small>
        <form onSubmit={(e) => addNewSubTask(e)}>
          <div className="modal-body">
            <div className="form-group">
              <label className="text-dark">Sub Task Name</label>
              <textarea className="form-control" type="text" placeholder="enter new sub task" value={subTask} onChange={(e) => setSubTask(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="text-dark">Sub Task PIC</label>
              <div className="input-group">
                <Select 
                  disabled={isDisabled}
                  options={options} 
                  value={picSubTaskSelected}
                  onChange={handleChangePicSubTask}
                />
                <button type='button' onClick={getDataUser} className="btn btn-sm btn-info ml-2">
                  <i className="fa fa-refresh"></i> 
                  Load Users
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-sm btn-secondary" onClick={closeModal}>Close</button>
            <button type="submit" className="btn btn-sm btn-primary" >Submit</button>
          </div>
        </form>
      </Modal>

      <Modal
        appElement={document.getElementById('page-top')}
        isOpen={modalNewIsOpen}
        onRequestClose={closeNewModal}
        style={addSubTaskStyle}
        contentLabel="Add New Task"
      >
        <small className="text-center text-warning">{msg}</small>
        <form onSubmit={(e) => addNewTask(e)}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="">Task Item Description</label>
              <div className="input-group">
                <input className="form-control" type="text" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} placeholder="task item description" autoFocus />
                <input className="form-control" type="text" value={taskBobot} onChange={(e) => setTaskBobot(e.target.value)} placeholder="bobot task" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="">Start Date - Due Date</label>
              <div className="input-group">
                <input className="form-control" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                <input className="form-control" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="">Task PIC</label>
              <div className="input-group">
                <Select 
                  disabled={isDisabled}
                  options={options} 
                  value={picTaskSelected}
                  onChange={handleChangePicTask}
                />
                <button type='button' onClick={getDataUser} className="btn btn-info ml-2">
                  <i className="fa fa-refresh"></i> 
                  Load Users
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-sm btn-secondary" onClick={closeNewModal}>Close</button>
            <button type="submit" className="btn btn-sm btn-primary" >Submit</button>
          </div>
        </form>

      </Modal>

      <ToastContainer icon={false} autoClose={3000}/>
    </>
  );
}



export default DetailProjects;
