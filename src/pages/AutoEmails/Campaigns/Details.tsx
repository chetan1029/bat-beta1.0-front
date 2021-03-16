import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Nav } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next';

//components
import Loader from "../../../components/Loader";
import Icon from "../../../components/Icon";

//actions
import { getCampaigns, getMarketPlace } from "../../../redux/actions";

import Campaign from "./Campaign";

interface DetailsProps {
    match: any;
}
const Details = (props: DetailsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, campaigns, market } = useSelector((state: any) => ({
        loading: state.Company.AutoEmails.loading,
        isCampaignsFetched: state.Company.AutoEmails.isCampaignsFetched,
        campaigns: state.Company.AutoEmails.campaigns,
        market: state.MarketPlaces.market
    }));

    const companyId = props.match.params.companyId;
    const marketId = props.match.params.marketId;

    const defaultParams = useMemo(() => ({ 'limit': 100000000, 'marketplace': marketId }), []);

    // get the data
    useEffect(() => {
        dispatch(getCampaigns(companyId, defaultParams));
        dispatch(getMarketPlace(marketId));
    }, [dispatch, companyId, marketId]);

    const getCampaignsOfMarket = (market: any) => {
        return ((campaigns || []).filter(c => c['amazonmarketplace']['id'] + '' === market['id'] + '')) || [];
    }

    const getTotalOfMarket = (market: any, key: string) => {
        const camps = getCampaignsOfMarket(market);
        return camps.reduce((a, b) => a + (b[key] || 0), 0);
    }

    const [selectedCampaignId, setSelectedCampaignId] = useState<any>(null);
    const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

    useEffect(() => {
        if (campaigns && campaigns.length) {
            setSelectedCampaignId(campaigns[0]['id']);
            setSelectedCampaign(campaigns[0]);
        }
    }, [campaigns]);

    const onSelect = (campaign) => {
        setSelectedCampaignId(campaign['id']);
        setSelectedCampaign(campaign);
    }

    return (
        <>
            {loading ? <Loader /> : null}

            {market ? <>
                <div className="py-4 px-3">
                    <Row className='align-items-center'>
                        <Col>
                            <div className="d-flex align-items-center">
                                <Link to={`/auto-emails/${companyId}/campaigns/`}>
                                    <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                                </Link>

                                <div className="d-flex">
                                    <div className="border rounded-sm p-1 mr-2 d-flex align-items-end">
                                        <Flag country={market['country']} />
                                    </div>
                                    <h1 className="m-0">{t('Auto Email Campaign - Amazon')}&nbsp;{market['country']}</h1>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                <Row>
                    <Col lg={12}>
                        <Card>
                            <Card.Body className="">

                                <Row>
                                    <Col lg={3}>
                                        <Card>
                                            <Card.Body className="">
                                                <h6 className="mt-0 text-muted">{t('Email Sent')}</h6>
                                                <h1 className="mb-0">{getTotalOfMarket(market, 'email_sent')}</h1>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg={3}>
                                        <Card>
                                            <Card.Body className="">
                                                <h6 className="mt-0 text-muted">{t('Email in Queue')}</h6>
                                                <h1 className="mb-0">{getTotalOfMarket(market, 'email_in_queue')}</h1>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg={3}>
                                        <Card>
                                            <Card.Body className="">
                                                <h6 className="mt-0 text-muted">{t('Email Sent - Today')}</h6>
                                                <h1 className="mb-0">{getTotalOfMarket(market, 'email_sent')}</h1>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg={3}>
                                        <Card>
                                            <Card.Body className="">
                                                <h6 className="mt-0 text-muted">{t('Email in Queue - Today')}</h6>
                                                <h1 className="mb-0">{getTotalOfMarket(market, 'email_in_queue')}</h1>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>

                                <Row className="mt-4">
                                    <Col lg={12}>
                                        <div className="px-2 pb-2 mb-4">
                                            <Nav variant="tabs" className="nav-bordered m-0" activeKey={selectedCampaignId} as='ul'>
                                                {(campaigns || []).map((campaign: any, idx: number) => {
                                                    return <Nav.Item as="li" key={idx}>
                                                        <Nav.Link className="pt-1" eventKey={campaign['id']} to={'#'} as={Link} onClick={() => onSelect(campaign)}>{campaign['name']}</Nav.Link>
                                                    </Nav.Item>
                                                })}
                                            </Nav>
                                        </div>

                                        <div>
                                            {selectedCampaign ? <Campaign campaign={selectedCampaign} companyId={companyId} /> : null}
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </> : null}

            {/* {isClientArchived ? <MessageAlert message={t('The client is archived successfully')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null} */}

        </>
    );
}

export default withRouter(Details);