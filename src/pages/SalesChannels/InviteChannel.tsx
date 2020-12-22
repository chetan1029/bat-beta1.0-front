import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card } from "react-bootstrap";
import { Link, withRouter, Redirect } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";

//actions
import { inviteVendor, getCompanyCategories } from "../../redux/actions";
import VendorInviteForm from "../Vendors/VendorInviteForm";



interface InviteChannelProps {
    match: any;
}
const InviteChannel = (props: InviteChannelProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const companyId = props.match.params.companyId;
    const categoryId = props.match.params.categoryId;

    useEffect(() => {
        dispatch(getCompanyCategories(companyId));
    }, [companyId, dispatch]);

    const { loading, inviteVendorError, isVendorInvited, vendorCategories } = useSelector((state: any) => ({
        loading: state.Company.Vendors.loading,
        inviteVendorError: state.Company.Vendors.inviteVendorError,
        isVendorInvited: state.Company.Vendors.isVendorInvited,
        vendorCategories: state.Company.Common.categories && state.Company.Common.categories.results ? state.Company.Common.categories.results : []
    }));

    const [companyInfo, setcompanyInfo] = useState<any>();

    const onCompanySubmit = (info: any) => {
        setcompanyInfo(info);
        const category = (vendorCategories || []).find(c => c['id'] + '' === categoryId + '');
        dispatch(inviteVendor(companyId, { ...info, invitation_type: 'vendor_invitation', "vendor_type": { "id": parseInt(categoryId), "name": category ? category['name'] : 'c' }, "job_title": "Vendor Admin" }));
    }

    const backUrl = `/sales/${companyId}/channels/${categoryId}`;

    return (
        <>
            {isVendorInvited ? <Redirect to={backUrl} /> : null}

            <div className="py-4 px-3">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={backUrl}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Add New Sales Channel')}</h1>
                        </div>
                    </Col>
                </Row>
            </div>

            <Card>
                <Card.Body className="p-4">
                    <div className="position-relative">
                        {loading ? <Loader /> : null}

                        <VendorInviteForm values={companyInfo} onSubmit={onCompanySubmit} />
                    </div>
                </Card.Body>
            </Card>

            {inviteVendorError ? <MessageAlert message={inviteVendorError} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-md" /> : null}
        </>
    );
}

export default withRouter(InviteChannel);