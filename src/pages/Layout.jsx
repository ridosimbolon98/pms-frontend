import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChangeTitle from '../components/ChangeTitle';
import Footer from '../components/Footer';
import Logout from '../components/Logout';
import SidebarAdmin from '../components/SidebarAdmin';

const Layout = (props) => {
  const isAdmin = props.data;
  
  return (
    <React.Fragment>
      <div id='page-top'>
        <ChangeTitle pageTitle="Dashboard | NBI Project" />
        <div id="wrapper">
          {isAdmin === 'admin' ? <SidebarAdmin/> : <Sidebar/>}
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Navbar />
              <main>
                {props.child}
              </main>
            </div>
            <Footer/>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up" />
        </a>

        <Logout/>
      </div>
    </React.Fragment>
  );
}

export default Layout;
