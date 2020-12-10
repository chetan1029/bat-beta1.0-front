
import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";

import { CURRENCIES } from "../constants";

interface CurrenciesDropdownProps {
    placeholder?: string,
    name: string,
    value: any,
    onChange: any,
    className: any
}

const CurrenciesDropdown = ({ placeholder, name, value, onChange, className }: CurrenciesDropdownProps) => {

    const { t } = useTranslation();


    let countryOpts: Array<any> = [];
    for (const c in CURRENCIES) {
        countryOpts.push({
            label: t(CURRENCIES[c]),
            value: c
        });
    }

    return <>
        <Select
            placeholder={placeholder}
            options={countryOpts}
            value={value}
            onChange={onChange}
            isMulti
            className={classNames("react-select", "react-select-regular", className)}
            classNamePrefix="react-select"
        />
    </>
}

export default CurrenciesDropdown;
