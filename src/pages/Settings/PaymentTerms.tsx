import React, { useState } from 'react';
import { Row, Col, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

//components
import Icon from "../../components/Icon";

interface PaymentTermsProps {
    onChangeView: any;
}

const PaymentTerms = ({ onChangeView }: PaymentTermsProps) => {
    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to="#" onClick={() => onChangeView("defaultView")}>
                                <Icon name="arrow_left_2" className="icon icon-sm  mr-2" />
                            </Link>
                            <h1 className="m-0">
                                Payment Terms
                        </h1>
                            <Form>
                                <Form.Label>
                                    Show archived
                                </Form.Label>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                />
                            </Form>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default PaymentTerms;