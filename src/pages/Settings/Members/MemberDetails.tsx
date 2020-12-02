import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Media, Button, Table } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import classNames from "classnames";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UAParser } from 'ua-parser-js'


//components
import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader";
import MessageAlert from "../../../components/MessageAlert";
import DisplayDate from "../../../components/DisplayDate";
import DateFromNow from "../../../components/DateFromNow";
import avatarPlaceholder from "../../../assets/images/avatar-placeholder.jpg";

//actions
import { getMemberDetails, getAllRoles, editMember, resetMembers } from "../../../redux/actions";

import RolePermissions from "./RolePermissions";


const RecentAccess = ({ activities }) => {
    const { t } = useTranslation();

    const getAgent = (uvStr: string) => {
        const userAgent = new UAParser(uvStr);
        const name: string = userAgent.getBrowser()['name'];
        const os: string = userAgent.getOS()['name'];
        return `${name} (${os})`;
    }

    return <>
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <h3 className="my-0">{t('Recent Access')}</h3>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Table responsive>
                            <thead className="text-muted">
                                <tr>
                                    <th className="font-weight-semibold">{t('Signed in')}</th>
                                    <th className="font-weight-semibold">{t('Browser')}</th>
                                    <th className="font-weight-semibold">{t('IP Address')}</th>
                                    <th className="font-weight-semibold">{t('Near')}</th>
                                    <th className="font-weight-semibold">{t('Date')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(activities || []).map((a: any, idx: number) => {
                                    return <tr key={idx}>
                                        <td className="font-weight-semibold capitalize">
                                            {a['logged_in_at'] ? <DateFromNow dateStr={a['logged_in_at']} /> : '-'}
                                        </td>
                                        <td className="font-weight-semibold">
                                            {a['agent_info'] ? getAgent(a['agent_info']) : '-'}
                                        </td>
                                        <td className="font-weight-semibold">
                                            {a['ip'] || '-'}
                                        </td>
                                        <td className="font-weight-semibold">
                                            {a['location'] || '-'}
                                        </td>
                                        <td className="font-weight-semibold">
                                            {a['logged_in_at'] ? <DisplayDate dateStr={a['logged_in_at']} /> : '-'}
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </>;
}


const EditRolePermissions = ({ companyId, memberId, member }) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { roles } = useSelector((state: any) => ({
        roles: state.Common.roles
    }));


    useEffect(() => {
        dispatch(getAllRoles());
    }, [dispatch]);

    const [permissions, setpermissions] = useState<Array<string>>(member['user_permissions'] ? member['user_permissions'] : []);

    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            role: member['roles'] ? member['roles'][0] : "",
        },
        validationSchema: Yup.object({
            role: Yup.string().required(t('Role is required'))
        }),
        onSubmit: values => {
            if (permissions && permissions.length) {
                dispatch(editMember(companyId, memberId, { roles: [values['role']], user_permissions: permissions }));
            }
        },
    });

    return <>
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Form className="mt-0" noValidate onSubmit={validator.handleSubmit}>
                            <Form.Group className="">
                                {roles ? <>
                                    {Object.keys(roles).map((role: string, idx: number) => {
                                        return <RolePermissions role={role} permissions={roles[role]['permissions']}
                                            defaultSelectedPermissions={permissions}
                                            key={idx} selectedRole={validator.values.role}
                                            onSelectionRole={(r: string) => {
                                                validator.setFieldValue('role', r);
                                                setpermissions([]);
                                            }}
                                            onChange={(perms: any) => {
                                                setpermissions(perms);
                                            }} />
                                    })}
                                </> : null}

                                {validator.touched.role && validator.errors.role ? (
                                    <Form.Control.Feedback type="invalid" className="show">{validator.errors.role}</Form.Control.Feedback>
                                ) : null}

                                {validator.touched.role && permissions && !permissions.length ? (
                                    <Form.Control.Feedback type="invalid" className="show">{t('Permissions are required')}</Form.Control.Feedback>
                                ) : null}
                            </Form.Group>

                            <Form.Group className="mb-0 mt-4">
                                <Button variant="primary" type="submit" disabled={!member['is_active']}>{t('Submit')}</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </>
}


interface MemberDetailsProps {
    match: any;
}
const MemberDetails = (props: MemberDetailsProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { loading, member, isMemberEdited, editMemberError } = useSelector((state: any) => ({
        loading: state.Company.Members.loading,
        member: state.Company.Members.member,
        isMemberEdited: state.Company.Members.isMemberEdited,
        editMemberError: state.Company.Members.editMemberError,
    }));

    const companyId = props.match.params.companyId;
    const memberId = props.match.params.memberId;

    useEffect(() => {
        dispatch(resetMembers());
        if (companyId && memberId) {
            dispatch(getMemberDetails(companyId, memberId));
        }
    }, [dispatch, companyId, memberId]);


    const fullName = member ? member['user']['first_name'] + " " + member['user']['last_name'] : "";


    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/settings/${companyId}/members`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Member Profile')}</h1>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col>
                        <div className="position-relative">
                            {loading ? <Loader /> : null}
                            <Card>
                                <Card.Body className="p-0">


                                    {member ? <>
                                        <div className="p-4">
                                            <Row className="align-items-center">
                                                <Col lg={6}>
                                                    <Media className=''>
                                                        <img width={32} height={32} className={classNames("mr-3", "rounded-circle", "align-self-center", { "border": !member['user']['profile_picture'] })}
                                                            src={member['user']['profile_picture'] || avatarPlaceholder} alt="" />
                                                        <Media.Body>
                                                            <h6 className="text-muted my-0">{t('Full Name')}</h6>
                                                            <h5 className="my-0">{fullName}</h5>
                                                        </Media.Body>
                                                    </Media>
                                                </Col>
                                                <Col lg={6}>
                                                    <h3 className="my-0">{t('Member Activity')}</h3>
                                                </Col>
                                            </Row>

                                            <Row className="border-top mt-3">
                                                <Col lg={6}>
                                                    <div className="py-3">
                                                        <Row>
                                                            <Col lg={6}>
                                                                <h6 className="text-muted my-0 font-13">{t('Job Title')}</h6>
                                                                <h5 className="my-0 font-15">{member['job_title'] || "-"}</h5>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <h6 className="text-muted my-0 font-13">{t('Username')}</h6>
                                                                <h5 className="my-0 font-15">{member['user']['username'] || "-"}</h5>
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-3">
                                                            <Col lg={6}>
                                                                <h6 className="text-muted my-0 font-13">{t('Email Address')}</h6>
                                                                <h5 className="my-0 font-15">{member['user']['email'] || "-"}</h5>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <h6 className="text-muted my-0 font-13">{t('Phone Number')}</h6>
                                                                <h5 className="my-0 font-15">{member['user']['phone_number'] || "-"}</h5>
                                                            </Col>
                                                        </Row>

                                                        <Row className="mt-3">
                                                            <Col lg={6}>
                                                                <h6 className="text-muted my-0 font-13">{t('Language')}</h6>
                                                                <h5 className="my-0 font-15 capitalize">{member['user']['language'] || "-"}</h5>
                                                            </Col>
                                                            <Col lg={6}>
                                                                <h6 className="text-muted my-0 font-13">{t('Time Zone')}</h6>
                                                                <h5 className="my-0 font-15">{member['user']['timezone'] || "-"}</h5>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                </Col>

                                                <Col lg={6}>
                                                    <Row className="bg-light">
                                                        <Col lg={6}>
                                                            <div className="py-3">
                                                                <h6 className="text-muted my-0 font-13">{t('Register on')}</h6>
                                                                <h5 className="my-0 font-15">
                                                                    {member['user']['date_joined'] ? <DisplayDate dateStr={member['user']['date_joined']} /> : "-"}
                                                                </h5>
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="py-3">
                                                                <h6 className="text-muted my-0 font-13">{t('Last Login')}</h6>
                                                                <h5 className="my-0 font-15">
                                                                    {member['user']['last_login'] ? <DisplayDate dateStr={member['user']['last_login']} /> : "-"}
                                                                </h5>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>

                                    </> : null}

                                </Card.Body>
                            </Card>

                            <div className="mt-3">
                                {member ? <EditRolePermissions companyId={companyId} memberId={memberId} member={member} /> : null}
                            </div>

                            <div className="mt-3">
                                {member ? <RecentAccess activities={member['login_activities']} /> : null}
                            </div>
                        </div>
                    </Col>
                </Row>

                {editMemberError ? <MessageAlert message={editMemberError} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-md" /> : null}
                {isMemberEdited ? <MessageAlert message={t('A member is updated')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
            </div>
        </>
    );
}

export default withRouter(MemberDetails);