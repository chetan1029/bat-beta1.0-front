
import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";


const TITLES: any = {
    "cm": "cm",
    "in": "in",
    "m": "m",
}

interface LengthUnitDropdownProps {
    placeholder?: string,
    name: string,
    value: any,
    onChange: any,
    className: any
}

const LengthUnitDropdown = ({ placeholder, value, onChange, className }: LengthUnitDropdownProps) => {

    const { t } = useTranslation();


    let countryOpts: Array<any> = [];
    for (const c in TITLES) {
        countryOpts.push({
            label: t(TITLES[c]),
            value: c
        });
    }

    return <>
        <Select
            placeholder={placeholder}
            options={countryOpts}
            value={value}
            onChange={onChange}
            className={classNames("react-select", "react-select-regular", className)}
            classNamePrefix="react-select"
        />
    </>
}

export default LengthUnitDropdown;
