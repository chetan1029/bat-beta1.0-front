import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import Icon from "../../../components/Icon";
import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next';

//components
import Loader from "../../../components/Loader";
import DisplayDate from "../../../components/DisplayDate";
import MessageAlert from "../../../components/MessageAlert";
import AlertDismissible from "../../../components/AlertDismissible";
import ConfirmMessage from "../../../components/ConfirmMessage";

//actions
import {
    getCampaigns, getMarketPlaces, connectMarketplace, resetConnectMarketplace,
    getMembershipPlan, disConnectMarketplace
} from "../../../redux/actions";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

interface CampaignsProps {
    match: any;
    location?: any;
}
const Campaigns = (props: CampaignsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const queryParam: any = props.location.search;
    const [successMsg, setSuccessMsg] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<any>(null);

    useEffect(() => {
        const params = new URLSearchParams(queryParam);
        const success = params.get('success');
        const error = params.get('error');

        if (success) {
            setSuccessMsg(success);
            setErrorMsg(null);
        }
        if (error) {
            setSuccessMsg(null);
            setErrorMsg(error);
        }
    }, [queryParam]);


    const { loading, campaigns, markets, redirectUri, isMarketConnected, membershipPlan, isMarketDisconnected } = useSelector((state: any) => ({
        loading: state.Company.AutoEmails.loading || state.MarketPlaces.loading,
        isCampaignsFetched: state.Company.AutoEmails.isCampaignsFetched,
        campaigns: state.Company.AutoEmails.campaigns,
        markets: state.MarketPlaces.markets,
        isMarketConnected: state.MarketPlaces.isMarketConnected,
        redirectUri: state.MarketPlaces.redirectUri,
        isMarketDisconnected: state.MarketPlaces.isMarketDisconnected,

        membershipPlan: state.Company.MembershipPlan.membershipPlan,
    }));

    const companyId = props.match.params.companyId;

    const defaultParams = useMemo(() => ({ 'limit': 100000000 }), []);

    // get the data
    useEffect(() => {
        dispatch(resetConnectMarketplace());
        dispatch(getCampaigns(companyId, defaultParams));
        dispatch(getMarketPlaces(companyId, defaultParams));
        dispatch(getMembershipPlan(companyId, { is_active: true }));
    }, [dispatch, companyId, defaultParams]);

    const getCampaignsOfMarket = (market: any) => {
        return ((campaigns || []).filter(c => c['amazonmarketplace']['id'] + '' === market['id'] + '')) || [];
    }

    const getTotalOfMarket = (market: any, key: string) => {
        const camps = getCampaignsOfMarket(market);
        return camps.reduce((a, b) => a + (b[key] || 0), 0);
    }

    const getLastSentOfMarket = (market: any) => {
        let camps = getCampaignsOfMarket(market);
        if (camps.length) {
            camps = camps.sort(function (a: any, b: any) {
                return b['last_email_send_in_queue'] && a['last_email_send_in_queue'] ? (new Date(Date.parse(b['last_email_send_in_queue'])).getTime() - new Date(Date.parse(a['last_email_send_in_queue'])).getTime()) : '';
            });
            return camps[0]['last_email_send_in_queue']
        }
        return "";
    }

    const [selectedMarket, setSelectedMarket] = useState<any>(null);

    const openDetails = (market: any) => {
        if (market.status === 'active')
            history.push(`/auto-emails/${companyId}/campaigns/${market['id']}/`);
        else {
            setSelectedMarket(market);
        }
    }

    const [marketForDisconnect, setMarketForDisconnect] = useState<any>(null);

    useEffect(() => {
        if (redirectUri && isMarketConnected) {
            window.open(redirectUri, '_blank');
        }
    }, [redirectUri, isMarketConnected]);

    useEffect(() => {
        if (isMarketDisconnected) {
            setMarketForDisconnect(null);
            dispatch(getCampaigns(companyId, defaultParams));
            dispatch(getMarketPlaces(companyId, defaultParams));
        }
    }, [dispatch, isMarketDisconnected, companyId, defaultParams]);


    const sortedMarkets = [...markets.filter(m => m['status'] === 'active'), ...markets.filter(m => m['status'] !== 'active')];
    const plan = membershipPlan && membershipPlan.results && membershipPlan.results.length ? membershipPlan.results[0]['plan'] : null;
    const quotas = plan ? (plan['plan_quotas'] || []).find(pq => (pq['quota'] && pq['quota']['codename'] === "MARKETPLACES")) : {};

    const isActiveMarket = quotas && quotas['available_quota'] > 0 ? true : false;

    return (
        <>
            <div className="py-4">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Icon name="mail2" className="icon icon-xs  mr-2" />
                            <h1 className="m-0">{t('Campaigns')}</h1>
                        </div>
                    </Col>
                    <Col className="text-right"></Col>
                </Row>
            </div>
            <AlertDismissible heading="Getting started guide!" message="Do you wanna go through getting started guide." cancelBtnVariant="danger" cancelBtnLabel="I will figure it out!" confirmBtnVariant="primary" confirmBtnLabel="Go to Getting Started" />
            <Card>
                <Card.Body className="">

                    {loading ? <Loader /> : <div>
                        <div className="px-2">
                            <Row>
                                <Col lg={12}>
                                    <div className={"list-view"}>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>{t("Campaign Name")}</th>
                                                    <th>{t("Email Sent")}</th>
                                                    <th>{t("Email in Queue")}</th>
                                                    <th>{t("Last email sent")}</th>
                                                    <th>{t("Status")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortedMarkets.map((market, idx) => {
                                                    return <React.Fragment key={idx}>
                                                        <tr className={"" + (capitalizeFirstLetter(market['status']) === 'Inactive' && isActiveMarket ? 'opacity-3' : 'clickable-row')}>
                                                            <td>

                                                                <div className="d-flex">
                                                                    <div className="border rounded-sm p-1 mr-2 d-flex align-items-center">
                                                                        <Flag country={market['country']} />
                                                                    </div>
                                                                    <div>
                                                                        <h6 className="text-muted font-weight-normal my-0">{t('Auto Email Campaign - Amazon')}&nbsp;{market['country']}</h6>
                                                                        <h6 className='my-0'>{t('Amazon')}&nbsp;{market['country']}</h6>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {getTotalOfMarket(market, 'email_sent')}
                                                            </td>
                                                            <td>
                                                                {getTotalOfMarket(market, 'email_in_queue')}
                                                            </td>
                                                            <td>
                                                                <DisplayDate dateStr={getLastSentOfMarket(market)} />
                                                            </td>
                                                            <td>
                                                                {capitalizeFirstLetter(market['status'])}
                                                                {capitalizeFirstLetter(market['status']) === 'Inactive' ?
                                                                    <Button onClick={() => openDetails(market)} disabled={!isActiveMarket}
                                                                        className="btn btn-sm btn-primary ml-5">{t('Connect')}</Button>
                                                                    : <>
                                                                        <Button onClick={() => openDetails(market)}
                                                                            className="btn btn-sm btn-primary ml-5">{t('View')}</Button>
                                                                        <Button onClick={() => setMarketForDisconnect(market)}
                                                                            className="btn btn-sm btn-danger ml-2">{t('Disconnect')}</Button></>}
                                                            </td>
                                                        </tr>
                                                        {getCampaignsOfMarket(market).length > 0 ? <tr className="bg-light">
                                                            <td className="text-muted font-weight-normal">
                                                                <div className="d-flex">
                                                                    <div className="border rounded-sm p-1 mr-2 d-flex align-items-end invisible" style={{ width: '34px' }}></div>
                                                                    <div>
                                                                        {t("Template Name")}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-muted font-weight-normal">{t("Email Sent")}</td>
                                                            <td className="text-muted font-weight-normal">{t("Email in Queue")}</td>
                                                            <td className="text-muted font-weight-normal">{t("Last email sent")}</td>
                                                            <td className="text-muted font-weight-normal">{t("Status")}</td>
                                                        </tr> : null}

                                                        {getCampaignsOfMarket(market).map((campaign, cidx) => {
                                                            return <tr key={`camp-${idx}-${cidx}`} className='bg-light'>
                                                                <td className="clickable-row">
                                                                    <div className="d-flex">
                                                                        <div className="border rounded-sm p-1 mr-2 d-flex align-items-end invisible" style={{ width: '34px' }}></div>
                                                                        <div onClick={() => openDetails(market)}>
                                                                            <h6 className="text-muted font-weight-normal my-0">{campaign['emailtemplate']['name']}</h6>
                                                                            <h6 className='my-0'>{campaign['emailtemplate']['slug']}</h6>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {campaign['email_sent']}
                                                                </td>
                                                                <td>
                                                                    {campaign['email_in_queue']}
                                                                </td>
                                                                <td>
                                                                    <DisplayDate dateStr={campaign['last_email_send_in_queue']} />
                                                                </td>
                                                                <td>
                                                                    {capitalizeFirstLetter(campaign['status']['name'])}
                                                                </td>
                                                            </tr>
                                                        })}
                                                    </React.Fragment>
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>}
                </Card.Body>
            </Card>

            {successMsg ? <MessageAlert message={successMsg} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
            {errorMsg ? <MessageAlert message={errorMsg} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {
                selectedMarket ?
                    <ConfirmMessage message={`Are you sure you want to connect ${t('Amazon')} ${selectedMarket['country']} ? You can only connect ${quotas ? quotas['value'] : 0} markets based on your subscribed plan.`}
                        onConfirm={() => {
                            dispatch(connectMarketplace(companyId, selectedMarket['id']));
                            setSelectedMarket(null);
                        }}
                        onClose={() => setSelectedMarket(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Confirm')} />
                    : null
            }

            {
                marketForDisconnect ?
                    <ConfirmMessage message={`Are you sure you want to disconnect ${t('Amazon')} ${marketForDisconnect['country']} ?`}
                        onConfirm={() => {
                            dispatch(disConnectMarketplace(companyId, marketForDisconnect['id']));
                            setMarketForDisconnect(null);
                        }}
                        onClose={() => setMarketForDisconnect(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Confirm')} />
                    : null
            }
        </>
    );
}

export default withRouter(Campaigns);
