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
          <rect x="1" y="1" width="5.83333" height="5.83333" rx="1" stroke="#200E32"></rect>
          <rect x="9.16699" y="1" width="5.83333" height="5.83333" rx="1" stroke="#200E32"></rect>
          <rect x="1" y="9.16699" width="5.83333" height="5.83333" rx="1" stroke="#200E32"></rect>
          <rect x="9.16699" y="9.16699" width="5.83333" height="5.83333" rx="1" stroke="#200E32"></rect>
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

      case 'logout':
        return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 15H5C2.79086 15 1 13.2091 1 11V5C1 2.79086 2.79086 1 5 1H7" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.7083 5.375L14.3333 8M14.3333 8L11.7083 10.625M14.3333 8H5" stroke="#200E32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
