import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Media, Badge } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import classNames from "classnames";

//components
import Loader from "../../components/Loader";
import TabMenu from "../../components/TabMenu";
import Icon from "../../components/Icon";

//actions
import { getVendor, getVendorMembers } from "../../redux/actions";
// import DisplayDate from "../../components/DisplayDate";
import avatarPlaceholder from "../../assets/images/avatar-placeholder.jpg";


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
    member: any,
}

const MemberItem = ({ member, companyId }: MemberItemProp) => {
    // const { t } = useTranslation();
    // const dispatch = useDispatch();

    const fullName = member ? member['user']['first_name'] + " " + member['user']['last_name'] : "";

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
                        </Media>

                        <div className="p-3 border-top">
                            <Row>
                                <Col>
                                    {member['job_title'] ? <Badge variant='outline-primary' pill className='capitalize mr-2 font-14'>{member['job_title'].split('_').join(' ')}</Badge> : null}
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

interface VendorsProps {
    match: any;
}
const VendorMembers = (props: VendorsProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { loading, vendorDetails, isVendorMembersFetched, vendorMembers } = useSelector((state: any) => ({
        loading: state.Company.Vendors.loading,
        vendorDetails: state.Company.Vendors.vendor,
        vendorMembers: state.Company.Vendors.vendormembers,
        isVendorMembersFetched: state.Company.Vendors.isVendorMembersFetched,
    }));

    const companyId = props.match.params.companyId;
    const categoryId = props.match.params.categoryId;
    const vendorId = props.match.params.vendorId;

    useEffect(() => {
        if (companyId && vendorId) {
            dispatch(getVendor(companyId, vendorId));
            dispatch(getVendorMembers(companyId, vendorId));
        }
    }, [dispatch, vendorId, companyId]);


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
                            <TabMenu items={tabMenuItems} defaultSelectedItem={'members'} />
                            {loading ? <Loader /> : <div>
                                <Row>
                                    <Col lg={6}>
                                        {isVendorMembersFetched ? <>
                                            {
                                                vendorMembers['results'].length > 0 ?
                                                    vendorMembers['results'].map((member: any, key: number) =>
                                                        <MemberItem member={member}
                                                            key={key} companyId={companyId}
                                                        />
                                                    ) : <EmptyState message={t('There are no active members')} />
                                            }
                                        </> : null}
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

export default withRouter(VendorMembers);
