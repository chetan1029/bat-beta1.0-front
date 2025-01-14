import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Button, Media } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";
import AddEditBank from "./AddEditBank";

//actions
import { getBank, deleteBank, archiveBank, restoreBank, resetBank } from "../../redux/actions";

import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import ConfirmMessage from "../../components/ConfirmMessage";

interface BankCardItemProps {
    bank: any;
    onArchiveDeleteAction: any;
    onEditBank: any;
    companyId: any;
}

const EmptyState = ({ showArchived }) => {
    const { t } = useTranslation();
    return (
        <Card className="mb-2">
            <Card.Body>
                <div className="p-2">
                    {showArchived ? <h5 className="font-weight-normal my-0">{t('There are no archived bank available')}</h5> : <h5 className="font-weight-normal my-0">{t('There are no bank available')}</h5>}
                </div>
            </Card.Body>
        </Card>
    )
}

const BankCardItem = ({ bank, onArchiveDeleteAction, onEditBank, companyId }: BankCardItemProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [selectedTermForDelete, setselectedTermForDelete] = useState<any>(null);

    /*
    delete Bank
    */
    const onDeleteBank = (id: any) => {
        onArchiveDeleteAction(bank);
        setselectedTermForDelete(bank);
    }

    const onClickArchiveUnArchive = (action: boolean) => {
        if (action) {
            dispatch(restoreBank(companyId, bank.id));
        } else {
            dispatch(archiveBank(companyId, bank.id));
        }
        onArchiveDeleteAction(bank);
    }

    return (<>
        <Row>
            <Col lg={12}>
                <Card className="mb-2">
                    <Link to="#" onClick={() => onEditBank(bank)} className="card-link">
                        <Card.Header>
                            <p className="m-0 text-muted">{t('Bank Name')}</p>
                            <h6 className="m-0">{bank.name}</h6>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col xs={6} lg={4}>
                                    <p className="m-0 text-muted">{t('Benificary name')}</p>
                                    <p className="m-0">{bank.benificary}</p>
                                </Col>
                                <Col xs={6} lg={4}>
                                    <p className="m-0 text-muted">{t('Account number')}</p>
                                    <p className="m-0">{bank.account_number}</p>
                                </Col>
                                <Col xs={6} lg={4}>
                                    <p className="m-0 text-muted">{t('Currency Accepted')}</p>
                                    <p className="m-0">{bank.currency.join(", ")}</p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Link>
                    <Card.Footer>
                        <div className="float-right">
                            <div className="d-flex align-items-center">
                                {
                                    !bank.is_active ?
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(true)}><Icon name="un-archive" className="svg-outline-primary mr-2" /></Link> :
                                        <Link to="#" onClick={() => onClickArchiveUnArchive(false)}><Icon name="archive" className="svg-outline-warning mr-2" /></Link>
                                }
                                <Link to="#" onClick={() => onDeleteBank(bank.id)}><Icon name="delete" className="ml-2 svg-outline-danger" /></Link>

                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        {selectedTermForDelete ? <ConfirmMessage message={`Are you sure you want to delete ${selectedTermForDelete.title}?`} onConfirm={() => {
            dispatch(deleteBank(companyId, selectedTermForDelete.id));
        }} onClose={() => setselectedTermForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Delete')}></ConfirmMessage> : null}
    </>
    )
}

interface BankProps {
    match: any;
}
const Bank = (props: BankProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { banks, isBankFetched, isBankCreated, isBankUpdated, isBankDeleted, isBankArchived, isBankRestored } = useSelector((state: any) => ({
        banks: state.Company.Bank.banks,

        //flags
        isBankFetched: state.Company.Bank.isBankFetched,
        isBankCreated: state.Company.Bank.isBankCreated,
        isBankUpdated: state.Company.Bank.isBankUpdated,
        isBankDeleted: state.Company.Bank.isBankDeleted,
        isBankArchived: state.Company.Bank.isBankArchived,
        isBankRestored: state.Company.Bank.isBankRestored
    }));

    const companyId = props.match.params.companyId;
    /*
    bank
    */
    useEffect(() => {
        const companyId = props.match.params.companyId;
        if (companyId) {
            dispatch(getBank(companyId, { is_active: true }));
        }
    }, [dispatch, props.match.params.companyId]);


    /*
    archive switch
    */
    const [showArchived, setshowArchived] = useState(false);

    const onChangeShowArchive = (checked: boolean) => {
        setshowArchived(checked);
        dispatch(getBank(companyId, { is_active: !checked }));
    }

    /*
    alert
    */
    const [archiveUnarchiveItem, setarchiveUnarchiveItem] = useState<any>(null);

    /*
    to display alert and set title
    */
    const onArchiveDeleteAction = (bank: any) => {
        setarchiveUnarchiveItem(bank);
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
        dispatch(resetBank());
    }

    /*
        bank
    */
    const [selectedBank, setselectedBank] = useState<any>();

    const setBank = (bank: any) => {
        setselectedBank(bank);
        setisopen(true);
    }

    /*
    close modal for after creating bank
    */
    useEffect(() => {
        if (isBankCreated || isBankUpdated) {
            setisopen(false);
            dispatch(getBank(props.match.params.companyId, { is_active: true }));
            setTimeout(() => {
                dispatch(resetBank());
            }, 10000);
        }
    }, [isBankCreated, isBankUpdated, dispatch, props.match.params.companyId]);

    /*
    re-fetch items when item deleted, archived, restored
    */
    useEffect(() => {
        if (isBankDeleted || isBankArchived || isBankRestored) {
            dispatch(getBank(props.match.params.companyId, { is_active: !showArchived }));


            setTimeout(() => {
                dispatch(resetBank());
            }, 10000);
        }
    }, [isBankDeleted, isBankArchived, isBankRestored, dispatch, props.match.params.companyId, showArchived]);

    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/settings/${companyId}`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Banks')}</h1>
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
                            setselectedBank(null);
                        }}>{t('Add Bank')}</Button>
                    </Col>
                </Row>
            </div>

            {
                !isBankFetched ?
                    <Loader />
                    :
                    <div>
                        <Card>
                            <Card.Body className="">
                                <div className="p-2">
                                    <Row>
                                        <Col lg={6} xs={12}>
                                            {
                                                banks['results'].length > 0 ?
                                                    banks['results'].map((bank, key) =>
                                                        <BankCardItem bank={bank}
                                                            key={key} companyId={companyId}
                                                            onArchiveDeleteAction={onArchiveDeleteAction}
                                                            onEditBank={setBank}
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


            {isBankCreated && (!isBankDeleted && !isBankRestored) ? <MessageAlert message={t('A new Bank is created')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {isBankDeleted && (!isBankCreated && !isBankRestored) ? <MessageAlert message={t('Selected Bank is deleted')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {isBankArchived ? <MessageAlert
                message={`${t('Bank')} ${archiveUnarchiveItem.name} ${t('is archived. You can undo this action.')}`}
                iconWrapperClass="bg-warning text-white p-2 rounded-circle" iconClass="svg-outline-white"
                icon="archive" undo={true} onUndo={() => {
                    dispatch(restoreBank(companyId, archiveUnarchiveItem.id))
                }}
            /> : null}

            {isBankRestored ? <MessageAlert
                message={`${t('Bank')} ${archiveUnarchiveItem.name} ${t('is restored. You can undo this action.')}`}
                iconWrapperClass="bg-primary text-white p-2 rounded-circle" iconClass="svg-outline-white"
                icon="un-archive" undo={true} onUndo={() => {
                    dispatch(archiveBank(companyId, archiveUnarchiveItem.id))
                }}
            /> : null}


            {isOpen ? <AddEditBank isOpen={isOpen} onClose={closeModal} companyId={companyId} bank={selectedBank} /> : null}
        </>
    );
}

export default withRouter(Bank);
