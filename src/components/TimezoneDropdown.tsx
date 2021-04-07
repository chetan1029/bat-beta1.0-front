
import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";
import { TIMEZONES } from "../constants";


interface TimezoneDropdownProps {
    placeholder?: string,
    name: string,
    value: any,
    onChange: any,
    className: any
}

const TimezoneDropdown = ({ placeholder, name, value, onChange, className }: TimezoneDropdownProps) => {

    const { t } = useTranslation();


    let timezoneOpts: Array<any> = [];
    for (const tz of TIMEZONES) {
        timezoneOpts.push({
            label: t(tz),
            value: tz
        });
    }

    return <>
        <Select
            placeholder={placeholder}
            options={timezoneOpts}
            value={value}
            onChange={onChange}
            className={classNames("react-select", "react-select-regular", className)}
            classNamePrefix="react-select"
        />
    </>
}

export default TimezoneDropdown;
