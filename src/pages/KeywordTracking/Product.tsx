import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Table, Button, Form } from "react-bootstrap";
import { useHistory, withRouter, Link } from "react-router-dom";
import Icon from "../../components/Icon";
import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next';
import dummyImage from "../../assets/images/dummy_image.svg";
import { find, get, map, size, uniqBy } from "lodash";
import { default as dayjs } from 'dayjs';
import DatePicker from 'react-datepicker';
//components
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import ConfirmMessage from "../../components/ConfirmMessage";

//actions
import { APICore } from '../../api/apiCore';
import {
    getKtproduct,
    getKeywordranks,
    getMembershipPlan
} from "../../redux/actions";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

interface KeywordTrackingProps {
    match: any;
    location?: any;
}
const KeywordTrackingProduct = (props: KeywordTrackingProps) => {
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


    const { loading, product, redirectUri, keywordranks, membershipPlan } = useSelector((state: any) => ({
        loading: state.Company.KeywordTracking.loading,
        isKtproductsFetched: state.Company.KeywordTracking.isKtproductsFetched,
        product: state.Company.KeywordTracking.product,
        redirectUri: state.MarketPlaces.redirectUri,
        keywordranks: state.Company.KeywordTracking.keywordranks,
        membershipPlan: state.Company.MembershipPlan.membershipPlan,
    }));



    const companyId = props.match.params.companyId;
    const productId = props.match.params.productId;

    const today = new Date();
    const [currentdate, setCurrentdate] = useState(today);
    const defaultParams = useMemo(() => ({ 'productkeyword__amazonproduct': productId, 'date': dayjs(currentdate).format('YYYY-MM-DD') }), []);

    // get the data
    useEffect(() => {
        dispatch(getKtproduct(companyId, productId));
        dispatch(getKeywordranks(companyId, defaultParams));
        dispatch(getMembershipPlan(companyId, { is_active: true }));
    }, [dispatch, companyId, productId, defaultParams]);

    const onDateChange = (date: any) => {
      setCurrentdate(date);
      const filters = [];
      filters["productkeyword__amazonproduct"] = productId
      if (date) {
        filters['date'] = dayjs(date).format('YYYY-MM-DD');
      }
      dispatch(getKeywordranks(companyId, filters));
    }


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
                                selected={currentdate}
                                onChange={date => onDateChange(date)}
                                dateFormat={"yyyy-MM-dd"}
                                timeFormat="hh:mm"
                                id="FilterDate"
                            />
                        </Col>
                        <Col>
                            <Button
                              variant="primary"
                              block
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
                            <Row>
                                <Col lg={12}>
                                    <div className={"list-view"}>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>{t("Keywords")}</th>
                                                    <th>{t("Search Frequency")}</th>
                                                    <th>{t("Indexed")}</th>
                                                    <th>{t("Rank")}</th>
                                                    <th>{t("Page")}</th>
                                                    <th>{t("Visibility Score")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {keywordranks && keywordranks.map((keywordrank,key) =>
                                              <tr key="key">
                                                  <td>{keywordrank.productkeyword.keyword.name}</td>
                                                  <td>{keywordrank.frequency}</td>
                                                  <td>{keywordrank.index ? <Icon name="check" className="icon icon-sm svg-outline-success" />: <Icon name="x" className="icon icon-sm svg-outline-muted" />}</td>
                                                  <td>{keywordrank.rank}</td>
                                                  <td>{keywordrank.page}</td>
                                                  <td>{keywordrank.visibility_score}</td>
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
        </>
    );
}

export default withRouter(KeywordTrackingProduct);
