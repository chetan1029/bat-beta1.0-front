import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Media, Badge, Nav, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import classNames from "classnames";

//components
import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader";
import MessageAlert from "../../../components/MessageAlert";
import ConfirmMessage from "../../../components/ConfirmMessage";
import avatarPlaceholder from "../../../assets/images/avatar-placeholder.jpg";

//actions
import {
    getMembers, deleteMember, resetMembers, getCompanyInvitations, resendCompanyInvite,
    getCompanyPartners, archivePartner
} from "../../../redux/actions";
import DisplayDate from "../../../components/DisplayDate";


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


interface MemberItemProp {
    companyId: any,
    onDeleteMember: any,
    member: any,
    loggedInUser: any
}

const MemberItem = ({ member, companyId, onDeleteMember, loggedInUser }: MemberItemProp) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [selectedMemberForDelete, setselectedMemberForDelete] = useState<any>(null);

    const onDelete = () => {
        setselectedMemberForDelete(member);
        onDeleteMember(member);
    }

    const fullName = member ? member['user']['first_name'] + " " + member['user']['last_name'] : "";
    const you = loggedInUser && member['user']['username'] === loggedInUser['username'] ? true : false;

    return (<>
        <Row>
            <Col lg={12}>
                <Card className="mb-2">
                    <Card.Body className='p-0'>
                        <Media className='p-3'>
                            <img className={classNames("mr-3", "rounded-circle", "align-self-center", "img-sm", { "border": !member['user']['profile_picture'] })}
                                src={member['user']['profile_picture'] || avatarPlaceholder} alt="" />
                            <Media.Body>
                                <h6 className="text-muted my-0">{fullName}</h6>
                                <h5 className="my-0">{member['user']['email']}</h5>
                            </Media.Body>

                            {!you ? <Link to={`/settings/${companyId}/members/${member.id}`} className='btn btn-link px-0 font-weight-semibold'>
                                <Icon name="notes" className="text-primary mr-1"></Icon>
                                {t('Show Details')}
                            </Link> : null}
                        </Media>

                        <div className="p-3 border-top">
                            <Row>
                                <Col>
                                    {member['job_title'] ? <Badge variant='outline-primary' pill className='capitalize mr-2 font-14'>{member['job_title'].split('_').join(' ')}</Badge> : null}
                                </Col>
                                {member['is_active'] && !you ? <Col className="text-right">
                                    <Link to="#" onClick={onDelete}><Icon name="archive" className="ml-2 svg-outline-danger" /></Link>
                                </Col> : null}
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        {selectedMemberForDelete ? <ConfirmMessage message={`Are you sure you want to archive ${fullName}?`} onConfirm={() => {
            dispatch(deleteMember(companyId, selectedMemberForDelete.id));
        }} onClose={() => setselectedMemberForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Archive')}></ConfirmMessage> : null}
    </>
    )
}


const InvitationItem = ({ companyId, invite }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const fullName = invite ? invite['user_detail']['first_name'] + " " + invite['user_detail']['last_name'] : "";


    return (<>
        <Row>
            <Col lg={12}>
                <Card className="mb-2">
                    <Card.Body className='p-0'>
                        <Media className='p-3'>
                            <Media.Body>
                                <h6 className="text-muted my-0">{fullName}</h6>
                                <h5 className="my-0">{invite['email']}</h5>
                            </Media.Body>

                            <div className="ml-auto">
                                {invite && invite['created'] ? <DisplayDate dateStr={invite['created']} /> : null}
                            </div>
                        </Media>

                        <div className="p-3 border-top">
                            <Row>
                                <Col>
                                    {invite && invite['user_detail']['job_title'] ? <Badge variant='outline-primary' pill className='capitalize mr-2 font-14'>{invite['user_detail']['job_title'].split('_').join(' ')}</Badge> : null}
                                </Col>
                                <Col className="text-right">
                                    <Button variant="primary" size="sm" onClick={() => {
                                        dispatch(resendCompanyInvite(companyId, invite.id));
                                    }}>{t('Resend')}</Button>
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>
    )
}


const PartnerItem = ({ companyId, partner }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const partnerDetails = partner['details'];

    const [selectedPartnerForArchive, setselectedPartnerForArchive] = useState<any>(null);

    const onArchive = () => {
        setselectedPartnerForArchive(partner);
    }

    return (<>
        <Row>
            <Col lg={12}>
                <Card className="mb-2">
                    <Card.Body className='p-0'>
                        <Media className='p-3'>
                            <Media.Body>
                                <h6 className="text-muted my-0">{t('name')}</h6>
                                <h5 className="my-0">{partnerDetails['name']}</h5>
                            </Media.Body>


                            <div className="ml-auto">
                                {partner && partner['create_date'] ? <DisplayDate dateStr={partner['create_date']} /> : null}
                            </div>
                        </Media>

                        <div className="p-3 border-top">
                            <Row>
                                <Col xs={6} lg={2} className='align-self-center'>
                                    <Badge variant='outline-primary' pill className='capitalize mr-2 font-14'>{partner['company_type']}</Badge>
                                </Col>
                                <Col xs={6} lg={2}>
                                    <h6 className="m-0 text-muted font-weight-bold">{t('Abbreviation')}</h6>
                                    <h6 className="m-0 font-weight-bold">
                                        {partnerDetails['abbreviation']}
                                    </h6>
                                </Col>
                                <Col xs={6} lg={4}>
                                    <h6 className="m-0 text-muted font-weight-bold">{t('Contact Info')}</h6>
                                    <h6 className="m-0 font-weight-bold">
                                        {partnerDetails['email'] + partnerDetails['phone_number'] ? " - " + partnerDetails['phone_number'] : ""}
                                    </h6>
                                </Col>
                                <Col xs={6} lg={4}>
                                    <h6 className="m-0 text-muted font-weight-bold">{t('Address')}</h6>
                                    <h6 className="m-0 font-weight-bold">
                                        {partnerDetails['address1']}{partnerDetails['city'] ? <>&nbsp;{partnerDetails['city']}</> : null}
                                        {partnerDetails['state'] ? <>&nbsp;{partnerDetails['state']}</> : null}
                                        {partnerDetails['country'] ? <>&nbsp;{partnerDetails['country']}</> : null}
                                    </h6>
                                </Col>
                            </Row>
                        </div>
                        <div className="p-3 border-top">
                            <Row>
                                {partner['is_active'] ? <Col className="text-right">
                                    <Link to="#" onClick={onArchive}><Icon name="archive" className="ml-2 svg-outline-danger" /></Link>
                                </Col> : null}
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        {selectedPartnerForArchive ? <ConfirmMessage message={`Are you sure you want to archive ${selectedPartnerForArchive['details']['name']}?`} onConfirm={() => {
            dispatch(archivePartner(companyId, selectedPartnerForArchive.id));
        }} onClose={() => setselectedPartnerForArchive(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Archive')}></ConfirmMessage> : null}
    </>
    )
}


const TabMenu = ({ onChange, selectedView }) => {
    const { t } = useTranslation();

    return <div className="px-2 pb-2 mb-4">
        <Nav variant="tabs" className="nav-bordered m-0" activeKey={selectedView} onSelect={onChange} as='ul'>
            <Nav.Item as="li">
                <Nav.Link className="pt-1" eventKey="members">{t('Members')}</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link className="pt-1" eventKey="partners">{t('Partners')}</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link className="pt-1" eventKey="invitations">{t('Invitations')}</Nav.Link>
            </Nav.Item>
        </Nav>
    </div>
}

interface MembersProps {
    match: any;
}
const Members = (props: MembersProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const memberFilters = useMemo(() => ({
        is_active: true,
        'fields!': 'user_permissions,invitation_accepted,invited_by,extra_data,login_activities',
        limit: 100000000
    }), []);

    const { loading, isMembersFetched, members, loggedInUser, isMemberCreated,
        isMemberDeleted, invitations, isInvitationsFetched, isPartnerArchived,
        isPartnersFetched, partners } = useSelector((state: any) => ({
            loading: state.Company.Members.loading,
            isMembersFetched: state.Company.Members.isMembersFetched,
            isMemberCreated: state.Company.Members.isMemberCreated,
            isMemberDeleted: state.Company.Members.isMemberDeleted,
            members: state.Company.Members.members,
            invitations: state.Company.Members.invitations,
            isInvitationsFetched: state.Company.Members.isInvitationsFetched,
            loggedInUser: state.Auth.user,
            isPartnersFetched: state.Company.Members.isPartnersFetched,
            partners: state.Company.Members.partners,
            isPartnerArchived: state.Company.Members.isPartnerArchived,
        }));

    const companyId = props.match.params.companyId;

    const [selectedView, setselectedView] = useState<any>("members");

    useEffect(() => {
        if (companyId) {
            if (selectedView === 'members') {
                dispatch(getMembers(companyId, memberFilters));
            } else if (selectedView === 'partners') {
                dispatch(getCompanyPartners(companyId, { 'limit': 100000000, is_active: true }));
            }
            else {
                dispatch(getCompanyInvitations(companyId, { 'is_accepted': false, 'limit': 100000000 }));
            }
        }
    }, [dispatch, companyId, selectedView, memberFilters]);

    useEffect(() => {
        if (companyId && selectedView === 'members' && (isMemberCreated || isMemberDeleted)) {
            dispatch(getMembers(companyId, memberFilters));
            setTimeout(() => {
                dispatch(resetMembers());
            }, 3000);
        }
    }, [dispatch, companyId, isMemberCreated, isMemberDeleted, selectedView, memberFilters]);

    useEffect(() => {
        if (companyId && selectedView === 'partners' && isPartnerArchived) {
            dispatch(getCompanyPartners(companyId, { 'limit': 100000000, is_active: true }));
            setTimeout(() => {
                dispatch(resetMembers());
            }, 3000);
        }
    }, [dispatch, companyId, isPartnerArchived, selectedView]);


    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/settings/${companyId}`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>

                            {selectedView === 'members' ? <>
                                <h1 className="m-0">{t('Staff members')}</h1>
                            </> : <>
                                    <h1 className="m-0">{selectedView === 'partners' ? t('Partners') : t('Invitations')}</h1>
                                </>}
                        </div>
                    </Col>
                    <Col className="text-right">
                        <Link to={`/settings/${companyId}/members/add`} className="btn btn-primary">{t('Invite New Member')}</Link>
                    </Col>
                </Row>
            </div>

            <Card>
                <Card.Body className="">

                    <TabMenu onChange={setselectedView} selectedView={selectedView} />

                    {selectedView === 'members' ? <>

                        {loading ? <Loader /> : <div>
                            <div className="px-2">
                                <Row>
                                    <Col lg={6} xs={12}>
                                        {isMembersFetched ? <>
                                            {
                                                members['results'].length > 0 ?
                                                    members['results'].map((member: any, key: number) =>
                                                        <MemberItem member={member}
                                                            key={key} companyId={companyId}
                                                            loggedInUser={loggedInUser}
                                                            onDeleteMember={(m: any) => { }}
                                                        />
                                                    ) : <EmptyState message={t('There are no active members')} />
                                            }
                                        </> : null}
                                    </Col>
                                    <Col lg={6} xs={12}>
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

                            {isMemberCreated ? <MessageAlert message={t('A new member is invited')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

                            {isMemberDeleted ? <MessageAlert message={t('The member is deleted')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
                        </div>}
                    </> :
                        <>
                            {selectedView !== 'partners' ? <>

                                {loading ? <Loader /> : <div>
                                    <div className="px-2">
                                        <Row>
                                            <Col lg={8} xs={12}>
                                                {isInvitationsFetched ? <>
                                                    {
                                                        invitations && invitations['results'].length > 0 ?
                                                            invitations['results'].map((invite: any, key: number) => <InvitationItem invite={invite} companyId={companyId} key={key} />) : <EmptyState message={t('There are no pending invitations')} />
                                                    }</> : null}
                                            </Col>
                                        </Row>
                                    </div>
                                </div>}
                            </> : <>

                                    {loading ? <Loader /> : <div>
                                        <div className="px-2">
                                            <Row>
                                                <Col lg={8} xs={12}>
                                                    {isPartnersFetched ? <>
                                                        {
                                                            partners && partners['results'].length > 0 ?
                                                                partners['results'].map((partner: any, key: number) => <PartnerItem partner={partner} companyId={companyId} key={key} />) : <EmptyState message={t('There are no active partners')} />
                                                        }</> : null}
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>}

                                </>}
                        </>}
                </Card.Body>
            </Card>

            {isPartnerArchived ? <MessageAlert message={t('A partner is archived')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
        </>
    );
}

export default withRouter(Members);
