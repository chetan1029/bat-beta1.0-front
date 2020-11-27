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

      case 'shipment':
        return <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            opacity="0.2"
            d="M8.5041 0L1.33333 0C0.454138 0 0.00285304 1.053 0.609194 1.68965L4.02385 5.27504C4.40504 5.67529 5.03864 5.69039 5.43846 5.30874L9.19458 1.72336C9.84716 1.10044 9.40626 0 8.5041 0Z"
            fill="#182C52"
          />
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
