/**
 * @author Rido Martupa Simbolon
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux';
import Moment from 'moment';

const Home = () => {
  const [project, setProject] = useState([]);
  const [newestTask, setNewestTask] = useState([]);
  const [all_pn, setAllpn] = useState("");
  const [open_pn, setOpenpn] = useState("");
  const [closed_pn, setClosedpn] = useState("");
  const [pending_pn, setPendingpn] = useState("");
  const {user} = useSelector((state) => state.auth);

  let uuid = '';
 
  if(user !== null){
    uuid = user.uuid;
  }

  const bg = ['progress-bar bg-info','progress-bar bg-danger','progress-bar bg-warning','progress-bar bg-primary','progress-bar bg-success'];

  const getProjectNum = async () => {
    const response = await axios.get(`http://192.168.10.30:9000/getprojectnum`);
    setAllpn(response.data.all_pn[0].proj_num);
    setOpenpn(response.data.open_pn[0].proj_num);
    setClosedpn(response.data.closed_pn[0].proj_num);
    setPendingpn(response.data.pending_pn[0].proj_num);
  };
  
  const getNewestProject = async () => {
    const response = await axios.get(`http://192.168.10.30:9000/newestproject`);
    setProject(response.data);
  };
  
  const getNewestTask = async () => {
    const response = await axios.get(`http://192.168.10.30:9000/dbtasks/${uuid}`);
    setNewestTask(response.data);
  };


  useEffect(() => {
    getProjectNum();
    getNewestProject();
    getNewestTask();
  }, []);


  return (
    <div className="container-fluid mt-4">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-3 text-gray-800">Dashboard</h1>
        <Link to={'/projects/new'} className="d-sm-inline-block btn btn-sm btn-primary shadow-sm mb-3"><i className="fas fa-plus-square fa-sm text-white-50" /> Create New Project</Link>
      </div>

      {/* Content Row */}
      <div className="row">
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Project</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{all_pn}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-calendar fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    In Progress</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{open_pn}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Earnings (Monthly) Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Completed Project
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{closed_pn}</div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Pending Requests Card Example */}
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-left-warning shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                    Pending Project</div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">{pending_pn}</div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-comments fa-2x text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Row */}
      <div className="row">
        {/* Content Column */}
        <div className="col-lg-6 mb-4">
          {/* Project Card Example */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">Progress Newest Projects</h6>
            </div>
            <div className="card-body">
            
            {project.map((item, index) => (
              <div key={index}>
                <h4 className="small font-weight-bold">{item.projectname}<span className="float-right">{item.ttlbobot}%</span></h4>
                <div className="progress mb-4">
                  <div className={bg[index]} role="progressbar" style={{width: item.ttlbobot+'%'}} aria-valuenow={item.ttlbobot} aria-valuemin={0} aria-valuemax={100} />
                </div>
              </div>
            ))}

            </div>
            <div className="card-footer">
              <Link to={'/projects'}>See More Progress</Link>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          {/* Tiket */}
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">New Tasks</h6>
            </div>
            <div className="card-body">
              <div className="row">

              {newestTask.map((nt, index) => (
                <div key={index} className="col-md-6 col-sm-6">
                  <div className="card shadow mb-2">
                    <div className="card-header bg-info py-3">
                      <h6 className="m-0 font-weight-bold text-white">From: {nt.name.toUpperCase()}</h6>
                    </div>
                    <div className="card-body">
                      <p className="mb-0"><span className="badge badge-primary badge-pill">Desc</span> {nt.description}.</p>
                      <span className="badge badge-secondary badge-pill">{nt.trxtype}</span> <span className="badge badge-secondary badge-pill">{Moment(nt.createdAt).format('DD-MM-YYYY')}</span>
                    </div>
                  </div>
                </div>
              ))}

              </div>
            </div>
            <div className="card-footer">
              <Link to={'/tasks'} className="btn btn-sm btn-outline-info">See All Tasks</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
