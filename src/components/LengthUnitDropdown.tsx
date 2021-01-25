
import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";
import { LENGTHS } from "../constants";


interface LengthUnitDropdownProps {
    placeholder?: string,
    name: string,
    value: any,
    onChange: any,
    className: any
}

const LengthUnitDropdown = ({ placeholder, value, onChange, className }: LengthUnitDropdownProps) => {

    const { t } = useTranslation();


    let opts: Array<any> = [];
    for (const c in LENGTHS) {
        opts.push({
            label: t(LENGTHS[c]),
            value: c
        });
    }

    return <>
        <Select
            placeholder={placeholder}
            options={opts}
            value={value}
            onChange={onChange}
            className={classNames("react-select", "react-select-regular", className)}
            classNamePrefix="react-select"
        />
    </>
}

export default LengthUnitDropdown;
