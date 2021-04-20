import React, { useCallback, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import classNames from "classnames";
import { useDispatch, useSelector } from 'react-redux';

//components
import Icon from "../../components/Icon";
import logo from "../../assets/images/logo.png";

import { getVendorCategories, getSalesCategories } from "../../redux/actions";

import { getMenuItems, getMainMenuItems, findAllParent, findMenuItem } from "./Menu";
import { Collapse } from "react-bootstrap";


/**
 * Menu Item
 */
const MenuItem = ({ menuItem, tag, onToggle, activeMenuItemIds }) => {
  const Tag: any = tag || 'li';

  const { id, url, icon, label, children, isExternal } = menuItem;
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
    {isExternal ? <a href={url} className={classNames("menu_item d-flex", { "selected_link": show })} target="_blank" rel="noreferrer">
      {icon ? <div className="menu_item_icon">
        <Icon name={icon} />
      </div> : null}

      <p className="menu_item_label">{t(label)}</p>
    </a> : <>
        <Link to={url} className={classNames("menu_item d-flex", { "selected_link": show })} data-menu-id={id} onClick={(e: any) => {
          toggleMenu();
          if (hasChildren) {
            e.preventDefault();
            return false;
          }
        }}>
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
      </>}
  </Tag>
}

/**
 * Menu component
 * @param
 */
const Menu = ({ menuItems, className, uId, onToggle, activeMenuItemIds }) => {

  return <>
    <ul className={classNames(className)} id={uId}>
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
  companies: any,
  mainSidebar?: boolean
}

const Sidebar = (props: SideProps) => {

  const { toggleSidebar, showSidebar, mainSidebar } = props;

  const dispatch = useDispatch();

  const { vendorCategories, salesCategories } = useSelector((state: any) => ({
    vendorCategories: state.Company.Common.vendorCategories && state.Company.Common.vendorCategories.results ? state.Company.Common.vendorCategories.results : [],
    salesCategories: state.Company.Common.salesCategories && state.Company.Common.salesCategories.results ? state.Company.Common.salesCategories.results : []
  }));

  const companyId = props.match.params.companyId;

  const [menus, setmenus] = useState<any>(getMainMenuItems(companyId));

  useEffect(() => {
    if (!mainSidebar) {
      dispatch(getVendorCategories(companyId));
      dispatch(getSalesCategories(companyId));
    }
  }, [dispatch, mainSidebar, companyId]);

  const vendorCategoriesStr = JSON.stringify(vendorCategories);

  const salesCategoriesStr = JSON.stringify(salesCategories);

  useEffect(() => {
    if (!mainSidebar && vendorCategories && salesCategories) {
      setmenus(getMenuItems(companyId, vendorCategories, salesCategories));
    }
  }, [companyId, vendorCategories, mainSidebar, vendorCategoriesStr, salesCategories, salesCategoriesStr]);


  // const { t } = useTranslation();

  //init resize event on body click
  useEffect(() => {
    toggleSidebarMobile();
    window.addEventListener("resize", toggleSidebarMobile);
    // remove classname when component will unmount
    return () => {
      window.removeEventListener("resize", toggleSidebarMobile);
    };
  }, []);

  const activeMenu = useCallback(() => {
    const div = document.getElementById("main-side-menu");
    let matchingMenuItem: HTMLElement | null = null;

    if (div) {
      let items = div.getElementsByTagName("a");

      for (let i = 0; i < items.length; ++i) {
        if (props.location.pathname === items[i].pathname ||
          (props.location.pathname.includes('/settings/') && items[i].pathname.includes('/settings/')) ||
          (props.location.pathname.includes('/campaigns/') && items[i].pathname.includes('/campaigns/'))
        ) {
          matchingMenuItem = items[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const mid = matchingMenuItem.getAttribute('data-menu-id');
        const activeMt = findMenuItem(menus, mid);
        if (activeMt) {
          setactiveMenuItemIds([activeMt['id'], ...findAllParent(menus, activeMt)]);
        }
      }
    }
  }, [props.location.pathname, menus]);

  useEffect(() => {
    //sidebar menu activation
    activeMenu();
  }, [activeMenu]);

  const [activeMenuItemIds, setactiveMenuItemIds] = useState<any>([]);

  const onMenuToggle = (menuItem: any, show: boolean) => {
    if (show) setactiveMenuItemIds([menuItem['id'], ...findAllParent(menus, menuItem)]);
  }

  //function for toggle sidebar according to screen width
  const toggleSidebarMobile = () => {

  }

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
              <img src={logo} alt="Komrs.io" height="25" />
            </Link>

            {/* <SimpleBar> */}
            <Menu menuItems={[...(menus || [])]} className='side_bar_menu' uId='main-side-menu'
              onToggle={onMenuToggle} activeMenuItemIds={activeMenuItemIds} />

          </div>

        </div>
      </div>
    </React.Fragment>
  );
};


export default withRouter(Sidebar);
