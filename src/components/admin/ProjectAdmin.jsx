/**
 * @author Rido Martupa Simbolon
 */

import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from "axios";
import Moment from 'moment';
import '../../css/project.css';
import { useSelector } from 'react-redux';

const ProjectAdmin = () => {
  const [projects, setProjects] = useState([]);
  const {user} = useSelector((state) => state.auth);
  let role = '';
  let uid = '';
  
  if(user !== null){
    role = user.role;
    uid = user.id;
  }

  const getProjects = async () => {
    let url='';
    role === 'admin' ? url="http://192.168.10.30:9000/allprojects" : url=`http://192.168.10.30:9000/allprojects`;
    const response = await axios.get(url);
    setProjects(response.data);
  };
  
  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="container-fluid mt-4">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-3 text-gray-800">All Projects</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><NavLink href="/dashboard">Dashboard</NavLink></li>
            <li className="breadcrumb-item active" aria-current="page">Project</li>
          </ol>
        </nav>
      </div>
      <div className="card card-body">
        <div className="my-1">
          <Link to={'/projects/new'} className="d-sm-inline-block btn btn-sm btn-primary shadow-sm mb-3"><i className="fas fa-plus-square fa-sm text-white-50" /> Create New Project</Link>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr className="text-center">
              <th scope="col">PID</th>
              <th scope="col">Project Name</th>
              <th scope="col">Participant</th>
              <th scope="col">Progress</th>
              <th scope="col">Start Date</th>
              <th scope="col">Due Date</th>
            </tr>
          </thead>
          <tbody>

          {projects.map((project, index) => (
            <tr key={index}>
              <td className="text-center">{project.projectid}</td>
              <td className="text-bold">
                <Link className="text-lead toltip" to={`/projects/detail/${project.projectid}`}>{project.projectname}
                  <small className="tooltiptext">click for detail task</small>
                </Link>
              </td>
              <td className="text-center" >
                {JSON.parse(project.pic).data.map((item,idx) => {
                  return ((idx+1) +'.'+ item.label + `\n`)
                })}
              </td>
              <td>
                <div className="progress">
                  <div className="progress-bar bg-info" role="progressbar" style={{width: project.ttlbobot+'%'}} aria-valuenow={project.ttlbobot} aria-valuemin={0} aria-valuemax={100}>{project.ttlbobot}%</div>
                </div>
              </td>
              <td className="text-center">{Moment(project.startproj).format('DD-MM-YYYY')}</td>
              <td className="text-center">{Moment(project.endproj).format('DD-MM-YYYY')}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProjectAdmin;
