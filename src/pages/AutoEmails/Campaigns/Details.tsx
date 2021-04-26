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

    const { loading, campaigns, market, isCampaignUpdated } = useSelector((state: any) => ({
        loading: state.Company.AutoEmails.loading,
        isCampaignsFetched: state.Company.AutoEmails.isCampaignsFetched,
        campaigns: state.Company.AutoEmails.campaigns,
        market: state.MarketPlaces.market,
        isCampaignUpdated: state.Company.AutoEmails.isCampaignUpdated,
    }));

    const companyId = props.match.params.companyId;
    const marketId = props.match.params.marketId;

    const defaultParams = useMemo(() => ({ 'limit': 100000000, 'marketplace': marketId }), [marketId]);

    // get the data
    useEffect(() => {
        dispatch(getCampaigns(companyId, defaultParams));
        dispatch(getMarketPlace(companyId, marketId));
    }, [dispatch, companyId, marketId, defaultParams]);

    useEffect(() => {
        if (isCampaignUpdated) {
            dispatch(getCampaigns(companyId, defaultParams));
        }
    }, [dispatch, isCampaignUpdated, companyId, defaultParams]);

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
        setSelectedCampaign(null);

        setTimeout(() => {
            setSelectedCampaign(campaign);
        });
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
                                    <Col lg={12}>
                                        <div className="px-2 pb-2 mb-3">
                                            <Nav variant="tabs" className="nav-bordered m-0" activeKey={selectedCampaignId} as='ul'>
                                                {(campaigns || []).map((campaign: any, idx: number) => {
                                                    return <Nav.Item as="li" key={idx}>
                                                        <Nav.Link className="pt-1" eventKey={campaign['id']} to={'#'} as={Link} onClick={() => onSelect(campaign)}>{campaign['name']}</Nav.Link>
                                                    </Nav.Item>
                                                })}
                                            </Nav>
                                        </div>

                                        <div>
                                            {selectedCampaign ? <Campaign campaign={selectedCampaign} companyId={companyId} market={market} /> : null}
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </> : null}

        </>
    );
}

export default withRouter(Details);
