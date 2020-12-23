import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Dropdown } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { isMobile } from "react-device-detect";
import classNames from "classnames";
import { useSelector } from 'react-redux';

//components
import Icon from "../../components/Icon";
import logo from "../../assets/images/logo.svg";
import searchIcon from "../../assets/images/search_icon.svg";
import bellIcon from "../../assets/images/icons/bell.svg";

import personImg from "../../assets/images/avatar-placeholder.jpg";

interface TopbarProps {
  toggleSidebar: any,
  match: any
}

const Topbar = (props: TopbarProps) => {
  const { t } = useTranslation();

  const { toggleSidebar } = props;

  const { user } = useSelector((state: any) => ({
    user: state.Auth.user,
  }));

  const companyId = props.match.params.companyId;


  return (
    <React.Fragment>
      <header className={classNames({ 'fixed_header': isMobile })}>
        <div className="navbar">
          <div className="header_top d-flex align-items-center justify-content-between">
            <Link to='#'>
              <img src={logo} alt="" />
            </Link>

            <Link to='#' className="header_menu_btn" onClick={toggleSidebar}>
              <span></span>
              <span></span>
              <span></span>
            </Link>
          </div>
          <div className="d-flex justify-content-between header_bot">

            <form className="search">
              <input type="text" placeholder="Search" />
              <button type="submit">
                <img src={searchIcon} alt="" />
              </button>
            </form>

            <div className="d-flex align-items-center">

              <Dropdown className="header_notify_wrap">
                <Dropdown.Toggle id="dropdown-notifications" className="header_notify position-relative p-0" variant='none'>
                  <img src={bellIcon} alt="" />
                  <span className="badge badge-orange">0</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="note_block">
                  <ul>
                    <li className="note_list_item">
                      <p>Hendrerit</p>
                      <p>Nibh venenatis nec sem praesent...</p>
                    </li>
                    <li className="note_list_item">
                      <p>Hendrerit</p>
                      <p>Nibh venenatis nec sem praesent...</p>
                    </li>
                    <li className="note_list_item">
                      <p>Hendrerit</p>
                      <p>Nibh venenatis nec sem praesent...</p>
                    </li>
                  </ul>
                  <Button className="noti-btn" variant='none'>
                    <img src={bellIcon} alt="" />
                    <p>See All Notifications</p>
                  </Button>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown className="header_ropdown">
                <Dropdown.Toggle id="dropdown-profile" className="p-0" variant="none">
                  <div className="header_dropdown_trigger_img">
                    <img src={user.profile_picture ? user.profile_picture : personImg} alt="" />
                  </div>
                </Dropdown.Toggle>

                <Dropdown.Menu className="">
                  <Dropdown.Item to={`/profile/${companyId}/general`} as={Link}>
                    <Icon name="user" className='icon icon-xs' />
                    <span>{t('My Profile')}</span>
                  </Dropdown.Item>

                  <Dropdown.Item to={`/clients/${companyId}`} as={Link}>
                    <Icon name="bag" className='icon icon-xs' />
                    <span>{t('My Clients')}</span>
                  </Dropdown.Item>

                  <Dropdown.Item to={`/settings/${companyId}`} as={Link} className='icon-settings'>
                    <Icon name="settings" className='icon icon-xs' />
                    <span>{t('Settings')}</span>
                  </Dropdown.Item>

                  <Dropdown.Divider></Dropdown.Divider>

                  <Dropdown.Item href='/logout'>
                    <Icon name="logout" className='icon icon-xs' />
                    <span>{t('Log Out')}</span>
                  </Dropdown.Item>

                </Dropdown.Menu>
              </Dropdown>


            </div>
          </div>
        </div>
      </header>

    </React.Fragment>
  );
}

export default withRouter(Topbar);
