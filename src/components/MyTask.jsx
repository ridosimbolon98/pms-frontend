import React from 'react';

const MyTask = () => {
  return (
    <div className="container-fluid mt-4">
      <ul style={{backgroundColor: "#F8F9FC"}} className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button style={{border: "none"}} className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">List</button>
        </li>
        <li className="nav-item" role="presentation">
          <button style={{border: "none"}} className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Board</button>
        </li>
        <li className="nav-item" role="presentation">
          <button style={{border: "none"}} className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Files</button>
        </li>
      </ul>
      <div className="tab-content" id="pills-tabContent">
        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
          <h3>List Page</h3>
        </div>
        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <h3>Board Page</h3>
        </div>
        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
          <h3>Files Page</h3>
        </div>
      </div>
    </div>
  );
}

export default MyTask;
