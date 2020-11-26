import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";


//components
import Icon from "../../components/Icon";

interface TopbarProps {
  toggleSidebar: any
}

const Topbar = (props: TopbarProps) => {
  const [isOpen, setisOpen] = useState(false);
  const { toggleSidebar } = props;


  return (
    <React.Fragment>

    </React.Fragment>
  );
}

export default withRouter(Topbar);
