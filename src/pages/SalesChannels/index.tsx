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
import { getSalesChannels, resetSalesChannels } from "../../redux/actions";
import DisplayDate from "../../components/DisplayDate";


const EmptyState = () => {
    const { t } = useTranslation();
    return (
        <Card className="payment-terms-card mb-2">
            <Card.Body>
                <div className="p-2">
                    <h5 className="font-weight-normal my-0">{t('There are no sales channels')}</h5>
                </div>
            </Card.Body>
        </Card>
    )
}


interface SalesItemProp {
    companyId: any,
    categoryId: any,
    salesChannel: any,
}

const SalesItem = ({ salesChannel, companyId, categoryId }: SalesItemProp) => {
    const { t } = useTranslation();

    const rawAddress = () => {
        return { __html: salesChannel['address'] };
    }

    return (<>
        <Row>
            <Col lg={12}>
                <Card className="mb-2">
                    <Card.Body className='p-0'>
                        <Media className='p-3'>
                            <Media.Body>
                                <h5 className="my-0">{salesChannel['name']}</h5>
                                <p className="my-0 text-muted" dangerouslySetInnerHTML={rawAddress()}></p>
                            </Media.Body>

                            <Link to={`/sales/${companyId}/channels/${categoryId}/${salesChannel['id']}`} className='btn btn-link px-0 font-weight-semibold'>
                                <Icon name="notes" className="text-primary mr-1"></Icon>
                                {t('Show Details')}
                            </Link>
                        </Media>

                        <div className="p-3 border-top">
                            <Row>
                                <Col>
                                    <span className="text-muted">{t('Created')}: </span> {salesChannel['create_date'] ? <DisplayDate dateStr={salesChannel['create_date']} /> : null}
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

interface SalesChannelsProps {
    match: any;
}
const SalesChannels = (props: SalesChannelsProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { loading, isChannelsFetched, salesChannels, isChannelsInvited } = useSelector((state: any) => ({
        loading: state.Company.SalesChannels.loading,
        isChannelsFetched: state.Company.SalesChannels.isChannelsFetched,
        salesChannels: state.Company.SalesChannels.salesChannels,
        isChannelsInvited: state.Company.SalesChannels.isChannelsInvited,
    }));

    const companyId = props.match.params.companyId;
    const categoryId = props.match.params.categoryId;

    const defaultParams = useMemo(() => ({ 'limit': 100000000, 'category': categoryId }), [categoryId]);

    useEffect(() => {
        if (companyId && categoryId) {
            dispatch(getSalesChannels(companyId, defaultParams));
        }
    }, [dispatch, companyId, categoryId, defaultParams]);

    useEffect(() => {
        if (isChannelsInvited) {
            setTimeout(() => {
                dispatch(resetSalesChannels());
                dispatch(getSalesChannels(companyId, defaultParams));
            }, 3000);
        }
    }, [isChannelsInvited, dispatch, companyId, defaultParams]);

    return (
        <>
            <div className="py-4 px-3">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            <h1 className="m-0">{t('Sales Channels')}</h1>
                        </div>
                    </Col>
                    <Col className="text-right">
                        <Link to={`/sales/${companyId}/channels/${categoryId}/add`} className="btn btn-primary">{t('Add New')}</Link>
                    </Col>
                </Row>
            </div>

            <Card>
                <Card.Body className="">
                    {loading ? <Loader /> : <div>
                        <div className="px-2">
                            <Row>
                                <Col lg={7} xs={12}>
                                    {isChannelsFetched ? <>
                                        {
                                            salesChannels['results'].length > 0 ?
                                                salesChannels['results'].map((salesChannel: any, key: number) =>
                                                    <SalesItem salesChannel={salesChannel}
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

                        {isChannelsInvited ? <MessageAlert message={t('The sales channel is invited successfully')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
                    </div>}

                </Card.Body>
            </Card>

        </>
    );
}

export default withRouter(SalesChannels);