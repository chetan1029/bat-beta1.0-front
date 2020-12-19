
import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";

import { UNIT_SYSTEMS } from "../constants";

interface UnitSystemDropdownProps {
    placeholder?: string,
    name: string,
    value: any,
    onChange: any,
    className: any
}

const UnitSystemDropdown = ({ placeholder, value, onChange, className }: UnitSystemDropdownProps) => {

    const { t } = useTranslation();


    let opts: Array<any> = [];
    for (const c in UNIT_SYSTEMS) {
        opts.push({
            label: t(UNIT_SYSTEMS[c]),
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

export default UnitSystemDropdown;
