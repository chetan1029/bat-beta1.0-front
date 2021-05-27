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
import { getSalesChartData, getAsinPerformance, getEmailChartData } from "../../redux/actions";
import { CURRENCIES } from "../../constants";

import OverallChart from "./OverallChart";

//Plug-in's
import DatePicker from 'react-datepicker';

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
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [filters, setFilters] = useState<any>(null);

  const { loading, salesChartData, emailChartData, asinperformance } = useSelector((state: any) => ({
    loading: state.Dashboard.loading,
    salesChartData: state.Dashboard.salesChartData,
    emailChartData: state.Dashboard.emailChartData,
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
    dispatch(getSalesChartData(companyId, filters));
    dispatch(getEmailChartData(companyId, filters));
    dispatch(getAsinPerformance(companyId, filters));
  }, [dispatch, companyId, getDates, filters]);

  const onPeriodChange = (period: string) => {
    setSelectedPeriod(period);
    setFilters({...getDates(period)});
    if (selectedMarket) {
      setFilters({...filters,'marketplace':selectedMarket['value']});
    }
  }


  const onMarketChange = (market: any) => {
    setSelectedMarket(market);
    setFilters({...getDates(selectedPeriod)});
    if (market) {
      setFilters({...filters,'marketplace':market['value']});
    }
  }

  const getAmount = (amt: any) => {
    const cFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency['value'],
      maximumFractionDigits: 2
    });
    return cFormatter.format(amt);
  }

  const getNumber = (amt: any) => {
    const cFormatter = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2
    });
    return cFormatter.format(amt);
  }

  const openDetails = (status: any) => {
      history.push(`/auto-emails/${companyId}/email-queue/${status}`);
  }

  const onDateChange = (dates: any) => {
    const dateFormat = 'MM/DD/YYYY';
    if (dates) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);

      if (start && end) {
        setFilters({...filters, 'start_date': dayjs(start).format(dateFormat), 'end_date': dayjs(end).format(dateFormat)});
      }
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  }

  const getSelectdValue = () => {
    const dateFormat = 'MM/DD/YYYY';
    let dateStr = startDate ? dayjs(startDate).format(dateFormat) : "";
    if (dateStr && endDate) {
      dateStr = `${dateStr} - ${dayjs(endDate).format(dateFormat)}`;
    }
    return dateStr;
  };

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
        <Col sm={2}>
          <DatePicker
                popperModifiers={{
                    flip: {
                        enabled: false
                    },
                    preventOverflow: {
                        escapeWithReference: true
                    }
                }}
                selectsRange={true}
                placeholderText={'Date Range'}
                className={"form-control"}
                startDate={startDate}
                endDate={endDate}
                onChange={onDateChange}
                id="FilterDate"
                isClearable={true}
                shouldCloseOnSelect={false}
                value={getSelectdValue()}
                selected={startDate}
            />
        </Col>
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


        {loading ? <Loader /> : null}

        <div>
          <div className="px-2">
            <Row className="mt-1 mb-3">
              <Col lg={6}>
                { !loading ? <OverallChart data={salesChartData && salesChartData.chartData ? salesChartData.chartData : {}} changePeriod={onPeriodChange}
                  selectedCurrency={selectedCurrency['value']} extraYaxis={true} selectedPeriod={selectedPeriod} />: <div style={{height: 350}}></div> }

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
                            { getAmount(salesChartData && salesChartData.stats ? salesChartData.stats["total_sales"] || 0 : 0)}
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
                            { getNumber(salesChartData && salesChartData.stats ? salesChartData.stats["total_orders"] || 0 : 0)}
                            {/* <small className="text-danger"><i className="down"></i>10%</small> */}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Row className="mt-2">
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
                            { getNumber(emailChartData && emailChartData.stats ? emailChartData.stats["total_email_sent"] || 0 : 0)}
                            {/* <small className="text-success"><i className="up"></i>10%</small> */}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col>
                      <Card className="card-stats mb-2">
                        <Card.Body className="">
                          <p className="header">

                          {t('Opt-out Rate(%)')}
                          <span className="float-right">
                            <ToolTips placement="auto" label="" message="Message on hover over" />
                          </span>
                          </p>
                          <p className="sub-header mt-1">
                            { getNumber(emailChartData && emailChartData.stats ? emailChartData.stats["opt_out_rate"] || 0 : 0)}%
                            {/* <small className="text-danger"><i className="down"></i>10%</small> */}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>

                  </Row>
              </Col>
              <Col lg={2}>
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
                            <td>{best.sum_visibility_score}</td>
                        </tr>
                      )}
                    </tbody>
                </Table>
              </Col>
              <Col lg={2}>
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
                    { asinperformance && asinperformance[0] && asinperformance[0].worst.map((worst, key) =>
                      <tr>
                          <td>{key+1}</td>
                          <td>{worst.asin}</td>
                          <td>{worst.sum_visibility_score}</td>
                      </tr>
                    )}
                    </tbody>
                </Table>
              </Col>
              <Col lg={2}>
                <h4>Trending ASIN</h4>
                <Table hover>
                    <thead>
                        <tr>
                            <th>{t('#')}</th>
                            <th>{t('ASIN')}</th>
                            <th>{t('Visibility Score')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    { asinperformance && asinperformance[0] && asinperformance[0].trending.map((trending, key) =>
                      <tr>
                          <td>{key+1}</td>
                          <td>{trending.asin}</td>
                          <td>{trending.sum_visibility_score}</td>
                      </tr>
                    )}
                    </tbody>
                </Table>
              </Col>
            </Row>


          </div>
        </div>
  </>);
}

export default withRouter(Dashboard);
