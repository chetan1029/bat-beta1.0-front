import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";

//actions
import { editVendor, getVendor, resetVendors } from "../../redux/actions";
import VendorForm from "./VendorForm";



interface EditVendorProps {
    match: any;
}
const EditVendor = (props: EditVendorProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const companyId = props.match.params.companyId;
    const categoryId = props.match.params.categoryId;
    const vendorId = props.match.params.vendorId;

    useEffect(() => {
        if (companyId && vendorId) {
            dispatch(getVendor(companyId, vendorId));
        }
    }, [dispatch, vendorId, companyId]);

    const { loading, editVendorError, isVendorEdited, vendorDetails } = useSelector((state: any) => ({
        loading: state.Company.Vendors.loading,
        createVendorError: state.Company.Vendors.createVendorError,
        isVendorEdited: state.Company.Vendors.isVendorEdited,
        editVendorError: state.Company.Vendors.editVendorError,
        vendorDetails: state.Company.Vendors.vendor
    }));

    const onCompanySubmit = (info: any) => {
        dispatch(editVendor(companyId, vendorId, {
            ...info, country: info['country']['value'], company_type: {
                "category": categoryId
            }
        }));
    }

    useEffect(() => {
        if (isVendorEdited) {
            setTimeout(() => {
                dispatch(resetVendors());
            }, 3000);
        }
    }, [isVendorEdited, dispatch]);

    const editableDetails = vendorDetails ? {
        name: vendorDetails['name'],
        abbreviation: vendorDetails['abbreviation'],
        address1: vendorDetails['address1'],
        address2: vendorDetails['address2'],
        zip: vendorDetails['zip'],
        city: vendorDetails['city'],
        region: vendorDetails['region'],
        email: vendorDetails['email'],
        phone_number: vendorDetails['phone_number'],
        country: vendorDetails['country'],
    } : {};

    const backUrl = `/supply-chain/${companyId}/vendors/${categoryId}`;

    return (
        <>

            <div className="py-4 px-3">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={backUrl}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Edit Vendor')}</h1>
                        </div>
                    </Col>
                </Row>
            </div>

            <Card>
                <Card.Body className="p-4">
                    <div className="position-relative">
                        {loading ? <Loader /> : null}

                        <VendorForm values={editableDetails} onSubmit={onCompanySubmit} />
                    </div>
                </Card.Body>
            </Card>

            {editVendorError ? <MessageAlert message={editVendorError} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-md" /> : null}

            {isVendorEdited ? <MessageAlert message={t('The vendor information is updated')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
        </>
    );
}

export default withRouter(EditVendor);