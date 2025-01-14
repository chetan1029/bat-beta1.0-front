import React from "react";

interface Props {
  name: string;
  className?: string;
}

const Icon = ({ name, className }: Props) => {
  const renderSvg = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.90532 14.14V11.9933C5.9053 11.4472 6.37388 11.0036 6.95443 10.9999H9.08101C9.66434 10.9999 10.1372 11.4447 10.1372 11.9933V11.9933V14.1466C10.1371 14.6102 10.5305 14.9891 11.0233 15H12.441C13.8543 15 15 13.9225 15 12.5933V12.5933V6.48648C14.9925 5.96358 14.7314 5.47254 14.2911 5.15312L9.44253 1.47971C8.59311 0.840096 7.38562 0.840096 6.5362 1.47971L1.70886 5.15979C1.26693 5.47792 1.00544 5.96977 1 6.49315V12.5933C1 13.9225 2.1457 15 3.55899 15H4.97671C5.48173 15 5.89114 14.615 5.89114 14.14V14.14"
            stroke="#0A0C32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

      case 'arrow-left':
        return <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.2"
            d="M8.5041 0L1.33333 0C0.454138 0 0.00285304 1.053 0.609194 1.68965L4.02385 5.27504C4.40504 5.67529 5.03864 5.69039 5.43846 5.30874L9.19458 1.72336C9.84716 1.10044 9.40626 0 8.5041 0Z"
            fill="#182C52"
          />
        </svg>

      case 'box':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M7.99951 8V15L0.999512 11.5V4.5L7.99951 8Z" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.99902 15L14.999 11.5V4.5L7.99902 8V15Z" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4.63916 6.25L11.4992 2.75" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0.999512 4.5L7.99951 1L14.9995 4.5L7.99951 8L0.999512 4.5Z" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

      case 'box-2':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="5.83333" height="5.83333" rx="1" stroke="#200E32" />
          <rect x="9.16699" y="1" width="5.83333" height="5.83333" rx="1" stroke="#200E32" />
          <rect x="1" y="9.16699" width="5.83333" height="5.83333" rx="1" stroke="#200E32" />
          <rect x="9.16699" y="9.16699" width="5.83333" height="5.83333" rx="1" stroke="#200E32" />
        </svg>

      case 'components':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect x="1" y="1" width="14" height="14" rx="2" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 2.07715V13.9233" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.9233 8H2.07715" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

      case 'settings':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.7963 4.89333L14.3064 4.10667C13.8919 3.44103 12.9734 3.2114 12.2531 3.59333V3.59333C11.9102 3.78024 11.501 3.83327 11.1159 3.74073C10.7307 3.64818 10.4011 3.41766 10.1998 3.1C10.0703 2.89809 10.0007 2.66812 9.99806 2.43333V2.43333C10.0097 2.05692 9.85627 1.69215 9.57261 1.42214C9.28895 1.15212 8.89926 0.999845 8.49231 1H7.50529C7.1066 0.999996 6.72434 1.14701 6.4431 1.4085C6.16187 1.66999 6.00483 2.02441 6.00675 2.39333V2.39333C5.99493 3.15503 5.32423 3.76675 4.501 3.76667C4.24728 3.76423 3.99875 3.69984 3.78055 3.58V3.58C3.06022 3.19806 2.14172 3.42769 1.72726 4.09333L1.20132 4.89333C0.787363 5.55814 1.03214 6.40753 1.74887 6.79333V6.79333C2.21475 7.04223 2.50175 7.50221 2.50175 8C2.50175 8.49779 2.21475 8.95777 1.74887 9.20667V9.20667C1.03305 9.58986 0.788006 10.4372 1.20132 11.1V11.1L1.69844 11.8933C1.89263 12.2176 2.21845 12.4568 2.60381 12.5582C2.98916 12.6595 3.40227 12.6146 3.75173 12.4333V12.4333C4.09526 12.2478 4.50464 12.197 4.88886 12.2922C5.27308 12.3873 5.60031 12.6205 5.79782 12.94C5.92732 13.1419 5.99691 13.3719 5.99954 13.6067V13.6067C5.99954 14.3762 6.67369 15 7.50529 15H8.49231C9.32111 15 9.99409 14.3802 9.99806 13.6133V13.6133C9.99613 13.2433 10.1542 12.8878 10.437 12.6261C10.7198 12.3644 11.1039 12.2182 11.5038 12.22C11.7569 12.2263 12.0044 12.2904 12.2243 12.4067V12.4067C12.9427 12.7897 13.8606 12.5632 14.2775 11.9V11.9L14.7963 11.1C14.9971 10.7811 15.0522 10.4013 14.9494 10.0447C14.8466 9.68804 14.5945 9.38405 14.2487 9.2V9.2C13.903 9.01595 13.6508 8.71196 13.5481 8.35534C13.4453 7.99872 13.5004 7.61891 13.7012 7.3C13.8318 7.08906 14.0208 6.91416 14.2487 6.79333V6.79333C14.9612 6.40774 15.2054 5.56331 14.7963 4.9V4.9V4.89333Z"
            stroke="#0A0C32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <ellipse cx="8.00215" cy="8.00008" rx="2.0749" ry="1.92" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'products':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M14.2218 5.66699V13.0003C14.2218 14.1049 13.3264 15.0003 12.2218 15.0003H3.77734C2.67277 15.0003 1.77734 14.1049 1.77734 13.0003V5.66699"
              stroke="#0A0C32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M1 3C1 1.89543 1.89543 1 3 1H13C14.1046 1 15 1.89543 15 3V4.88889H1V3Z" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.8889 12.667H8" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

      case 'refresh':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M14.5407 1.63672V4.81853H11.5571" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 7.99998C1 4.07575 4.09827 1 7.99981 1C10.7538 1 13.1636 2.5909 14.3111 4.81817" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.68896 14.258V11.0762H4.67249" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.0001 8C15.0001 11.9242 11.9018 15 8.00027 15C5.24624 15 2.83647 13.4091 1.68896 11.1818" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

      case 'shop':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M14.0328 6.5V13.9487C14.0328 14.4217 13.6493 14.8001 13.1698 14.8001H2.33421C1.85475 14.8001 1.47119 14.4217 1.47119 13.9487V6.5"
              stroke="#0A0C32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.1012 4.58361C10.1012 5.81335 9.04638 6.8539 7.79981 6.8539C6.55323 6.8539 5.40254 5.81335 5.40254 4.58361C5.40254 5.81335 4.34775 6.8539 3.10117 6.8539C1.8546 6.8539 0.799805 5.81335 0.799805 4.58361L2.23816 0.799805H13.3614L14.7998 4.58361C14.7998 5.81335 13.745 6.8539 12.4984 6.8539C11.2519 6.8539 10.1012 5.81335 10.1012 4.58361Z"
              stroke="#0A0C32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>

      case 'circle':
        return <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="4" cy="4" r="3.25" stroke="#C4C4C4" strokeWidth="1.5" />
        </svg>

      case 'shopping-cart':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.53617 13.8174C4.85552 13.8174 5.11508 14.0827 5.11508 14.4091C5.11508 14.7355 4.85552 15.0001 4.53617 15.0001C4.21682 15.0001 3.95801 14.7355 3.95801 14.4091C3.95801 14.0827 4.21682 13.8174 4.53617 13.8174Z"
              stroke="#0A0C32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.0516 13.8174C13.3709 13.8174 13.6305 14.0827 13.6305 14.4091C13.6305 14.7355 13.3709 15.0001 13.0516 15.0001C12.7322 15.0001 12.4727 14.7355 12.4727 14.4091C12.4727 14.0827 12.7322 13.8174 13.0516 13.8174Z"
              stroke="#0A0C32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 1L2.57405 1.27846L3.3028 10.153C3.36183 10.8762 3.95285 11.4316 4.66269 11.4316H12.9204C13.5984 11.4316 14.1736 10.9226 14.2712 10.2357L14.9893 5.16303C15.0779 4.53726 14.6034 3.97724 13.9851 3.97724H2.8268"
              stroke="#0A0C32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M9.60938 6.83597H11.7079" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>

      case 'apps':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="5.83333" height="5.83333" rx="1" stroke="#0A0C32" strokeWidth="1.5" />
          <rect x="9.16699" y="1" width="5.83333" height="5.83333" rx="1" stroke="#0A0C32" strokeWidth="1.5" />
          <rect x="1" y="9.1665" width="5.83333" height="5.83333" rx="1" stroke="#0A0C32" strokeWidth="1.5" />
          <rect x="9.16699" y="9.1665" width="5.83333" height="5.83333" rx="1" stroke="#0A0C32" strokeWidth="1.5" />
        </svg>

      case 'bag':
        return <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2 8.5C1.39278 8.0439 1 7.31791 1 6.5V3.5C1 3.22386 1.22386 3 1.5 3H14.5C14.7761 3 15 3.22386 15 3.5V6.5C15 7.31791 14.6072 8.04408 14 8.50018M2 8.5C2.41783 8.81384 2.9372 9 3.5 9H12.5C13.0628 9 13.5822 8.81403 14 8.50018M2 8.5V12C2 12.5523 2.44772 13 3 13H13C13.5523 13 14 12.5523 14 12V8.50018"
            stroke="#200E32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 1H6V3H10V1Z" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 8V10" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'user':
        return <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.45437 1C4.64689 1 3.18164 2.34315 3.18164 4C3.18164 5.65685 4.64689 7 6.45437 7C8.26185 7 9.7271 5.65685 9.7271 4C9.7271 2.34315 8.26185 1 6.45437 1Z"
            stroke="#200E32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.37254 9.97507C4.78925 10.0129 4.19966 10.0906 3.6181 10.2069C2.49563 10.4227 1.59764 10.8539 1.21543 11.5704C1.07127 11.8506 0.998792 12.1506 1.00002 12.4544C0.999583 12.7559 1.07147 13.0563 1.21046 13.3311C1.57746 14.0394 2.37085 14.4402 3.44218 14.6624L3.63409 14.6998C4.19986 14.8189 4.78963 14.8991 5.38335 14.9368C5.43392 14.9506 5.55443 14.9635 5.68597 14.9697L5.79416 14.9735C5.8498 14.9747 5.91293 14.975 6.00701 14.975C6.86038 15.0189 7.74507 15.0061 8.62564 14.9361C9.0949 14.9062 9.56732 14.8489 10.0358 14.765L10.3863 14.697C11.5432 14.484 12.4094 14.079 12.7889 13.3319C13.0703 12.7773 13.0703 12.1337 12.7891 11.5794C12.4105 10.8342 11.5553 10.4325 10.3775 10.2061C9.91545 10.114 9.4459 10.0459 8.973 10.0024L8.62728 9.97507C7.54445 9.88591 6.45537 9.88591 5.37254 9.97507Z"
            stroke="#200E32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

      case 'shipment':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.19961 11.4004C3.79961 11.4004 4.29961 11.9004 4.29961 12.6004C4.29961 13.2004 3.79961 13.8004 3.19961 13.8004C2.59961 13.8004 2.09961 13.3004 2.09961 12.6004C2.09961 11.9004 2.59961 11.4004 3.19961 11.4004Z" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.8998 11.4004C12.4998 11.4004 12.9998 11.9004 12.9998 12.6004C12.9998 13.2004 12.4998 13.8004 11.8998 13.8004C11.2998 13.8004 10.7998 13.3004 10.7998 12.6004C10.7998 11.9004 11.2998 11.4004 11.8998 11.4004Z" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.10039 11.6006H5.90039" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M0.799805 7.5V10.9" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.7996 11.1V8C14.7996 7.7 14.5996 7.5 14.3996 7.4C13.5996 7.2 13.0996 6.5 13.0996 5.7L13.0998 4C13.0998 3.7 12.8998 3.5 12.5998 3.5H9.2998C8.9998 3.4 8.7998 3.7 8.7998 4" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M0.799805 7.5002V3.0002C0.799805 2.3002 1.3998 1.7002 2.0998 1.7002H7.4998C8.1998 1.7002 8.7998 2.3002 8.7998 3.0002V7.5002" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;

      case 'inventory':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M2 13V3C2 1.89543 2.89543 1 4 1H9.33824C9.86867 1 10.3774 1.21071 10.7525 1.58579L13.0809 3.91421C13.456 4.28929 13.6667 4.79799 13.6667 5.32843V13C13.6667 14.1046 12.7712 15 11.6667 15H4C2.89543 15 2 14.1046 2 13Z"
              stroke="#0A0C32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M4.3335 8H10.5005M4.3335 11.5H10.5005M4.3335 4.5H7.8335" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>;
      case 'sales':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path d="M4.2666 10.1153L6.45602 7.27928L8.95342 9.23447L11.096 6.47852" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="13.594" cy="2.40133" rx="1.40605" ry="1.40133" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M9.88487 1.61426H4.56868C2.36587 1.61426 1 3.16907 1 5.36448V11.2567C1 13.4522 2.33909 15.0003 4.56868 15.0003H10.8624C13.0652 15.0003 14.4311 13.4522 14.4311 11.2567V6.12521"
              stroke="#0A0C32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>;
      case 'cost_control':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M3 7.1108C3 6.86415 3.09116 6.6262 3.25595 6.44268L5.55913 3.87777C5.7488 3.66655 6.0193 3.5459 6.30318 3.5459H9.69682C9.9807 3.5459 10.2512 3.66655 10.4409 3.87777L12.744 6.44268C12.9088 6.6262 13 6.86415 13 7.11081V14.0004C13 14.5527 12.5523 15.0004 12 15.0004H4C3.44772 15.0004 3 14.5527 3 14.0004V7.1108Z"
              stroke="#0A0C32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <ellipse cx="7.99979" cy="7.36417" rx="2.14286" ry="1.90909" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 6.72727V1" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>;

      case 'sales_channel':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle cx="7.99989" cy="8.39979" r="3.39979" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 8.40039H4" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 8.40039H15" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>;
      case 'optimization':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.59553 5.7793C6.41331 5.7793 5.47998 6.78891 5.47998 8.00045C5.47998 9.21199 6.41331 10.2216 7.5333 10.2216C8.0933 10.2216 8.59108 10.0197 8.96441 9.61584"
            stroke="#0A0C32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8.46631 7.59585L11 5.49951L12.7596 6.99008L14.5018 5.10547" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.8843 4.16406L14.9376 4.83714L14.9998 7.1256" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M8.59108 2.61538V2.41346L8.21775 1H6.72442L6.35109 2.41346V2.61538C5.79109 2.75 5.23109 2.95192 4.73332 3.28846L4.60887 3.15385L3.42666 2.41346L2.30666 3.625L2.9911 4.90385L3.11555 5.03846C2.80444 5.57692 2.61777 6.18269 2.49333 6.78846H2.30666L1 7.19231V8.875L2.30666 9.21154H2.49333C2.61777 9.81731 2.86666 10.4231 3.17777 10.8942L2.9911 11.0962L2.30666 12.375L3.36443 13.5192L4.54665 12.7788L4.67109 12.6442C5.16887 12.9808 5.66665 13.1827 6.22664 13.3846V13.5865L6.59998 15H8.15552L8.52886 13.5865V13.3846C9.08885 13.25 9.64885 12.9808 10.0844 12.6442L10.2088 12.7788L11.3911 13.5192L12.4488 12.375L11.7644 11.0962"
            stroke="#0A0C32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>;
      case 'finance':
        return <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 9H11.997C10.8944 8.99932 10.0007 8.10464 10 7C10 5.89536 10.8944 5.00068 11.997 5H15" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12.3741 6.86899H12.1461" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.83863 1H11.1612C13.2812 1 14.9999 2.59538 14.9999 4.5633V9.4367C14.9999 11.4046 13.2812 13 11.1612 13H4.83863C2.71865 13 1 11.4046 1 9.4367V4.5633C1 2.59538 2.71865 1 4.83863 1Z"
            stroke="#200E32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M4.31738 4.08105H6.5" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;
      case 'cash_flow':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 10.3256V5.67442C1 4.74419 1.66667 4 2.51515 4H13.4848C14.3333 4 15 4.74419 15 5.67442V10.3256C15 11.2558 14.3333 12 13.4848 12H2.51515C1.66667 12 1 11.2558 1 10.3256Z"
            stroke="#0A0C32"
          />
          <path
            d="M10.6968 10.326H11.7271C11.7271 9.6438 12.2725 9.08566 12.9392 9.08566V6.91511C12.2725 6.91511 11.7271 6.35698 11.7271 5.6748H10.6968"
            stroke="#0A0C32"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.06035 5.6748H3.96945C3.96945 6.35698 3.42399 6.91511 2.75732 6.91511V9.08566C3.42399 9.08566 3.96945 9.6438 3.96945 10.326H5.06035"
            stroke="#0A0C32"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.8486 9.14758C8.38415 9.14758 8.8183 8.70334 8.8183 8.15533C8.8183 7.60733 8.38415 7.16309 7.8486 7.16309C7.31305 7.16309 6.87891 7.60733 6.87891 8.15533C6.87891 8.70334 7.31305 9.14758 7.8486 9.14758Z"
            stroke="#0A0C32"
          />
        </svg>;

      case 'logout':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 15H5C2.79086 15 1 13.2091 1 11V5C1 2.79086 2.79086 1 5 1H7" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.7083 5.375L14.3333 8M14.3333 8L11.7083 10.625M14.3333 8H5" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;

      case 'arrow_left_2':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.625901 7.29289C0.235377 7.68342 0.235377 8.31658 0.625901 8.70711L6.98986 15.0711C7.38039 15.4616 8.01355 15.4616 8.40408 15.0711C8.7946 14.6805 8.7946 14.0474 8.40408 13.6569L2.74722 8L8.40408 2.34315C8.7946 1.95262 8.7946 1.31946 8.40408 0.928932C8.01355 0.538408 7.38039 0.538408 6.98986 0.928932L0.625901 7.29289ZM14.6663 9C15.2186 9 15.6663 8.55228 15.6663 8C15.6663 7.44772 15.2186 7 14.6663 7V9ZM1.33301 9H14.6663V7H1.33301V9Z" fill="#0A0C32" />
        </svg>;

      case "company-profile":
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.9072 10.7439C19.5096 10.7439 20.8094 9.44499 20.8094 7.84266C20.8094 6.24032 19.5096 4.94141 17.9072 4.94141" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19.2412 13.8975C19.7197 13.9305 20.1955 13.9983 20.6639 14.1037C21.3147 14.2311 22.0975 14.4979 22.3762 15.0818C22.554 15.4558 22.554 15.8912 22.3762 16.2661C22.0985 16.85 21.3147 17.1159 20.6639 17.2497" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.60236 10.7439C5.00003 10.7439 3.7002 9.44499 3.7002 7.84266C3.7002 6.24032 5.00003 4.94141 6.60236 4.94141" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.26815 13.8975C4.78965 13.9305 4.3139 13.9983 3.84548 14.1037C3.19465 14.2311 2.41181 14.4979 2.13406 15.0818C1.95531 15.4558 1.95531 15.8912 2.13406 16.2661C2.4109 16.85 3.19465 17.1159 3.84548 17.2497" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path fillRule="evenodd" clipRule="evenodd" d="M12.2502 14.5225C15.497 14.5225 18.2708 15.0138 18.2708 16.98C18.2708 18.9454 15.5153 19.455 12.2502 19.455C9.00241 19.455 6.22949 18.9637 6.22949 16.9975C6.22949 15.0312 8.98499 14.5225 12.2502 14.5225Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path fillRule="evenodd" clipRule="evenodd" d="M12.2499 11.7174C10.1085 11.7174 8.3916 10.0005 8.3916 7.85825C8.3916 5.71692 10.1085 4 12.2499 4C14.3912 4 16.1081 5.71692 16.1081 7.85825C16.1081 10.0005 14.3912 11.7174 12.2499 11.7174Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;

      case "members":
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.3457 11.2852C18.3144 11.2852 19.9102 9.68943 19.9102 7.72071C19.9102 5.75307 18.3144 4.15625 16.3457 4.15625" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17.9854 15.1592C18.5735 15.1992 19.1573 15.2835 19.7335 15.4111C20.5325 15.57 21.4947 15.8976 21.8363 16.6144C22.0547 17.0738 22.0547 17.609 21.8363 18.0685C21.4958 18.7853 20.5325 19.1128 19.7335 19.2772" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path fillRule="evenodd" clipRule="evenodd" d="M9.39596 15.9268C13.3853 15.9268 16.793 16.5311 16.793 18.9453C16.793 21.3605 13.4069 21.9854 9.39596 21.9854C5.40662 21.9854 2 21.3821 2 18.9669C2 16.5516 5.38499 15.9268 9.39596 15.9268Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path fillRule="evenodd" clipRule="evenodd" d="M9.39589 12.4804C6.76444 12.4804 4.65625 10.3711 4.65625 7.73964C4.65625 5.10927 6.76444 3 9.39589 3C12.0273 3 14.1366 5.10927 14.1366 7.73964C14.1366 10.3711 12.0273 12.4804 9.39589 12.4804Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;

      case "wallet":
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.9998 14.6073H17.7694C16.216 14.6064 14.957 13.3802 14.9561 11.8662C14.9561 10.3522 16.216 9.12593 17.7694 9.125H21.9998" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.2484 11.803H17.9227" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path fillRule="evenodd" clipRule="evenodd" d="M7.48376 3H16.5161C19.5446 3 21.9998 5.39307 21.9998 8.34495V15.655C21.9998 18.6069 19.5446 21 16.5161 21H7.48376C4.45521 21 2 18.6069 2 15.655V8.34495C2 5.39307 4.45521 3 7.48376 3Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.74023 7.62234H12.3821" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;

      case "document":
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19.5455V5C4 3.89543 4.89543 3 6 3H14.8182L19.4545 7.63636V19.5455C19.4545 20.65 18.5591 21.5455 17.4545 21.5455H6C4.89543 21.5455 4 20.65 4 19.5455Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.09082 12.2731H16.3635M7.09082 16.9094H16.3635M7.09082 7.63672H11.7272" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;

      case "bank":
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.2002 21.0998H3.2002V18.9998C3.2002 17.7998 4.2002 16.7998 5.4002 16.7998H19.1002C20.3002 16.7998 21.3002 17.7998 21.3002 18.9998V21.0998H21.2002Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21.2 8.1H3V5L12.1 2L21.2 5V8.1Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.5 16.5V8.5" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.5 16.5V8.5" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15.5 16.5V8.5" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19.5 16.5V8.5" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;
      case "location":
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M4 10.6522C4.01441 6.41163 7.46376 2.98564 11.7043 3.00005C15.9449 3.01445 19.3709 6.46381 19.3565 10.7044V10.7913C19.3043 13.5479 17.7652 16.0957 15.8783 18.087C14.7991 19.2076 13.594 20.1997 12.287 21.0435C11.9375 21.3458 11.4191 21.3458 11.0696 21.0435C9.12107 19.7753 7.41093 18.174 6.01739 16.3131C4.77535 14.6903 4.07017 12.7207 4 10.6783L4 10.6522Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="11.6786" cy="10.7997" r="2.46087" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;
      case "packing":
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 10.56V22M12 10.56L2 6.48M12 10.56L22 6.48M12 22L2 17.52V6.48M12 22L22 17.52V6.48M2 6.48L12 2L22 6.48" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;

      case "ticket":
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.8496 4.25V6.67" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.8496 17.7598V19.7838" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.8496 14.3239V9.50293" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path fillRule="evenodd" clipRule="evenodd" d="M18.7021 20C20.5242 20 22 18.5426 22 16.7431V14.1506C20.7943 14.1506 19.8233 13.1917 19.8233 12.001C19.8233 10.8104 20.7943 9.85039 22 9.85039L21.999 7.25686C21.999 5.45745 20.5221 4 18.7011 4H5.29892C3.47789 4 2.00104 5.45745 2.00104 7.25686L2 9.93485C3.20567 9.93485 4.17668 10.8104 4.17668 12.001C4.17668 13.1917 3.20567 14.1506 2 14.1506V16.7431C2 18.5426 3.4758 20 5.29787 20H18.7021Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;
      case "tax":
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 2H5C4.44772 2 4 2.44772 4 3V21C4 21.5523 4.44772 22 5 22H19C19.5523 22 20 21.5523 20 21V3C20 2.44772 19.5523 2 19 2Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 7H16.5" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 12H16.5" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.5 17H16.5" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path fillRule="evenodd" clipRule="evenodd" d="M7.5 8C8.0523 8 8.5 7.5523 8.5 7C8.5 6.4477 8.0523 6 7.5 6C6.9477 6 6.5 6.4477 6.5 7C6.5 7.5523 6.9477 8 7.5 8Z" fill="#396AFF" />
          <path fillRule="evenodd" clipRule="evenodd" d="M7.5 13C8.0523 13 8.5 12.5523 8.5 12C8.5 11.4477 8.0523 11 7.5 11C6.9477 11 6.5 11.4477 6.5 12C6.5 12.5523 6.9477 13 7.5 13Z" fill="#396AFF" />
          <path fillRule="evenodd" clipRule="evenodd" d="M7.5 18C8.0523 18 8.5 17.5523 8.5 17C8.5 16.4477 8.0523 16 7.5 16C6.9477 16 6.5 16.4477 6.5 17C6.5 17.5523 6.9477 18 7.5 18Z" fill="#396AFF" />
        </svg>;

      case "archive":
        return <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.3 1H1V4.1H15.3V1Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.7006 14.2H2.50059C2.00059 14.2 1.60059 13.8 1.60059 13.3V4.9C1.60059 4.4 2.00059 4 2.50059 4H13.8006C14.3006 4 14.7006 4.4 14.7006 4.9V13.3C14.6006 13.8 14.2006 14.2 13.7006 14.2Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.09961 11.8V6.5" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.8998 9.7998L8.0998 11.7998L5.2998 9.7998" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
          ;
      case "delete":
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9394 6.08398C12.9394 6.08398 12.5231 11.1809 12.2816 13.328C12.1666 14.3534 11.525 14.9543 10.474 14.9732C8.47392 15.0088 6.47156 15.011 4.47227 14.9694C3.46112 14.949 2.83021 14.3405 2.71752 13.3332C2.47451 11.1673 2.06055 6.08398 2.06055 6.08398" stroke="#FF6E6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 3.64011H1" stroke="#FF6E6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.4952 3.64043C10.8934 3.64043 10.3752 3.22041 10.2571 2.63844L10.0708 1.71819C9.95582 1.29363 9.56639 1 9.12253 1H5.87751C5.43365 1 5.04422 1.29363 4.92923 1.71819L4.74294 2.63844C4.62489 3.22041 4.10666 3.64043 3.50488 3.64043" stroke="#FF6E6E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;

      case "un-archive":
        return <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.3 1H1V4.1H15.3V1Z" stroke="#FBC640" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.7006 14.2H2.50059C2.00059 14.2 1.60059 13.8 1.60059 13.3V4.9C1.60059 4.4 2.00059 4 2.50059 4H13.8006C14.3006 4 14.7006 4.4 14.7006 4.9V13.3C14.6006 13.8 14.2006 14.2 13.7006 14.2Z" stroke="#FBC640" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.09961 6.4998V11.7998" stroke="#FBC640" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.8998 8.5L8.0998 6.5L5.2998 8.5" stroke="#FBC640" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>;
      case 'info':
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Iconly/Light-Outline/Danger Circle">
              <g id="Danger Circle">
              <path id="Fill 1" fillRule="evenodd" clipRule="evenodd" d="M12 3.5C7.313 3.5 3.5 7.313 3.5 12C3.5 16.687 7.313 20.5 12 20.5C16.687 20.5 20.5 16.687 20.5 12C20.5 7.313 16.687 3.5 12 3.5ZM12 22C6.486 22 2 17.514 2 12C2 6.486 6.486 2 12 2C17.514 2 22 6.486 22 12C22 17.514 17.514 22 12 22Z" fill="#130F26"/>
              <path id="Fill 3" fillRule="evenodd" clipRule="evenodd" d="M11.9941 13.373C11.5801 13.373 11.2441 13.037 11.2441 12.623V8.20398C11.2441 7.78998 11.5801 7.45398 11.9941 7.45398C12.4081 7.45398 12.7441 7.78998 12.7441 8.20398V12.623C12.7441 13.037 12.4081 13.373 11.9941 13.373Z" fill="#130F26"/>
              <path id="Fill 5" fillRule="evenodd" clipRule="evenodd" d="M12.0039 16.7959C11.4509 16.7959 10.9989 16.3489 10.9989 15.7959C10.9989 15.2429 11.4419 14.7959 11.9939 14.7959H12.0039C12.5569 14.7959 13.0039 15.2429 13.0039 15.7959C13.0039 16.3489 12.5569 16.7959 12.0039 16.7959Z" fill="#130F26"/>
              </g>
              </g>
              </svg>;
      case 'back-arrow':
        return <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5166 1L1.00012 4.75L4.5166 8.5" stroke="#396AFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13 4.75H1" stroke="#396AFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'notes':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.74427 10.3185H6.27832" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.74427 8.04503H6.27832" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.60134 5.7755H6.27881" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path fillRule="evenodd" clipRule="evenodd" d="M9.83691 3C9.83691 3 6.15158 3.00217 6.14582 3.00217C4.82089 3.01141 4.00049 3.99783 4.00049 5.50244V10.4976C4.00049 12.0098 4.82713 13 6.16358 13C6.16358 13 9.84843 12.9984 9.85467 12.9984C11.1796 12.9891 12.0005 12.0022 12.0005 10.4976V5.50244C12.0005 3.99022 11.1734 3 9.83691 3Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'chevron-top':
        return <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.4959 6H8.66667C9.54586 6 9.99715 4.947 9.39081 4.31035L5.97615 0.724959C5.59496 0.324708 4.96136 0.309613 4.56154 0.691258L0.80542 4.27664C0.152838 4.89956 0.593737 6 1.4959 6Z" fill="#3C76E6" />
        </svg>

      case 'chevron-down':
        return <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.4959 0H8.66667C9.54586 0 9.99715 1.053 9.39081 1.68965L5.97615 5.27504C5.59496 5.67529 4.96136 5.69039 4.56154 5.30874L0.80542 1.72336C0.152838 1.10044 0.593737 0 1.4959 0Z" fill="#3C76E6" />
        </svg>

      case 'x':
        return <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>

      case 'check':
        return <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
        </svg>

      case 'pencil':
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Iconly/Light/Edit">
            <g id="Edit">
              <path id="Stroke 1" d="M13.7473 20.4429H20.9999" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path id="Stroke 3" fillRule="evenodd" clipRule="evenodd" d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path id="Stroke 5" d="M11.0208 6.00092L16.473 10.188" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        </svg>

      case 'upload':
        return <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.1905 22.8062H26.6758C28.8708 22.8062 30.6667 21.0562 30.6667 18.9172C30.6667 16.7783 28.8708 15.0283 26.6758 15.0283C26.576 15.0283 26.3765 15.0283 26.2767 15.0283C26.6758 14.3477 26.9751 13.5699 26.9751 12.6949C26.9751 10.1671 24.8799 8.02813 22.186 8.02813C19.991 8.02813 18.1951 9.38927 17.5964 11.3337C16.7982 8.7087 14.3039 6.66699 11.3107 6.66699C7.71886 6.66699 4.82544 9.48649 4.82544 12.9866C4.82544 13.6671 4.92521 14.3477 5.12476 14.931C3.02952 15.0283 1.33337 16.6811 1.33337 18.82C1.33337 20.9589 3.12929 22.709 5.3243 22.709H11.2109" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.0004 25.3343V14.6396" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.8103 18.0801L16.0538 14.3467L20.1913 18.0801" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'delete-white':
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.7916 9.36523C18.7916 9.36523 18.2193 16.3736 17.8872 19.3257C17.7291 20.7357 16.8469 21.5619 15.4017 21.5879C12.6516 21.6368 9.8984 21.6399 7.14937 21.5827C5.75905 21.5546 4.89154 20.718 4.73659 19.333C4.40245 16.3548 3.83325 9.36523 3.83325 9.36523" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M20.25 6.00564H2.375" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16.806 6.00559C15.9785 6.00559 15.266 5.42807 15.1036 4.62786L14.8475 3.36251C14.6894 2.77875 14.1539 2.375 13.5436 2.375H9.0817C8.47139 2.375 7.93592 2.77875 7.77781 3.36251L7.52167 4.62786C7.35934 5.42807 6.64678 6.00559 5.81934 6.00559" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'pagination-left':
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.1602 7.41L11.5802 12L16.1602 16.59L14.7502 18L8.75016 12L14.7502 6L16.1602 7.41Z" fill="#396AFF" />
        </svg>

      case 'pagination-right':
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.83984 7.41L12.4198 12L7.83984 16.59L9.24984 18L15.2498 12L9.24984 6L7.83984 7.41Z" fill="#396AFF" />
        </svg>

      case 'import':
        return <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 9L15 11C15 13.2091 13.2091 15 11 15L5 15C2.79086 15 1 13.2091 1 11L1 9" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.625 8.37435L8 10.9993M8 10.9993L5.375 8.37435M8 10.9993L8 1.66602" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'export':
        return <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 9L15 11C15 13.2091 13.2091 15 11 15L5 15C2.79086 15 1 13.2091 1 11L1 9" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.375 4.29167L8 1.66667M8 1.66667L10.625 4.29167M8 1.66667L8 11" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'eye':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10.3924 8.0011C10.3924 9.19666 9.32083 10.1656 7.99953 10.1656C6.67823 10.1656 5.60742 9.19666 5.60742 8.0011C5.60742 6.80485 6.67823 5.83594 7.99953 5.83594C9.32083 5.83594 10.3924 6.80485 10.3924 8.0011Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path fillRule="evenodd" clipRule="evenodd" d="M7.99849 13C10.8802 13 13.516 11.1252 15 8C13.516 4.87483 10.8802 3 7.99849 3H8.00151C5.11978 3 2.484 4.87483 1 8C2.484 11.1252 5.11978 13 8.00151 13H7.99849Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'edit':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 12.0837V15H3.91627L11.5 7.5L8.58373 4.58373L1 12.0837ZM14.7726 4.1437C14.8447 4.07175 14.9019 3.98629 14.9409 3.89222C14.9799 3.79814 15 3.69729 15 3.59544C15 3.49359 14.9799 3.39274 14.9409 3.29866C14.9019 3.20458 14.8447 3.11912 14.7726 3.04718L12.9528 1.22743C12.8809 1.15533 12.7954 1.09814 12.7013 1.05911C12.6073 1.02009 12.5064 1 12.4046 1C12.3027 1 12.2019 1.02009 12.1078 1.05911C12.0137 1.09814 11.9282 1.15533 11.8563 1.22743L10.4332 2.65057L13.3494 5.56684L14.7726 4.1437Z" stroke="#396AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'amazon':
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
aria-describedby="desc" role="img">
  <path data-name="layer2"
  d="M48.7 32.852V11.819C48.7 8.214 45.2 0 32.694 0 20.09-.1 13.388 7.713 13.388 14.824l10.5.9s2.3-7.111 7.8-7.111 5.1 4.407 5.1 5.308a45.384 45.384 0 0 0-.1 4.707c-6.9.2-24.208 2.2-24.208 16.826 0 15.624 19.706 16.325 26.208 6.21a4.709 4.709 0 0 0 .9 1.2c2.4 2.5 5.6 5.508 5.6 5.508l8.1-8.012S48.7 36.758 48.7 32.852zm-12-1.8c0 11.518-12 9.715-12 2.5 0-6.71 7.2-8.113 12-8.213z"
  fill="#202020"></path>
  <path data-name="layer1" d="M55.4 52.682c-26.408 12.519-42.714 2-53.217-4.307-.6-.4-1.8.1-.8 1.2C4.885 53.784 16.289 64 31.194 64S55 55.787 56.1 54.385c1.2-1.402.4-2.203-.7-1.703z"
  fill="#202020"></path>
  <path data-name="layer1" d="M62.8 48.576c-.7-.9-4.3-1.1-6.6-.8s-5.7 1.7-5.4 2.5c.1.3.5.2 2 0 1.6-.2 5.9-.7 6.9.5.9 1.2-1.4 6.911-1.8 7.812s.2 1.2.9.5a11.061 11.061 0 0 0 3-4.507c1-2.099 1.5-5.304 1-6.005z"
  fill="#202020"></path>
</svg>


      case 'transfer':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.667 11.3335L14.0003 12.6668L12.667 14.0002" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 12.6665H2V8.6665" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.33301 4.6665L1.99967 3.33317L3.33301 1.99984" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 3.3335H14V7.3335" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'more':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="3.33335" cy="7.99992" rx="0.666667" ry="0.666667" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="7.99998" cy="7.99992" r="0.666667" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <ellipse cx="12.6667" cy="7.99992" rx="0.666667" ry="0.666667" stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'plus':
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>

      case 'minus':
        return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
        </svg>

      case 'search':
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Iconly/Light/Search">
            <g id="Search">
              <circle id="Ellipse_739" cx="11.7666" cy="11.7666" r="8.98856" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path id="Line_181" d="M18.0183 18.4851L21.5423 22" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        </svg>

      case 'bell':
        return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Iconly/Light/Notification">
            <g id="Notification">
              <path id="Stroke 1" fillRule="evenodd" clipRule="evenodd" d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path id="Stroke 3" d="M14.3889 20.8572C13.0247 22.372 10.8967 22.3899 9.51953 20.8572" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        </svg>


      case 'mail':
        return <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.4482 5.38818L9.34293 7.88835C8.75528 8.34909 7.93149 8.34909 7.34383 7.88835L4.21191 5.38818" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path fillRule="evenodd" clipRule="evenodd" d="M4.88652 1.33594H11.7501C12.7397 1.34704 13.6817 1.76541 14.3565 2.49361C15.0314 3.22182 15.3802 4.19629 15.3218 5.19008V9.94241C15.3802 10.9362 15.0314 11.9107 14.3565 12.6389C13.6817 13.3671 12.7397 13.7855 11.7501 13.7966H4.88652C2.76081 13.7966 1.32812 12.0672 1.32812 9.94241V5.19008C1.32812 3.06528 2.76081 1.33594 4.88652 1.33594Z" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>


      case 'mail2':
        return <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M11.1138 1.8335H4.55344C2.26728 1.8335 0.833984 3.4522 0.833984 5.7429V11.9241C0.833984 14.2148 2.25971 15.8335 4.55344 15.8335H11.113C13.4067 15.8335 14.834 14.2148 14.834 11.9241V5.7429C14.834 3.4522 13.4067 1.8335 11.1138 1.8335Z" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.3992 10.3604L7.83301 8.82951V5.5293" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'scan':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.0877 8.34277H1" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.8331 5.5186V4.21676C13.8331 2.99733 12.8357 2 11.6163 2H10.5205" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.25391 5.5186V4.21397C2.25391 2.99244 3.24356 2.0021 4.46508 2.0007L5.58533 2" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.8331 8.34277V11.3634C13.8331 12.5821 12.8357 13.5802 11.6163 13.5802H10.5205" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2.25391 8.34277V11.3662C2.25391 12.5877 3.24356 13.5781 4.46508 13.5795L5.58533 13.5802" stroke="#0A0C32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'graph':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path id="Stroke 1" fillRule="evenodd" clipRule="evenodd" d="M11.5185 9.25949C11.9683 9.25949 12.3458 9.63072 12.2771 10.0749C11.8736 12.6883 9.63636 14.6286 6.93812 14.6286C3.95285 14.6286 1.5332 12.209 1.5332 9.2244C1.5332 6.76546 3.40127 4.47493 5.50443 3.95703C5.95636 3.84546 6.41952 4.16335 6.41952 4.62861C6.41952 7.78089 6.52548 8.59633 7.12408 9.03984C7.72268 9.48335 8.42654 9.25949 11.5185 9.25949Z" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path id="Stroke 3" fillRule="evenodd" clipRule="evenodd" d="M14.4614 6.63442C14.4972 4.60916 12.0095 1.3446 8.97792 1.40074C8.74213 1.40495 8.55336 1.60144 8.54283 1.83653C8.46634 3.50179 8.5695 5.65969 8.62704 6.63793C8.64459 6.94249 8.88388 7.18179 9.18774 7.19934C10.1934 7.25688 12.4298 7.33548 14.0713 7.08705C14.2944 7.05337 14.4579 6.85969 14.4614 6.63442Z" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      case 'add':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="Iconly/Light/Plus">
        <g id="Plus">
        <path id="Line_185" d="M8.00008 5.55151V10.4358" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path id="Line_186" d="M10.4443 7.99367H5.55542" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path id="Path" fillRule="evenodd" clipRule="evenodd" d="M11.1237 1.33331H4.87611C2.69833 1.33331 1.33325 2.8747 1.33325 5.05675V10.9432C1.33325 13.1253 2.69198 14.6666 4.87611 14.6666H11.1237C13.3079 14.6666 14.6666 13.1253 14.6666 10.9432V5.05675C14.6666 2.8747 13.3079 1.33331 11.1237 1.33331Z" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        </g>
        </svg>

      case 'arrow-down':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6667 5.66669L8.00004 10.3334L3.33337 5.66669" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

      case 'arrow-up':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="Stroke 1" d="M3.33329 10.3333L7.99996 5.66665L12.6666 10.3333" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>


      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <i className={className}>{renderSvg(name)}</i>
    </React.Fragment>
  );
}

export default Icon;
