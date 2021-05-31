import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Select, { components } from 'react-select';
import classNames from "classnames";
import { useTranslation } from 'react-i18next';
import Flag from 'react-flagkit';
import { getMarketPlaces } from "../redux/actions";

interface MarketPlacesDropdownProps {
    placeholder?: string;
    name: string;
    value: any;
    onChange: any;
    className?: any;
    isSingle?: boolean;
    companyId: any;
    showAll?: boolean;
    isClearable?: boolean;
}

const { Option } = components;
const CustomSelectOption = props => (
  <Option {...props}>
    { props.data.icon ?
    <Flag country={props.data.icon} className={"mr-1"} size={16} />
    : "" }
     {props.data.label}
  </Option>
);

const CustomSelectValue = props => (
  <div>
    { props.data.icon ?
      <Flag country={props.data.icon} className={"mr-1"} size={16} />
      : "" }
    {props.data.label}
  </div>
)

const MarketPlacesDropdown = ({ placeholder, name, value, onChange, className, isSingle, showAll, isClearable, companyId }: MarketPlacesDropdownProps) => {
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

    if (showAll){
      marketOpts.push({
          label: "All",
          icon: "",
          value: "all"
      });
    }

    for (const market of markets.filter(m => m['status'] === 'active')) {
        marketOpts.push({
            label: t('Amazon') + " " + market['country'],
            icon: market['country'],
            value: market['id']
        });
    }

    return <>
        <Select
            placeholder={placeholder}
            options={marketOpts}
            components={{ Option: CustomSelectOption, SingleValue: CustomSelectValue }}
            value={value}
            onChange={onChange}
            isMulti={!isSingle}
            isClearable={isClearable}
            className={classNames("react-select", "react-select-regular", className)}
            classNamePrefix="react-select"
        />
    </>
}

export default MarketPlacesDropdown;
