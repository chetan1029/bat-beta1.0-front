import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Table } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { withRouter, useHistory } from "react-router-dom";
import { default as dayjs } from 'dayjs';

//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import ToolTips from "../../components/ToolTips"
import CurrenciesDropdown from "../../components/CurrenciesDropdown";
import MarketPlacesDropdown from "../../components/MarketPlacesDropdown";
import { getCampaignDashboard, getAsinPerformance } from "../../redux/actions";
import { CURRENCIES } from "../../constants";


import OrderChart from "../KeywordTracking/OrderChart";

interface DashboardProps {
  match?: any;
}

const Dashboard = (props: DashboardProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const companyId = props.match.params.companyId;

  const [selectedCurrency, setSelectedCurrency] = useState({label: CURRENCIES['USD'], value: 'USD'});
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState<any>({label: "All", value: 'all'});

  const { loading, campaignDashboard, asinperformance } = useSelector((state: any) => ({
    loading: state.Dashboard.loading,
    campaignDashboard: state.Dashboard.campaignDashboard,
    asinperformance: state.Company.KeywordTracking.asinperformance,
  }));

  const getDates = useCallback((period: string) => {
    const today = new Date();

    switch (period) {
      case '1m':
        return {
          start_date: dayjs(new Date(today.getFullYear(), today.getMonth(), 1)).format('MM/DD/YYYY'),
          end_date: dayjs(new Date(today.getFullYear(), today.getMonth() + 1, 0)).format('MM/DD/YYYY')
        }
      case '6m':
        let dt = new Date();
        dt.setMonth(today.getMonth() - 6);
        return {
          start_date: dayjs(dt).format('MM/DD/YYYY'),
          end_date: dayjs(today).format('MM/DD/YYYY')
        }
      case '1y':
        let dt2 = new Date();
        dt2.setMonth(today.getMonth() - 12);
        return {
          start_date: dayjs(dt2).format('MM/DD/YYYY'),
          end_date: dayjs(today).format('MM/DD/YYYY')
        }
      default:
        return {}
    }
  }, []);

  useEffect(() => {
    dispatch(getCampaignDashboard(companyId, {...getDates(selectedPeriod)}));
    dispatch(getAsinPerformance(companyId, {...getDates(selectedPeriod)}));
  }, [dispatch, companyId, getDates, selectedPeriod, selectedCurrency]);

  const onPeriodChange = (period: string) => {
    setSelectedPeriod(period);
    const filters = {...getDates(period)};
    if (selectedMarket) {
      filters['marketplace'] = selectedMarket['value'];
    }
    dispatch(getCampaignDashboard(companyId, filters));
  }


  const onMarketChange = (market: any) => {
    setSelectedMarket(market);
    const filters = {...getDates(selectedPeriod)};
    if (market) {
      filters['marketplace'] = market['value'];
    }
    dispatch(getCampaignDashboard(companyId, filters));
  }

  const getAmount = (key: string) => {
    const amt = campaignDashboard ? campaignDashboard[key] || 0 : 0;
    const cFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency['value'],
      maximumFractionDigits: 2
    });
    return cFormatter.format(amt);
  }

  const getNumber = (key: string) => {
    const amt = campaignDashboard ? campaignDashboard[key] || 0 : 0;
    const cFormatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2
    });
    return cFormatter.format(amt);
  }

  const openDetails = (status: any) => {
      history.push(`/auto-emails/${companyId}/email-queue/${status}`);
  }


  return (<>
    <div className="py-4">
      <Row className='align-items-center'>
        <Col>
          <div className="d-flex align-items-center">
            <Icon name="home" className="icon icon-xs  mr-2" />
            <h1 className="m-0">Dashboard</h1>
          </div>
        </Col>
        <Col></Col>
        <Col sm={2} >
          <MarketPlacesDropdown name='marketplace' placeholder={t('Market')}
            onChange={onMarketChange}
            className=""
            value={selectedMarket}
            isSingle={true}
            companyId={companyId}
            showAll={true}
            isClearable={true}
             />
        </Col>
      </Row>
    </div>

    <Card>
      <Card.Body className="mb-4">
        {loading ? <Loader /> : null}

        <div>
          <div className="px-2">
            <Row className="mt-1 mb-3">
              <Col lg={6}>
                {!loading ? <OrderChart data={campaignDashboard ? campaignDashboard['data'] : {}} changePeriod={onPeriodChange}
                  selectedCurrency={selectedCurrency['value']} selectedPeriod={selectedPeriod} />: <div style={{height: 350}}></div>}

                  <Row className="mt-3">
                    <Col>
                      <Card className="card-stats mb-2">
                        <Card.Body className="">
                          <p className="header">
                          {t('Sales')}
                          <span className="float-right">
                            <ToolTips placement="auto" label="" message="Message on hover over" />
                          </span>
                          </p>
                          <p className="sub-header mt-1">
                            {getAmount('total_sales')}
                            {/* <small className="text-success"><i className="up"></i>10%</small> */}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="card-stats mb-2">
                        <Card.Body className="">
                          <p className="header">
                          {t('Orders')}
                          <span className="float-right">
                            <ToolTips placement="auto" label="" message="Message on hover over" />
                          </span>
                          </p>
                          <p className="sub-header mt-1">
                            {getNumber('total_orders')}
                            {/* <small className="text-danger"><i className="down"></i>10%</small> */}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="card-stats mb-2">
                        <Card.Body className="clickable-row" onClick={() =>openDetails("send")}>
                          <p className="header">
                          {t('Email Sent')}
                          <span className="float-right">
                            <ToolTips placement="auto" label="" message="Message on hover over" />
                          </span>
                          </p>
                          <p className="sub-header mt-1">
                            {getNumber('total_email_sent')}
                            {/* <small className="text-success"><i className="up"></i>10%</small> */}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>

                  </Row>
              </Col>
              <Col lg={3}>
                <h4>Best Performing ASIN</h4>
                <Table hover>
                    <thead>
                        <tr>
                            <th>{t('#')}</th>
                            <th>{t('ASIN')}</th>
                            <th>{t('Visibility Score')}</th>
                        </tr>
                    </thead>
                    <tbody>
                      { asinperformance && asinperformance[0] &&  asinperformance[0].best.map((best, key) =>
                        <tr>
                            <td>{key+1}</td>
                            <td>{best.asin}</td>
                            <td>{best.visibility_score}</td>
                        </tr>
                      )}
                    </tbody>
                </Table>
              </Col>
              <Col lg={3}>
                <h4>Worst Performing ASIN</h4>
                <Table hover>
                    <thead>
                        <tr>
                            <th>{t('#')}</th>
                            <th>{t('ASIN')}</th>
                            <th>{t('Visibility Score')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    { asinperformance && asinperformance[0] && asinperformance[0].worst.map((best, key) =>
                      <tr>
                          <td>{key+1}</td>
                          <td>{best.asin}</td>
                          <td>{best.visibility_score}</td>
                      </tr>
                    )}
                    </tbody>
                </Table>
              </Col>
            </Row>


          </div>
        </div>
      </Card.Body>
    </Card>
  </>);
}

export default withRouter(Dashboard);
