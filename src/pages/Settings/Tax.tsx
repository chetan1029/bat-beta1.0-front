import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Button, Media } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";
import AddEditTax from "./AddEditTax";

//actions
import { getTax, deleteTax, archiveTax, restoreTax, reset } from "../../redux/actions";

import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import ConfirmMessage from "../../components/ConfirmMessage";
import { COUNTRIES } from "../../constants";
interface TaxCardItemProps {
    tax: any;
    onArchiveDeleteAction: any;
    onEditTax: any;
    companyId: any;
}

const EmptyState = ({ showArchived }) => {
    const { t } = useTranslation();
    return (
        <Card className="payment-terms-card mb-2">
            <Card.Body>
                <div className="p-2">
                    {showArchived ? <h5 className="font-weight-normal my-0">{t('There are no archived tax available')}</h5> : <h5 className="font-weight-normal my-0">{t('There are no tax available')}</h5>}
                </div>
            </Card.Body>
        </Card>
    )
}

const TaxCardItem = ({ tax, onArchiveDeleteAction, onEditTax, companyId }: TaxCardItemProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [selectedTermForDelete, setselectedTermForDelete] = useState<any>(null);

    /*
    delete Tax
    */
    const onDeleteTax = (id: any) => {
        onArchiveDeleteAction(tax);
        setselectedTermForDelete(tax);
    }

    const onClickArchiveUnArchive = (action: boolean) => {
        if (action) {
            dispatch(restoreTax(companyId, tax.id));
        } else {
            dispatch(archiveTax(companyId, tax.id));
        }
        onArchiveDeleteAction(tax);
    }

    return (<>
        <Row>
            <Col lg={12}>
                <Card className="payment-terms-card mb-2">
                    <Link to="#" onClick={() => onEditTax(tax)} className="payment-terms-link">
                        <Card.Header className="payment-card-title">
                            <div className="p-2">
                                <h6 className="m-0 text-muted font-weight-bold">{t('Tax')}</h6>
                                <h6 className="m-0 font-weight-bold">{COUNTRIES[tax.from_country]} to {COUNTRIES[tax.to_country]}</h6>
                            </div>
                        </Card.Header>
                        <Card.Body>
                          <Row>
                              <Col lg={6}>
                                <div className="p-2">
                                    <h6 className="m-0 text-muted font-weight-bold">{t('Custom Duty')}</h6>
                                    <h6 className="m-0 font-weight-bold">{tax.custom_duty}%</h6>
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="p-2">
                                    <h6 className="m-0 text-muted font-weight-bold">{t('VAT')}</h6>
                                    <h6 className="m-0 font-weight-bold">{tax.vat}%</h6>
                                </div>
                              </Col>
                          </Row>
                        </Card.Body>
                    </Link>
                    <Card.Footer className="payment-card-footer">
                        <div className="p-2 float-right">
                            <div className="d-flex align-items-center">
                                {
                                    !tax.is_active ?
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(true)}><Icon name="un-archive" className="svg-outline-primary mr-2" /></Link> :
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(false)}><Icon name="archive" className="svg-outline-warning mr-2" /></Link>
                                }
                                <Link to="#" onClick={() => onDeleteTax(tax.id)}><Icon name="delete" className="ml-2 svg-outline-danger" /></Link>

                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        {selectedTermForDelete ? <ConfirmMessage message={`Are you sure you want to delete ${selectedTermForDelete.title}?`} onConfirm={() => {
            dispatch(deleteTax(companyId, selectedTermForDelete.id));
        }} onClose={() => setselectedTermForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Delete')}></ConfirmMessage> : null}
    </>
    )
}

interface TaxProps {
    match: any;
}
const Tax = (props: TaxProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { taxs, isTaxFetched, isTaxCreated, isTaxUpdated, isTaxDeleted, isTaxArchived, isTaxRestored } = useSelector((state: any) => ({
        taxs: state.Company.Tax.taxs,

        //flags
        isTaxFetched: state.Company.Tax.isTaxFetched,
        isTaxCreated: state.Company.Tax.isTaxCreated,
        isTaxUpdated: state.Company.Tax.isTaxUpdated,
        isTaxDeleted: state.Company.Tax.isTaxDeleted,
        isTaxArchived: state.Company.Tax.isTaxArchived,
        isTaxRestored: state.Company.Tax.isTaxRestored
    }));

    const companyId = props.match.params.companyId;
    /*
    tax
    */
    useEffect(() => {
        const companyId = props.match.params.companyId;
        if (companyId) {
            dispatch(getTax(companyId, { is_active: true }));
        }
    }, [dispatch, props.match.params.companyId]);


    /*
    archive switch
    */
    const [showArchived, setshowArchived] = useState(false);

    const onChangeShowArchive = (checked: boolean) => {
        setshowArchived(checked);
        dispatch(getTax(companyId, { is_active: !checked }));
    }

    /*
    alert
    */
    const [archiveUnarchiveItem, setarchiveUnarchiveItem] = useState<any>(null);

    /*
    to display alert and set title
    */
    const onArchiveDeleteAction = (tax: any) => {
        setarchiveUnarchiveItem(tax);
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
        tax
    */
    const [selectedTax, setselectedTax] = useState<any>();

    const setTax = (tax: any) => {
        setselectedTax(tax);
        setisopen(true);
    }

    /*
    close modal for after creating tax
    */
    useEffect(() => {
        if (isTaxCreated || isTaxUpdated) {
            setisopen(false);
            dispatch(getTax(props.match.params.companyId, { is_active: true }));
            setTimeout(() => {
                dispatch(reset());
            }, 10000);
        }
    }, [isTaxCreated, isTaxUpdated, dispatch, props.match.params.companyId]);

    /*
    re-fetch items when item deleted, archived, restored
    */
    useEffect(() => {
        if (isTaxDeleted || isTaxArchived || isTaxRestored) {
            dispatch(getTax(props.match.params.companyId, { is_active: true }));

            if (isTaxRestored) {
                setshowArchived(false);
            }

            setTimeout(() => {
                dispatch(reset());
            }, 10000);
        }
    }, [isTaxDeleted, isTaxArchived, isTaxRestored, dispatch, props.match.params.companyId]);

    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/settings/${companyId}`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Taxs')}</h1>
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
                            setselectedTax(null);
                        }}>{t('Add Taxs')}</Button>
                    </Col>
                </Row>
            </div>

            {
                !isTaxFetched ?
                    <Loader />
                    :
                    <div>
                        <Card>
                            <Card.Body className="">
                                <div className="p-2">
                                    <Row>
                                        <Col lg={6} xs={12}>
                                            {
                                                taxs['results'].length > 0 ?
                                                    taxs['results'].map((tax, key) =>
                                                        <TaxCardItem tax={tax}
                                                            key={key} companyId={companyId}
                                                            onArchiveDeleteAction={onArchiveDeleteAction}
                                                            onEditTax={setTax}
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


            {isTaxCreated && (!isTaxDeleted && !isTaxRestored) ? <MessageAlert message={t('A new Tax is created')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {isTaxDeleted && (!isTaxCreated && !isTaxRestored) ? <MessageAlert message={t('Selected Tax is deleted')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {isTaxArchived ? <MessageAlert
                message={`${t('Tax')} ${archiveUnarchiveItem.tax} ${t('is archived. You can undo this action.')}`}
                iconWrapperClass="bg-warning text-white p-2 rounded-circle" iconClass="svg-outline-white"
                icon="archive" undo={true} onUndo={() => {
                    dispatch(restoreTax(companyId, archiveUnarchiveItem.id))
                }}
            /> : null}

            {isTaxRestored ? <MessageAlert
                message={`${t('Tax')} ${archiveUnarchiveItem.tax} ${t('is restored. You can undo this action.')}`}
                iconWrapperClass="bg-primary text-white p-2 rounded-circle" iconClass="svg-outline-white"
                icon="un-archive" undo={true} onUndo={() => {
                    dispatch(archiveTax(companyId, archiveUnarchiveItem.id))
                }}
            /> : null}


            {isOpen ? <AddEditTax isOpen={isOpen} onClose={closeModal} companyId={companyId} tax={selectedTax} /> : null}
        </>
    );
}

export default withRouter(Tax);
