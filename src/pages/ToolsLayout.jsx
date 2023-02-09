import React from 'react';
import Navbar from '../components/Navbar';
import ToolsSidebar from '../components/tool/ToolsSidebar';
import ChangeTitle from '../components/ChangeTitle';
import Footer from '../components/Footer';
import Logout from '../components/Logout';

const ToolsLayout = (props) => {
  
  return (
    <React.Fragment>
      <div id='page-top'>
        <ChangeTitle pageTitle="Tools Page" />
        <div id="wrapper">
          <ToolsSidebar/>
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

export default ToolsLayout;
