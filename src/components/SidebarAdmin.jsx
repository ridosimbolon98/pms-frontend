import React from 'react';
import { useState } from 'react';
import { NavLink } from "react-router-dom";

const SidebarAdmin = () => {
  const [isToggle, setIsToggle] = useState(true);
  const urlPath = window.location.pathname.split( '/' );
  const navUrl = urlPath[1];

  return (
    <ul className={ isToggle ? "navbar-nav bg-gradient-info sidebar sidebar-dark accordion" : "navbar-nav bg-gradient-info sidebar sidebar-dark accordion toggled"} id="accordionSidebar">
        <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to={'/dashboard'}>
            <div className="sidebar-brand-icon rotate-n-15">
                <i className="fas fa-laugh-wink" />
            </div>
            <div className="sidebar-brand-text mx-3">Admin <b>Page</b></div>
        </NavLink>
        <hr className="sidebar-divider my-0" />
        <li className = {(navUrl === 'dashboard') ? "nav-item active" : "nav-item" } >
          <NavLink className="nav-link" to={'/dashboard'}>
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">
          Master Section
        </div>
        <li className = {(navUrl === 'users') ? "nav-item active" : "nav-item" } >
          <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#master" aria-expanded="true" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog" />
            <span>Master</span>
          </NavLink>
          <div id="master" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <NavLink className="collapse-item" to={'/users'}>Users</NavLink>
            </div>
          </div>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">
          Task Section
        </div>
        <li className = {(navUrl === 'tasks') ? "nav-item active" : "nav-item" } >
          <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
            <i className="fas fa-fw fa-cog" />
            <span>List Task</span>
          </NavLink>
          <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">TASK:</h6>
              <NavLink className="collapse-item" to={'/tasks'}>All Task</NavLink>
              <NavLink className="collapse-item" to={'/tasks/open'}>Open Task</NavLink>
              <NavLink className="collapse-item" to={'/tasks/closed'}>Closed Task</NavLink>
            </div>
          </div>
        </li>

        <li className = {(navUrl === 'notification') ? "nav-item active" : "nav-item" } >
          <NavLink className="nav-link" to={'/notification'}>
          <i className="fas fa-fw fa-chart-area" />
          <span>All Notification</span></NavLink>
        </li>

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">
          Projects Section
        </div>
        <li className = {(navUrl === 'projects') ? "nav-item active" : "nav-item" } >
          <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
            <i className="fas fa-fw fa-folder" />
            <span>Projects</span>
          </NavLink>
          <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <NavLink className="collapse-item" to={'/projects'}>All</NavLink>
              <NavLink className="collapse-item" to={'/projects/open'}>Open</NavLink>
              <NavLink className="collapse-item" to={'/projects/close'}>Closed</NavLink>
              <NavLink className="collapse-item" to={'/projects/cancel'}>Canceled</NavLink>
            </div>
          </div>
        </li>

        <li className = {(navUrl === 'charts') ? "nav-item active" : "nav-item" } >
          <NavLink className="nav-link" to="/chart">
          <i className="fas fa-fw fa-chart-area" />
          <span>Charts</span></NavLink>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" onClick={() => {
                setIsToggle(!isToggle)
            }}></button>
        </div>
    </ul>
  );
}

export default SidebarAdmin;
