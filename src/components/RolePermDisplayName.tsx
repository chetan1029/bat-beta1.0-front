import React from "react";
import classNames from "classnames";

interface RolePermDisplayNameProp {
    name: string,
    className?: string
}

const RolePermDisplayName = ({ name, className }: RolePermDisplayNameProp) => {
    return <>
        <span className={classNames("capitalize", className)}>{name.split('_').join(' ')}</span>
    </>
}

export default RolePermDisplayName;