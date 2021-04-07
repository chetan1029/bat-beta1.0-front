import React from 'react';
import { default as dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface DateFromNowProps {
    dateStr: string
}

const DateFromNow = ({ dateStr }: DateFromNowProps) => {

    return <>
        {dayjs(dateStr).fromNow()}
    </>;
}

export default DateFromNow;