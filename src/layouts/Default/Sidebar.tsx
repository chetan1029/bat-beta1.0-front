import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import classNames from "classnames";

//components
import Icon from "../../components/Icon";
import logo from "../../assets/images/logo.svg";

import { menuItems, findAllParent } from "./Menu";
import { Collapse } from "react-bootstrap";


/**
 * Menu Item
 */
const MenuItem = ({ menuItem, tag, onToggle, activeMenuItemIds }) => {
  const Tag: any = tag || 'li';

  const { id, url, icon, label, children } = menuItem;
  const { t } = useTranslation();

  const hasChildren = children && children.length;

  const [show, setshow] = useState<any>(activeMenuItemIds.includes(id));

  useEffect(() => {
    setshow(activeMenuItemIds.includes(id));
  }, [id, activeMenuItemIds]);

  const toggleMenu = () => {
    if (hasChildren) {
      const s = !show;
      if (onToggle) onToggle(menuItem, s)
      setshow(s);
      return false;
    }
    else
      return true
  }

  return <Tag className={classNames({ 'selected_item': show })}>
    <Link to={hasChildren ? '#' : url} className={classNames("menu_item d-flex", { "selected_link": show })} onClick={toggleMenu}>
      {hasChildren ? <div className="menu_icon">
        <Icon name="arrow-left" />
      </div> : null}

      {icon ? <div className="menu_item_icon">
        <Icon name={icon} />
      </div> : null}

      <p className="menu_item_label">{t(label)}</p>
    </Link>

    {hasChildren ? <>
      <Collapse in={show}>
        <Menu menuItems={children} uId={id} className="" onToggle={onToggle} activeMenuItemIds={activeMenuItemIds} />
      </Collapse>
    </> : null}
  </Tag>
}

/**
 * Menu component
 * @param 
 */
const Menu = ({ menuItems, className, uId, onToggle, activeMenuItemIds }) => {

  return <>
    <ul className={classNames(className)}>
      {(menuItems || []).map((item: any, index: number) => {
        return <MenuItem menuItem={item} tag='li' key={`menu-${uId}-${index}`} onToggle={onToggle} activeMenuItemIds={activeMenuItemIds} />
      })}
    </ul>
  </>;
}


interface SideProps {
  toggleSidebar: any,
  match: any,
  location: any,
  showSidebar?: boolean,
  companies: any
}

const Sidebar = (props: SideProps) => {
  const { toggleSidebar, showSidebar, companies } = props;

  const { t } = useTranslation();

  //init resize event on body click
  useEffect(() => {
    toggleSidebarMobile();
    window.addEventListener("resize", toggleSidebarMobile);
    // remove classname when component will unmount
    return () => {
      window.removeEventListener("resize", toggleSidebarMobile);
    };
  }, []);

  const activeMenu = () => {
    const div = document.getElementById("side_bar_menu");
    let matchingMenuItem: HTMLElement | null = null;
    if (div) {
      let items = div.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (props.location.pathname === items[i].pathname || props.location.pathname.indexOf(items[i].pathname) !== -1) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        console.log(matchingMenuItem);
      }
    }
  }

  useEffect(() => {
    //sidebar menu activation
    activeMenu();
  });

  const [activeMenuItemIds, setactiveMenuItemIds] = useState<any>([]);

  const onMenuToggle = (menuItem: any, show: boolean) => {
    if (show) setactiveMenuItemIds([menuItem['id'], ...findAllParent(menuItems, menuItem)]);
  }

  //function for toggle sidebar according to screen width
  const toggleSidebarMobile = () => {

  }

  const companyId = companies && companies.length ? companies[0].id : 0;

  return (
    <React.Fragment>
      <div className={classNames("side_bar_wrap", { "side_bar_visible": showSidebar })}>
        <div className="side_bar">

          <Link to='#' className="side_bar_close" onClick={toggleSidebar}>
            <span></span>
            <span></span>
          </Link>

          <div>
            <Link to="/" className="side_bar_logo">
              <img src={logo} alt="" />
            </Link>

            {/* <SimpleBar> */}
            <Menu menuItems={menuItems} className='side_bar_menu' uId='main' onToggle={onMenuToggle} activeMenuItemIds={activeMenuItemIds} />

          </div>


          <div className="bottom-link">
            <Link to={`/settings/${companyId}`} className="side_bar_link menu_item d-flex align-items-center selected_link">
              <Icon name='settings' />
              <p>{t('Settings')}</p>
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};


export default withRouter(Sidebar);
