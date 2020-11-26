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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
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
            <path d="M7.99951 8V15L0.999512 11.5V4.5L7.99951 8Z" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M7.99902 15L14.999 11.5V4.5L7.99902 8V15Z" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M4.63916 6.25L11.4992 2.75" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M0.999512 4.5L7.99951 1L14.9995 4.5L7.99951 8L0.999512 4.5Z" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
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
            <rect x="1" y="1" width="14" height="14" rx="2" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8 2.07715V13.9233" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M13.9233 8H2.07715" stroke="#0A0C32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </g>
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
