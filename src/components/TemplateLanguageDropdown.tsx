
import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import classNames from "classnames";
import { TEMPLATE_LANGS } from "../constants";


interface TemplateLanguageDropdownProps {
    placeholder?: string,
    name: string,
    value: any,
    onChange: any,
    className: any
}

const TemplateLanguageDropdown = ({ placeholder, name, value, onChange, className }: TemplateLanguageDropdownProps) => {

    const { t } = useTranslation();


    let langOpts: Array<any> = [];
    for (const c in TEMPLATE_LANGS) {
        langOpts.push({
            label: t(TEMPLATE_LANGS[c]),
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

export { TEMPLATE_LANGS, TemplateLanguageDropdown };
