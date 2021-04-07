
import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";

import { COUNTRIES } from "../constants";

interface CountriesDropdownProps {
    placeholder?: string,
    name: string,
    value: any,
    onChange: any,
    className: any
}

const CountriesDropdown = ({ placeholder, name, value, onChange, className }: CountriesDropdownProps) => {

    const { t } = useTranslation();


    let countryOpts: Array<any> = [];
    for (const c in COUNTRIES) {
        countryOpts.push({
            label: t(COUNTRIES[c]),
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

export default CountriesDropdown;