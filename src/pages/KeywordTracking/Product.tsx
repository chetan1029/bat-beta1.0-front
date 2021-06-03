import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Button, Form, Dropdown, DropdownButton } from "react-bootstrap";
import { useHistory, withRouter, Link } from "react-router-dom";
import Icon from "../../components/Icon";
import { useTranslation } from 'react-i18next';
import dummyImage from "../../assets/images/dummy_image.svg";
import { find, get, map, size, uniqBy, findIndex } from "lodash";
import { default as dayjs } from 'dayjs';
import DatePicker from 'react-datepicker';
import Select from "react-select";
import searchIcon from "../../assets/images/search_icon.svg";
import classNames from "classnames";
//components
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import AddKeywords from "./AddKeywords";
import OverallChart from "../Dashboard/OverallChart";
import ProductKeywordChart from "./ProductKeywordChart";
import OrderByIcon from "../../components/OrderByIcon";

//actions
import { APICore } from '../../api/apiCore';
import {
  resetDashboard,
  getKtproduct,
  getKeywordranks,
  getMembershipPlan,
  performBulkActionKeywords,
  getKeywordTrackingData,
  getProductKeywordData,
  exportKeywords,
} from "../../redux/actions";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

interface KeywordTrackingProps {
  match: any;
  location?: any;
}

const FILETYPES: Array<any> = [
	{ label: "As csv", value: "csv" },
	{ label: "As xls", value: "xls" },
	{ label: "As csv (Filtered Data)", value: "csv-filtered" },
	{ label: "As xls (Filtered Data)", value: "xls-filtered" },
];

const KeywordTrackingProduct = (props: KeywordTrackingProps) => {
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

  const api = new APICore();

  const [selectedPeriod, setSelectedPeriod] = useState('1m');

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


  const { loading, product, redirectUri, keywordranks, totalKeywordranks, membershipPlan, isKeywordsCreated, keywordTrackingData, productKeywordData, isBulkActionPerformed, isProductKeywordChartFetched } = useSelector((state: any) => ({
    loading: state.Company.KeywordTracking.loading,
    isKtproductsFetched: state.Company.KeywordTracking.isKtproductsFetched,
    product: state.Company.KeywordTracking.product,
    redirectUri: state.MarketPlaces.redirectUri,
    keywordranks: state.Company.KeywordTracking.keywordranks,
    totalKeywordranks: state.Company.KeywordTracking.totalKeywordranks,
    membershipPlan: state.Company.MembershipPlan.membershipPlan,
    isKeywordsCreated: state.Company.KeywordTracking.isKeywordsCreated,
    keywordTrackingData: state.Dashboard.keywordTrackingData,
    isBulkActionPerformed: state.Company.KeywordTracking.isBulkActionPerformed,
    productKeywordData: state.Dashboard.productKeywordData,
    isProductKeywordChartFetched: state.Dashboard.isProductKeywordChartFetched,
  }));


  useEffect(() => {
    dispatch(resetDashboard());
  }, []);

  const companyId = props.match.params.companyId;
  const productId = props.match.params.productId;

  const today = new Date();
  const [currentdate, setCurrentdate] = useState(today);

  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);


  const [selectedKeywords, setSelectedKeywords] = useState<any>([]);
  const [filters, setFilters] = useState<any>({
    'productkeyword__amazonproduct': productId,
    'date': dayjs(currentdate).format('YYYY-MM-DD'),
    'limit': 10000,
  });
  const [search, setSearch] = useState<any>({
    'productkeyword__amazonproduct': productId,
    'date': dayjs(currentdate).format('YYYY-MM-DD'),
    'limit': 10000,
  });

  const [keywordFrequency, setKeywordFrequency] = useState<any>({label: "All Keywords", value: "10000"});
  const [searchType, setSearchType] = useState<any>({label: "Inclusive (All)", value: "inclusive-all"});


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

  // get the data
  useEffect(() => {
    dispatch(getKtproduct(companyId, productId));
    dispatch(getMembershipPlan(companyId, { is_active: true }));
    dispatch(getKeywordTrackingData(companyId, { ...getDates(selectedPeriod), product_id: productId }));
  }, [dispatch, companyId, productId, getDates, selectedPeriod]);

  useEffect(() => {
    dispatch(getKeywordranks(companyId, filters));
  }, [dispatch, companyId, productId, getDates, filters, isBulkActionPerformed]);


  const [records, setRecords] = useState<Array<any>>([]);

  const onDateChange = (dates: any) => {
    const filters = {};
    const dateFormat = 'YYYY-MM-DD';

    filters["productkeyword__amazonproduct"] = productId;
    filters["limit"] = 10000;

    if (dates) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);

      if (start && end) {
        filters['start_date'] = dayjs(start).format(dateFormat);
        filters['end_date'] = dayjs(end).format(dateFormat);
        dispatch(getKeywordranks(companyId, filters));
      }
    } else {
      setStartDate(null);
      setEndDate(null);
      dispatch(getKeywordranks(companyId, filters));
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

  const onPeriodChange = (period: string) => {
    setSelectedPeriod(period);
    const filters = { ...getDates(period) };
    filters['product'] = productId;
    dispatch(getKeywordTrackingData(companyId, filters));
  }

  const handleSearchKeyDown = (event: any) => {
    const { value } = event.target;
    setSearch(value);
    if ([13].includes(event.keyCode)) {
      setFilters({ ...filters, search_keywords: value, offset: 0, searchtype: searchType.value });
    }
  };

  const handleOnClickSearch = (value: string) => {
    setSearch(value);
    setFilters({ ...filters, search_keywords: value, offset: 0, searchtype: searchType.value });
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

  useEffect(() => {
    if (keywordranks && keywordranks.length > 0) {
      setRecords(prevArray => [...prevArray, ...keywordranks]);
    }
  }, [keywordranks]);

  const uniq = uniqBy(records, (e) => {
    return e.id;
  });

  /*
  add Keywords
  */
  const [isOpen, setisopen] = useState(false);
  const openModal = () => {
    setisopen(true);
  }
  const closeModal = () => {
    setisopen(false);
  }

  /*
      hscode
  */
  const [selectedKeyword, setselectedKeyword] = useState<any>();

  const setKeyword = (keyword: any) => {
    setselectedKeyword(keyword);
    setisopen(true);
  }

  /*
  close modal after creating Keywords
  */
  useEffect(() => {
    if (isKeywordsCreated) {
      setisopen(false);
      dispatch(getKeywordranks(companyId, filters));
    }
  }, [isKeywordsCreated, dispatch, companyId, filters]);

  const handleOnSelectKeywords = (e: any, keywordrank: any) => {
    const index = findIndex(selectedKeywords, _keywordrank => _keywordrank.id === keywordrank.id);

    if (index === -1) {
      setSelectedKeywords([...selectedKeywords, keywordrank]);
    } else {
      setSelectedKeywords(selectedKeywords.filter((keywordrank, i) => i !== index));
    }
  };

  const handleOnSelectAllKeywords = (e: any, selectedKeywords?: Array<any>) => {
    if (e.target.checked) {
      setSelectedKeywords([...(selectedKeywords || [])]);
    } else {
      setSelectedKeywords([]);
    }
  };

  const performBulkAction = (action: string) => {
    dispatch(performBulkActionKeywords(companyId, action, selectedKeywords.map(c => c['id'])));
  }


  const showKeywordChart = (keywordrank: any) => {
    dispatch(getProductKeywordData(companyId, keywordrank.productkeyword.id, { ...getDates(selectedPeriod) }));
  }


  let keywordFrequencyOptions: Array<any> = [{label: "All Keywords", value: "10000"}, {label: "Top 100", value: "100"} , {label: "Top 200", value: "200"}, {label: "Top 500", value: "500"}, {label: "Top 1000", value: "1000"}];

  const handleonSelectKeywordFrequency = (keywordFrequency: any) => {
    setOrderDirection(orderAsc);
    setOrderBy("frequency");
    const orderValue = "frequency";
    setFilters({ ...filters, limit: keywordFrequency.value, ordering: orderValue });
    setKeywordFrequency(keywordFrequency);
  };

  let searchTypeOptions: Array<any> = [{label: "Inclusive (All)", value: "inclusive-all"}, {label: "Inclusive (Any)", value: "inclusive-any"} , {label: "Exclusive (All)", value: "exclusive-all"}, {label: "Exclusive (Any)", value: "exclusive-any"}];

  const plan = membershipPlan && membershipPlan.results && membershipPlan.results.length ? membershipPlan.results[0]['plan'] : null;
  const quotas = plan ? (plan['plan_quotas'] || []).find(pq => (pq['quota'] && pq['quota']['codename'] === "MARKETPLACES")) : {};

  const isActiveMarket = quotas && quotas['available_quota'] > 0 ? true : false;


  return (
    <>
      {loading ? <Loader /> : null}
      {product ? <>
        <div className="py-4">
          <Row className='align-items-center'>
            <Col>
              <div className="d-flex align-items-center">
                <Link to={`/keyword-tracking/dashboard/${companyId}/`}>
                  <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                </Link>

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
                    placeholderText={'Activation Date'}
                    className={"form-control"}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={onDateChange}
                    selectsRange={true}
                    shouldCloseOnSelect={false}
                    value={getSelectdValue()}
                    selected={startDate}
                    dateFormat={"yyyy-MM-dd"}
                    maxDate={today}
                    timeFormat="hh:mm"
                    id="FilterDate"
                  />
                </Col>
                <Col>
                  <Button
                    variant="primary"
                    block onClick={() => {
                      openModal();
                    }}
                  >
                    {t("Add Keywords")}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <div>
          <div >
            <Row className="mt-1 mb-3">
              <Col lg={12}>
                {!loading && !isProductKeywordChartFetched ? <OverallChart data={keywordTrackingData ? keywordTrackingData : {}}
                  /> : <ProductKeywordChart data={productKeywordData ? productKeywordData : {}} changePeriod={onPeriodChange}
                    selectedPeriod={selectedPeriod} />}
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <Select
                  placeholder={t('All Keywords')}
                  options={keywordFrequencyOptions}
                  classNamePrefix="react-select"
                  name= "order_status"
                  id="order_status"
                  onChange={(value: any) => {
                    handleonSelectKeywordFrequency(value);
                  }}
                  value={keywordFrequency}
                  className={classNames(
                    "react-select",
                    "react-select-regular",
                  )}
                />
              </Col>
              <Col sm={3}>
                <Select
                  placeholder={t('Search Type')}
                  options={searchTypeOptions}
                  classNamePrefix="react-select"
                  name= "order_status"
                  id="order_status"
                  onChange={(value: any) => {
                    setSearchType(value);
                  }}
                  value={searchType}
                  className={classNames(
                    "react-select",
                    "react-select-regular",
                  )}
                />
              </Col>
              <Col sm={3}>
                <div className="search">
                    <input type="text" placeholder="Separate multiple keywords by comma(,)"
                      onChange={(e: any) => setSearch(e.target.value)}
                      onKeyDown={handleSearchKeyDown} />
                    <button type="submit">
                      <img src={searchIcon} alt=""
                        onClick={() => handleOnClickSearch(search)} />
                    </button>
                </div>
              </Col>
              <Col sm={3}>
                <Dropdown className="float-right">
  								<Dropdown.Toggle variant="none" id="export" className='p-0 border-0 mx-3 mt-3 export'
  									as={Link}>
  									<Icon name="export" className="icon icon-xs  mr-2" />
  									<span className='font-weight-bold'>{t('Export')}</span>
  								</Dropdown.Toggle>

  								<Dropdown.Menu>
  									{map(FILETYPES, (file, index) => (
  										<Dropdown.Item key={index}
                      onClick={() => {
												if (file.value === 'csv-filtered' || file.value === 'xls-filtered')
													dispatch(exportKeywords(companyId, file.value, filters))
												else
													dispatch(exportKeywords(companyId, file.value))
											}}
                      >
  											{file.label}
  										</Dropdown.Item>
  									))}
  								</Dropdown.Menu>
  							</Dropdown>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className={"list-view"}>
                  <p className="mt-3">{totalKeywordranks} Keywords</p>
                  <Table className="mt-3">
                    <thead>
                      <tr>
                        <th className="index">
                          <Form.Check
                            type="switch"
                            id={"checkbox"}
                            label=""
                            checked={selectedKeywords && selectedKeywords.length}
                            onChange={(e: any) => handleOnSelectAllKeywords(e, uniq)}
                          />
                        </th>
                        {!(selectedKeywords && selectedKeywords.length) ?
                          <><th onClick={() => handleOnClickOrderBy("productkeyword__keyword__name")} className={"clickable-row"}>{t("Keywords")} <OrderByIcon orderField={"productkeyword__keyword__name"} orderBy={orderBy} orderDirection={orderDirection} /></th>
                            <th onClick={() => handleOnClickOrderBy("frequency")} className={"clickable-row"}>{t("Search Frequency")} <OrderByIcon orderField={"frequency"} orderBy={orderBy} orderDirection={orderDirection} /></th>
                            <th onClick={() => handleOnClickOrderBy("index")} className={"clickable-row"}>{t("Indexed")} <OrderByIcon orderField={"index"} orderBy={orderBy} orderDirection={orderDirection} /></th>
                            <th onClick={() => handleOnClickOrderBy("rank")} className={"clickable-row"}>{t("Rank")} <OrderByIcon orderField={"rank"} orderBy={orderBy} orderDirection={orderDirection} /></th>
                            <th onClick={() => handleOnClickOrderBy("page")} className={"clickable-row"}>{t("Page")} <OrderByIcon orderField={"page"} orderBy={orderBy} orderDirection={orderDirection} /></th>
                            <th onClick={() => handleOnClickOrderBy("visibility_score")} className={"clickable-row"}>{t("Visibility Score")} <OrderByIcon orderField={"visibility_score"} orderBy={orderBy} orderDirection={orderDirection} /></th>
                            <th>{t("Action")}</th>
                          </>
                          :
                          <>
                            <th colSpan={7} className="pt-0 pb-0"><DropdownButton variant="outline-secondary" id="dropdown-button-more-action" title={t('More Actions')}
                              disabled={!(selectedKeywords && selectedKeywords.length)}>
                              <Dropdown.Item onClick={() => performBulkAction('delete')}>{t('Delete Keywords')}</Dropdown.Item>
                            </DropdownButton></th>
                          </>
                        }
                      </tr>
                    </thead>
                    <tbody>
                      {keywordranks && keywordranks.map((keywordrank, key) =>
                        <tr key={key}>
                          <td>
                            <Form.Check
                              type="switch"
                              key={keywordrank.id}
                              id={`checkbox${keywordrank.id}`}
                              label=""
                              checked={!!find(selectedKeywords, _keywordrank => _keywordrank.id === keywordrank.id)}
                              onChange={(e: any) => handleOnSelectKeywords(e, keywordrank)}
                            />
                          </td>
                          <td onClick={() => showKeywordChart(keywordrank)} className={"clickable-row"}>{keywordrank.productkeyword.keyword.name}</td>
                          <td>{keywordrank.frequency}</td>
                          <td>{keywordrank.index ? <Icon name="check" className="icon icon-sm svg-outline-success" /> : <Icon name="x" className="icon icon-sm svg-outline-muted" />}</td>
                          <td>{keywordrank.rank}</td>
                          <td>{keywordrank.page}</td>
                          <td>{keywordrank.visibility_score}</td>
                          <td><a href={`https://${(product.amazonaccounts.marketplace.sales_channel_name).toLowerCase()}/s?k=${keywordrank.productkeyword.keyword.name}&page=${keywordrank.page}`} target="_blank">View Rank</a></td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {successMsg ? <MessageAlert message={successMsg} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
        {errorMsg ? <MessageAlert message={errorMsg} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
      </> : null}

      {isOpen ? <AddKeywords isOpen={isOpen} onClose={closeModal} companyId={companyId} productId={productId} amazonaccountId={product.amazonaccounts.id} /> : null}
    </>
  );
}

export default withRouter(KeywordTrackingProduct);
