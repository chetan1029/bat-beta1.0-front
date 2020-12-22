import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Media, Badge, Nav, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import ConfirmMessage from "../../components/ConfirmMessage";
import MessageAlert from "../../components/MessageAlert";
import RolePermDisplayName from "../../components/RolePermDisplayName";
import { useQuery } from "../../components/Hooks";


//actions
import { getClients, archiveClient, resetClients, getInvitations, acceptInvitation, declineInvitation } from "../../redux/actions";
import DisplayDate from "../../components/DisplayDate";


const EmptyState = ({ message }) => {

    return (
        <Card className="payment-terms-card mb-2">
            <Card.Body>
                <div className="p-2">
                    <h5 className="font-weight-normal my-0">{message}</h5>
                </div>
            </Card.Body>
        </Card>
    )
}

interface InvitationItemProp {
    invite: any
}

const InviteItem = ({ invite }: InvitationItemProp) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [selectedInviteForDelete, setselectedInviteForDelete] = useState<any>(null);

    const onReject = () => {
        setselectedInviteForDelete(invite);
    }

    const acceptInvite = () => {
        dispatch(acceptInvitation(invite.id));
    }


    return (<>
        <Row>
            <Col lg={12}>
                <Card className="mb-2">
                    <Card.Body className='p-0'>
                        <div className="p-3">
                            <Row>
                                <Col>
                                    <h6 className="text-muted my-0">{t('Company')}</h6>
                                    <h5 className="my-0">
                                        {invite['company_detail']['company_name']}
                                    </h5>
                                </Col>
                                <Col>
                                    <h6 className="text-muted my-0">{t('Role')}</h6>
                                    <h5 className="my-0">
                                        <RolePermDisplayName name={invite['user_roles']['role']} />
                                    </h5>
                                </Col>
                                <Col>
                                    <h6 className="text-muted my-0">{t('Job Title')}</h6>
                                    <h5 className="my-0">
                                        <RolePermDisplayName name={invite['user_detail']['job_title']} />
                                    </h5>
                                </Col>
                            </Row>
                        </div>

                        <div className="p-3 border-top text-right">
                            <Row>
                                <Col>
                                    <Button variant="outline-success" size="sm" className='mr-2' onClick={acceptInvite}>{t('Accept')}</Button>
                                    <Button variant="outline-danger" size="sm" onClick={onReject}>{t('Reject')}</Button>
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        {selectedInviteForDelete ? <ConfirmMessage message={`Are you sure you want to decline invite?`} onConfirm={() => {
            dispatch(declineInvitation(invite.id))
        }} onClose={() => setselectedInviteForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Reject')}></ConfirmMessage> : null}
    </>
    )
}


const TabMenu = ({ onChange, selectedView }) => {
    const { t } = useTranslation();

    return <div className="px-2 pb-2 mb-4">
        <Nav variant="tabs" className="nav-bordered m-0" activeKey={selectedView} onSelect={onChange} as='ul'>
            <Nav.Item as="li">
                <Nav.Link className="pt-1" eventKey="clients">{t('Clients')}</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link className="pt-1" eventKey="invitations">{t('Invitations')}</Nav.Link>
            </Nav.Item>
        </Nav>
    </div>
}

interface ClientItemProp {
    companyId: any,
    client: any,
}

const ClientItem = ({ companyId, client }: ClientItemProp) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const clientDetails = client['details'];

    const [selectedClientForArchive, setselectedClientForArchive] = useState<any>(null);

    const onArchive = () => {
        setselectedClientForArchive(client);
    }

    return (<>
        <Row>
            <Col lg={12}>
                <Card className="mb-2">
                    <Card.Body className='p-0'>
                        <Media className='p-3'>
                            <Media.Body>
                                <h6 className="text-muted my-0">{t('name')}</h6>
                                <h5 className="my-0">{clientDetails['name']}</h5>
                            </Media.Body>


                            <div className="ml-auto">
                                {client && client['create_date'] ? <DisplayDate dateStr={client['create_date']} /> : null}
                            </div>
                        </Media>

                        <div className="p-3 border-top">
                            <Row>
                                <Col xs={6} lg={2} className='align-self-center'>
                                    <Badge variant='outline-primary' pill className='capitalize mr-2 font-14'>{client['company_type']}</Badge>
                                </Col>
                                <Col xs={6} lg={2}>
                                    <h6 className="m-0 text-muted font-weight-bold">{t('Abbreviation')}</h6>
                                    <h6 className="m-0 font-weight-bold">
                                        {clientDetails['abbreviation']}
                                    </h6>
                                </Col>
                                <Col xs={6} lg={4}>
                                    <h6 className="m-0 text-muted font-weight-bold">{t('Contact Info')}</h6>
                                    <h6 className="m-0 font-weight-bold">
                                        {clientDetails['email'] + clientDetails['phone_number'] ? " - " + clientDetails['phone_number'] : ""}
                                    </h6>
                                </Col>
                                <Col xs={6} lg={4}>
                                    <h6 className="m-0 text-muted font-weight-bold">{t('Address')}</h6>
                                    <h6 className="m-0 font-weight-bold">
                                        {clientDetails['address1']}{clientDetails['city'] ? <>&nbsp;{clientDetails['city']}</> : null}
                                        {clientDetails['state'] ? <>&nbsp;{clientDetails['state']}</> : null}
                                        {clientDetails['country'] ? <>&nbsp;{clientDetails['country']}</> : null}
                                    </h6>
                                </Col>
                            </Row>
                        </div>
                        <div className="p-3 border-top">
                            <Row>
                                {client['is_active'] ? <Col className="text-right">
                                    <Link to="#" onClick={onArchive}><Icon name="archive" className="ml-2 svg-outline-danger" /></Link>
                                </Col> : null}
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        {selectedClientForArchive ? <ConfirmMessage message={`Are you sure you want to archive ${selectedClientForArchive['details']['name']}?`} onConfirm={() => {
            dispatch(archiveClient(companyId, selectedClientForArchive.id));
        }} onClose={() => setselectedClientForArchive(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Archive')}></ConfirmMessage> : null}
    </>
    )
}

const Invitations = (props) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { loading, invites, inviteAccepted, inviteDeclined } = useSelector((state: any) => ({
        loading: state.Invite.loading,
        invites: state.Invite.invitations,
        inviteAccepted: state.Invite.inviteAccepted,
        inviteDeclined: state.Invite.inviteDeclined,
    }));

    const query: any = useQuery();
    const inviteKey: string = query.get('inviteKey');

    useEffect(() => {
        if (inviteKey)
            dispatch(getInvitations({ 'limit': 100000000, inviteKey }));
        else
            dispatch(getInvitations({ 'limit': 100000000 }));
    }, [dispatch, inviteKey]);

    useEffect(() => {
        if (inviteAccepted || inviteDeclined) {
            dispatch(getInvitations({ 'limit': 100000000 }));
        }
    }, [inviteAccepted, inviteDeclined, dispatch]);


    return (
        <>
            {loading ? <Loader /> : <div>
                <div className="p-2">
                    <Row>
                        <Col lg={8} xs={12}>
                            {
                                invites && invites['results'].length > 0 ?
                                    invites['results'].map((invite: any, key: number) =>
                                        <InviteItem invite={invite} key={key} />
                                    ) : <EmptyState message={t('There are no invitations')} />
                            }
                        </Col>
                    </Row>
                </div>

                {inviteAccepted ? <MessageAlert message={t('An invitation is accepted')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
                {inviteDeclined ? <MessageAlert message={t('An invitation is declined')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
            </div>
            }

        </>
    );
}

interface ClientsProps {
    match: any;
}
const Clients = (props: ClientsProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [selectedView, setselectedView] = useState<any>("clients");

    const { loading, isClientsFetched, clients, isClientArchived } = useSelector((state: any) => ({
        loading: state.Company.Clients.loading,
        isClientsFetched: state.Company.Clients.isClientsFetched,
        clients: state.Company.Clients.clients,
        isClientArchived: state.Company.Clients.isClientArchived,
    }));

    const query: any = useQuery();
    const selectedViewQuery: string = query.get('selectedView');

    useEffect(() => {
        if (selectedViewQuery) {
            setselectedView(selectedViewQuery);
        }
    }, [dispatch, selectedViewQuery]);

    const companyId = props.match.params.companyId;

    const defaultParams = useMemo(() => ({ 'limit': 100000000, is_active: true }), []);

    useEffect(() => {
        if (companyId) {
            if (selectedView === 'clients' && !selectedViewQuery) {
                dispatch(getClients(companyId, defaultParams));
            }
        }
    }, [dispatch, companyId, selectedView, defaultParams, selectedViewQuery]);

    useEffect(() => {
        if (isClientArchived) {
            dispatch(getClients(companyId, defaultParams));

            setTimeout(() => {
                dispatch(resetClients());
            }, 3000);
        }
    }, [isClientArchived, dispatch, companyId, defaultParams]);

    return (
        <>
            <div className="py-4 px-3">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            {selectedView === 'clients' ? <>
                                <h1 className="m-0">{t('My Clients')}</h1>
                            </> : <>
                                    <h1 className="m-0">{t('Invitations')}</h1>
                                </>}
                        </div>
                    </Col>
                    <Col className="text-right"></Col>
                </Row>
            </div>

            <Card>
                <Card.Body className="">

                    <TabMenu onChange={setselectedView} selectedView={selectedView} />

                    {selectedView === 'clients' ? <>

                        {loading ? <Loader /> : <div>
                            <div className="px-2">
                                <Row>
                                    <Col lg={7} xs={12}>
                                        {isClientsFetched ? <>
                                            {
                                                clients['results'].length > 0 ?
                                                    clients['results'].map((client: any, key: number) =>
                                                        <ClientItem client={client}
                                                            key={key} companyId={companyId} />
                                                    ) : <EmptyState message={t('There are no clients')} />
                                            }
                                        </> : null}
                                    </Col>
                                    <Col lg={5} xs={12}>
                                        <div>
                                            <Media>
                                                <div className="pt-1">
                                                    <Icon name="info" className="icon icon-sm svg-outline-secondary" />
                                                </div>
                                                <Media.Body>
                                                    <div className="px-3">
                                                        <h2 className="m-0 mb-2">{t('Some explaination')}</h2>
                                                        <p className="text-wrap pb-0 text-muted">Some quick example text to build on the card title and make up the bulk
                                                            of the card's content.Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                                    </div>
                                                </Media.Body>
                                            </Media>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>}
                    </> : <>
                            <Invitations />
                        </>}
                </Card.Body>
            </Card>

            {isClientArchived ? <MessageAlert message={t('The client is archived successfully')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

        </>
    );
}

export default withRouter(Clients);