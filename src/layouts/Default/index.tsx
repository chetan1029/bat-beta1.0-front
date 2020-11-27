import React, { useState } from "react";

//layout components
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: any;
}

const Index = (props: Props) => {
  const [showSidebar, setshowSidebar] = useState(false);

  const toggleSidebar = () => {
    setshowSidebar(!showSidebar);
  };

  return (
    <React.Fragment>
      {/* sidebar component */}
      <Sidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />

      {/* page wrapper start */}
      <main>
        <div className="page-wrapper">
          <div className="container-fluid">
            {/* topbar component */}
            <Topbar toggleSidebar={toggleSidebar} />

            {/* page content start */}
            <div className="page-content">
              {/* page content */}
              {props.children}
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

export default Index;
