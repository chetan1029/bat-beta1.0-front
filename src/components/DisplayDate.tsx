import React from 'react';
import { default as dayjs } from 'dayjs';

interface DisplayDateProps {
    dateStr: string
}

const DisplayDate = ({ dateStr }: DisplayDateProps) => {

    return <>
        <span>{dayjs(dateStr).format('DD MMMM YYYY')}</span>
        <span className="text-muted ml-3">{dayjs(dateStr).format('hh:mm A')}</span>
    </>;
}

export default DisplayDate;