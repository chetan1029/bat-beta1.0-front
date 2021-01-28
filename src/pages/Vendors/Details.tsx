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
        { label: t('Members'), name: 'members', to: `/supply-chain/${companyId}/vendors/${categoryId}/${vendorId}/members` },
        { label: t('RFQ\'s'), name: 'rfqs', to: `/supply-chain/${companyId}/vendors/${categoryId}/${vendorId}/rfqs` },
        { label: t('Golden Samples'), name: 'golden_samples', to: `/supply-chain/${companyId}/vendors/${categoryId}/${vendorId}/golden-samples` },
        { label: t('Contracts'), name: 'contracts', to: `/supply-chain/${companyId}/vendors/${categoryId}/${vendorId}/contracts` },
        { label: t('Inspections'), name: 'inspections', to: `/supply-chain/${companyId}/vendors/${categoryId}/${vendorId}/inspections` }
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

                                <TabMenu items={tabMenuItems} defaultSelectedItem={'details'} />

                                <Row>
                                    <Col lg={6}></Col>
                                    <Col lg={6}>
                                        <Card>
                                            <Card.Body>

                                                    <div className="">
                                                        <Media>
                                                            <img width={120} height={120} className="mr-3" src={vendorDetails['logo'] || avatarPlaceholder} alt="" />
                                                            <Media.Body>
                                                                <h5 className="my-0">{vendorDetails['name']}</h5>
                                                                <p className="my-0 text-muted" dangerouslySetInnerHTML={rawAddress()}></p>
                                                            </Media.Body>
                                                            {/* <Link to={`/supply-chain/${companyId}/vendors/${categoryId}/${vendorId}/edit`}
                                                                className='btn btn-primary'>
                                                                {t('Edit')}
                                                            </Link> */}
                                                        </Media>
                                                        <Row className="mt-3">
                                                            <Col>
                                                                <p className="m-0 text-muted">{t('Organization Number')}</p>
                                                                <p className="m-0">{vendorDetails['organization_number']}</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mt-3">
                                                            <Col>
                                                                <p className="m-0 text-muted">{t('Email')}</p>
                                                                <p className="m-0">{vendorDetails['email']}</p>
                                                            </Col>
                                                            <Col>
                                                                <p className="m-0 text-muted">{t('Phone Number')}</p>
                                                                <p className="m-0">{vendorDetails['phone_number'] ? vendorDetails['phone_number']:"---"}</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mt-3">
                                                            <Col>
                                                                <p className="m-0 text-muted">{t('Business License')}</p>
                                                                <p className="m-0">{vendorDetails['license_file'] ? <p className="mb-0">
                                                                    <a href={vendorDetails['license_file']} target='_blank' className='text-primary' rel="noreferrer">{t('View Business License')}</a>
                                                                </p> : "----"}</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className="mt-4">
                                                            <Col>
                                                                <span className="text-muted">{t('Created')}: </span> {vendorDetails['create_date'] ? <DisplayDate dateStr={vendorDetails['create_date']} /> : null}
                                                            </Col>
                                                            <Col>
                                                                <span className="text-muted">{t('Updated')}: </span> {vendorDetails['update_date'] ? <DisplayDate dateStr={vendorDetails['update_date']} /> : null}
                                                            </Col>
                                                        </Row>
                                                    </div>

                                            </Card.Body>
                                        </Card>
                                    </Col>
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

export default withRouter(VendorDetails);
