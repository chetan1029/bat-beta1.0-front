import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Button, Media } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";
import AddEditPaymentTerms from "./AddEditPaymentTerms";

//actions
import { getPaymentTerms, deletePaymentTerm, archivePaymentTerm, restorePaymentTerm, reset } from "../../redux/actions";

import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import ConfirmMessage from "../../components/ConfirmMessage";

interface PaymentCardItemProps {
    payment: any;
    onArchiveDeleteAction: any;
    onEditPaymentTerm: any;
    companyId: any;
}

const EmptyState = ({ showArchived }) => {
    const { t } = useTranslation();
    return (
        <Card className="payment-terms-card mb-2">
            <Card.Body>
                <div className="p-2">
                    {showArchived ? <h5 className="font-weight-normal my-0">{t('There are no archived payment terms available')}</h5> : <h5 className="font-weight-normal my-0">{t('There are no payment terms available')}</h5>}
                </div>
            </Card.Body>
        </Card>
    )
}

const PaymentCardItem = ({ payment, onArchiveDeleteAction, onEditPaymentTerm, companyId }: PaymentCardItemProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [selectedTermForDelete, setselectedTermForDelete] = useState<any>(null);

    /*
    delete payment term
    */
    const onDeletePaymentTerm = (id: any) => {
        onArchiveDeleteAction(payment);
        setselectedTermForDelete(payment);
    }

    const onClickArchiveUnArchive = (action: boolean) => {
        if (action) {
            dispatch(restorePaymentTerm(companyId, payment.id));
        } else {
            dispatch(archivePaymentTerm(companyId, payment.id));
        }
        onArchiveDeleteAction(payment);
    }

    return (<>
        <Row>
            <Col lg={12}>
                <Card className="mb-2">
                    <Link to="#" onClick={() => onEditPaymentTerm(payment)} className="card-link">
                        <Card.Header>
                            <p className="m-0 text-muted">{t('Title')}</p>
                            <h6 className="m-0">{payment.title}</h6>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={6} lg={3}>
                                    <p className="m-0 text-muted">{t('Deposit')}</p>
                                    <p className="m-0">{payment.deposit}</p>
                                </Col>
                                <Col xs={6} lg={3}>
                                    <p className="m-0 text-muted">{t('On Delivery')}</p>
                                    <p className="m-0">{payment.on_delivery}</p>
                                </Col>
                                <Col xs={6} lg={3}>
                                    <p className="m-0 text-muted">{t('Receiving')}</p>
                                    <p className="m-0">{payment.receiving}</p>
                                </Col>
                                <Col xs={6} lg={3}>
                                    <p className="m-0 text-muted">{t('Remaining')}</p>
                                    <p className="m-0">{payment.remaining}% in {payment.payment_days} Days</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Link>
                    <Card.Footer>
                        <div className="float-right">
                            <div className="d-flex align-items-center">
                                {
                                    !payment.is_active ?
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(true)}><Icon name="un-archive" className="svg-outline-primary mr-2" /></Link> :
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(false)}><Icon name="archive" className="svg-outline-warning mr-2" /></Link>
                                }
                                <Link to="#" onClick={() => onDeletePaymentTerm(payment.id)}><Icon name="delete" className="ml-2 svg-outline-danger" /></Link>

                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        {selectedTermForDelete ? <ConfirmMessage message={`Are you sure you want to delete ${selectedTermForDelete.title}?`} onConfirm={() => {
            dispatch(deletePaymentTerm(companyId, selectedTermForDelete.id));
        }} onClose={() => setselectedTermForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Delete')}></ConfirmMessage> : null}
    </>
    )
}

interface PaymentTermsProps {
    match: any;
}
const PaymentTerms = (props: PaymentTermsProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

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
            dispatch(getPaymentTerms(companyId, { is_active: true }));
        }
    }, [dispatch, props.match.params.companyId]);


    /*
    archive switch
    */
    const [showArchived, setshowArchived] = useState(false);

    const onChangeShowArchive = (checked: boolean) => {
        setshowArchived(checked);
        dispatch(getPaymentTerms(companyId, { is_active: !checked }));
    }

    /*
    alert
    */
    const [archiveUnarchiveItem, setarchiveUnarchiveItem] = useState<any>(null);

    /*
    to display alert and set title
    */
    const onArchiveDeleteAction = (payment: any) => {
        setarchiveUnarchiveItem(payment);
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
        dispatch(reset());
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
            dispatch(getPaymentTerms(props.match.params.companyId, { is_active: true }));
            setTimeout(() => {
                dispatch(reset());
            }, 10000);
        }
    }, [isPaymentTermCreated, isPaymentTermUpdated, dispatch, props.match.params.companyId]);

    /*
    re-fetch items when item deleted, archived, restored
    */
    useEffect(() => {
        if (isPaymentTermDeleted || isPaymentTermArchived || isPaymentTermRestored) {
            dispatch(getPaymentTerms(props.match.params.companyId, { is_active: !showArchived }));

            if (isPaymentTermRestored) {
                setshowArchived(false);
            }

            setTimeout(() => {
                dispatch(reset());
            }, 10000);
        }
    }, [isPaymentTermDeleted, isPaymentTermArchived, isPaymentTermRestored, dispatch, props.match.params.companyId]);

    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/settings/${companyId}`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Payment Terms')}</h1>
                            <div className="d-flex align-items-center pl-3">
                                <span className="m-0 font-16 mr-2">
                                    {t('Show archived')}
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
                        }}>{t('Add Payment Term')}</Button>
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
                                                    ) : <EmptyState showArchived={showArchived} />
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


            {isPaymentTermCreated && (!isPaymentTermDeleted && !isPaymentTermRestored) ? <MessageAlert message={t('A new Payment Term is created')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {isPaymentTermDeleted && (!isPaymentTermCreated && !isPaymentTermRestored) ? <MessageAlert message={t('Selected Payment Term is deleted')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {isPaymentTermArchived ? <MessageAlert
                message={`${t('Payment Term')} ${archiveUnarchiveItem.title} ${t('is archived. You can undo this action.')}`}
                iconWrapperClass="bg-warning text-white p-2 rounded-circle" iconClass="svg-outline-white"
                icon="archive" undo={true} onUndo={() => {
                    dispatch(restorePaymentTerm(companyId, archiveUnarchiveItem.id))
                }}
            /> : null}

            {isPaymentTermRestored ? <MessageAlert
                message={`${t('Payment Term')} ${archiveUnarchiveItem.title} ${t('is restored. You can undo this action.')}`}
                iconWrapperClass="bg-primary text-white p-2 rounded-circle" iconClass="svg-outline-white"
                icon="archive" undo={true} onUndo={() => {
                    dispatch(archivePaymentTerm(companyId, archiveUnarchiveItem.id))
                }}
            /> : null}


            {isOpen ? <AddEditPaymentTerms isOpen={isOpen} onClose={closeModal} companyId={companyId} paymentTerm={selectedPaymentTerm} /> : null}
        </>
    );
}

export default withRouter(PaymentTerms);
