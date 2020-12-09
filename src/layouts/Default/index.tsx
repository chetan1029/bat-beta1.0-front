import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

//layout components
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

//actions
import { getCompanies } from "../../redux/actions";

interface Props {
  children: any;
  mainSidebar?: boolean
}

const Index = (props: Props) => {
  const dispatch = useDispatch();
  const { companies } = useSelector((state: any) => ({
    companies: state.Company.Common.companies,
    isCompaniesFetched: state.Company.Common.isCompaniesFetched,
  }));

  const [showSidebar, setshowSidebar] = useState(false);

  const toggleSidebar = () => {
    setshowSidebar(!showSidebar);
  };


  /*
  get all companies
  */
  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);

  return (

    <React.Fragment>
      {/* sidebar component */}
      <Sidebar toggleSidebar={toggleSidebar} showSidebar={showSidebar} companies={companies.results} mainSidebar={props.mainSidebar} />

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
