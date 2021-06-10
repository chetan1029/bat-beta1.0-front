import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { useHistory, withRouter, Link } from "react-router-dom";
import Icon from "../../components/Icon";
import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next';

//components
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import AlertDismissible from "../../components/AlertDismissible";
import ConfirmMessage from "../../components/ConfirmMessage";

//actions
import { APICore } from '../../api/apiCore';
import {
    getMarketPlaces, connectMarketplace, resetConnectMarketplace,
    getMembershipPlan, disConnectMarketplace
} from "../../redux/actions";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

interface MarketplacePermissionsProps {
    match: any;
    location?: any;
}
const MarketplacePermissions = (props: MarketplacePermissionsProps) => {
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
        dispatch(getMarketPlaces(companyId, defaultParams));
        dispatch(getMembershipPlan(companyId, { is_active: true }));
    }, [dispatch, companyId, defaultParams]);


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
            window.open(redirectUri, '_self');
        }
    }, [redirectUri, isMarketConnected]);

    useEffect(() => {
        if (isMarketDisconnected) {
            setMarketForDisconnect(null);
            dispatch(getMarketPlaces(companyId, defaultParams));
            dispatch(getMembershipPlan(companyId, { is_active: true }));
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
                            <Link to={`/settings/${companyId}`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Marketplace Permissions')}</h1>
                        </div>
                    </Col>
                    <Col className="text-right">

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
                                                    <th>{t("Status")}</th>
                                                    <th>{t("Action")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortedMarkets.map((market, idx) => {
                                                    return <React.Fragment key={idx}>
                                                        <tr className={"" + (capitalizeFirstLetter(market['status']) === 'Inactive' && !isActiveMarket ? 'opacity-3' : '')}>
                                                            <td onClick={() => capitalizeFirstLetter(market['status']) === 'Active' ? openDetails(market): undefined} className={capitalizeFirstLetter(market['status']) === 'Active'?'clickable-row': ''}>

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
                                                            <td onClick={() => capitalizeFirstLetter(market['status']) === 'Active' ? openDetails(market): undefined} className={capitalizeFirstLetter(market['status']) === 'Active'?'clickable-row': ''}>
                                                                {capitalizeFirstLetter(market['status'])}
                                                            </td>

                                                            <td>
                                                                {capitalizeFirstLetter(market['status']) === 'Inactive' ?
                                                                    <Button onClick={() => openDetails(market)} disabled={!isActiveMarket}
                                                                        className="btn btn-sm btn-primary">{t('Connect')}</Button>
                                                                    : <>
                                                                    <Button onClick={() => setMarketForDisconnect(market)}
                                                                            className="btn btn-sm btn-danger">{t('Disconnect')}</Button></>}
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
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
        </>
    );
}

export default withRouter(MarketplacePermissions);
