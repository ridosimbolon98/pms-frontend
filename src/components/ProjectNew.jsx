/**
 * @author Rido Martupa Simbolon
 */

import React, { useState, useEffect } from 'react';
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MultiSelect } from "react-multi-select-component";
import Select from 'react-select'
import '../css/project.css';
import { useSelector } from 'react-redux';

const ProjectNew = () => {
  const [picTaskSelected, setPicTaskSelected] = useState('');
  const [selected, setSelected] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [projectname, setProjectname] = useState("");
  const [description, setDescription] = useState("");
  const [bagdept, setBagdept] = useState("");
  const [subbagdept, setSubbagdept] = useState("");
  const [options, setOptions] = useState([]);
  const [startproj, setStartproj] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [endproj, setEndproj] = useState("");

  const {user} = useSelector((state) => state.auth);

  let uuid = '';
  let role = '';
 
  if(user !== null){
    uuid = user.uuid;
    role = user.role;
  }

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  
  const [list, updateList] = useState([]);
  const [items, setItem] = useState('');
  const [bobot, setBobot] = useState('');
  const [pictask, setPicTask] = useState('');
  const [depts, setDept] = useState([]);
  const [subdept, setSubDept] = useState([]);
  
  const getDataUser = async () => {
    setIsDisabled(false);
    setOptions([]);
    const dataUser = await axios.get("http://192.168.10.30:9000/users");
    dataUser.data.forEach(dtUsr => {
      let dataUser = { label: dtUsr.name, value: dtUsr.id, uid: dtUsr.uuid };
      setOptions(oldArray => [...oldArray,dataUser]);
    });
  };

  const getDataDept = async () => {
    const dataDept = await axios.get("http://192.168.10.30:9000/getdept");
    setDept(dataDept.data);
  };

  useEffect(() => {
    getDataDept();
  }, []);

  // hitung bobot
  let sum = list.reduce(function(prev, current) {
    return prev + +current.bobot
  }, 0);


  const handleDept = async (e) => {
    setBagdept(e);
    const dataSubDept = await axios.get(`http://192.168.10.30:9000/getsubdept/${e}`);
    setSubDept(dataSubDept.data);
  };

  const handleRemoveItem = (id) => {
    updateList(list.filter(item => item.task !== id));
  };

  const handleAddItem = (e) => {
    updateList([...list, { task: items.toUpperCase(), bobot: bobot, pic: picTaskSelected, startdate: startDate, duedate: dueDate }]);
    setItem("");
    setBobot("");
    setPicTask("");
    setStartDate("");
    setDueDate("");
  };

  const saveProject = async (e) => {
    let partpnt = {"data":[]};
    e.preventDefault();
    if (sum > 100) {
      toast.error(<small>Gagal tambah project baru. Total bobot melebihi 100.</small>, {
        theme: "colored"
      });
    } else {
      selected.forEach(el => [
        partpnt.data = [...partpnt.data, el]
      ])
      try {
        const response = await axios.post("http://192.168.10.30:9000/projects", {
          projectname: projectname,
          description: description,
          bagdept: bagdept,
          subbagdept: subbagdept,
          participant: JSON.stringify(partpnt),
          location: list,
          ttlitem: list.length,
          ttlbobot: 0,
          startproj: startproj,
          endproj: endproj,
          status: 'OPEN',
          inputby: role.toUpperCase(),
          uid: uuid
        });
        if (response) {
          toast.success(<small>Berhasil tambah project baru.</small>, {
            theme: "colored"
          });
          setTimeout(() => {
            navigate('/projects');
          }, 3000);
        }
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
  };

  const handleChangePicTask = (selectedOption) => {
    setPicTaskSelected(selectedOption);
  };

  return (     
    <>       
      <div className="container-fluid mt-4">
        {/* Page Heading */}
        <div className="d-sm-flex align-items-center justify-content-between mb-2">
          <h1 className="h3 mb-3 text-gray-800">New Project Page</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><NavLink to="/dashboard">Dashboard</NavLink></li>
              <li className="breadcrumb-item"><NavLink to="/projects">Projects</NavLink></li>
              <li className="breadcrumb-item active" aria-current="page">New</li>
            </ol>
          </nav>
        </div>

        {/* Content Row */}
        <form onSubmit={saveProject}>
        <div className="row">
          {/* Form Project */}
            <div className="col-lg-6 mb-4">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Form New Project</h6>
                  <small className="text-center text-warning">{msg}</small>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="inputProjectName">Project Name</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={projectname}
                      onChange={(e) => setProjectname(e.target.value)}
                      aria-describedby="projectName" 
                      placeholder="Enter project name" 
                      autoFocus
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputProjectDescription">Project Description</label>
                    <textarea 
                      type="text" 
                      className="form-control" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter your project description here" 
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="selectProjectTeam">Project Participant</label>
                    <div className="row">
                      <MultiSelect
                        disabled={isDisabled}
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy={"Select"}
                        isCreatable={true}
                        className="col"
                      />
                      <button onClick={getDataUser} className="btn btn-primary mr-3">
                        <i className="fa fa-refresh"></i> 
                        Load Users
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="selectProjectOwner">Project Owner Division</label>
                    <input list="data_div" className="form-control" value={bagdept}
                      onChange={(e) => handleDept(e.target.value)} placeholder="Enter department to select owner" required/>
                    <datalist id="data_div">
                      {depts.map((dept, index) => (
                        <option key={index} value={dept.kddept}>{dept.nmdept}</option>
                      ))}
                    </datalist>
                  </div>
                  <div className="form-group">
                    <label htmlFor="selectProjectOwner">Project Owner Sub-Div</label>
                    <input list="data_subdiv" className="form-control" value={subbagdept}
                      onChange={(e) => setSubbagdept(e.target.value)} placeholder="Enter division to select owner" required/>
                    <datalist id="data_subdiv">
                      {subdept.map((item, index) => (
                        <option key={index} value={item.kdsubdept}>{item.nmsubdept}</option>
                      ))}
                    </datalist>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 mb-4">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">Next Configuration</h6>
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="inputProjectDueDate">Project Due Date</label>
                    <div className="row d-flex justify-content-lg-between align-items-center">
                      <div className="col-sm-5">
                        <input type="date" className="form-control" value={startproj} onChange={(e) => setStartproj(e.target.value)} required />
                      </div>
                      <div className=""> S/D </div> 
                      <div className="col-sm-5">
                        <input type="date" className="form-control" value={endproj} onChange={(e) => setEndproj(e.target.value)} required />
                      </div>
                    </div>
                  </div>
                  <div className="form-group pt-2">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <label htmlFor="inputProjectDueDate">Project Task (Total Bobot: <b>{sum}</b>)</label>
                      <div>
                        <button type="button" className="btn btn-outline-success" data-toggle="modal" data-target="#addItemTask"><i className="fas fa-plus-square"></i> Add Task</button>
                      </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center">
                      {list.map((item,index) => {
                        return (
                          <div key={index} task={item.task} className="bg-info rounded py-2 px-2 mr-2 mb-2">
                            <div className="d-flex align-items-center ">
                              <span className="text-light mr-1"><small>{index+1}.</small></span>
                              <span className="text-light mr-2 "><small>{item.task+' ('+item.bobot+')'}</small></span>
                              <span className="text-light badge badge-danger" role="button" onClick={() => handleRemoveItem(item.task)}>x</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-sm btn-primary" > Submit</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer icon={false} autoClose={3000}/>
      
      {/* Modal Add Item Task */}
      <div className="modal fade" id="addItemTask" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="itemTaskModalLabel">New Task Item</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group mb-3">
                <label>Task Desc - Bobot</label><br />
                <div className="input-group">
                  <input id="nit" type="text" className="form-control" placeholder="new item task..." value={items} onChange={(e) => setItem(e.target.value)}/>
                  <input id="bobot" type="number" step={1} className="form-control" placeholder="bobot" value={bobot} onChange={(e) => setBobot(e.target.value)} />
                </div>
              </div>
              <div className="form-group my-2">
                <label>Start Date - Due Date Task</label><br />
                <div className="input-group">
                  <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="start date"/>
                  <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="due date"/>
                </div>
              </div>
              <div className="input-group my-1">
                <label>Task PIC</label><br />
                <div className="input-group">
                  <Select 
                    options={options} 
                    value={picTaskSelected}
                    onChange={handleChangePicTask}
                  />
                  <button onClick={getDataUser} className="btn btn-info ml-2">
                    <i className="fa fa-refresh"></i> 
                    Load Users
                  </button>
                </div>
              </div>
              <div className="input-group my-3">
                <button className="btn btn-primary" onClick={handleAddItem} data-dismiss="modal"><i className="fa fa-plus-square"></i> Add Item</button>
              </div>
              <small className="text-danger">NB: item task baru harus berbeda dari yang lain. Bobot total task maksimal 100.</small>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal Add Item Task */}
      
    </>
  );
}

export default ProjectNew;
