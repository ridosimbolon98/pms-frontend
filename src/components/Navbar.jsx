import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const {user} = useSelector((state) => state.auth);
  let username = '';
  
  if(user !== null){
    username = user.name;
  }

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  }
  return (
    <div>
      {/* Topbar */}
      <nav className="navbar navbar-expand navbar-light bg-white topbar static-top shadow">
        <NavLink className="nav-link nav-toggler d-md-none d-lg-none" id="menuDropdown" role="button" data-toggle="collapse" data-target="#navbarToggleExternalContent">
          <i className="fa fa-bars" />
        </NavLink>
       
        {/* Topbar Search */}
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
            <div className="input-group-append">
              <button className="btn btn-info" type="button">
                <i className="fas fa-search fa-sm" />
              </button>
            </div>
          </div>
        </form>

        {/* Topbar Navbar */}
        <ul className="navbar-nav ml-auto">
          {/* Nav Item - Search Dropdown (Visible Only XS) */}
          <li className="nav-item dropdown no-arrow d-sm-none">
            <NavLink className="nav-link dropdown-toggle" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-search fa-fw" />
            </NavLink>
            {/* Dropdown - Messages */}
            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                  <div className="input-group-append">
                    <button className="btn btn-info" type="button">
                      <i className="fas fa-search fa-sm" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          {/* Nav Item - Alerts Notification */}
          <Notification />

          <div className="topbar-divider d-none d-sm-block" />

          {/* Nav Item - User Information */}
          <li className="nav-item dropdown no-arrow">
            <NavLink className="nav-link dropdown-toggle" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">{username}</span>
              <img className="img-profile rounded-circle" src="/admin/img/undraw_profile.svg" />
            </NavLink>
            {/* Dropdown - User Information */}
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <button className="dropdown-item">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                Profile
              </button>
              <button className="dropdown-item">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                Activity Log
              </button>
              <div className="dropdown-divider" />
              <button className="dropdown-item" onClick={logout} data-toggle="modal" data-target="#logoutModal">
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>

      {/* Sidebar Toggle (Topbar) */}     
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-gradient-info px-4 py-3">
          <ul className="navbar-nav mr-auto mt-lg-0">
            <li className="nav-item active">
              <NavLink className="nav-link" to="">
                <i className="fas fa-fw fa-tachometer-alt text-white" />
                <span className="text-white"> Dashboard</span>
              </NavLink>
            </li>

            <hr className="m-2" />

            <div className="mobile-nav-color devider-desc">TASK SECTION</div>
            <li className="nav-item">
              <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                <i className="fas fa-fw fa-cog mobile-nav-color" />
                <span className="text-white"> List Task</span>
              </NavLink>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo">
                <div className="bg-white py-2 collapse-inner rounded">
                  <NavLink className="menu-item text-dark" to="#">New Task</NavLink>
                  <NavLink className="menu-item text-dark" to="#">Open Task</NavLink>
                  <NavLink className="menu-item text-dark" to="#">Closed Task</NavLink>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                <i className="fas fa-fw fa-wrench mobile-nav-color" />
                <span className="text-white"> Todo List</span>
              </NavLink>
              <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities">
                <div className="bg-white py-2 collapse-inner rounded">
                  <NavLink className="menu-item text-dark" to="#">New Todo</NavLink>
                  <NavLink className="menu-item text-dark" to="#">Open Todo</NavLink>
                  <NavLink className="menu-item text-dark" to="#">Close Todo</NavLink>
                </div>
              </div>
            </li>

            <hr className="m-2" />

            <div className="mobile-nav-color devider-desc">PROJECTS SECTION</div>
            <li className="nav-item">
              <NavLink className="nav-link collapsed" to="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                <i className="fas fa-fw fa-folder mobile-nav-color" />
                <span className="text-white"> Projects</span>
              </NavLink>
              <div id="collapsePages" className="collapse" aria-labelledby="headingPages">
                <div className="bg-white py-2 collapse-inner rounded">
                  <NavLink className="menu-item text-dark" to="#">Request</NavLink>
                  <NavLink className="menu-item text-dark" to="#">In Progress</NavLink>
                  <NavLink className="menu-item text-dark" to="#">Completed</NavLink>
                  <NavLink className="menu-item text-dark" to="#">Canceled</NavLink>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                <i className="fas fa-fw fa-chart-area mobile-nav-color" />
                <span className="text-white"> Charts</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="#">
                <i className="fas fa-fw fa-table mobile-nav-color" />
                <span className="text-white"> Tables</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
