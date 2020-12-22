import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Button, Media } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";
import AddEditPackingBox from "./AddEditPackingBox";

//actions
import { getPackingBox, deletePackingBox, archivePackingBox, restorePackingBox, reset } from "../../redux/actions";

import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import ConfirmMessage from "../../components/ConfirmMessage";

interface PaymentCardItemProps {
    packingbox: any;
    onArchiveDeleteAction: any;
    onEditPackingBox: any;
    companyId: any;
}

const EmptyState = ({ showArchived }) => {
    const { t } = useTranslation();
    return (
        <Card className="payment-terms-card mb-2">
            <Card.Body>
                <div className="p-2">
                    {showArchived ? <h5 className="font-weight-normal my-0">{t('There are no archived packing box available')}</h5> : <h5 className="font-weight-normal my-0">{t('There are no packing box available')}</h5>}
                </div>
            </Card.Body>
        </Card>
    )
}

const PaymentCardItem = ({ packingbox, onArchiveDeleteAction, onEditPackingBox, companyId }: PaymentCardItemProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [selectedTermForDelete, setselectedTermForDelete] = useState<any>(null);

    /*
    delete payment term
    */
    const onDeletePackingBox = (id: any) => {
        onArchiveDeleteAction(packingbox);
        setselectedTermForDelete(packingbox);
    }

    const onClickArchiveUnArchive = (action: boolean) => {
        if (action) {
            dispatch(restorePackingBox(companyId, packingbox.id));
        } else {
            dispatch(archivePackingBox(companyId, packingbox.id));
        }
        onArchiveDeleteAction(packingbox);
    }

    return (<>
        <Row>
            <Col lg={12}>
                <Card className="payment-terms-card mb-2">
                    <Link to="#" onClick={() => onEditPackingBox(packingbox)} className="payment-terms-link">
                        <Card.Header className="payment-card-title">
                            <div className="p-2">
                                <h6 className="m-0 text-muted font-weight-bold">{t('Name')}</h6>
                                <h6 className="m-0 font-weight-bold">{packingbox.name}</h6>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="p-2">
                                <Row>
                                    <Col xs={6} lg={3}>
                                        <h6 className="m-0 text-muted font-weight-bold">{t('Length')}</h6>
                                        <h6 className="m-0 font-weight-bold">{packingbox.length}&nbsp;{packingbox.length_unit}</h6>
                                    </Col>
                                    <Col xs={6} lg={3}>
                                        <h6 className="m-0 text-muted font-weight-bold">{t('Weight')}</h6>
                                        <h6 className="m-0 font-weight-bold">{packingbox.weight ? packingbox.weight['value'] + ' ' + packingbox.weight['unit']: ''}</h6>
                                    </Col>
                                    <Col xs={6} lg={3}>
                                        <h6 className="m-0 text-muted font-weight-bold">{t('Depth')}</h6>
                                        <h6 className="m-0 font-weight-bold">{packingbox.depth}</h6>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Link>
                    <Card.Footer className="payment-card-footer">
                        <div className="p-2 float-right">
                            <div className="d-flex align-items-center">
                                {
                                    !packingbox.is_active ?
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(true)}><Icon name="un-archive" className="svg-outline-warning mr-2" /></Link> :
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(false)}><Icon name="archive" className="svg-outline-primary mr-2" /></Link>
                                }
                                <Link to="#" onClick={() => onDeletePackingBox(packingbox.id)}><Icon name="delete" className="ml-2 svg-outline-danger" /></Link>

                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        {selectedTermForDelete ? <ConfirmMessage message={`Are you sure you want to delete ${selectedTermForDelete.title}?`} onConfirm={() => {
            dispatch(deletePackingBox(companyId, selectedTermForDelete.id));
        }} onClose={() => setselectedTermForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Delete')}></ConfirmMessage> : null}
    </>
    )
}

interface PackingBoxProps {
    match: any;
}
const PackingBox = (props: PackingBoxProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { packingBox, isPackingBoxFetched, isPackingBoxCreated, isPackingBoxUpdated, isPackingBoxDeleted, isPackingBoxArchived, isPackingBoxRestored } = useSelector((state: any) => ({
        packingBox: state.Company.PackingBox.packingBox,

        //flags
        isPackingBoxFetched: state.Company.PackingBox.isPackingBoxFetched,
        isPackingBoxCreated: state.Company.PackingBox.isPackingBoxCreated,
        isPackingBoxUpdated: state.Company.PackingBox.isPackingBoxUpdated,
        isPackingBoxDeleted: state.Company.PackingBox.isPackingBoxDeleted,
        isPackingBoxArchived: state.Company.PackingBox.isPackingBoxArchived,
        isPackingBoxRestored: state.Company.PackingBox.isPackingBoxRestored
    }));

    const companyId = props.match.params.companyId;
    /*
    payment tems
    */
    useEffect(() => {
        const companyId = props.match.params.companyId;
        if (companyId) {
            dispatch(getPackingBox(companyId, { is_active: true }));
        }
    }, [dispatch, props.match.params.companyId]);


    /*
    archive switch
    */
    const [showArchived, setshowArchived] = useState(false);

    const onChangeShowArchive = (checked: boolean) => {
        setshowArchived(checked);
        dispatch(getPackingBox(companyId, { is_active: !checked }));
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
        packing box
    */
    const [selectedPackingBox, setselectedPackingBox] = useState<any>();

    const setPackingBox = (payment: any) => {
        setselectedPackingBox(payment);
        setisopen(true);
    }

    /*
    close modal for after creating payment term
    */
    useEffect(() => {
        if (isPackingBoxCreated || isPackingBoxUpdated) {
            setisopen(false);
            dispatch(getPackingBox(props.match.params.companyId, { is_active: true }));
            setTimeout(() => {
                dispatch(reset());
            }, 10000);
        }
    }, [isPackingBoxCreated, isPackingBoxUpdated, dispatch, props.match.params.companyId]);

    /*
    re-fetch items when item deleted, archived, restored
    */
    useEffect(() => {
        if (isPackingBoxDeleted || isPackingBoxArchived || isPackingBoxRestored) {
            dispatch(getPackingBox(props.match.params.companyId, { is_active: true }));

            if (isPackingBoxRestored) {
                setshowArchived(false);
            }

            setTimeout(() => {
                dispatch(reset());
            }, 10000);
        }
    }, [isPackingBoxDeleted, isPackingBoxArchived, isPackingBoxRestored, dispatch, props.match.params.companyId]);

    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/settings/${companyId}`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Packing Box')}</h1>
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
                            setselectedPackingBox(null);
                        }}>{t('Add Packing Box')}</Button>
                    </Col>
                </Row>
            </div>

            {
                !isPackingBoxFetched ?
                    <Loader />
                    :
                    <div>
                        <Card>
                            <Card.Body className="">
                                <div className="p-2">
                                    <Row>
                                        <Col lg={6} xs={12}>
                                            {
                                                packingBox['results'].length > 0 ?
                                                    packingBox['results'].map((packing, key) =>
                                                        <PaymentCardItem packingbox={packing}
                                                            key={key} companyId={companyId}
                                                            onArchiveDeleteAction={onArchiveDeleteAction}
                                                            onEditPackingBox={setPackingBox}
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


            {isPackingBoxCreated && (!isPackingBoxDeleted && !isPackingBoxRestored) ? <MessageAlert message={t('A new Packing Box is created')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {isPackingBoxDeleted && (!isPackingBoxCreated && !isPackingBoxRestored) ? <MessageAlert message={t('Selected Packing Box is deleted')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {isPackingBoxArchived ? <MessageAlert
                message={`${t('Packing Box')} ${archiveUnarchiveItem.title} ${t('is archived. You can undo this action.')}`}
                iconWrapperClass="bg-primary text-white p-2 rounded-circle" iconClass="text-white"
                icon="archive" undo={true} onUndo={() => {
                    dispatch(restorePackingBox(companyId, archiveUnarchiveItem.id))
                }}
            /> : null}

            {isPackingBoxRestored ? <MessageAlert
                message={`${t('Packing Box')} ${archiveUnarchiveItem.title} ${t('is restored. You can undo this action.')}`}
                iconWrapperClass="bg-primary text-white p-2 rounded-circle" iconClass="text-white"
                icon="archive" undo={true} onUndo={() => {
                    dispatch(archivePackingBox(companyId, archiveUnarchiveItem.id))
                }}
            /> : null}


            {isOpen ? <AddEditPackingBox isOpen={isOpen} onClose={closeModal} companyId={companyId} packingBox={selectedPackingBox} /> : null}
        </>
    );
}

export default withRouter(PackingBox);
