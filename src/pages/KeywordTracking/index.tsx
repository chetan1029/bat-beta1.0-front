import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import Icon from "../../components/Icon";
import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next';
import dummyImage from "../../assets/images/dummy_image.svg";
import { find, get, map, size, uniqBy } from "lodash";
//components
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import ConfirmMessage from "../../components/ConfirmMessage";

//actions
import { APICore } from '../../api/apiCore';
import {
    getKtproducts,
    getMembershipPlan
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


    const { loading, products, redirectUri, membershipPlan } = useSelector((state: any) => ({
        loading: state.Company.KeywordTracking.loading,
        isKtproductsFetched: state.Company.KeywordTracking.isKtproductsFetched,
        products: state.Company.KeywordTracking.products,
        redirectUri: state.MarketPlaces.redirectUri,

        membershipPlan: state.Company.MembershipPlan.membershipPlan,
    }));

    console.log(products)

    const companyId = props.match.params.companyId;

    const defaultParams = useMemo(() => ({ 'limit': 100000000 }), []);

    const openDetails = (product: any) => {
        history.push(`/keyword-tracking/${companyId}/product/${product.id}/`);
    }

    // get the data
    useEffect(() => {
        dispatch(getKtproducts(companyId, defaultParams));
        dispatch(getMembershipPlan(companyId, { is_active: true }));
    }, [dispatch, companyId, defaultParams]);


    const plan = membershipPlan && membershipPlan.results && membershipPlan.results.length ? membershipPlan.results[0]['plan'] : null;
    const quotas = plan ? (plan['plan_quotas'] || []).find(pq => (pq['quota'] && pq['quota']['codename'] === "MARKETPLACES")) : {};

    const isActiveMarket = quotas && quotas['available_quota'] > 0 ? true : false;

    return (
        <>
            <div className="py-4">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Icon name="graph" className="icon icon-xs  mr-2" />
                            <h1 className="m-0">{t('Keyword Tracking Dashboard')}</h1>

                        </div>
                    </Col>
                    <Col className="text-right"></Col>
                </Row>
            </div>

                    {loading ? <Loader /> : <div>
                        <div >
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
                    </div>}

            {successMsg ? <MessageAlert message={successMsg} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
            {errorMsg ? <MessageAlert message={errorMsg} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

        </>
    );
}

export default withRouter(KeywordTracking);
