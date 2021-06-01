import React from "react";

interface ComparePercentageProps {
    value: number
}

const ComparePercentage = ({ value }: ComparePercentageProps) => {
    const perClass = value > 0 ? "text-success": "text-danger";
    const perState = value > 0 ? "up": "down";

    return <>
    {value ?
      <span className={"percentage-change"}><small className={perClass}><i className={perState}></i>{value}%</small></span>
      : null
    }
    </>;
}

export default ComparePercentage;
