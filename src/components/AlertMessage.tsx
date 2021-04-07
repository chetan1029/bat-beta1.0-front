import React from "react";
import { Alert } from "react-bootstrap";

interface AlertMessageProps {
    variant?: string,
    error: any
}

const AlertMessage = ({ error, variant }: AlertMessageProps) => {
    const v = variant || 'danger';

    return <>
        {error ? <>
            {typeof error === 'object' ? <>
                <Alert variant={v} className="my-2">
                    <ul className="mb-0">
                        {Object.entries(error).map(([key, value]) => {
                            return <li key={key}>{key}: {value}</li>
                        })}
                    </ul>
                </Alert>
            </> : <Alert variant={v} className="my-2">{error}</Alert>}
        </> : null}
    </>;
}

export default AlertMessage;