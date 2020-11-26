import React from "react";
import PropTypes from 'prop-types';

//layout components
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
// import Footer from "./Footer";

interface Props {
  children: any;
}

const Index = (props: Props) => {
  const toggleSidebar = () => {
    document.body.classList.toggle("enlarge-menu");
  };

  return (
    <React.Fragment>
      {/* sidebar component */}
      <Sidebar toggleSidebar={toggleSidebar} />

      {/* page wrapper start */}
      <div className="page-wrapper">
        {/* topbar component */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* page content start */}
        <div className="page-content">
          {/* page content */}
          {props.children}

          {/* footer component */}
          {/* <Footer /> */}
        </div>
      </div>
    </React.Fragment>
  );
}

Index.propTypes = {
  toggleSidebar: PropTypes.func
};

export default Index;
