import React from 'react';
import { Link } from 'react-router-dom';

const Notification = () => {
  return (
    <li className="nav-item dropdown no-arrow mx-1">
      <Link className="nav-link dropdown-toggle" to="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="fas fa-bell fa-fw" />
        {/* Counter - Alerts */}
        <span className="badge badge-danger badge-counter">3+</span>
      </Link>
      {/* Dropdown - Alerts */}
      <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
        <h6 className="dropdown-header">
          Notification Center
        </h6>
        <Link className="dropdown-item d-flex align-items-center" to="#">
          <div className="mr-3">
            <div className="icon-circle bg-primary">
              <i className="fas fa-file-alt text-white" />
            </div>
          </div>
          <div>
            <div className="small text-gray-500">September 12, 2022</div>
            <span className="font-weight-bold">A new task for you from Rido</span>
          </div>
        </Link>
        <Link className="dropdown-item d-flex align-items-center" to="#">
          <div className="mr-3">
            <div className="icon-circle bg-success">
              <i className="fas fa-donate text-white" />
            </div>
          </div>
          <div>
            <div className="small text-gray-500">September 7, 2022</div>
            New Task was submitted in project PMS!
          </div>
        </Link>
        <Link className="dropdown-item text-center small text-gray-500" to={'/notification'}>Show All Notification</Link>
      </div>
    </li>
  );
}

export default Notification;
