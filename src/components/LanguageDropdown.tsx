
import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";


const LANGS: any = {
    "en": "English",
    "sv": "Swedish"
}

interface LanguageDropdownProps {
    placeholder?: string,
    name: string,
    value: any,
    onChange: any,
    className: any
}

const LanguageDropdown = ({ placeholder, name, value, onChange, className }: LanguageDropdownProps) => {

    const { t } = useTranslation();


    let langOpts: Array<any> = [];
    for (const c in LANGS) {
        langOpts.push({
            label: t(LANGS[c]),
            value: c
        });
    }

    return <>
        <Select
            placeholder={placeholder}
            options={langOpts}
            value={value}
            onChange={onChange}
            className={classNames("react-select", "react-select-regular", className)}
            classNamePrefix="react-select"
        />
    </>
}

export { LANGS, LanguageDropdown };