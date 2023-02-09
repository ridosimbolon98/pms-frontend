import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Moment from 'moment';
import Loader from './Loader';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const AllNotif = () => {
  const [pending, setPending] = useState(true);
	const [data, setData] = useState([]);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  let uuid = '';
  
  if(user !== null){
    uuid = user.uuid;
  }

  const columns = [
      {
        name: 'ID',
        selector: row => row.kd,
        sortable: true
      },
      {
        name: 'FROM',
        selector: row => row.name,
        sortable: true
      },
      {
        name: 'DESCRIPTION',
        selector: row => row.description,
        sortable: true,
        wrap: true
      },
      {
        name: 'TYPE',
        selector: row => row.trxtype,
        sortable: true
      },
      {
        name: 'STATUS',
        selector: row => row.read_status,
        sortable: true
      },
      {
        name: 'DATE',
        selector: row => row.createdAt,
        sortable: true
      }
    ];

  const getNotif = async () => {
    setData([]);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/notif/${uuid}`);
      response.data.forEach((items,idx) => {
        let dataRow = { 
          id: idx,
          kd: <Link key={idx} to={''} onClick={() => handleNotifClick(items.foreignid,items.id)}>{items.id}</Link>, 
          name: items.name, 
          description: items.description, 
          trxtype: items.trxtype.toUpperCase(), 
          read_status: items.read_status ? 'Read' : 'Unread', 
          createdAt: Moment(items.createdAt).format('DD-MM-YYYY HH:mm') 
        };
        setData(oldArray => [...oldArray,dataRow]);
      });
    } catch (error) {
      toast.error(<small>Gagal reload data notif! msg: {error}</small>, {
        theme: "colored"
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };  

	useEffect(() => {
		const timeout = setTimeout(() => {
			getNotif();
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

  const handleNotifClick = async(fid,id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/notif/update/${id}`);

      setTimeout(() => {
        navigate(`../projects/detail/${fid}`);
      }, 1000);
    } catch (error) {
      toast.error(<small>Gagal update data notif! msg: {error}</small>, {
        theme: "colored"
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  return (
    <div className="container-fluid mt-4">
      {/* Page Heading */}
      <div className="d-sm-flex align-items-center justify-content-between mb-2">
        <h1 className="h3 mb-3 text-gray-800">All Notification Project</h1>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/dashboard">Dashboard</a></li>
            <li className="breadcrumb-item active" aria-current="page">Notification</li>
          </ol>
        </nav>
      </div>
      
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="table-responsive">

          <DataTable
            title="Notification List"
            columns={columns}
            data={data}
            progressPending={pending}
            progressComponent={<Loader />}
            pagination
          />
        
          </div>
        </div>
      </div>

      <ToastContainer icon={false} autoClose={3000}/>

    </div>
  );
}

export default AllNotif;
