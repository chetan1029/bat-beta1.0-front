import React from "react";
import { Alert } from "react-bootstrap";


const AlertMessage = ({ error }) => {

    return <>
        {error ? <>
            {typeof error === 'object' ? <>
                <Alert variant="danger" className="my-2">
                    <ul className="mb-0">
                        {Object.entries(error).map(([key, value]) => {
                            return <li key={key}>{key}: {value}</li>
                        })}
                    </ul>
                </Alert>
            </> : <Alert variant="danger" className="my-2">{error}</Alert>}
        </> : null}
    </>;
}

export default AlertMessage;