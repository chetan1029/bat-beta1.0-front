import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";

import logo from "../../assets/images/logo.svg";


interface SideProps {
  toggleSidebar: any,
  match: any,
  location: any
}

const Sidebar = (props: SideProps) => {
  const { toggleSidebar } = props;

  const { t } = useTranslation();

  //init resize event on body click
  useEffect(() => {
    toggleSidebarMobile();
    window.addEventListener("resize", toggleSidebarMobile);
    // remove classname when component will unmount
    return function cleanup() {
      window.removeEventListener("resize", toggleSidebarMobile);
    };
  }, []);

  const activeMenu = () => {
    const div = document.getElementById("side-menu");
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
        activeMenuItem(matchingMenuItem)
      }
    }
  };

  const activeMenuItem = (item) => {
    item.classList.add("active");
  }

  useEffect(() => {
    //sidebar menu activation
    activeMenu();
  });

  //function for toggle sidebar according to screen width
  const toggleSidebarMobile = () => {

  }

  return (
    <React.Fragment>
      <div className="side_bar_wrap">
        <div className="side_bar">
          <div className="side_bar_close">
            <span></span>
            <span></span>
          </div>

          <div>
            <a href="#" className="side_bar_logo">
              <img src={logo} alt="" />
            </a>

            <ul className="side_bar_menu">
              <li>
                <Link to="/" className="menu_item d-flex">
                  <div className="menu_item_icon">
                    <Icon name="home" />
                  </div>
                  <p className="menu_item_label">{t('Dashboard')}</p>
                </Link>
              </li>
              <li>
                <a href="#" className="menu_item d-flex">
                  <div className="menu_icon">
                    <Icon name="arrow-left" />
                  </div>
                  <div className="menu_item_icon">
                    <Icon name="box" />
                  </div>
                  <p className="menu_item_label">{t('Product Management')}</p>
                </a>
                <ul>
                  <li>
                    <a href="#" className="menu_item d-flex">
                      <div className="menu_item_icon">
                        <Icon name="box-2" />
                      </div>
                      <p className="menu_item_label">{t('Dashboard')}</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="menu_item d-flex">
                      <div className="menu_item_icon">
                        <Icon name="components"></Icon>
                      </div>
                      <p className="menu_item_label">{t('Components')}</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="menu_item d-flex">
                      <div className="menu_item_icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <path
                              d="M14.2218 5.66699V13.0003C14.2218 14.1049 13.3264 15.0003 12.2218 15.0003H3.77734C2.67277 15.0003 1.77734 14.1049 1.77734 13.0003V5.66699"
                              stroke="#0A0C32"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path d="M1 3C1 1.89543 1.89543 1 3 1H13C14.1046 1 15 1.89543 15 3V4.88889H1V3Z" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M11.8889 12.667H8" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </g>
                        </svg>
                      </div>
                      <p className="menu_item_label">Products</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="menu_item d-flex">
                      <div className="menu_item_icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <path fillRule="evenodd" clipRule="evenodd" d="M4.92593 15L1 12.5684V1L4.92593 3.35789V15Z" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M15 15.0002L11 12.8633V1.29492L15 3.35808V15.0002Z" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.9999 12.8633L4.92578 15.0002V3.35808L10.9999 1.29492V12.8633Z"
                              stroke="#0A0C32"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                        </svg>
                      </div>
                      <p className="menu_item_label">RRP</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="">
                <a href="#" className="menu_item d-flex">
                  <div className="menu_icon">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        opacity="0.2"
                        d="M8.5041 0L1.33333 0C0.454138 0 0.00285304 1.053 0.609194 1.68965L4.02385 5.27504C4.40504 5.67529 5.03864 5.69039 5.43846 5.30874L9.19458 1.72336C9.84716 1.10044 9.40626 0 8.5041 0Z"
                        fill="#182C52"
                      />
                    </svg>
                  </div>
                  <div className="menu_item_icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="M14.5407 1.63672V4.81853H11.5571" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1 7.99998C1 4.07575 4.09827 1 7.99981 1C10.7538 1 13.1636 2.5909 14.3111 4.81817" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.68896 14.258V11.0762H4.67249" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15.0001 8C15.0001 11.9242 11.9018 15 8.00027 15C5.24624 15 2.83647 13.4091 1.68896 11.1818" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    </svg>
                  </div>
                  <p className="menu_item_label">Supply Chain</p>
                </a>
                <ul>
                  <li>
                    <a href="#" className="menu_item d-flex">
                      <div className="menu_icon">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.2"
                            d="M8.5041 0L1.33333 0C0.454138 0 0.00285304 1.053 0.609194 1.68965L4.02385 5.27504C4.40504 5.67529 5.03864 5.69039 5.43846 5.30874L9.19458 1.72336C9.84716 1.10044 9.40626 0 8.5041 0Z"
                            fill="#182C52"
                          />
                        </svg>
                      </div>
                      <div className="menu_item_icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <path
                              d="M14.0328 6.5V13.9487C14.0328 14.4217 13.6493 14.8001 13.1698 14.8001H2.33421C1.85475 14.8001 1.47119 14.4217 1.47119 13.9487V6.5"
                              stroke="#0A0C32"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M10.1012 4.58361C10.1012 5.81335 9.04638 6.8539 7.79981 6.8539C6.55323 6.8539 5.40254 5.81335 5.40254 4.58361C5.40254 5.81335 4.34775 6.8539 3.10117 6.8539C1.8546 6.8539 0.799805 5.81335 0.799805 4.58361L2.23816 0.799805H13.3614L14.7998 4.58361C14.7998 5.81335 13.745 6.8539 12.4984 6.8539C11.2519 6.8539 10.1012 5.81335 10.1012 4.58361Z"
                              stroke="#0A0C32"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                        </svg>
                      </div>
                      <p className="menu_item_label">Vendors</p>
                    </a>
                    <ul>
                      <li>
                        <a href="#" className="menu_item d-flex">
                          <div className="menu_item_icon">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <p className="menu_item_label">Fulfillment's</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="menu_item d-flex">
                          <div className="menu_item_icon">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <p className="menu_item_label">Logistics</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="menu_item d-flex">
                          <div className="menu_item_icon">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <p className="menu_item_label">Manufacturers</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="menu_item d-flex">
                          <div className="menu_item_icon">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <p className="menu_item_label">Supplier</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#" className="menu_item d-flex">
                      <div className="menu_item_icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M4.53617 13.8174C4.85552 13.8174 5.11508 14.0827 5.11508 14.4091C5.11508 14.7355 4.85552 15.0001 4.53617 15.0001C4.21682 15.0001 3.95801 14.7355 3.95801 14.4091C3.95801 14.0827 4.21682 13.8174 4.53617 13.8174Z"
                              stroke="#0A0C32"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M13.0516 13.8174C13.3709 13.8174 13.6305 14.0827 13.6305 14.4091C13.6305 14.7355 13.3709 15.0001 13.0516 15.0001C12.7322 15.0001 12.4727 14.7355 12.4727 14.4091C12.4727 14.0827 12.7322 13.8174 13.0516 13.8174Z"
                              stroke="#0A0C32"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M1 1L2.57405 1.27846L3.3028 10.153C3.36183 10.8762 3.95285 11.4316 4.66269 11.4316H12.9204C13.5984 11.4316 14.1736 10.9226 14.2712 10.2357L14.9893 5.16303C15.0779 4.53726 14.6034 3.97724 13.9851 3.97724H2.8268"
                              stroke="#0A0C32"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path d="M9.60938 6.83597H11.7079" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </g>
                        </svg>
                      </div>
                      <p className="menu_item_label">Orders</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="menu_item d-flex">
                      <div className="menu_item_icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <path
                              d="M3.19961 11.4004C3.79961 11.4004 4.29961 11.9004 4.29961 12.6004C4.29961 13.2004 3.79961 13.8004 3.19961 13.8004C2.59961 13.8004 2.09961 13.3004 2.09961 12.6004C2.09961 11.9004 2.59961 11.4004 3.19961 11.4004Z"
                              stroke="#0A0C32"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M11.8998 11.4004C12.4998 11.4004 12.9998 11.9004 12.9998 12.6004C12.9998 13.2004 12.4998 13.8004 11.8998 13.8004C11.2998 13.8004 10.7998 13.3004 10.7998 12.6004C10.7998 11.9004 11.2998 11.4004 11.8998 11.4004Z"
                              stroke="#0A0C32"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path d="M9.10039 11.6006H5.90039" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M0.799805 7.5V10.9" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                              d="M14.7996 11.1V8C14.7996 7.7 14.5996 7.5 14.3996 7.4C13.5996 7.2 13.0996 6.5 13.0996 5.7L13.0998 4C13.0998 3.7 12.8998 3.5 12.5998 3.5H9.2998C8.9998 3.4 8.7998 3.7 8.7998 4"
                              stroke="#0A0C32"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M0.799805 7.5002V3.0002C0.799805 2.3002 1.3998 1.7002 2.0998 1.7002H7.4998C8.1998 1.7002 8.7998 2.3002 8.7998 3.0002V7.5002"
                              stroke="#0A0C32"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                        </svg>
                      </div>
                      <p className="menu_item_label">Shipment</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="menu_item d-flex">
                      <div className="menu_icon">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.2"
                            d="M8.5041 0L1.33333 0C0.454138 0 0.00285304 1.053 0.609194 1.68965L4.02385 5.27504C4.40504 5.67529 5.03864 5.69039 5.43846 5.30874L9.19458 1.72336C9.84716 1.10044 9.40626 0 8.5041 0Z"
                            fill="#182C52"
                          />
                        </svg>
                      </div>
                      <div className="menu_item_icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <path
                              d="M2 13V3C2 1.89543 2.89543 1 4 1H9.33824C9.86867 1 10.3774 1.21071 10.7525 1.58579L13.0809 3.91421C13.456 4.28929 13.6667 4.79799 13.6667 5.32843V13C13.6667 14.1046 12.7712 15 11.6667 15H4C2.89543 15 2 14.1046 2 13Z"
                              stroke="#0A0C32"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path d="M4.3335 8H10.5005M4.3335 11.5H10.5005M4.3335 4.5H7.8335" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </g>
                        </svg>
                      </div>
                      <p className="menu_item_label">Inventory</p>
                    </a>
                    <ul>
                      <li>
                        <a href="#" className="menu_item d-flex">
                          <div className="menu_item_icon">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <p className="menu_item_label">Inventory Overview</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="menu_item d-flex">
                          <div className="menu_item_icon">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <p className="menu_item_label">Warehouse Location</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="menu_item d-flex">
                          <div className="menu_item_icon">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <p className="menu_item_label">Inventory Valuation</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="menu_item d-flex">
                  <div className="menu_icon">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        opacity="0.2"
                        d="M8.5041 0L1.33333 0C0.454138 0 0.00285304 1.053 0.609194 1.68965L4.02385 5.27504C4.40504 5.67529 5.03864 5.69039 5.43846 5.30874L9.19458 1.72336C9.84716 1.10044 9.40626 0 8.5041 0Z"
                        fill="#182C52"
                      />
                    </svg>
                  </div>
                  <div className="menu_item_icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path d="M4.2666 10.1153L6.45602 7.27928L8.95342 9.23447L11.096 6.47852" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <ellipse cx="13.594" cy="2.40133" rx="1.40605" ry="1.40133" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                          d="M9.88487 1.61426H4.56868C2.36587 1.61426 1 3.16907 1 5.36448V11.2567C1 13.4522 2.33909 15.0003 4.56868 15.0003H10.8624C13.0652 15.0003 14.4311 13.4522 14.4311 11.2567V6.12521"
                          stroke="#0A0C32"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                    </svg>
                  </div>
                  <p className="menu_item_label">Sales</p>
                </a>
                <ul>
                  <li>
                    <a href="#" className="menu_item d-flex">
                      <div className="menu_item_icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="1" y="1" width="5.83333" height="5.83333" rx="1" stroke="#200E32" />
                          <rect x="9.16699" y="1" width="5.83333" height="5.83333" rx="1" stroke="#200E32" />
                          <rect x="1" y="9.16699" width="5.83333" height="5.83333" rx="1" stroke="#200E32" />
                          <rect x="9.16699" y="9.16699" width="5.83333" height="5.83333" rx="1" stroke="#200E32" />
                        </svg>
                      </div>
                      <p className="menu_item_label">Dashboard</p>
                    </a>
                  </li>
                  <li>
                    <a href="#" className="menu_item d-flex">
                      <div className="menu_item_icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <path
                              d="M3 7.1108C3 6.86415 3.09116 6.6262 3.25595 6.44268L5.55913 3.87777C5.7488 3.66655 6.0193 3.5459 6.30318 3.5459H9.69682C9.9807 3.5459 10.2512 3.66655 10.4409 3.87777L12.744 6.44268C12.9088 6.6262 13 6.86415 13 7.11081V14.0004C13 14.5527 12.5523 15.0004 12 15.0004H4C3.44772 15.0004 3 14.5527 3 14.0004V7.1108Z"
                              stroke="#0A0C32"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <ellipse cx="7.99979" cy="7.36417" rx="2.14286" ry="1.90909" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8 6.72727V1" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </g>
                        </svg>
                      </div>
                      <p className="menu_item_label">Cost Control</p>
                    </a>
                  </li>
                  <li></li>
                  <li>
                    <a href="#" className="menu_item d-flex">
                      <div className="menu_icon">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.2"
                            d="M8.5041 0L1.33333 0C0.454138 0 0.00285304 1.053 0.609194 1.68965L4.02385 5.27504C4.40504 5.67529 5.03864 5.69039 5.43846 5.30874L9.19458 1.72336C9.84716 1.10044 9.40626 0 8.5041 0Z"
                            fill="#182C52"
                          />
                        </svg>
                      </div>
                      <div className="menu_item_icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g>
                            <circle cx="7.99989" cy="8.39979" r="3.39979" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1 8.40039H4" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 8.40039H15" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          </g>
                        </svg>
                      </div>
                      <p className="menu_item_label">Sales Channel</p>
                    </a>
                    <ul>
                      <li>
                        <a href="#" className="menu_item d-flex">
                          <div className="menu_item_icon">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <p className="menu_item_label">Amazon</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="menu_item d-flex">
                          <div className="menu_item_icon">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <p className="menu_item_label">Distributor</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="menu_item d-flex">
                          <div className="menu_item_icon">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <p className="menu_item_label">Retail</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="menu_item d-flex">
                          <div className="menu_item_icon">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <p className="menu_item_label">Website</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#" className="menu_item d-flex">
                      <div className="menu_icon">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            opacity="0.2"
                            d="M8.5041 0L1.33333 0C0.454138 0 0.00285304 1.053 0.609194 1.68965L4.02385 5.27504C4.40504 5.67529 5.03864 5.69039 5.43846 5.30874L9.19458 1.72336C9.84716 1.10044 9.40626 0 8.5041 0Z"
                            fill="#182C52"
                          />
                        </svg>
                      </div>
                      <div className="menu_item_icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M7.59553 5.7793C6.41331 5.7793 5.47998 6.78891 5.47998 8.00045C5.47998 9.21199 6.41331 10.2216 7.5333 10.2216C8.0933 10.2216 8.59108 10.0197 8.96441 9.61584"
                            stroke="#0A0C32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path d="M8.46631 7.59585L11 5.49951L12.7596 6.99008L14.5018 5.10547" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M12.8843 4.16406L14.9376 4.83714L14.9998 7.1256" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path
                            d="M8.59108 2.61538V2.41346L8.21775 1H6.72442L6.35109 2.41346V2.61538C5.79109 2.75 5.23109 2.95192 4.73332 3.28846L4.60887 3.15385L3.42666 2.41346L2.30666 3.625L2.9911 4.90385L3.11555 5.03846C2.80444 5.57692 2.61777 6.18269 2.49333 6.78846H2.30666L1 7.19231V8.875L2.30666 9.21154H2.49333C2.61777 9.81731 2.86666 10.4231 3.17777 10.8942L2.9911 11.0962L2.30666 12.375L3.36443 13.5192L4.54665 12.7788L4.67109 12.6442C5.16887 12.9808 5.66665 13.1827 6.22664 13.3846V13.5865L6.59998 15H8.15552L8.52886 13.5865V13.3846C9.08885 13.25 9.64885 12.9808 10.0844 12.6442L10.2088 12.7788L11.3911 13.5192L12.4488 12.375L11.7644 11.0962"
                            stroke="#0A0C32"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="menu_item_label">Optimization</p>
                    </a>
                    <ul>
                      <li>
                        <a href="#" className="menu_item d-flex">
                          <div className="menu_item_icon">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <p className="menu_item_label">Dashboard</p>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="menu_item d-flex">
                          <div className="menu_item_icon">
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
                            </svg>
                          </div>
                          <p className="menu_item_label">Keyword Research</p>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#" className="menu_item d-flex">
                  <div className="menu_icon">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        opacity="0.2"
                        d="M8.5041 0L1.33333 0C0.454138 0 0.00285304 1.053 0.609194 1.68965L4.02385 5.27504C4.40504 5.67529 5.03864 5.69039 5.43846 5.30874L9.19458 1.72336C9.84716 1.10044 9.40626 0 8.5041 0Z"
                        fill="#182C52"
                      />
                    </svg>
                  </div>
                  <div className="menu_item_icon">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 9H11.997C10.8944 8.99932 10.0007 8.10464 10 7C10 5.89536 10.8944 5.00068 11.997 5H15" stroke="#200E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M12.3741 6.86899H12.1461" stroke="#200E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.83863 1H11.1612C13.2812 1 14.9999 2.59538 14.9999 4.5633V9.4367C14.9999 11.4046 13.2812 13 11.1612 13H4.83863C2.71865 13 1 11.4046 1 9.4367V4.5633C1 2.59538 2.71865 1 4.83863 1Z"
                        stroke="#200E32"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path d="M4.31738 4.08105H6.5" stroke="#200E32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                  <p className="menu_item_label">Finance</p>
                </a>
                <ul>
                  <li>
                    <a href="#" className="menu_item d-flex">
                      <div className="menu_item_icon">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M1 10.3256V5.67442C1 4.74419 1.66667 4 2.51515 4H13.4848C14.3333 4 15 4.74419 15 5.67442V10.3256C15 11.2558 14.3333 12 13.4848 12H2.51515C1.66667 12 1 11.2558 1 10.3256Z"
                            stroke="#0A0C32"
                          />
                          <path
                            d="M10.6968 10.326H11.7271C11.7271 9.6438 12.2725 9.08566 12.9392 9.08566V6.91511C12.2725 6.91511 11.7271 6.35698 11.7271 5.6748H10.6968"
                            stroke="#0A0C32"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M5.06035 5.6748H3.96945C3.96945 6.35698 3.42399 6.91511 2.75732 6.91511V9.08566C3.42399 9.08566 3.96945 9.6438 3.96945 10.326H5.06035"
                            stroke="#0A0C32"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M7.8486 9.14758C8.38415 9.14758 8.8183 8.70334 8.8183 8.15533C8.8183 7.60733 8.38415 7.16309 7.8486 7.16309C7.31305 7.16309 6.87891 7.60733 6.87891 8.15533C6.87891 8.70334 7.31305 9.14758 7.8486 9.14758Z"
                            stroke="#0A0C32"
                          />
                        </svg>
                      </div>
                      <p className="menu_item_label">Cash Flow</p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <a href="#" className="side_bar_link menu_item d-flex align-items-center selected_link">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.7963 4.89333L14.3064 4.10667C13.8919 3.44103 12.9734 3.2114 12.2531 3.59333V3.59333C11.9102 3.78024 11.501 3.83327 11.1159 3.74073C10.7307 3.64818 10.4011 3.41766 10.1998 3.1C10.0703 2.89809 10.0007 2.66812 9.99806 2.43333V2.43333C10.0097 2.05692 9.85627 1.69215 9.57261 1.42214C9.28895 1.15212 8.89926 0.999845 8.49231 1H7.50529C7.1066 0.999996 6.72434 1.14701 6.4431 1.4085C6.16187 1.66999 6.00483 2.02441 6.00675 2.39333V2.39333C5.99493 3.15503 5.32423 3.76675 4.501 3.76667C4.24728 3.76423 3.99875 3.69984 3.78055 3.58V3.58C3.06022 3.19806 2.14172 3.42769 1.72726 4.09333L1.20132 4.89333C0.787363 5.55814 1.03214 6.40753 1.74887 6.79333V6.79333C2.21475 7.04223 2.50175 7.50221 2.50175 8C2.50175 8.49779 2.21475 8.95777 1.74887 9.20667V9.20667C1.03305 9.58986 0.788006 10.4372 1.20132 11.1V11.1L1.69844 11.8933C1.89263 12.2176 2.21845 12.4568 2.60381 12.5582C2.98916 12.6595 3.40227 12.6146 3.75173 12.4333V12.4333C4.09526 12.2478 4.50464 12.197 4.88886 12.2922C5.27308 12.3873 5.60031 12.6205 5.79782 12.94C5.92732 13.1419 5.99691 13.3719 5.99954 13.6067V13.6067C5.99954 14.3762 6.67369 15 7.50529 15H8.49231C9.32111 15 9.99409 14.3802 9.99806 13.6133V13.6133C9.99613 13.2433 10.1542 12.8878 10.437 12.6261C10.7198 12.3644 11.1039 12.2182 11.5038 12.22C11.7569 12.2263 12.0044 12.2904 12.2243 12.4067V12.4067C12.9427 12.7897 13.8606 12.5632 14.2775 11.9V11.9L14.7963 11.1C14.9971 10.7811 15.0522 10.4013 14.9494 10.0447C14.8466 9.68804 14.5945 9.38405 14.2487 9.2V9.2C13.903 9.01595 13.6508 8.71196 13.5481 8.35534C13.4453 7.99872 13.5004 7.61891 13.7012 7.3C13.8318 7.08906 14.0208 6.91416 14.2487 6.79333V6.79333C14.9612 6.40774 15.2054 5.56331 14.7963 4.9V4.9V4.89333Z"
                stroke="#0A0C32"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <ellipse cx="8.00215" cy="8.00008" rx="2.0749" ry="1.92" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <p>Settings</p>
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};


export default withRouter(Sidebar);
