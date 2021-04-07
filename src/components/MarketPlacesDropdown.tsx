import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import classNames from "classnames";
import { useTranslation } from 'react-i18next';

import { getMarketPlaces } from "../redux/actions";

interface MarketPlacesDropdownProps {
    placeholder?: string;
    name: string;
    value: any;
    onChange: any;
    className?: any;
    isSingle?: boolean;
    companyId: any;
}

const MarketPlacesDropdown = ({ placeholder, name, value, onChange, className, isSingle, companyId }: MarketPlacesDropdownProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    // get the data
    useEffect(() => {
        dispatch(getMarketPlaces(companyId, { 'limit': 100000000 }));
    }, [dispatch, companyId]);

    const { markets } = useSelector((state: any) => ({
        markets: state.MarketPlaces.markets
    }));

    let marketOpts: Array<any> = [];

    for (const market of markets.filter(m => m['status'] === 'active')) {
        marketOpts.push({
            label: t('Amazon') + " " + market['country'],
            value: market['id']
        });
    }

    return <>
        <Select
            placeholder={placeholder}
            options={marketOpts}
            value={value}
            onChange={onChange}
            isMulti={!isSingle}
            isClearable={true}
            className={classNames("react-select", "react-select-regular", className)}
            classNamePrefix="react-select"
        />
    </>
}

export default MarketPlacesDropdown;
