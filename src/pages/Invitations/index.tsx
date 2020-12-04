import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import ConfirmMessage from "../../components/ConfirmMessage";
import RolePermDisplayName from "../../components/RolePermDisplayName";
import { useQuery } from "../../components/Hooks";

//actions
import { getInvitations, acceptInvitation, declineInvitation } from "../../redux/actions";


const EmptyState = () => {
    const { t } = useTranslation();
    return (
        <Card className="payment-terms-card mb-2">
            <Card.Body>
                <div className="p-2">
                    <h5 className="font-weight-normal my-0">{t('There are no invitations')}</h5>
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

interface InvitationsProps {
    match: any;
}
const Invitations = (props: InvitationsProps) => {
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
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <h1 className="m-0">{t('Invitations')}</h1>
                        </div>
                    </Col>
                </Row>
            </div>

            {loading ? <Loader /> : <div>
                <Card>
                    <Card.Body className="">
                        <div className="p-2">
                            <Row>
                                <Col lg={8} xs={12}>
                                    {
                                        invites && invites['results'].length > 0 ?
                                        invites['results'].map((invite: any, key: number) =>
                                                <InviteItem invite={invite} key={key} />
                                            ) : <EmptyState />
                                    }
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>

                {inviteAccepted ? <MessageAlert message={t('An invitation is accepted')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
                {inviteDeclined ? <MessageAlert message={t('An invitation is declined')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
            </div>
            }

        </>
    );
}

export default withRouter(Invitations);