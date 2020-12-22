
import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";

import { WEIGHTS } from "../constants";

interface WeightUnitDropdownProps {
    placeholder?: string,
    name: string,
    value: any,
    onChange: any,
    className: any
}

const WeightUnitDropdown = ({ placeholder, value, onChange, className }: WeightUnitDropdownProps) => {

    const { t } = useTranslation();


    let opts: Array<any> = [];
    for (const c in WEIGHTS) {
        opts.push({
            label: t(WEIGHTS[c]),
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

export default WeightUnitDropdown;
