import React from "react";
import Icon from "./Icon";

interface OrderByIconProps {
    orderField: string,
    orderBy: string,
    orderDirection?: number,
}

const OrderByIcon = ({ orderField, orderBy, orderDirection }: OrderByIconProps) => {
    if (orderBy && orderDirection){
      let orderDirectionIcon = "";
      if(orderDirection === 1){
        orderDirectionIcon = "arrow-up";
      }else{
        orderDirectionIcon = "arrow-down";
      }
      if (orderField === orderBy){
      return <>
            <Icon name={orderDirectionIcon} className="icon icon-xxs" />
            </>;
      }else{
        return null;
      }
    }else{
      return null;
    }
}

export default OrderByIcon;
