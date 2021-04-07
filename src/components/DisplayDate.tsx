import React from 'react';
import { default as dayjs } from 'dayjs';
import classNames from "classnames";

interface DisplayDateProps {
    dateStr: string;
    timeClass?: string;
    hideTime?: boolean;
}

const DisplayDate = ({ dateStr, timeClass, hideTime }: DisplayDateProps) => {
    const tClass = timeClass || 'text-muted ml-2';

    return <>
        {dateStr ? <>
            <span>{dayjs(dateStr).format('DD MMMM YYYY')}</span>
            {!hideTime ? <span className={classNames(tClass)}>{dayjs(dateStr).format('hh:mm A')}</span> : null}
        </> : null}
    </>;
}

export default DisplayDate;
