import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Media } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';


//components
import Loader from "../../components/Loader";
import TabMenu from "../../components/TabMenu";


//actions
import { getVendor } from "../../redux/actions";
import DisplayDate from "../../components/DisplayDate";


interface VendorsProps {
    match: any;
}
const VendorDetails = (props: VendorsProps) => {
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
        { label: t('Members'), name: 'members', to: `/settings/${vendorId}/members` },
        { label: t('Bank'), name: 'banks', to: `/settings/${vendorId}/banks` },
        { label: t('Location'), name: 'locations', to: `/settings/${vendorId}/locations` },
        { label: t('Contracts'), name: 'contracts', to: `/settings/${vendorId}/contracts` }
    ]

    return (
        <>
            <div className="py-4 px-3">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            <h1 className="m-0">{t('Vendor Details')}</h1>
                        </div>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Body className="">
                            {loading ? <Loader /> : <div>

                                <TabMenu items={tabMenuItems} defaultSelectedItem={'details'} />

                                <Row>
                                    <Col lg={6}>
                                        <Card>
                                            <Card.Body className="">
                                                {vendorDetails ? <>
                                                    <div className="">
                                                        <Media className='pb-3 px-2'>
                                                            <Media.Body>
                                                                <h5 className="my-0">{vendorDetails['name']}</h5>
                                                                <p className="my-0 text-muted" dangerouslySetInnerHTML={rawAddress()}></p>
                                                            </Media.Body>
                                                            {/* <Link to={`/supply-chain/${companyId}/vendors/${categoryId}/${vendorId}/edit`}
                                                                className='btn btn-primary'>
                                                                {t('Edit')}
                                                            </Link> */}
                                                        </Media>

                                                        <div className="pt-3 px-2 border-top">
                                                            <Row>
                                                                <Col>
                                                                    <span className="text-muted">{t('Created')}: </span> {vendorDetails['create_date'] ? <DisplayDate dateStr={vendorDetails['create_date']} /> : null}
                                                                </Col>
                                                                <Col>
                                                                    <span className="text-muted">{t('Updated')}: </span> {vendorDetails['update_date'] ? <DisplayDate dateStr={vendorDetails['update_date']} /> : null}
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </> : null}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default withRouter(VendorDetails);