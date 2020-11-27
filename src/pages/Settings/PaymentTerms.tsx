import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Media, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

//components
import Icon from "../../components/Icon";
import AddPayment from "./AddPayment";

//dummy data
import { payments } from "./data";

interface PaymentCardItemProps {
    payment: any;
    onClickArchiveUnArchive: any;
}
const PaymentCardItem = ({ payment, onClickArchiveUnArchive }: PaymentCardItemProps) => {

    return (
        <Card className="mb-2">
            <Card.Header className="payment-card-title">
                <div className="p-2">
                    <h6 className="m-0 text-muted font-weight-bold">Title</h6>
                    <h6 className="m-0 font-weight-bold">{payment.title}</h6>
                </div>
            </Card.Header>
            <Card.Body>
                <div className="p-2">
                    <Row>
                        <Col xs={6} lg={3}>
                            <h6 className="m-0 text-muted font-weight-bold">Deposit</h6>
                            <h6 className="m-0 font-weight-bold">{payment.deposit}</h6>
                        </Col>
                        <Col xs={6} lg={3}>
                            <h6 className="m-0 text-muted font-weight-bold">Deposit</h6>
                            <h6 className="m-0 font-weight-bold">{payment.onDelivery}</h6>
                        </Col>
                        <Col xs={6} lg={3}>
                            <h6 className="m-0 text-muted font-weight-bold">Deposit</h6>
                            <h6 className="m-0 font-weight-bold">{payment.receiving}</h6>
                        </Col>
                        <Col xs={6} lg={3}>
                            <h6 className="m-0 text-muted font-weight-bold">Deposit</h6>
                            <h6 className="m-0 font-weight-bold">{payment.remaining}</h6>
                        </Col>
                    </Row>
                </div>
            </Card.Body>
            <Card.Footer className="payment-card-footer">
                <div className="p-2 float-right">
                    <div className="d-flex align-items-center">
                        {
                            payment.isArchive ?
                                <Link to="#" onClick={() => onClickArchiveUnArchive(payment, "un-archive")}><Icon name="un-archive" className="svg-outline-warning mr-2" /></Link> :
                                <Link to="#" onClick={() => onClickArchiveUnArchive(payment, "archive")}><Icon name="archive" className="svg-outline-primary mr-2" /></Link>
                        }
                        <Icon name="delete" className="ml-2 svg-outline-danger" />
                    </div>
                </div>
            </Card.Footer>
        </Card>
    )
}

interface PaymentTermsProps {
    onChangeView: any;
}
const PaymentTerms = ({ onChangeView }: PaymentTermsProps) => {
    /*
    payment items
    */
    const [allPayments, setallPayments] = useState(payments.filter(p => p.isArchive === false));

    /*
    archive switch
    */
    const [showArchived, setshowArchived] = useState(false);

    const onChangeShowArchive = (checked: boolean) => {
        setshowArchived(checked);
        let modifiedPayments = [...allPayments];
        if (!checked) {
            //TODO - api filters
            let unArchived = modifiedPayments.filter(p => p.isArchive === false);
            console.log(unArchived)
            setallPayments(unArchived);
        } else setallPayments(payments);
    }

    /*
    alert
    */
    const [showAlert, setShowAlert] = useState(false);
    const [archiveUnarchiveItem, setarchiveUnarchiveItem] = useState<any>(null);

    const onClickArchiveUnArchive = (item: any, action: string) => {
        //TODO - api call for achive-unarchive
        if (action === "un-archive") {

        } else {

        }
        setarchiveUnarchiveItem(item)
        setShowAlert(true);
    }

    /*
    add payment
    */
    const [isOpen, setisopen] = useState(false);
    const openModal = () => {
        setisopen(true);
    }
    const closeModal = () => {
        setisopen(false);
    }

    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to="#" onClick={() => onChangeView("defaultView")}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">
                                Payment Terms
                        </h1>
                            <div className="d-flex align-items-center pl-3">
                                <span className="m-0 font-16 mr-2">
                                    Show archived
                                </span>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                    checked={showArchived}
                                    onChange={(e: any) => onChangeShowArchive(e.target.checked)}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col className="text-right">
                        <Button variant="primary" onClick={()=> openModal()}>Add Payment Terms</Button>
                    </Col>
                </Row>
            </div>

            <div>
                <Card>
                    <Card.Body className="">
                        <div className="p-2">
                            <Row>
                                <Col lg={6} xs={12}>
                                    {
                                        allPayments.map((payment, key) =>
                                            <PaymentCardItem payment={payment} key={key} onClickArchiveUnArchive={onClickArchiveUnArchive} />
                                        )
                                    }
                                </Col>
                                <Col lg={6} xs={12}>
                                    <div>
                                        <Media>
                                            <div className="pt-1">
                                                <Icon name="settings" className="icon icon-sm svg-outline-secondary" />
                                            </div>
                                            <Media.Body>
                                                <div className="px-3">
                                                    <h2 className="m-0 mb-2"> Luctus sed ut elit nibh </h2>
                                                    <p className="text-wrap pb-0 text-muted">Some quick example text to build on the card title and make up the bulk
                                                    of the card's content.Some quick example text to build on the card title and make up the bulk
        of the card's content.</p>
                                                </div>
                                            </Media.Body>
                                        </Media>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            {
                showAlert &&
                <div className="position-relative">
                    <div className="alret-notification">
                        <Alert variant="light" className="card" onClose={() => setShowAlert(false)} dismissible>
                            <Row>
                                <Col xs={12} lg={2} className="d-flex align-items-center justify-content-center">
                                    <div className="btn-archive">
                                        <Icon name="archive" className="icon" />
                                    </div>
                                </Col>
                                <Col xs={12} lg={8} className="d-flex align-items-center">
                                    <p>Your Payment Terms {archiveUnarchiveItem.title} were archived. You can undo this action.</p>
                                </Col>
                                <Col xs={12} lg={2} className="d-flex align-items-center">
                                    <Button variant="outline-primary">Undo</Button>
                                </Col>
                            </Row>
                        </Alert >
                    </div>
                </div>
            }

            <AddPayment isOpen={isOpen} onClose={closeModal} />
        </>
    );
}

export default PaymentTerms;