import React from 'react';
import { useState } from 'react';
import { NavLink } from "react-router-dom";

const ToolsSidebar = () => {
  const [isToggle, setIsToggle] = useState(true);
  const urlPath = window.location.pathname.split( '/' );
  const navUrl = urlPath[2];

  return (
    <ul className={ isToggle ? "navbar-nav bg-gradient-info sidebar sidebar-dark accordion" : "navbar-nav bg-gradient-info sidebar sidebar-dark accordion toggled"} id="accordionSidebar">
        <NavLink className="sidebar-brand d-flex align-items-center justify-content-center" to={'/dashboard'}>
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">Tools <b>Page</b></div>
        </NavLink>
        <hr className="sidebar-divider my-0" />
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">
          CONVERTER
        </div>
        <li className = {(navUrl === 'csvtoxlsx') ? "nav-item active" : "nav-item" } >
          <NavLink className="nav-link" to={'/tools/csvtoxlsx'}>
          <i className="fas fa-fw fa-list" />
          <span>CSV to XLSX</span></NavLink>
        </li>

        <li className = {(navUrl === 'xlsxtocsv') ? "nav-item active" : "nav-item" } >
          <NavLink className="nav-link" to={'/tools/xlsxtocsv'}>
          <i className="fas fa-fw fa-chart-area" />
          <span>XLSX to CSV</span></NavLink>
        </li>
        
        <li className = {(navUrl === 'docxtopdf') ? "nav-item active" : "nav-item" } >
          <NavLink className="nav-link" to={'/tools/docxtopdf'}>
          <i className="fas fa-fw fa-chart-area" />
          <span>DOCX to PDF</span></NavLink>
        </li>
        
        <li className = {(navUrl === 'pdftodocx') ? "nav-item active" : "nav-item" } >
          <NavLink className="nav-link" to={'/tools/pdftodocx'}>
          <i className="fas fa-fw fa-chart-area" />
          <span>PDF to DOCX</span></NavLink>
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

export default ToolsSidebar;
