import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { useHistory, withRouter, Link } from "react-router-dom";
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
import { APICore } from '../../../api/apiCore';
import {
    getCampaigns, getMarketPlaces, connectMarketplace, resetConnectMarketplace,
    getMembershipPlan, disConnectMarketplace, resetAutoEmails, deleteCampaign
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

    const api = new APICore();

    const loggedInUser = api.getLoggedInUser();

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


    const { loading, campaigns, markets, redirectUri, isMarketConnected, membershipPlan, isCampaignDeleted } = useSelector((state: any) => ({
        loading: state.Company.AutoEmails.loading || state.MarketPlaces.loading,
        isCampaignsFetched: state.Company.AutoEmails.isCampaignsFetched,
        campaigns: state.Company.AutoEmails.campaigns,
        markets: state.MarketPlaces.markets,
        isMarketConnected: state.MarketPlaces.isMarketConnected,
        redirectUri: state.MarketPlaces.redirectUri,
        membershipPlan: state.Company.MembershipPlan.membershipPlan,
        isCampaignDeleted: state.Company.AutoEmails.isCampaignDeleted,
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

    const openDetails = (market: any, campaign:any) => {
        history.push(`/auto-emails/${companyId}/campaigns/${market['id']}/${campaign['id']}/`);
    }

    const [marketForDisconnect, setMarketForDisconnect] = useState<any>(null);

    useEffect(() => {
        if (redirectUri && isMarketConnected) {
            window.open(redirectUri, '_blank');
        }
    }, [redirectUri, isMarketConnected]);

    useEffect(() => {
        if (isCampaignDeleted) {
            setMarketForDisconnect(null);
            dispatch(getCampaigns(companyId, defaultParams));
            dispatch(getMarketPlaces(companyId, defaultParams));
            dispatch(getMembershipPlan(companyId, { is_active: true }));
        }
    }, [dispatch, companyId, defaultParams, isCampaignDeleted]);

    // Delete campaign
    const ondeleteCampaign = (campaign: any) => {
      setselectedCampaignForDelete(campaign);
    };

    const [selectedCampaignForDelete, setselectedCampaignForDelete] = useState<any>(null);


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
                            <h1 className="m-0">{t('Manage Campaigns')}</h1>
                        </div>
                    </Col>
                    <Col className="text-right">
                      <Link
                      className="btn btn-primary"
                        to={`/auto-emails/${companyId}/campaigns/add`}
                      >
                        {t("Create a Campaign")}
                      </Link>
                    </Col>
                </Row>
            </div>
            { loggedInUser['first_login'] ?
            <AlertDismissible heading="Getting started guide!" message="Do you wanna go through getting started guide." cancelBtnVariant="danger" cancelBtnLabel="I will figure it out!" confirmBtnVariant="primary" confirmBtnLabel="Go to Getting Started" confirmBtnLink={`/get-started/${companyId}`} />
            : null}

                    {loading ? <Loader /> : <div>
                        <div>
                            <Row>
                                <Col lg={12}>
                                    <div className={"list-view"}>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>{t("MarketPlace Name")}</th>
                                                    <th>{t("Sent Emails")}</th>
                                                    <th>{t("Email in Queue")}</th>
                                                    <th>{t("Opt-out Rate")}</th>
                                                    <th>{t("Status")}</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortedMarkets.map((market, idx) => {

                                                    return capitalizeFirstLetter(market['status']) === 'Active' ? <React.Fragment key={idx}>
                                                        <tr className={"" + (capitalizeFirstLetter(market['status']) === 'Inactive' && !isActiveMarket ? 'opacity-3' : '')}>
                                                            <td className={capitalizeFirstLetter(market['status']) === 'Active'?'clickable-row': ''}>

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
                                                            { capitalizeFirstLetter(market['status']) === 'Active' ?
                                                            <td className='clickable-row'>
                                                              {getTotalOfMarket(market, 'email_sent')}
                                                            </td>
                                                            :
                                                            <td>-</td>
                                                            }
                                                            { capitalizeFirstLetter(market['status']) === 'Active' ?
                                                            <td className='clickable-row'>
                                                              {getTotalOfMarket(market, 'email_in_queue')}
                                                            </td>
                                                            :
                                                            <td>-</td>
                                                            }
                                                            { capitalizeFirstLetter(market['status']) === 'Active' ?
                                                            <td className='clickable-row'>
                                                              {parseFloat(getTotalOfMarket(market, 'opt_out_rate')).toFixed(2)}%
                                                            </td>
                                                            :
                                                            <td>-</td>
                                                            }
                                                            <td className={capitalizeFirstLetter(market['status']) === 'Active'?'clickable-row': ''}>
                                                                {capitalizeFirstLetter(market['status'])}
                                                            </td>

                                                            <td>

                                                            </td>
                                                        </tr>
                                                        {capitalizeFirstLetter(market['status']) === 'Active' && getCampaignsOfMarket(market).length > 0 ? <tr className="bg-light">
                                                            <td className="text-muted font-weight-normal">
                                                                <div className="d-flex">
                                                                    <div className="border rounded-sm p-1 mr-2 d-flex align-items-end invisible" style={{ width: '34px' }}></div>
                                                                    <div>
                                                                        {t("Campaign Name")}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="text-muted font-weight-normal">{t("Sent Emails")}</td>
                                                            <td className="text-muted font-weight-normal">{t("Email in Queue")}</td>
                                                            <td className="text-muted font-weight-normal">{t("Opt-out Rate")}</td>
                                                            <td className="text-muted font-weight-normal">{t("Status")}</td>
                                                            <td className="text-muted font-weight-normal">{t("Action")}</td>
                                                        </tr> : null}

                                                        { capitalizeFirstLetter(market['status']) === 'Active' ?
                                                          getCampaignsOfMarket(market).map((campaign, cidx) => {
                                                            return <tr key={`camp-${idx}-${cidx}`} className='bg-light'>
                                                                <td className='clickable-row' onClick={() => openDetails(market, campaign)}>
                                                                    <div className="d-flex">
                                                                        <div className="border rounded-sm p-1 mr-2 d-flex align-items-end invisible" style={{ width: '34px' }}></div>
                                                                        <div>
                                                                            <h6 className="font-weight-normal my-0">{campaign['name']}</h6>
                                                                            <p className="text-muted">{campaign['emailtemplate']['name']}</p>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className='clickable-row' onClick={() => openDetails(market, campaign)}>
                                                                  { capitalizeFirstLetter(campaign['status']['name']) === 'Active' ?
                                                                    campaign['email_sent'] : "-"}
                                                                </td>
                                                                <td className='clickable-row' onClick={() => openDetails(market, campaign)}>
                                                                  { capitalizeFirstLetter(campaign['status']['name']) === 'Active' ?
                                                                    campaign['email_in_queue'] : "-"}
                                                                </td>
                                                                <td className='clickable-row' onClick={() => openDetails(market, campaign)}>
                                                                  { capitalizeFirstLetter(campaign['status']['name']) === 'Active' ?
                                                                    campaign['opt_out_rate']+"%" : "-"}
                                                                </td>
                                                                <td className='clickable-row' onClick={() => openDetails(market, campaign)}>
                                                                    {capitalizeFirstLetter(campaign['status']['name'])}
                                                                </td>
                                                                <td>
                                                                  <Button onClick={() => openDetails(market, campaign)}
                                                                    className="btn btn-sm btn-primary">{t('Manage')}</Button>
                                                                  <Button onClick={() => ondeleteCampaign(campaign)} className="btn btn-sm btn-danger ml-2">{t('Delete')}</Button>
                                                                </td>
                                                            </tr>
                                                        }) : null}
                                                    </React.Fragment>: null
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>}
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

            {selectedCampaignForDelete ? <ConfirmMessage message={`Are you sure you want to delete ${selectedCampaignForDelete.name}?`} onConfirm={() => {
                dispatch(deleteCampaign(companyId, selectedCampaignForDelete.id)); setselectedCampaignForDelete(null);
            }} onClose={() => setselectedCampaignForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Delete')}></ConfirmMessage> : null}
        </>
    );
}

export default withRouter(Campaigns);
