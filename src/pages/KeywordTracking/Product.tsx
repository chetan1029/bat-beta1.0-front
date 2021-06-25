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
import TagsInput from "../../components/TagsInput";

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
  resetkeywordTracking,
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


  const { loading, product, redirectUri, keywordranks, totalKeywordranks, membershipPlan, isKeywordsCreated, keywordTrackingData, productKeywordData, isBulkActionPerformed, isProductKeywordChartFetched, isKeywordrankFetched } = useSelector((state: any) => ({
    loading: state.Company.KeywordTracking.loading,
    isKtproductsFetched: state.Company.KeywordTracking.isKtproductsFetched,
    product: state.Company.KeywordTracking.product,
    redirectUri: state.MarketPlaces.redirectUri,
    keywordranks: state.Company.KeywordTracking.keywordranks,
    totalKeywordranks: state.Company.KeywordTracking.totalKeywordranks,
    membershipPlan: state.Company.MembershipPlan.membershipPlan,
    isKeywordsCreated: state.Company.KeywordTracking.isKeywordsCreated,
    isKeywordrankFetched: state.Company.KeywordTracking.isKeywordrankFetched,
    keywordTrackingData: state.Dashboard.keywordTrackingData,
    isBulkActionPerformed: state.Company.KeywordTracking.isBulkActionPerformed,
    productKeywordData: state.Dashboard.productKeywordData,
    isProductKeywordChartFetched: state.Dashboard.isProductKeywordChartFetched,
  }));


  useEffect(() => {
    dispatch(resetDashboard());
    dispatch(resetkeywordTracking());
  }, []);

  const companyId = props.match.params.companyId;
  const productId = props.match.params.productId;

  const today = new Date();
  const [currentdate, setCurrentdate] = useState(today);

  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);


  const [selectedKeywords, setSelectedKeywords] = useState<any>([]);

  const [keywordFrequency, setKeywordFrequency] = useState<any>({label: "All Keywords", value: "10000"});
  const [searchType, setSearchType] = useState<any>({label: "Inclusive (All)", value: "inclusive-all"});


  const getDates = useCallback(() => {
    const today = new Date();

    const start_date = dayjs(new Date(today.getFullYear(), today.getMonth(), 1)).format('MM/DD/YYYY');
    const end_date = dayjs(new Date(today.getFullYear(), today.getMonth() + 1, 0)).format('MM/DD/YYYY');

    return {
      start_date: start_date,
      end_date: end_date
    }
  }, []);

  const defaultSetting = {
    'productkeyword__amazonproduct': productId,
    'date': dayjs(currentdate).format('YYYY-MM-DD'),
    'limit': 10000,
  }
  const [defaultFilters, setDefaultFilters] = useState<any>({
    ...getDates(),
    'productkeyword__amazonproduct': productId,
  });
  const [filters, setFilters] = useState<any>(defaultSetting);
  const [search, setSearch] = useState<any>(defaultSetting);


  // get the data
  useEffect(() => {
    dispatch(getKtproduct(companyId, productId));
    dispatch(getMembershipPlan(companyId, { is_active: true }));
  }, [dispatch, companyId, productId, getDates]);

  useEffect(() => {
    if(isBulkActionPerformed){
      dispatch(getKeywordranks(companyId, defaultSetting));
    }else {
      dispatch(getKeywordranks(companyId, filters));
      dispatch(getKeywordTrackingData(companyId, defaultFilters ));
    }
  }, [dispatch, companyId, productId, filters, defaultFilters, isBulkActionPerformed]);

  const [records, setRecords] = useState<Array<any>>([]);

  useEffect(() => {
    if (keywordranks && keywordranks.length > 0) {
      setRecords(keywordranks);
    }
  }, [keywordranks]);

  const dateFormat = 'MM/DD/YYYY';

  const onDateChange = (dates: any) => {
    if (dates) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);

      if (start && end) {
        setDefaultFilters({...defaultFilters, 'start_date': dayjs(start).format(dateFormat), 'end_date': dayjs(end).format(dateFormat)});
      }
    } else {
      setStartDate(null);
      setEndDate(null);
      setDefaultFilters({...defaultFilters, 'start_date': "", 'end_date': ""});
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



  const handleSearchKeyDown = (event: any) => {
    const { value } = event.target;
    setSearch(value);
    if ([13].includes(event.keyCode)) {
      setFilters({ ...filters, search_keywords: value, offset: 0, searchtype: searchType.value });
    }
  };

  const handleOnClickSearch = (value: string) => {
    dispatch(resetkeywordTracking());
    setSearch(value);
    setFilters({ ...filters, search_keywords: value, offset: 0, searchtype: searchType.value });
  };

  const handleOnClickReset = () => {
    setFilters(defaultSetting)
    setKeywordFrequency({label: "All Keywords", value: "10000"})
    setSearchType({label: "Inclusive (All)", value: "inclusive-all"})
    setOrderDirection(orderAsc)
    setOrderBy("")
    setSearch("")
  }

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

  // useEffect(() => {
  //   if (keywordranks && keywordranks.length > 0) {
  //     setRecords(prevArray => [...prevArray, ...keywordranks]);
  //   }
  // }, [keywordranks]);

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
    const index = findIndex(selectedKeywords, _keywordrank => _keywordrank.productkeyword.id === keywordrank.productkeyword.id);

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
    dispatch(performBulkActionKeywords(companyId, action, selectedKeywords.map(c => c['productkeyword']['id'])));
    setSelectedKeywords([]);
    handleOnClickReset();
  }


  const showKeywordChart = (keywordrank: any) => {
    dispatch(getProductKeywordData(companyId, keywordrank.productkeyword.id, filters));
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
      {loading || !isKeywordrankFetched || !product ? <Loader /> : null}
      {product ? <>
        <div className="py-4">
          <Row className='align-items-center'>
            <Col>
              <div className="d-flex align-items-center">
                <Link to={`/keyword-tracking/dashboard/${companyId}/`}>
                  <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                </Link>

                <div className="border rounded-sm p-1 mr-2 d-flex align-items-center">
                  <img className="img-sm" src={product.thumbnail? product.thumbnail:dummyImage}
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
                  /> : <ProductKeywordChart data={productKeywordData ? productKeywordData : {}} />}
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
                <TagsInput
                  label={''}
                  placeholder={t('Enter keywords')}
                  id="search"
                  name="search"
                  selectedTags={(tags: [string]) => setSearch(tags.join())}
                />
              </Col>
              <Col sm={2}>
                <button className="btn btn-primary" onClick={() => handleOnClickSearch(search)}>
                  Search
                </button>
                <button className="btn btn-outline-primary ml-1" onClick={() => handleOnClickReset()}>
                  Reset
                </button>
              </Col>
              <Col sm={1}>
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
													dispatch(exportKeywords(companyId, file.value, defaultSetting))
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
                  <p className="mt-3">{keywordranks ? keywordranks.length : 0} Keywords</p>
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
                  {keywordranks && keywordranks.map((keywordrank, key) => keywordrank.productkeyword && keywordrank.productkeyword.id ?
                        <tr key={key}>
                          <td>
                            <Form.Check
                              type="switch"
                              key={keywordrank.productkeyword.id}
                              id={`checkbox${keywordrank.productkeyword.id}`}
                              label=""
                              checked={!!find(selectedKeywords, _keywordrank => _keywordrank.productkeyword.id === keywordrank.productkeyword.id)}
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
                        : null
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
