import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Button, Media } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";
import AddEditHscode from "./AddEditHscode";

//actions
import { getHscode, deleteHscode, archiveHscode, restoreHscode, reset } from "../../redux/actions";

import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import ConfirmMessage from "../../components/ConfirmMessage";
import { COUNTRIES } from "../../constants";
interface HscodeCardItemProps {
    hscode: any;
    onArchiveDeleteAction: any;
    onEditHscode: any;
    companyId: any;
}

const EmptyState = ({ showArchived }) => {
    const { t } = useTranslation();
    return (
        <Card className="payment-terms-card mb-2">
            <Card.Body>
                <div className="p-2">
                    {showArchived ? <h5 className="font-weight-normal my-0">{t('There are no archived HsCode available')}</h5> : <h5 className="font-weight-normal my-0">{t('There are no HsCode available')}</h5>}
                </div>
            </Card.Body>
        </Card>
    )
}

const HscodeCardItem = ({ hscode, onArchiveDeleteAction, onEditHscode, companyId }: HscodeCardItemProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [selectedTermForDelete, setselectedTermForDelete] = useState<any>(null);

    /*
    delete Hscode
    */
    const onDeleteHscode = (id: any) => {
        onArchiveDeleteAction(hscode);
        setselectedTermForDelete(hscode);
    }

    const onClickArchiveUnArchive = (action: boolean) => {
        if (action) {
            dispatch(restoreHscode(companyId, hscode.id));
        } else {
            dispatch(archiveHscode(companyId, hscode.id));
        }
        onArchiveDeleteAction(hscode);
    }

    return (<>
        <Row>
            <Col lg={12}>
                <Card className="mb-2">
                    <Link to="#" onClick={() => onEditHscode(hscode)} className="card-link">
                        <Card.Header className="payment-card-title">
                            <p className="m-0 text-muted">{t('Hscode')}</p>
                            <h6 className="m-0">{hscode.hscode}</h6>
                        </Card.Header>
                        <Card.Body>
                          <Row>
                              <Col lg={6}>
                                <p className="m-0 text-muted">{t('Material')}</p>
                                <p className="m-0">{hscode.material}</p>
                              </Col>
                              <Col lg={6}>
                                <p className="m-0 text-muted">{t('Use')}</p>
                                <p className="m-0">{hscode.use}</p>
                              </Col>
                          </Row>
                        </Card.Body>
                    </Link>
                    <Card.Footer>
                        <div className="float-right">
                            <div className="d-flex align-items-center">
                                {
                                    !hscode.is_active ?
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(true)}><Icon name="un-archive" className="svg-outline-primary mr-2" /></Link> :
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(false)}><Icon name="archive" className="svg-outline-warning mr-2" /></Link>
                                }
                                <Link to="#" onClick={() => onDeleteHscode(hscode.id)}><Icon name="delete" className="ml-2 svg-outline-danger" /></Link>

                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        {selectedTermForDelete ? <ConfirmMessage message={`Are you sure you want to delete ${selectedTermForDelete.title}?`} onConfirm={() => {
            dispatch(deleteHscode(companyId, selectedTermForDelete.id));
        }} onClose={() => setselectedTermForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Delete')}></ConfirmMessage> : null}
    </>
    )
}

interface HscodeProps {
    match: any;
}
const Hscode = (props: HscodeProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { hscodes, isHscodeFetched, isHscodeCreated, isHscodeUpdated, isHscodeDeleted, isHscodeArchived, isHscodeRestored } = useSelector((state: any) => ({
        hscodes: state.Company.Hscode.hscodes,

        //flags
        isHscodeFetched: state.Company.Hscode.isHscodeFetched,
        isHscodeCreated: state.Company.Hscode.isHscodeCreated,
        isHscodeUpdated: state.Company.Hscode.isHscodeUpdated,
        isHscodeDeleted: state.Company.Hscode.isHscodeDeleted,
        isHscodeArchived: state.Company.Hscode.isHscodeArchived,
        isHscodeRestored: state.Company.Hscode.isHscodeRestored
    }));

    const companyId = props.match.params.companyId;
    /*
    hscode
    */
    useEffect(() => {
        const companyId = props.match.params.companyId;
        if (companyId) {
            dispatch(getHscode(companyId, { is_active: true }));
        }
    }, [dispatch, props.match.params.companyId]);


    /*
    archive switch
    */
    const [showArchived, setshowArchived] = useState(false);

    const onChangeShowArchive = (checked: boolean) => {
        setshowArchived(checked);
        dispatch(getHscode(companyId, { is_active: !checked }));
    }

    /*
    alert
    */
    const [archiveUnarchiveItem, setarchiveUnarchiveItem] = useState<any>(null);

    /*
    to display alert and set title
    */
    const onArchiveDeleteAction = (hscode: any) => {
        setarchiveUnarchiveItem(hscode);
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
        hscode
    */
    const [selectedHscode, setselectedHscode] = useState<any>();

    const setHscode = (hscode: any) => {
        setselectedHscode(hscode);
        setisopen(true);
    }

    /*
    close modal for after creating hscode
    */
    useEffect(() => {
        if (isHscodeCreated || isHscodeUpdated) {
            setisopen(false);
            dispatch(getHscode(props.match.params.companyId, { is_active: true }));
            setTimeout(() => {
                dispatch(reset());
            }, 10000);
        }
    }, [isHscodeCreated, isHscodeUpdated, dispatch, props.match.params.companyId]);

    /*
    re-fetch items when item deleted, archived, restored
    */
    useEffect(() => {
        if (isHscodeDeleted || isHscodeArchived || isHscodeRestored) {
            dispatch(getHscode(props.match.params.companyId, { is_active: true }));

            if (isHscodeRestored) {
                setshowArchived(false);
            }

            setTimeout(() => {
                dispatch(reset());
            }, 10000);
        }
    }, [isHscodeDeleted, isHscodeArchived, isHscodeRestored, dispatch, props.match.params.companyId]);

    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/settings/${companyId}`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Hscodes')}</h1>
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
                            setselectedHscode(null);
                        }}>{t('Add Hscode')}</Button>
                    </Col>
                </Row>
            </div>

            {
                !isHscodeFetched ?
                    <Loader />
                    :
                    <div>
                        <Card>
                            <Card.Body className="">
                                <div className="p-2">
                                    <Row>
                                        <Col lg={6} xs={12}>
                                            {
                                                hscodes['results'].length > 0 ?
                                                    hscodes['results'].map((hscode, key) =>
                                                        <HscodeCardItem hscode={hscode}
                                                            key={key} companyId={companyId}
                                                            onArchiveDeleteAction={onArchiveDeleteAction}
                                                            onEditHscode={setHscode}
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


            {isHscodeCreated && (!isHscodeDeleted && !isHscodeRestored) ? <MessageAlert message={t('A new Hscode is created')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {isHscodeDeleted && (!isHscodeCreated && !isHscodeRestored) ? <MessageAlert message={t('Selected Hscode is deleted')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {isHscodeArchived ? <MessageAlert
                message={`${t('Hscode')} ${archiveUnarchiveItem.hscode} ${t('is archived. You can undo this action.')}`}
                iconWrapperClass="bg-warning text-white p-2 rounded-circle" iconClass="svg-outline-white"
                icon="archive" undo={true} onUndo={() => {
                    dispatch(restoreHscode(companyId, archiveUnarchiveItem.id))
                }}
            /> : null}

            {isHscodeRestored ? <MessageAlert
                message={`${t('Hscode')} ${archiveUnarchiveItem.hscode} ${t('is restored. You can undo this action.')}`}
                iconWrapperClass="bg-primary text-white p-2 rounded-circle" iconClass="svg-outline-white"
                icon="un-archive" undo={true} onUndo={() => {
                    dispatch(archiveHscode(companyId, archiveUnarchiveItem.id))
                }}
            /> : null}


            {isOpen ? <AddEditHscode isOpen={isOpen} onClose={closeModal} companyId={companyId} hscode={selectedHscode} /> : null}
        </>
    );
}

export default withRouter(Hscode);
