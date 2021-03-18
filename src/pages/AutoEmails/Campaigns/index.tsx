import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Table } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import Icon from "../../../components/Icon";
import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next';

//components
import Loader from "../../../components/Loader";
import DisplayDate from "../../../components/DisplayDate";


//actions
import { getCampaigns, getMarketPlaces } from "../../../redux/actions";



interface CampaignsProps {
    match: any;
}
const Campaigns = (props: CampaignsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const { loading, campaigns, markets } = useSelector((state: any) => ({
        loading: state.Company.AutoEmails.loading,
        isCampaignsFetched: state.Company.AutoEmails.isCampaignsFetched,
        campaigns: state.Company.AutoEmails.campaigns,
        markets: state.MarketPlaces.markets
    }));

    const companyId = props.match.params.companyId;

    const defaultParams = useMemo(() => ({ 'limit': 100000000 }), []);

    // get the data
    useEffect(() => {
        dispatch(getCampaigns(companyId, defaultParams));
        dispatch(getMarketPlaces(companyId, defaultParams));
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

    const openDetails = (market: any) => {
        history.push(`/auto-emails/${companyId}/campaigns/${market['id']}/`);
    }

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
                                                {markets.map((market, idx) => {
                                                    return <React.Fragment key={idx}>
                                                        <tr className="clickable-row" onClick={() => openDetails(market)}>
                                                            <td>
                                                                <div className="d-flex">
                                                                    <div className="border rounded-sm p-1 mr-2 d-flex align-items-end">
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
                                                                {market['status']}
                                                            </td>
                                                        </tr>

                                                        {getCampaignsOfMarket(market).length > 0 ? <tr className="bg-light">
                                                            <td className="text-muted font-weight-normal">
                                                                <div className="d-flex">
                                                                    <div className="border rounded-sm p-1 mr-2 d-flex align-items-end invisible">
                                                                        <Flag country={market['country']} />
                                                                    </div>
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
                                                                <td>
                                                                    <div className="d-flex">
                                                                        <div className="border rounded-sm p-1 mr-2 d-flex align-items-end invisible">
                                                                            <Flag country={market['country']} />
                                                                        </div>
                                                                        <div>
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
                                                                    {campaign['status']['name']}
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
        </>
    );
}

export default withRouter(Campaigns);
