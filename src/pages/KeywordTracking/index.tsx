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
import { CURRENCIES } from "../../constants";
//actions
import {
    getMarketPlaces,
    getKtproducts,
    getMembershipPlan,
    getKeywordTrackingData,
    getSalesChartData,
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

    const queryParam: any = props.location.search;
    const [successMsg, setSuccessMsg] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<any>(null);

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


    const { loading, products, keywordTrackingData, markets, isMarketsFetched, salesChartData } = useSelector((state: any) => ({
        loading: state.Company.KeywordTracking.loading,
        isKtproductsFetched: state.Company.KeywordTracking.isKtproductsFetched,
        products: state.Company.KeywordTracking.products,
        redirectUri: state.MarketPlaces.redirectUri,

        membershipPlan: state.Company.MembershipPlan.membershipPlan,
        keywordTrackingData: state.Dashboard.keywordTrackingData,
        salesChartData: state.Dashboard.salesChartData,

        markets: state.MarketPlaces.markets,
        isMarketsFetched: state.MarketPlaces.isMarketsFetched,
    }));


    const companyId = props.match.params.companyId;

    const defaultParams = useMemo(() => ({ 'limit': 100000000, 'status__name': 'Active' }), []);

    const openDetails = (product: any) => {
        history.push(`/keyword-tracking/${companyId}/product/${product.id}/`);
    }

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

    const onMarketChange = useCallback((market: any) => {
      setSelectedMarket(market);
      const filters = {...getDates(selectedPeriod)};
      if (market) {
        filters['marketplace'] = market['value'];
      }
      dispatch(getKeywordTrackingData(companyId, filters));
      dispatch(getSalesChartData(companyId, filters));
    }, [dispatch, companyId, getDates, selectedPeriod]);

    useEffect(() => {
      if (isMarketsFetched) {
        const activeMarkets = markets ? markets.filter(m => m['status'] === 'active'): [];
        if (activeMarkets && activeMarkets.length) {
          onMarketChange({label: t('Amazon') + " " + activeMarkets[0]['country'], value: activeMarkets[0]['id'], icon: activeMarkets[0]['country']});
        } else {
          dispatch(getKeywordTrackingData(companyId, {...getDates(selectedPeriod)}));
          dispatch(getSalesChartData(companyId, {...getDates(selectedPeriod)}));
        }
      }
    }, [dispatch, markets, getDates, t, companyId, selectedPeriod, onMarketChange, isMarketsFetched]);


    // get the data
    useEffect(() => {
        dispatch(getMarketPlaces(companyId, { 'limit': 100000000 }));
        dispatch(getKtproducts(companyId, defaultParams));
        dispatch(getMembershipPlan(companyId, { is_active: true }));
    }, [dispatch, companyId, defaultParams, getDates, selectedPeriod]);


    const onPeriodChange = (period: string) => {
      setSelectedPeriod(period);
      const filters = {...getDates(period)};
      if (selectedMarket) {
        filters['marketplace'] = selectedMarket['value'];
      }
      dispatch(getKeywordTrackingData(companyId, filters));
      dispatch(getSalesChartData(companyId, filters));
    }

    const onDateChange = (dates: any) => {
      const filters = {};
      const dateFormat = 'MM/DD/YYYY';

      if (dates) {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        if (start && end) {
          filters['start_date'] = dayjs(start).format(dateFormat);
          filters['end_date'] = dayjs(end).format(dateFormat);
          dispatch(getKeywordTrackingData(companyId, filters));
          dispatch(getSalesChartData(companyId, filters));
        }
      } else {
        setStartDate(null);
        setEndDate(null);
        dispatch(getKeywordTrackingData(companyId, filters));
        dispatch(getSalesChartData(companyId, filters));
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
                    <Col className="text-right" md={3}>
                      <Row>
                        <Col>
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
                        <Col>
                          <MarketPlacesDropdown name='marketplace' placeholder={t('Market')}
                            onChange={onMarketChange}
                            className="text-left"
                            value={selectedMarket}
                            isSingle={true}
                            companyId={companyId} />
                        </Col>
                      </Row>
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
                                {!loading ? <OverallChart data={keywordTrackingData ? keywordTrackingData : {}} />: <div style={{height: 350}}></div>}
                              </Col>
                            </Row>
                            <Row>
                                <Col lg={12}>

                                    <div className={"list-view"}>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>{t("Product")}</th>
                                                    <th>{t("Keywords")}</th>
                                                    <th>{t("Visibility Score")}</th>
                                                    <th>{t("Status")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {products.map((product,key) =>
                                              <tr key={key} className="clickable-row" onClick={() => openDetails(product)}>
                                                <td>
                                                  <div className="d-flex">
                                                      <div className="border rounded-sm p-1 mr-2 d-flex align-items-center">
                                                        <img className="img-sm" src={size(product.images) > 0 ? (
                                                          find(product.images, img => !!img.main_image) ?
                                                            find(product.images, img => !!img.main_image).image :
                                                            get(product, "images[0].image")) :
                                                          dummyImage}
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
