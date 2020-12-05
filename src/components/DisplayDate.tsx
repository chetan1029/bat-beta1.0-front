import React from 'react';
import { default as dayjs } from 'dayjs';
import classNames from "classnames";

interface DisplayDateProps {
    dateStr: string,
    timeClass?: string
}

const DisplayDate = ({ dateStr, timeClass }: DisplayDateProps) => {
    const tClass = timeClass || 'text-muted ml-3';

    return <>
        <span>{dayjs(dateStr).format('DD MMMM YYYY')}</span>
        <span className={classNames(tClass)}>{dayjs(dateStr).format('hh:mm A')}</span>
    </>;
}

export default DisplayDate;