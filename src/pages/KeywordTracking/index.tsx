import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Card } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import Icon from "../../components/Icon";
import { useTranslation } from 'react-i18next';
import dummyImage from "../../assets/images/dummy_image.svg";
import { find, get, size } from "lodash";
import { default as dayjs } from 'dayjs';
import DatePicker from 'react-datepicker';
import searchIcon from "../../assets/images/search_icon.svg";
//components
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import MarketPlacesDropdown from "../../components/MarketPlacesDropdown";
import OverallChart from "../Dashboard/OverallChart";
import OrderChart from "../Dashboard/OrderChart";
import OrderByIcon from "../../components/OrderByIcon";
import { CURRENCIES } from "../../constants";
//actions
import {
    getMarketPlaces,
    getKtproducts,
    getMembershipPlan,
    getKeywordTrackingData,
    getSalesChartData,
    getSessionChartData,
} from "../../redux/actions";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

interface KeywordTrackingProps {
    match: any;
    location?: any;
}

const KeywordTracking = (props: KeywordTrackingProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const orderAsc = 1;
    const orderDesc = -1;

    const queryParam: any = props.location.search;
    const [successMsg, setSuccessMsg] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<any>(null);
    const [orderBy, setOrderBy] = useState<any>("");
    const [orderDirection, setOrderDirection] = useState<any>(orderAsc);

    const [selectedPeriod, setSelectedPeriod] = useState('1m');
    const [selectedMarket, setSelectedMarket] = useState<any>({label: "All", value: 'all', icon: ''});

    const [startDate, setStartDate] = useState<any>(null);
    const [endDate, setEndDate] = useState<any>(null);

    const [selectedCurrency, setSelectedCurrency] = useState({label: CURRENCIES['USD'], value: 'USD'});

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


    const { loading, products, keywordTrackingData, markets, isMarketsFetched, salesChartData, sessionChartData } = useSelector((state: any) => ({
        loading: state.Company.KeywordTracking.loading,
        isKtproductsFetched: state.Company.KeywordTracking.isKtproductsFetched,
        products: state.Company.KeywordTracking.products,
        redirectUri: state.MarketPlaces.redirectUri,

        membershipPlan: state.Company.MembershipPlan.membershipPlan,
        keywordTrackingData: state.Dashboard.keywordTrackingData,
        salesChartData: state.Dashboard.salesChartData,
        sessionChartData: state.Dashboard.sessionChartData,

        markets: state.MarketPlaces.markets,
        isMarketsFetched: state.MarketPlaces.isMarketsFetched,
    }));


    const companyId = props.match.params.companyId;


    const openDetails = (product: any) => {
        history.push(`/keyword-tracking/${companyId}/product/${product.id}/`);
    }

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
    const [search, setSearch] = useState<any>("");

    // get the data
    useEffect(() => {
        dispatch(getMarketPlaces(companyId, { 'limit': 100000000 }));
        dispatch(getMembershipPlan(companyId, { is_active: true }));
    }, [dispatch, companyId]);


    useEffect(() => {
        dispatch(getKtproducts(companyId, {...filters, 'limit': 100000000, 'status__name': 'Active'}));
        dispatch(getKeywordTrackingData(companyId, filters));
        dispatch(getSalesChartData(companyId, filters));
        dispatch(getSessionChartData(companyId, filters));
    }, [dispatch, companyId, filters]);

    const onMarketChange = (market: any) => {
      setSelectedMarket(market);
      if (market) {
        setFilters({...filters,'marketplace':market['value']});
      }
    }

    const handleSearchKeyDown = (event: any) => {
      const { value } = event.target;
      setSearch(value);
      if ([13].includes(event.keyCode)) {
        setFilters({ ...filters, search: value, offset: 0 });
      }
    };

    const handleOnClickOrderBy = (value: any) => {
      var orderType = "";
      if (orderBy === value){
        if(orderDirection === orderAsc){
          setOrderDirection(orderDesc);
          orderType = "-";
        }else{
          setOrderDirection(orderAsc);
          orderType = "";
        }
      }else{
        setOrderDirection(orderAsc);
        orderType = "";
      }
      setOrderBy(value);
      const orderValue = orderType+""+value;
      setFilters({ ...filters, ordering: orderValue });

    };

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



    return (
        <>
            {loading ? <Loader /> : <><div className="py-4">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Icon name="graph" className="icon icon-xs  mr-2" />
                            <h1 className="m-0">{t('Keyword Tracking Dashboard')}</h1>

                        </div>
                    </Col>
                    <Col>
                      {/*<div className="text-right">
                      {prevStartDate && prevEndDate ?
                        <span className="pl-2 text-muted">Compared to {dayjs(prevStartDate).format(dateFormat)}-{dayjs(prevEndDate).format(dateFormat)}</span>
                      : null}
                      </div>*/}
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
                            className="text-left"
                            value={selectedMarket}
                            isSingle={true}
                            companyId={companyId} />
                        </Col>
                </Row>
            </div>
            <div>
                        <div>
                            <Row className="mb-3">
                              <Col lg={4}>
                                <h4>Keyword visibility</h4>
                                {!loading ? <OverallChart data={keywordTrackingData ? keywordTrackingData : {}} />: <div style={{height: 350}}></div>}
                              </Col>
                              <Col lg={4}>
                                <h4>Sales</h4>
                                {!loading ? <OverallChart data={salesChartData && salesChartData.chartData ? salesChartData.chartData : {}}
                                  selectedCurrency={selectedCurrency['value']} extraYaxis={true} />: <div style={{height: 350}}></div>}
                              </Col>
                              <Col lg={4}>
                                <h4>Session and page views</h4>
                                {!loading ? <OverallChart data={sessionChartData && sessionChartData.chartData ? sessionChartData.chartData : {}} />: <div style={{height: 350}}></div>}
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={5}>
                                <div className="search">
                                  <input type="text" placeholder={t("Search")}
                                    onChange={(e: any) => setSearch(e.target.value)}
                                    onKeyDown={handleSearchKeyDown} value={search} />
                                  <button type="submit">
                                    <img src={searchIcon} alt=""
                                      onClick={() => setFilters({ ...filters, search, offset: 0 })} />
                                  </button>
                                </div>
                              </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col lg={12}>

                                    <div className={"list-view"}>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th onClick={() => handleOnClickOrderBy("title")} className={"clickable-row"}>{t("Product")} <OrderByIcon orderField={"title"} orderBy={orderBy} orderDirection={orderDirection} /></th>
                                                    <th onClick={() => handleOnClickOrderBy("keywords")} className={"clickable-row"}>{t("Keywords")} <OrderByIcon orderField={"keywords"} orderBy={orderBy} orderDirection={orderDirection} /></th>
                                                    <th onClick={() => handleOnClickOrderBy("visibility_score")} className={"clickable-row"}>{t("Visibility Score")} <OrderByIcon orderField={"visibility_score"} orderBy={orderBy} orderDirection={orderDirection} /></th>
                                                    <th onClick={() => handleOnClickOrderBy("sessions")} className={"clickable-row"}>{t("Sessions")} <OrderByIcon orderField={"sessions"} orderBy={orderBy} orderDirection={orderDirection} /></th>
                                                    <th onClick={() => handleOnClickOrderBy("pageviews")} className={"clickable-row"}>{t("Page views")} <OrderByIcon orderField={"pageviews"} orderBy={orderBy} orderDirection={orderDirection} /></th>
                                                    <th>{t("Status")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {products.map((product,key) =>
                                              <tr key={key} className="clickable-row" onClick={() => openDetails(product)}>
                                                <td>
                                                  <div className="d-flex">
                                                      <div className="border rounded-sm p-1 mr-2 d-flex align-items-center">
                                                        <img className="img-sm" src={product.thumbnail? product.thumbnail:dummyImage}
                                                          alt={product.title} width="50" />
                                                      </div>
                                                      <div>
                                                          <h6 className="text-muted font-weight-normal my-0">{product.title}</h6>
                                                          <h6 className='my-0'>{product.asin}</h6>
                                                      </div>
                                                  </div>
                                                </td>
                                                <td>{product.keywords}</td>
                                                <td>{product.visibility_score}</td>
                                                <td>{product.sessions}</td>
                                                <td>{product.pageviews}</td>
                                                <td>{capitalizeFirstLetter(product.status.name)}</td>
                                              </tr>
                                            )}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </>}

            {successMsg ? <MessageAlert message={successMsg} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
            {errorMsg ? <MessageAlert message={errorMsg} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

        </>
    );
}

export default withRouter(KeywordTracking);
