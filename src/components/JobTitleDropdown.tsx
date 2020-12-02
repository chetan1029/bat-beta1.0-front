
import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";


const TITLES: any = {
    "CEO": "CEO",
    "Supply Chain Manager": "Supply Chain Manager",
    "Sales Manager": "Sales Manager",
    "IT Developer": "IT Developer",
    "Admin": "Admin",
    "Sales": "Sales"
}

interface JobTitleDropdownProps {
    placeholder?: string,
    name: string,
    value: any,
    onChange: any,
    className: any
}

const JobTitleDropdown = ({ placeholder, value, onChange, className }: JobTitleDropdownProps) => {

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

export default JobTitleDropdown;