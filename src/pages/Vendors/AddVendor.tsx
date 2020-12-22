import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Badge } from "react-bootstrap";
import { Link, withRouter, Redirect } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";

//actions
import { addVendor } from "../../redux/actions";
import VendorForm from "./VendorForm";
import UserForm from "./UserForm";

/**
 * NOTE - Keeping this component in branch as a backup for future when we are ready to implement this two steps
 */

interface AddVendorProps {
    match: any;
}
const AddVendor = (props: AddVendorProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const companyId = props.match.params.companyId;
    const categoryId = props.match.params.categoryId;

    const { loading, createVendorError, isVendorAdded } = useSelector((state: any) => ({
        loading: state.Company.Vendors.loading,
        createVendorError: state.Company.Vendors.createVendorError,
        isVendorAdded: state.Company.Vendors.isVendorAdded
    }));

    const [userInfo, setUserInfo] = useState<any>(null);

    const onUserInfoSubmit = (info: any) => {
        setUserInfo(info);
        setselectedStep('companyInfo');
    }

    const [companyInfo, setcompanyInfo] = useState<any>();

    const onCompanySubmit = (info: any) => {
        setcompanyInfo(info);
        dispatch(addVendor(companyId, {
            ...info, country: info['country']['value'], company_type: {
                "category": categoryId
            },
            "user": userInfo
        }));
    }

    const [selectedStep, setselectedStep] = useState('userInfo');

    const backUrl = `/supply-chain/${companyId}/vendors/${categoryId}`;

    return (
        <>
            {isVendorAdded ? <Redirect to={backUrl} /> : null}

            <div className="py-4 px-3">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={backUrl}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Add New Vendor')}</h1>
                        </div>
                    </Col>
                </Row>
            </div>

            <Card>
                <Card.Body className="p-4">
                    <div className="position-relative">
                        {loading ? <Loader /> : null}

                        <Row className="mb-4">
                            <Col xs='auto'>
                                <Link to='#' onClick={() => setselectedStep('userInfo')}>
                                    <Badge variant='primary' className='step-indicator'>1</Badge>
                                    <span className="text-muted font-weight-semibold">{t('User Info')}</span>
                                </Link>
                            </Col>
                            <Col>
                                <Link to='#' onClick={() => {
                                    if (userInfo)
                                        setselectedStep('companyInfo')
                                }}>
                                    <Badge variant={selectedStep === 'companyInfo' ? 'primary' : 'muted'} className='step-indicator'>2</Badge>
                                    <span className="text-muted font-weight-semibold">{t('Vendor Info')}</span>
                                </Link>
                            </Col>
                        </Row>


                        {selectedStep === 'userInfo' ? <UserForm onSubmit={onUserInfoSubmit} values={userInfo} /> : <VendorForm email={userInfo ? userInfo['email'] : ''} values={companyInfo} onSubmit={onCompanySubmit} />}
                    </div>
                </Card.Body>
            </Card>

            {createVendorError ? <MessageAlert message={createVendorError} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-md" /> : null}
        </>
    );
}

export default withRouter(AddVendor);