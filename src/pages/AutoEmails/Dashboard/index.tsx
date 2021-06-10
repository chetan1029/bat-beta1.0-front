import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { withRouter, useHistory } from "react-router-dom";
import { default as dayjs } from 'dayjs';

//components
import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader";
import ToolTips from "../../../components/ToolTips"
import CurrenciesDropdown from "../../../components/CurrenciesDropdown";
import MarketPlacesDropdown from "../../../components/MarketPlacesDropdown";
import { getEmailChartData } from "../../../redux/actions";
import { CURRENCIES } from "../../../constants";
import ComparePercentage from "../../../components/ComparePercentage";

import OverallChart from "../../Dashboard/OverallChart";

//Plug-in's
import DatePicker from 'react-datepicker';

interface AutoEmailsDashboardProps {
  match?: any;
}

const AutoEmailsDashboard = (props: AutoEmailsDashboardProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const companyId = props.match.params.companyId;

  const [selectedCurrency, setSelectedCurrency] = useState({label: CURRENCIES['USD'], value: 'USD'});
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState<any>({label: "All", value: 'all', icon: ''});
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);


  const { loading, emailChartData } = useSelector((state: any) => ({
    loading: state.Dashboard.loading,
    emailChartData: state.Dashboard.emailChartData,
  }));

  const getDates = useCallback(() => {
    const today = new Date();

    const start_date = dayjs(new Date(today.getFullYear(), today.getMonth(), 1)).format('MM/DD/YYYY');
    const end_date = dayjs(new Date(today.getFullYear(), today.getMonth() + 1, 0)).format('MM/DD/YYYY')

    return {
      start_date: start_date,
      end_date: end_date
    }
  }, []);

  const [filters, setFilters] = useState<any>({...getDates()});

  useEffect(() => {
    dispatch(getEmailChartData(companyId, filters));
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
        <Col>
          <div className="text-right">
          {prevStartDate && prevEndDate ?
            <span className="pl-2 text-muted">Compared to {dayjs(prevStartDate).format(dateFormat)}-{dayjs(prevEndDate).format(dateFormat)}</span>
          : null}
          </div>
        </Col>
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
              isClearable={false}
              shouldCloseOnSelect={false}
              value={getSelectdValue()}
              selected={startDate}
          />
        </Col>
        <Col sm={2}>
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
              {!loading ? <OverallChart data={emailChartData && emailChartData.chartData ? emailChartData.chartData : {}} />: <div style={{height: 350}}></div>}
              </Col>
              <Col lg={6}>
                <Row className="mb-3">
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
                      <Card.Body className="clickable-row" onClick={() =>openDetails("queued")}>
                        <p className="header">

                        {t('Email in Queue')}
                        <span className="float-right">
                          <ToolTips placement="auto" label="" message="Message on hover over" />
                        </span>
                        </p>
                        <p className="sub-header mt-1">
                          { getNumber(emailChartData && emailChartData.stats ? emailChartData.stats["total_email_in_queue"] || 0 : 0)}
                          <ComparePercentage value={ emailChartData && emailChartData.stats ? emailChartData.stats["email_in_queue_percentage"] || 0 : 0 } />
                        </p>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card className="card-stats mb-2">
                      <Card.Body className="clickable-row" onClick={() =>openDetails("opt-out")}>
                        <p className="header">

                        {t('Opt-out Emails')}
                        <span className="float-right">
                          <ToolTips placement="auto" label="" message="Message on hover over" />
                        </span>
                        </p>
                        <p className="sub-header mt-1">
                          { getNumber(emailChartData && emailChartData.stats ? emailChartData.stats["total_opt_out_email"] || 0 : 0)}
                          <ComparePercentage value={ emailChartData && emailChartData.stats ? emailChartData.stats["opt_out_email_percentage"] || 0 : 0 } />
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
            </Row>
          </div>
        </div>
  </>);
}

export default withRouter(AutoEmailsDashboard);
