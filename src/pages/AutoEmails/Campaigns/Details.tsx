import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Nav, Alert, Button, Form } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useFormik } from 'formik';
import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
//components
import Loader from "../../../components/Loader";
import Icon from "../../../components/Icon";
import MessageAlert from "../../../components/MessageAlert";
import AlertDismissible from "../../../components/AlertDismissible";
//actions
import { getCampaigns, getMarketPlace, updateMarketPlace, getTemplates, getAllStatuses } from "../../../redux/actions";

import Campaign from "./Campaign";

interface DetailsProps {
    match: any;
}
const Details = (props: DetailsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, campaigns, templates, market, orderStatuses, isCampaignUpdated, isMarketPlaceUpdated } = useSelector((state: any) => ({
        loading: state.Company.AutoEmails.loading,
        isCampaignsFetched: state.Company.AutoEmails.isCampaignsFetched,
        campaigns: state.Company.AutoEmails.campaigns,
        templates: state.Company.AutoEmails.templates,
        orderStatuses: state.Common.statuses,
        market: state.MarketPlaces.market,
        isCampaignUpdated: state.Company.AutoEmails.isCampaignUpdated,
        isMarketPlaceUpdated: state.MarketPlaces.isMarketPlaceUpdated,
    }));

    const companyId = props.match.params.companyId;
    const marketId = props.match.params.marketId;

    const defaultParams = useMemo(() => ({ 'limit': 100000000, 'marketplace': marketId }), [marketId]);

    // get the data
    useEffect(() => {
        dispatch(getCampaigns(companyId, defaultParams));
        dispatch(getTemplates(companyId, defaultParams));
        dispatch(getMarketPlace(companyId, marketId));
        dispatch(getAllStatuses({'parent_name': "Order"}));
    }, [dispatch, companyId, marketId, defaultParams]);

    useEffect(() => {
        if (isCampaignUpdated) {
            dispatch(getCampaigns(companyId, defaultParams));
        }
        if (isMarketPlaceUpdated) {
            dispatch(getMarketPlace(companyId, marketId));
        }
    }, [dispatch, isCampaignUpdated, isMarketPlaceUpdated, companyId, marketId, defaultParams]);

    const getCampaignsOfMarket = (market: any) => {
        return ((campaigns || []).filter(c => c['amazonmarketplace']['id'] + '' === market['id'] + '')) || [];
    }

    const getTotalOfMarket = (market: any, key: string) => {
        const camps = getCampaignsOfMarket(market);
        return camps.reduce((a, b) => a + (b[key] || 0), 0);
    }

    const [selectedCampaignId, setSelectedCampaignId] = useState<any>(null);
    const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

    useEffect(() => {
        if (campaigns && campaigns.length) {
            setSelectedCampaignId(campaigns[0]['id']);
            setSelectedCampaign(campaigns[0]);
        }
    }, [campaigns]);

    const onSelect = (campaign) => {
        setSelectedCampaignId(campaign['id']);
        setSelectedCampaign(null);

        setTimeout(() => {
            setSelectedCampaign(campaign);
        });
    }

    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required(t('Email is required')),
        }),
        onSubmit: values => {
            const newData = { ...values };
            dispatch(updateMarketPlace(companyId, marketId, newData));
        },
    });

    return (
        <>
            {loading ? <Loader /> : null}

            {market ? <>
                <div className="py-4 px-3">
                    <Row className='align-items-center'>
                        <Col>
                            <div className="d-flex align-items-center">
                                <Link to={`/auto-emails/${companyId}/campaigns/`}>
                                    <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                                </Link>

                                <div className="d-flex">
                                    <div className="border rounded-sm p-1 mr-2 d-flex align-items-end">
                                        <Flag country={market['country']} />
                                    </div>
                                    <h1 className="m-0">{t('Auto Email Campaign - Amazon')}&nbsp;{market['country']}</h1>
                                </div>
                            </div>
                        </Col>
                        
                    </Row>
                </div>

                <Row>
                    <Col lg={12}>
                        <Card>
                            <Card.Body className="">
                              { !market['email'] || !market['email_verified'] ?
                                <div className="loader">
                                  <Row className="justify-content-center align-items-center" style={{ height: "100%" }}>
                                    <Col lg={6} sm={8} xs={12}>
                                      <Card border="primary" className="mb-3">
                                        <Card.Header>{
                                          !market['email']?
                                          t('Enter send from Email'):
                                          t('Verify your Email')
                                        }</Card.Header>
                                        <Card.Body>
                                          { !market['email'] ? (<>
                                          <p>{t('Your registered or approved Amazon Seller email address used to communicate with your buyers')}</p>
                                          <p><a href={"https://sellercentral."+market['sales_channel_name'].toLowerCase()+"/messaging/permissions"} className='text-link' rel="nofollow" target="blank">{t('View Registered / Approved Emails')}</a></p>
                                        </>) :
                                        <p>{t('We sent you an email on the below mention email. Please check and verify your email to continue.')}</p>
                                      }
                                          <Form noValidate onSubmit={validator.handleSubmit} className="mt-3">

                                            <Row>
                                              <Col lg={6}>
                                                <Form.Group>
                                                    <Form.Control type="email" placeholder={t("Email")}
                                                        name="email" id="email"
                                                        onChange={validator.handleChange}
                                                        onBlur={validator.handleBlur}
                                                        value={!market['email'] ? validator.values.email : market['email'] }
                                                        isInvalid={validator.touched.email && validator.errors && validator.errors.email ? true : false}
                                                        readOnly={market['email'] ? true : false} />

                                                    {validator.touched.email && validator.errors.email ? (
                                                        <Form.Control.Feedback type="invalid">{validator.errors.email}</Form.Control.Feedback>
                                                    ) : null}
                                                </Form.Group>
                                              </Col>
                                            </Row>
                                            <Form.Group className="mb-0">
                                                <Button variant="primary" type="submit">{ !market['email'] ? t('Submit') : t('Resend')}</Button>
                                            </Form.Group>
                                          </Form>
                                        </Card.Body>
                                      </Card>
                                    </Col>
                                  </Row>
                                </div>
                                : null}
                                {isMarketPlaceUpdated ? <MessageAlert message={t('Email address updated')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
                                <Row>
                                    <Col lg={12}>
                                        <div className="px-2 pb-2 mb-3">
                                            <Nav variant="tabs" className="nav-bordered m-0" activeKey={selectedCampaignId} as='ul'>
                                                {(campaigns || []).map((campaign: any, idx: number) => {
                                                    return <Nav.Item as="li" key={idx}>
                                                        <Nav.Link className="pt-1" eventKey={campaign['id']} to={'#'} as={Link} onClick={() => onSelect(campaign)}>{campaign['name']}</Nav.Link>
                                                    </Nav.Item>
                                                })}
                                            </Nav>
                                        </div>

                                        <div>
                                            {selectedCampaign ? <Campaign campaign={selectedCampaign} templates={templates} companyId={companyId} market={market} orderStatuses={orderStatuses} /> : null}
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </> : null}

        </>
    );
}

export default withRouter(Details);
