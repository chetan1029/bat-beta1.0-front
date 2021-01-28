import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Media } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';


//components
import Loader from "../../components/Loader";
import TabMenu from "../../components/TabMenu";
import Icon from "../../components/Icon";

//actions
import { getVendor } from "../../redux/actions";
import DisplayDate from "../../components/DisplayDate";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.jpg";

interface VendorsProps {
    match: any;
}
const VendorMembers = (props: VendorsProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { loading, vendorDetails } = useSelector((state: any) => ({
        loading: state.Company.Vendors.loading,
        vendorDetails: state.Company.Vendors.vendor
    }));

    const companyId = props.match.params.companyId;
    const categoryId = props.match.params.categoryId;
    const vendorId = props.match.params.vendorId;

    useEffect(() => {
        if (companyId && vendorId) {
            dispatch(getVendor(companyId, vendorId));
        }
    }, [dispatch, vendorId, companyId]);


    const rawAddress = () => {
        return { __html: vendorDetails['address'] };
    }

    const tabMenuItems: Array<any> = [
        { label: t('Details'), name: 'details', to: `/supply-chain/${companyId}/vendors/${categoryId}/${vendorId}` },
        { label: t('Members'), name: 'members', to: `/supply-chain/${companyId}/vendors/${categoryId}/${vendorId}/members` },
        { label: t('RFQ\'s'), name: 'rfqs', to: `/supply-chain/${companyId}/vendors/${categoryId}/${vendorId}/rfqs` },
        { label: t('Golden Samples'), name: 'golden_samples', to: `/supply-chain/${companyId}/vendors/${categoryId}/${vendorId}/golden-samples` },
        { label: t('Contracts'), name: 'contracts', to: `/settings/${vendorId}/contracts` },
        { label: t('Inspections'), name: 'inspections', to: `/settings/${vendorId}/inspections` }
    ]

    return (
        <>{vendorDetails ? <>
            <div className="py-4 px-3">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/supply-chain/${companyId}/vendors/${categoryId}`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{vendorDetails['name']}</h1>
                        </div>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Body className="">
                            {loading ? <Loader /> : <div>

                                <TabMenu items={tabMenuItems} defaultSelectedItem={'members'} />

                                <Row>
                                    <Col lg={6}></Col>
                                    <Col lg={6}></Col>
                                </Row>
                            </div>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            </> : null}
        </>
    );
}

export default withRouter(VendorMembers);
