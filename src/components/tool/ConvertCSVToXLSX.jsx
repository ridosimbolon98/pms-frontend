import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ConvertCSVToXLSX = () => {

  const convertXLSX = () => {
    
  }

  return (
    <div className="container-fluid mt-4">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-3 text-gray-800">File Converter</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
          </ol>
        </nav>
      </div>
      
      <div className="card shadow mb-4">
        <div className="card-body">
          <form onSubmit={convertXLSX()}>
            <div className="input-group">
              <input type="file" className="form-control" id="filecsv" aria-describedby="converttoxlsx" aria-label="Upload" />
              <button className="btn btn-outline-secondary" type="submit" id="converttoxlsx">Convert to XLSX</button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer icon={false} autoClose={3000}/>

    </div>
  );
}

export default ConvertCSVToXLSX;
