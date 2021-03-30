import React from 'react';
import { Spinner } from 'react-bootstrap';

/**
 * Simple Loader component
 */
const Loader = () => {

    return (
        <div className="loader">
            <div className="status">
                <Spinner animation="border" role="status" variant="primary">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        </div>
    )
}

export default Loader;
