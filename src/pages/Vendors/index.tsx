import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Media } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';


//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";

//actions
import { getVendors, resetVendors } from "../../redux/actions";
import DisplayDate from "../../components/DisplayDate";


const EmptyState = () => {
    const { t } = useTranslation();
    return (
        <Card className="payment-terms-card mb-2">
            <Card.Body>
                <div className="p-2">
                    <h5 className="font-weight-normal my-0">{t('There are no vendors')}</h5>
                </div>
            </Card.Body>
        </Card>
    )
}


interface VendorItemProp {
    companyId: any,
    categoryId: any,
    vendor: any,
}

const VendorItem = ({ vendor, companyId, categoryId }: VendorItemProp) => {
    const { t } = useTranslation();

    // const dispatch = useDispatch();

    // const [selectedVendorForDelete, setselectedVendorForDelete] = useState<any>(null);

    // const onDelete = () => {
    //     setselectedVendorForDelete(vendor);
    // }

    const rawAddress = () => {
        return { __html: vendor['address'] };
    }


    return (<>
        <Row>
            <Col lg={12}>
                <Card className="mb-2">
                    <Card.Body className='p-0'>
                        <Media className='p-3'>
                            <Media.Body>
                                <h5 className="my-0">{vendor['name']}</h5>
                                <p className="my-0 text-muted" dangerouslySetInnerHTML={rawAddress()}></p>
                            </Media.Body>

                            <Link to={`/supply-chain/${companyId}/vendors/${categoryId}/${vendor['id']}`} className='btn btn-link px-0 font-weight-semibold'>
                                <Icon name="notes" className="text-primary mr-1"></Icon>
                                {t('Show Details')}
                            </Link>
                        </Media>

                        <div className="p-3 border-top">
                            <Row>
                                <Col>
                                    <span className="text-muted">{t('Created')}: </span> {vendor['create_date'] ? <DisplayDate dateStr={vendor['create_date']} /> : null}
                                </Col>
                                {/* <Col className="text-right">
                                    <Link to="#" onClick={onDelete}><Icon name="archive" className="ml-2 svg-outline-danger" /></Link>
                                </Col> */}
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        {/* {selectedVendorForDelete ? <ConfirmMessage message={`Are you sure you want to archive ${vendor['name']}?`} onConfirm={() => {

        }} onClose={() => setselectedVendorForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Archive')}></ConfirmMessage> : null} */}
    </>
    )
}

interface VendorsProps {
    match: any;
}
const Vendors = (props: VendorsProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { loading, isVendorsFetched, vendors, isVendorAdded } = useSelector((state: any) => ({
        loading: state.Company.Vendors.loading,
        isVendorsFetched: state.Company.Vendors.isVendorsFetched,
        vendors: state.Company.Vendors.vendors,
        isVendorAdded: state.Company.Vendors.isVendorAdded
    }));

    const companyId = props.match.params.companyId;
    const categoryId = props.match.params.categoryId;

    const defaultParams = useMemo(() => ({ 'limit': 100000000, 'category': categoryId }), [categoryId]);

    useEffect(() => {
        if (companyId && categoryId) {
            dispatch(getVendors(companyId, defaultParams));
        }
    }, [dispatch, companyId, categoryId, defaultParams]);


    // const [showActive, setshowActive] = useState(false);

    // const onChangeShowActive = (checked: boolean) => {
    //     setshowActive(checked);

    //     if (checked) {
    //         let filters = {
    //             ...defaultParams,
    //             is_active: true
    //         }
    //         dispatch(getVendors(companyId, filters));
    //     } else {
    //         dispatch(getVendors(companyId, defaultParams));
    //     }
    // }

    useEffect(() => {
        if (isVendorAdded) {
            setTimeout(() => {
                dispatch(resetVendors());
            }, 3000);
        }
    }, [isVendorAdded, dispatch]);

    return (
        <>
            <div className="py-4 px-3">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            <h1 className="m-0">{t('Vendors')}</h1>
                            {/* <div className="d-flex align-items-center pl-3">
                                <span className="m-0 font-16 mr-2">
                                    {t('Show active vendors')}
                                </span>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                    checked={showActive}
                                    onChange={(e: any) => onChangeShowActive(e.target.checked)}
                                />
                            </div> */}
                        </div>
                    </Col>
                    <Col className="text-right">
                        <Link to={`/supply-chain/${companyId}/vendors/${categoryId}/add`} className="btn btn-primary">{t('Add New Vendor')}</Link>
                    </Col>
                </Row>
            </div>

            <Card>
                <Card.Body className="">
                    {loading ? <Loader /> : <div>
                        <div className="px-2">
                            <Row>
                                <Col lg={7} xs={12}>
                                    {isVendorsFetched ? <>
                                        {
                                            vendors['results'].length > 0 ?
                                                vendors['results'].map((vendor: any, key: number) =>
                                                    <VendorItem vendor={vendor}
                                                        categoryId={categoryId}
                                                        key={key} companyId={companyId} />
                                                ) : <EmptyState />
                                        }
                                    </> : null}
                                </Col>
                                <Col lg={5} xs={12}>
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

                        {isVendorAdded ? <MessageAlert message={t('A new vendor is created')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
                    </div>}

                </Card.Body>
            </Card>

        </>
    );
}

export default withRouter(Vendors);