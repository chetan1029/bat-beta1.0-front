import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Button, Media, Alert } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

//components
import Icon from "../../components/Icon";
import AddPayment from "./AddPayment";

//actions
import { getPaymentTerms, deletePaymentTerm, archivePaymentTerm, restorePaymentTerm } from "../../redux/actions";

//dummy data
import Loader from "../../components/Loader";

interface PaymentCardItemProps {
    payment: any;
    onArchiveDeleteAction: any;
    onEditPaymentTerm: any;
    companyId: any;
}

const EmptyState = () => {
    return (
        <Card className="payment-terms-card mb-2">
            <Card.Body>
                <div className="p-2">
                    There Is No Archived Payment Terms.
                </div>
            </Card.Body>
        </Card>
    )
}
const PaymentCardItem = ({ payment, onArchiveDeleteAction, onEditPaymentTerm, companyId }: PaymentCardItemProps) => {
    const dispatch = useDispatch();
    /*
    delete payment term
    */
    const onDeletePaymentTerm = (id: any) => {
        dispatch(deletePaymentTerm(companyId, id));
        onArchiveDeleteAction(payment);
    }

    const onClickArchiveUnArchive = (action: boolean) => {
        if (action) {
            dispatch(restorePaymentTerm(companyId, payment.id));
        } else {
            dispatch(archivePaymentTerm(companyId, payment.id));
        }
        onArchiveDeleteAction(payment);
    }

    return (
        <Row>
            <Col lg={12}>
                <Card className="payment-terms-card mb-2">
                    <Link to="#" onClick={() => onEditPaymentTerm(payment)} className="payment-terms-link">
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
                                        <h6 className="m-0 text-muted font-weight-bold">On Delivery</h6>
                                        <h6 className="m-0 font-weight-bold">{payment.on_delivery}</h6>
                                    </Col>
                                    <Col xs={6} lg={3}>
                                        <h6 className="m-0 text-muted font-weight-bold">Receiving</h6>
                                        <h6 className="m-0 font-weight-bold">{payment.receiving}</h6>
                                    </Col>
                                    <Col xs={6} lg={3}>
                                        <h6 className="m-0 text-muted font-weight-bold">Remaining</h6>
                                        <h6 className="m-0 font-weight-bold">{payment.remaining} in {payment.payment_days} Days</h6>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Link>
                    <Card.Footer className="payment-card-footer">
                        <div className="p-2 float-right">
                            <div className="d-flex align-items-center">
                                {
                                    !payment.is_active ?
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(true)}><Icon name="un-archive" className="svg-outline-warning mr-2" /></Link> :
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(false)}><Icon name="archive" className="svg-outline-primary mr-2" /></Link>
                                }
                                <Link to="#" onClick={() => onDeletePaymentTerm(payment.id)}><Icon name="delete" className="ml-2 svg-outline-danger" /></Link>

                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </Row >
    )
}

interface PaymentTermsProps {
    onChangeView: any;
    match: any;
}
const PaymentTerms = (props: PaymentTermsProps) => {
    const dispatch = useDispatch();
    const { onChangeView } = props;
    const { paymentTerms, isPaymentTermsFetched, isPaymentTermCreated, isPaymentTermUpdated, isPaymentTermDeleted, isPaymentTermArchived, isPaymentTermRestored } = useSelector((state: any) => ({
        paymentTerms: state.Company.PaymentTerms.paymentTerms,

        //flags
        isPaymentTermsFetched: state.Company.PaymentTerms.isPaymentTermsFetched,
        isPaymentTermCreated: state.Company.PaymentTerms.isPaymentTermCreated,
        isPaymentTermUpdated: state.Company.PaymentTerms.isPaymentTermUpdated,
        isPaymentTermDeleted: state.Company.PaymentTerms.isPaymentTermDeleted,
        isPaymentTermArchived: state.Company.PaymentTerms.isPaymentTermArchived,
        isPaymentTermRestored: state.Company.PaymentTerms.isPaymentTermRestored
    }));

    const companyId = props.match.params.companyId;
    /*
    payment tems
    */
    useEffect(() => {
        const companyId = props.match.params.companyId;
        if (companyId) {
            dispatch(getPaymentTerms(companyId));
        }
    }, [dispatch, props.match.params.companyId]);


    /*
    archive switch
    */
    const [showArchived, setshowArchived] = useState(false);

    const onChangeShowArchive = (checked: boolean) => {

        setshowArchived(checked);
        if (checked) {
            let filters = {
                is_active: false
            }
            dispatch(getPaymentTerms(companyId, filters));
        } else {
            dispatch(getPaymentTerms(companyId));
        }
    }

    /*
    alert
    */
    const [showAlert, setShowAlert] = useState(false);
    const [archiveUnarchiveItem, setarchiveUnarchiveItem] = useState<any>(null);

    /*
    to display alert and set title
    */
    const onArchiveDeleteAction = (payment: any) => {
        setarchiveUnarchiveItem(payment);
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

    /*
        payment terms
    */
    const [selectedPaymentTerm, setselectedPaymentTerm] = useState<any>();

    const setPaymentTerm = (payment: any) => {
        setselectedPaymentTerm(payment);
        setisopen(true);
    }

    /*
    close modal for after creating payment term
    */
    useEffect(() => {
        if (isPaymentTermCreated || isPaymentTermUpdated) {
            setisopen(false);
            dispatch(getPaymentTerms(props.match.params.companyId));
        }
    }, [isPaymentTermCreated, isPaymentTermUpdated, dispatch, props.match.params.companyId]);

    /*
    re-fetch items when item deleted, archived, restored
    */
    useEffect(() => {
        if (isPaymentTermDeleted || isPaymentTermArchived || isPaymentTermRestored) {
            setShowAlert(true);
            dispatch(getPaymentTerms(props.match.params.companyId));
        }
    }, [isPaymentTermDeleted, isPaymentTermArchived, isPaymentTermRestored, dispatch, props.match.params.companyId]);

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
                        <Button variant="primary" onClick={() => {
                            openModal();
                            setselectedPaymentTerm(null);
                        }}>Add Payment Terms</Button>
                    </Col>
                </Row>
            </div>

            {
                !isPaymentTermsFetched ?
                    <Loader />
                    :
                    <div>
                        <Card>
                            <Card.Body className="">
                                <div className="p-2">
                                    <Row>
                                        <Col lg={6} xs={12}>
                                            {
                                                paymentTerms['results'].length > 0 ?
                                                    paymentTerms['results'].map((payment, key) =>
                                                        <PaymentCardItem payment={payment}
                                                            key={key} companyId={companyId}
                                                            onArchiveDeleteAction={onArchiveDeleteAction}
                                                            onEditPaymentTerm={setPaymentTerm}
                                                        />
                                                    ) : <EmptyState />
                                            }
                                        </Col>
                                        <Col lg={6} xs={12}>
                                            <div>
                                                <Media>
                                                    <div className="pt-1">
                                                        <Icon name="info" className="icon icon-sm svg-outline-secondary" />
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
            }

            {
                showAlert &&
                <div className="position-relative">
                    <div className="alret-notification">
                        <Alert variant="light" className="card" onClose={() => setShowAlert(false)} dismissible>
                            {
                                isPaymentTermDeleted && <p className="mb-0">Your Payment Term {archiveUnarchiveItem.title} is Deleted</p>
                            }
                            {
                                isPaymentTermArchived && <Row>
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
                            }
                            {
                                isPaymentTermRestored && <Row>
                                    <Col xs={12} lg={2} className="d-flex align-items-center justify-content-center">
                                        <div className="btn-archive">
                                            <Icon name="un-archive" className="icon" />
                                        </div>
                                    </Col>
                                    <Col xs={12} lg={8} className="d-flex align-items-center">
                                        <p>Your Payment Terms {archiveUnarchiveItem.title} were archived. You can undo this action.</p>
                                    </Col>
                                    <Col xs={12} lg={2} className="d-flex align-items-center">
                                        <Button variant="outline-primary">Undo</Button>
                                    </Col>
                                </Row>
                            }
                        </Alert >
                    </div>
                </div>
            }

            <AddPayment isOpen={isOpen} onClose={closeModal} companyId={companyId} paymentTerm={selectedPaymentTerm} />
        </>
    );
}

export default withRouter(PaymentTerms);