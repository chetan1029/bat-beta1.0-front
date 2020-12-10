import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Button, Media } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";
import AddEditLocation from "./AddEditLocation";

//actions
import { getLocation, deleteLocation, archiveLocation, restoreLocation, reset } from "../../redux/actions";

import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import ConfirmMessage from "../../components/ConfirmMessage";

interface LocationCardItemProps {
    location: any;
    onArchiveDeleteAction: any;
    onEditLocation: any;
    companyId: any;
}

const EmptyState = ({ showArchived }) => {
    const { t } = useTranslation();
    return (
        <Card className="payment-terms-card mb-2">
            <Card.Body>
                <div className="p-2">
                    {showArchived ? <h5 className="font-weight-normal my-0">{t('There are no archived location available')}</h5> : <h5 className="font-weight-normal my-0">{t('There are no location available')}</h5>}
                </div>
            </Card.Body>
        </Card>
    )
}

const LocationCardItem = ({ location, onArchiveDeleteAction, onEditLocation, companyId }: LocationCardItemProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [selectedTermForDelete, setselectedTermForDelete] = useState<any>(null);

    /*
    delete payment term
    */
    const onDeleteLocation = (id: any) => {
        onArchiveDeleteAction(location);
        setselectedTermForDelete(location);
    }

    const onClickArchiveUnArchive = (action: boolean) => {
        if (action) {
            dispatch(restoreLocation(companyId, location.id));
        } else {
            dispatch(archiveLocation(companyId, location.id));
        }
        onArchiveDeleteAction(location);
    }

    return (<>
        <Row>
            <Col lg={12}>
                <Card className="payment-terms-card mb-2">
                    <Link to="#" onClick={() => onEditLocation(location)} className="payment-terms-link">
                        <Card.Header className="payment-card-title">
                            <div className="p-2">
                                <h6 className="m-0 text-muted font-weight-bold">{t('Title')}</h6>
                                <h6 className="m-0 font-weight-bold">{location.name}</h6>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <div className="p-2">
                                <Row>
                                    <Col xs={6} lg={3}>
                                        <h6 className="m-0 text-muted font-weight-bold">{t('Deposit')}</h6>
                                        <h6 className="m-0 font-weight-bold">{location.deposit}</h6>
                                    </Col>
                                    <Col xs={6} lg={3}>
                                        <h6 className="m-0 text-muted font-weight-bold">{t('On Delivery')}</h6>
                                        <h6 className="m-0 font-weight-bold">{location.on_delivery}</h6>
                                    </Col>
                                    <Col xs={6} lg={3}>
                                        <h6 className="m-0 text-muted font-weight-bold">{t('Receiving')}</h6>
                                        <h6 className="m-0 font-weight-bold">{location.receiving}</h6>
                                    </Col>
                                    <Col xs={6} lg={3}>
                                        <h6 className="m-0 text-muted font-weight-bold">{t('Remaining')}</h6>
                                        <h6 className="m-0 font-weight-bold">{location.remaining}% in {location.payment_days} Days</h6>
                                    </Col>
                                </Row>
                            </div>
                        </Card.Body>
                    </Link>
                    <Card.Footer className="payment-card-footer">
                        <div className="p-2 float-right">
                            <div className="d-flex align-items-center">
                                {
                                    !location.is_active ?
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(true)}><Icon name="un-archive" className="svg-outline-warning mr-2" /></Link> :
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(false)}><Icon name="archive" className="svg-outline-primary mr-2" /></Link>
                                }
                                <Link to="#" onClick={() => onDeleteLocation(location.id)}><Icon name="delete" className="ml-2 svg-outline-danger" /></Link>

                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        {selectedTermForDelete ? <ConfirmMessage message={`Are you sure you want to delete ${selectedTermForDelete.title}?`} onConfirm={() => {
            dispatch(deleteLocation(companyId, selectedTermForDelete.id));
        }} onClose={() => setselectedTermForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Delete')}></ConfirmMessage> : null}
    </>
    )
}

interface LocationProps {
    match: any;
}
const Location = (props: LocationProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { location, isLocationFetched, isLocationCreated, isLocationUpdated, isLocationDeleted, isLocationArchived, isLocationRestored } = useSelector((state: any) => ({
        location: state.Company.Location.location,

        //flags
        isLocationFetched: state.Company.Location.isLocationFetched,
        isLocationCreated: state.Company.Location.isLocationCreated,
        isLocationUpdated: state.Company.Location.isLocationUpdated,
        isLocationDeleted: state.Company.Location.isLocationDeleted,
        isLocationArchived: state.Company.Location.isLocationArchived,
        isLocationRestored: state.Company.Location.isLocationRestored
    }));

    const companyId = props.match.params.companyId;
    /*
    payment tems
    */
    useEffect(() => {
        const companyId = props.match.params.companyId;
        if (companyId) {
            dispatch(getLocation(companyId, { is_active: true }));
        }
    }, [dispatch, props.match.params.companyId]);


    /*
    archive switch
    */
    const [showArchived, setshowArchived] = useState(false);

    const onChangeShowArchive = (checked: boolean) => {
        setshowArchived(checked);
        dispatch(getLocation(companyId, { is_active: !checked }));
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
    const [selectedLocation, setselectedLocation] = useState<any>();

    const setLocation = (location: any) => {
        setselectedLocation(location);
        setisopen(true);
    }

    /*
    close modal for after creating payment term
    */
    useEffect(() => {
        if (isLocationCreated || isLocationUpdated) {
            setisopen(false);
            dispatch(getLocation(props.match.params.companyId, { is_active: true }));
            setTimeout(() => {
                dispatch(reset());
            }, 10000);
        }
    }, [isLocationCreated, isLocationUpdated, dispatch, props.match.params.companyId]);

    /*
    re-fetch items when item deleted, archived, restored
    */
    useEffect(() => {
        if (isLocationDeleted || isLocationArchived || isLocationRestored) {
            dispatch(getLocation(props.match.params.companyId, { is_active: true }));

            if (isLocationRestored) {
                setshowArchived(false);
            }

            setTimeout(() => {
                dispatch(reset());
            }, 10000);
        }
    }, [isLocationDeleted, isLocationArchived, isLocationRestored, dispatch, props.match.params.companyId]);

    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/settings/${companyId}`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Locations')}</h1>
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
                            setselectedLocation(null);
                        }}>{t('Add Location')}</Button>
                    </Col>
                </Row>
            </div>

            {
                !isLocationFetched ?
                    <Loader />
                    :
                    <div>
                        <Card>
                            <Card.Body className="">
                                <div className="p-2">
                                    <Row>
                                        <Col lg={6} xs={12}>
                                            {
                                                /*location['results'].length > 0 ?
                                                    location['results'].map((loc, key) =>
                                                        <LocationCardItem location={loc}
                                                            key={key} companyId={companyId}
                                                            onArchiveDeleteAction={onArchiveDeleteAction}
                                                            onEditLocation={setLocation}
                                                        />
                                                    ) : <EmptyState showArchived={showArchived} />*/
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


            {isLocationCreated && (!isLocationDeleted && !isLocationRestored) ? <MessageAlert message={t('A new Location is created')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {isLocationDeleted && (!isLocationCreated && !isLocationRestored) ? <MessageAlert message={t('Selected Location is deleted')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {isLocationArchived ? <MessageAlert
                message={`${t('Location')} ${archiveUnarchiveItem.title} ${t('is archived. You can undo this action.')}`}
                iconWrapperClass="bg-primary text-white p-2 rounded-circle" iconClass="text-white"
                icon="archive" undo={true} onUndo={() => {
                    dispatch(restoreLocation(companyId, archiveUnarchiveItem.id))
                }}
            /> : null}

            {isLocationRestored ? <MessageAlert
                message={`${t('Location')} ${archiveUnarchiveItem.name} ${t('is restored. You can undo this action.')}`}
                iconWrapperClass="bg-primary text-white p-2 rounded-circle" iconClass="text-white"
                icon="archive" undo={true} onUndo={() => {
                    dispatch(archiveLocation(companyId, archiveUnarchiveItem.id))
                }}
            /> : null}


            {isOpen ? <AddEditLocation isOpen={isOpen} onClose={closeModal} companyId={companyId} location={selectedLocation} /> : null}
        </>
    );
}

export default withRouter(Location);
