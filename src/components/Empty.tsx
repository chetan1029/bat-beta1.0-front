import React from "react";
import { Card } from "react-bootstrap";


interface EmptyStateProps {
    message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => {

    return (
        <Card className="mb-2">
            <Card.Body>
                <div className="p-2">
                    <h5 className="font-weight-normal my-0">{message}</h5>
                </div>
            </Card.Body>
        </Card>
    )
}

export default EmptyState;