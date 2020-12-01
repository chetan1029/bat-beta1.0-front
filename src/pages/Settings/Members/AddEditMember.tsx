import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Button, Collapse } from "react-bootstrap";
import { Link, withRouter, Redirect } from "react-router-dom";
import { useTranslation } from 'react-i18next';
//plug-ins
import { useFormik } from 'formik';
import * as Yup from 'yup';

//components
import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader"
import JobTitleDropdown from "../../../components/JobTitleDropdown";
import MessageAlert from "../../../components/MessageAlert";

//actions
import { createMember, getAllRoles, resetMembers } from "../../../redux/actions";

const getFriendlyName = (value: string) => {
    return value.split('_').join(' ');
}

const chunk = (arr: Array<any>, chunkSize: number) => {
    if (chunkSize <= 0) return arr;
    let res:Array<any> = [];
    for (var i = 0, len = arr.length; i < len; i += chunkSize)
        res.push(arr.slice(i, i + chunkSize));
    return res;
}
interface RolePermissionsProps {
    role: string,
    permissions: Array<string>,
    onChange: any,
    selectedRole: string,
    onSelectionRole: any
}

const RolePermissions = ({ role, permissions, selectedRole, onSelectionRole, onChange }: RolePermissionsProps) => {
    const selected: boolean = selectedRole && role && selectedRole === role ? true : false;

    const [open, setOpen] = useState(selected);
    const { t } = useTranslation();

    useEffect(() => {
        const op = selectedRole && role && selectedRole === role ? true : false;
        setOpen(op);
        if (!op) {
            setselectedPerms([]);
        }
    }, [selectedRole, role]);

    const permChunks: Array<any> = chunk(permissions, 3);

    const [selectedPerms, setselectedPerms] = useState<Array<any>>([]);
    const onSelectPerms = (e: any, perm: string) => {
        let modifiedSelection:Array<any> = [...selectedPerms];
        if (e.target.checked) {
            modifiedSelection.push(perm);
        } else {
            modifiedSelection = modifiedSelection.filter(p => p !== perm);
        }
        setselectedPerms(modifiedSelection);
        onChange(modifiedSelection);
    }

    return <>
        <Card className="mb-2">
            <Card.Body>
                <div className="d-flex">
                    <Form.Check type='radio' id={`role-${role}`} label={<span className='font-weight-bold capitalize'>{getFriendlyName(role)}</span>}
                        checked={selected}
                        onChange={(e: any) => { 
                            if (e.target.checked) {
                                onSelectionRole(role);
                            }
                        }} />
                    <span className="text-muted ml-3">({permissions.length} {t('permissions')})</span>

                    <Link to='#' onClick={() => setOpen(!open)} className='ml-auto'>
                        <Icon name={open ? "chevron-top": "chevron-down"} className="icon text-primary"></Icon>
                    </Link>
                </div>

                <Collapse in={open} className="mt-3">
                    <div className="bg-light p-3">
                        {(permChunks.map((chunk, idx) => {
                            return <Row key={idx} className="mb-2">
                                {chunk.map((perm: string, iidx: number) => {
                                    return <Col lg={4} key={`${idx}-p-${iidx}`}>
                                        <Form.Check type='checkbox' id={`perm-${idx}-i-${iidx}-${perm}`} label={<span className='capitalize'>{getFriendlyName(perm)}</span>}
                                            checked={selectedPerms.includes(perm)}
                                            onChange={(e: any) => onSelectPerms(e, perm)} />
                                    </Col>
                                })}
                            </Row>
                        }))}
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    </>;
}


interface AddEditMemberProps {
    match: any;
}

const AddEditMember = ({ match }: AddEditMemberProps) => {
    const { t } = useTranslation();

    const companyId = match.params.companyId;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRoles());
        dispatch(resetMembers());
    }, [dispatch]);

    const { loading, roles, isMemberCreated, createMemberError } = useSelector((state: any) => ({
        loading: state.Company.Members.loading | state.Common.loading,
        roles: state.Common.roles,
        isMemberCreated: state.Company.Members.isMemberCreated,
        createMemberError: state.Company.Members.createMemberError
    }));


    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            job_title: "",
            role: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(t('Email is required')),
            first_name: Yup.string().required(t('First Name is required')),
            last_name: Yup.string().required(t('Last Name is required')),
            job_title: Yup.object().required(t('Job Title is required')),
            role: Yup.string().required(t('Role is required'))
        }),
        onSubmit: values => {
            if (permissions && permissions.length) {
                // TODO - hard code
                dispatch(createMember(companyId, { ...values, invitation_type: 'member_invitation', job_title: values['job_title']['value'], permissions }));
            }
        },
    });

    const [permissions, setpermissions] = useState<any>([]);

    return (
        <>
            {isMemberCreated ? <Redirect to={`/settings/${companyId}/members`} /> : null}

            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/settings/${companyId}/members`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Add Staff Member')}</h1>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className='position-relative'>
                {loading ? <Loader /> : null}

                <Card>
                    <Card.Body className="">
                        <div className="p-2">
                            <Form className="mt-0" noValidate onSubmit={validator.handleSubmit}>
                                <h4 className="mt-0 mb-3">{t('Member Details')}</h4>

                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="usr">{t('First Name')}</Form.Label>
                                            <Form.Control type="text" className="form-control" id="first_name" name="first_name"
                                                placeholder={t('First Name')}
                                                onBlur={validator.handleBlur}
                                                value={validator.values.first_name}
                                                onChange={validator.handleChange}
                                                isInvalid={validator.touched.first_name && validator.errors && validator.errors.first_name ? true : false} />

                                            {validator.touched.first_name && validator.errors.first_name ? (
                                                <Form.Control.Feedback type="invalid">{validator.errors.first_name}</Form.Control.Feedback>
                                            ) : null}
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="usr">{t('Last Name')}</Form.Label>
                                            <Form.Control type="text" className="form-control" id="last_name" name="last_name"
                                                placeholder={t('Last Name')}
                                                onBlur={validator.handleBlur}
                                                value={validator.values.last_name}
                                                onChange={validator.handleChange}
                                                isInvalid={validator.touched.last_name && validator.errors && validator.errors.last_name ? true : false} />

                                            {validator.touched.last_name && validator.errors.last_name ? (
                                                <Form.Control.Feedback type="invalid">{validator.errors.last_name}</Form.Control.Feedback>
                                            ) : null}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="usr">{t('Job Title')}</Form.Label>
                                            <JobTitleDropdown name='job_title' placeholder={t('Job Title')} className={validator.touched.job_title && validator.errors.job_title ? "is-invalid" : ""}
                                                onChange={(value) => validator.setFieldValue('job_title', value)}
                                                value={validator.values.job_title} />

                                            {validator.touched.job_title && validator.errors.job_title ? (
                                                <Form.Control.Feedback type="invalid">{validator.errors.job_title}</Form.Control.Feedback>
                                            ) : null}
                                        </Form.Group>
                                    </Col>

                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-4">
                                            <Form.Label htmlFor="usr">{t('Email')}</Form.Label>
                                            <Form.Control type="email" className="form-control" id="email" name="email"
                                                placeholder={t('Email')}
                                                onBlur={validator.handleBlur}
                                                value={validator.values.email}
                                                onChange={validator.handleChange}
                                                isInvalid={validator.touched.email && validator.errors && validator.errors.email ? true : false} />

                                            {validator.touched.email && validator.errors.email ? (
                                                <Form.Control.Feedback type="invalid">{validator.errors.email}</Form.Control.Feedback>
                                            ) : null}
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <h4 className="mt-0 mb-3">{t('Permissions')}</h4>

                                <Row>
                                    <Col>
                                        <Form.Group className="">
                                            {roles ? <>
                                                {Object.keys(roles).map((role: string, idx: number) => {
                                                    return <RolePermissions role={role} permissions={roles[role]['permissions']}
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
                                    </Col>
                                </Row>

                                <Form.Group className="mb-0 mt-4">
                                    <Button variant="primary" type="submit">{t('Submit')}</Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>

                {createMemberError ? <MessageAlert message={createMemberError} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-md" /> : null}
            </div>
        </>
    );
}

export default withRouter(AddEditMember);