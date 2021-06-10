import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Table } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { withRouter, useHistory } from "react-router-dom";
import { default as dayjs } from 'dayjs';
import { find, get, size } from "lodash";
import Flag from 'react-flagkit';

//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import ToolTips from "../../components/ToolTips"
import CurrenciesDropdown from "../../components/CurrenciesDropdown";
import MarketPlacesDropdown from "../../components/MarketPlacesDropdown";
import ComparePercentage from "../../components/ComparePercentage";
import { getSalesChartData, getAsinPerformance, getEmailChartData } from "../../redux/actions";
import { CURRENCIES } from "../../constants";
import dummyImage from "../../assets/images/dummy_image.svg";
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

  const { loading, salesChartData, emailChartData, asinperformance } = useSelector((state: any) => ({
    loading: state.Dashboard.loading,
    salesChartData: state.Dashboard.salesChartData,
    emailChartData: state.Dashboard.emailChartData,
    asinperformance: state.Company.KeywordTracking.asinperformance,
  }));

  const getDates = useCallback(() => {
    const today = new Date();

    const start_date = dayjs(new Date(today.getFullYear(), today.getMonth(), 1)).format('MM/DD/YYYY');
    const end_date = dayjs(new Date(today.getFullYear(), today.getMonth() + 1, 0)).format('MM/DD/YYYY');

    return {
      start_date: start_date,
      end_date: end_date
    }
  }, []);

  const [filters, setFilters] = useState<any>({...getDates()});


  useEffect(() => {
    dispatch(getSalesChartData(companyId, filters));
    dispatch(getEmailChartData(companyId, filters));
    dispatch(getAsinPerformance(companyId, filters));
  }, [dispatch, companyId, getDates, filters]);


  const onMarketChange = (market: any) => {
    setSelectedMarket(market);
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

  const dateFormat = 'MM/DD/YYYY';
  
  const onDateChange = (dates: any) => {
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
      setFilters({...filters, 'start_date': "", 'end_date': ""});
    }
  }

  const defaultDates = getDates();

  const getSelectdValue = () => {
    
    let dateStr = startDate ? dayjs(startDate).format(dateFormat) : defaultDates['start_date'];
    if (dateStr && endDate) {
      dateStr = `${dateStr} - ${dayjs(endDate).format(dateFormat)}`;
    } else if (dateStr && defaultDates['end_date']) {
      dateStr = `${dateStr} - ${defaultDates['end_date']}`;
    }
    return dateStr;
  };

  let noOfDays = 0;
  
  if (startDate && endDate) {
    noOfDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
  } else if (defaultDates && defaultDates['start_date'] && defaultDates['end_date']) {
    const st = Date.parse(defaultDates['start_date']);
    const en = Date.parse(defaultDates['end_date']);
    noOfDays = Math.round((en - st) / (1000 * 60 * 60 * 24));
  }

  let prevStartDate = new Date();
  let prevEndDate = new Date();

  if (startDate || defaultDates['start_date']) {
    const st = startDate || new Date(Date.parse(defaultDates['start_date']));
    prevStartDate.setDate(st.getDate() - noOfDays - 1);
    prevEndDate.setDate(st.getDate() - 1);
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
      <Row>
        <Col></Col>
        {prevStartDate && prevEndDate ? <Col sm={2}>
          <span className="pl-2 text-muted">Compared to {dayjs(prevStartDate).format(dateFormat)}-{dayjs(prevEndDate).format(dateFormat)}</span>
        </Col> : null}
        <Col sm={2}></Col>
      </Row>
    </div>


        {loading ? <Loader /> : null}

        <div>
          <div className="px-2">
            <Row className="mt-1 mb-3">
              <Col lg={6}>
                { !loading ? <OverallChart data={salesChartData && salesChartData.chartData ? salesChartData.chartData : {}}
                  selectedCurrency={selectedCurrency['value']} extraYaxis={true} />: <div style={{height: 350}}></div> }

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
                            <ComparePercentage value={ salesChartData && salesChartData.stats ? salesChartData.stats["total_sales_percentage"] || 0 : 0 } />
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
                            <ComparePercentage value={ salesChartData && salesChartData.stats ? salesChartData.stats["total_orders_percentage"] || 0 : 0 } />
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
                            <ComparePercentage value={ emailChartData && emailChartData.stats ? emailChartData.stats["email_sent_percentage"] || 0 : 0 } />
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
                            <ComparePercentage value={ emailChartData && emailChartData.stats ? emailChartData.stats["opt_out_rate_percentage"] || 0 : 0 } />
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>

                  </Row>
              </Col>
              { selectedMarket.value == "all" ? <>
              <Col lg={2}>
                <h4>Best Performing Marketplaces</h4>
                <Table hover>
                    <thead>
                        <tr>
                            <th>{t('Marketplace')}</th>
                            <th>{t('Visibility Score')}</th>
                        </tr>
                    </thead>
                    <tbody>
                      { asinperformance && asinperformance[0] &&  asinperformance[0].best.map((best, key) =>
                        <tr>
                            <td>
                              <div className="d-flex">
                                  <div className="border rounded-sm p-1 mr-2 d-flex align-items-center">
                                      <Flag country={best.name} />
                                  </div>
                                  <div>
                                      <h6 className='my-0'>Amazon {best.name}</h6>
                                  </div>
                              </div>
                            </td>
                            <td>
                            {best.visibility_score}
                            <ComparePercentage value={ best.visibility_score_per ? best.visibility_score_per : 0 } />
                            </td>
                        </tr>
                      )}
                    </tbody>
                </Table>
              </Col>
              <Col lg={2}>
                <h4>Worst Performing Marketplaces</h4>
                <Table hover>
                    <thead>
                        <tr>
                            <th>{t('Marketplace')}</th>
                            <th>{t('Visibility Score')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    { asinperformance && asinperformance[0] && asinperformance[0].worst.map((worst, key) =>
                      <tr>
                          <td>
                            <div className="d-flex">
                                <div className="border rounded-sm p-1 mr-2 d-flex align-items-center">
                                    <Flag country={worst.name} />
                                </div>
                                <div>
                                    <h6 className='my-0'>Amazon {worst.name}</h6>
                                </div>
                            </div>
                          </td>
                          <td>
                          {worst.visibility_score}
                          <ComparePercentage value={ worst.visibility_score_per ? worst.visibility_score_per : 0 } />
                          </td>
                      </tr>
                    )}
                    </tbody>
                </Table>
              </Col>
              <Col lg={2}>
                <h4>Trending Marketplaces</h4>
                <Table hover>
                    <thead>
                        <tr>
                            <th>{t('Marketplace')}</th>
                            <th>{t('Visibility Score')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    { asinperformance && asinperformance[0] && asinperformance[0].trending.map((trending, key) =>
                      <tr>
                          <td>
                            <div className="d-flex">
                                <div className="border rounded-sm p-1 mr-2 d-flex align-items-center">
                                    <Flag country={trending.name} />
                                </div>
                                <div>
                                    <h6 className='my-0'>Amazon {trending.name}</h6>
                                </div>
                            </div>
                          </td>
                          <td>
                          {trending.visibility_score}
                          <ComparePercentage value={ trending.visibility_score_per ? trending.visibility_score_per : 0 } />
                          </td>
                      </tr>
                    )}
                    </tbody>
                </Table>
              </Col> </>
              :
              <><Col lg={2}>
                <h4>Best Performing ASIN</h4>
                <Table hover>
                    <thead>
                        <tr>
                            <th>{t('ASIN')}</th>
                            <th>{t('Visibility Score')}</th>
                        </tr>
                    </thead>
                    <tbody>
                      { asinperformance && asinperformance[0] &&  asinperformance[0].best.map((best, key) =>
                        <tr>
                            <td>
                              <div className="d-flex">
                                  <div className="border rounded-sm p-1 mr-2 d-flex align-items-center">
                                    <img className="img-sm" src={best.thumbnail? best.thumbnail:dummyImage}
                                      alt={best.title} width="30" />
                                  </div>
                                  <div>
                                      <h6 className='my-0'>{best.asin}</h6>
                                  </div>
                              </div>
                            </td>
                            <td>
                            {best.visibility_score}
                            <ComparePercentage value={ best.visibility_score_per ? best.visibility_score_per : 0 } />
                            </td>
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
                            <th>{t('ASIN')}</th>
                            <th>{t('Visibility Score')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    { asinperformance && asinperformance[0] && asinperformance[0].worst.map((worst, key) =>
                      <tr>
                          <td>
                            <div className="d-flex">
                                <div className="border rounded-sm p-1 mr-2 d-flex align-items-center">
                                  <img className="img-sm" src={worst.thumbnail? worst.thumbnail:dummyImage}
                                    alt={worst.title} width="30" />
                                </div>
                                <div>
                                    <h6 className='my-0'>{worst.asin}</h6>
                                </div>
                            </div>
                          </td>
                          <td>
                          {worst.visibility_score}
                          <ComparePercentage value={ worst.visibility_score_per ? worst.visibility_score_per : 0 } />
                          </td>
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
                            <th>{t('ASIN')}</th>
                            <th>{t('Visibility Score')}</th>
                        </tr>
                    </thead>
                    <tbody>
                    { asinperformance && asinperformance[0] && asinperformance[0].trending.map((trending, key) =>
                      <tr>
                          <td>
                            <div className="d-flex">
                                <div className="border rounded-sm p-1 mr-2 d-flex align-items-center">
                                  <img className="img-sm" src={trending.thumbnail? trending.thumbnail:dummyImage}
                                    alt={trending.title} width="30" />
                                </div>
                                <div>
                                    <h6 className='my-0'>{trending.asin}</h6>
                                </div>
                            </div>
                          </td>
                          <td>
                          {trending.visibility_score}
                          <ComparePercentage value={ trending.visibility_score_per ? trending.visibility_score_per : 0 } />
                          </td>
                      </tr>
                    )}
                    </tbody>
                </Table>
              </Col> </>
            }
            </Row>


          </div>
        </div>
  </>);
}

export default withRouter(Dashboard);
