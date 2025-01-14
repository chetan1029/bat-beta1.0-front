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
import { resetAutoEmails, getCampaign, getMarketPlace, updateMarketPlace, getTemplates, getAllStatuses } from "../../../redux/actions";

import Campaign from "./Campaign";

interface DetailsProps {
    match: any;
}
const Details = (props: DetailsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, campaign, market, orderStatuses, isCampaignUpdated, isMarketPlaceUpdated, updateError, templates} = useSelector((state: any) => ({
        loading: state.Company.AutoEmails.loading,
        campaign: state.Company.AutoEmails.campaign,
        orderStatuses: state.Common.statuses,
        market: state.MarketPlaces.market,
        isCampaignUpdated: state.Company.AutoEmails.isCampaignUpdated,
        isMarketPlaceUpdated: state.MarketPlaces.isMarketPlaceUpdated,
        updateError: state.Company.AutoEmails.updateError,
        templates: state.Company.AutoEmails.templates,
    }));

    const companyId = props.match.params.companyId;
    const marketId = props.match.params.marketId;
    const campaignId = props.match.params.campaignId;

    const [selectedCampaignId, setSelectedCampaignId] = useState<any>(null);
    const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

    const defaultParams = useMemo(() => ({ 'limit': 100000000, 'marketplace': marketId }), [marketId]);

    // get the data
    useEffect(() => {
        dispatch(resetAutoEmails());
        dispatch(getCampaign(companyId, campaignId));
        dispatch(getTemplates(companyId, defaultParams));
        dispatch(getMarketPlace(companyId, marketId));
        dispatch(getAllStatuses({'parent_name': "Order"}));
    }, [dispatch, companyId, marketId, campaignId, defaultParams]);

    useEffect(() => {
        if (isCampaignUpdated || updateError) {
            const updatedCampaign = selectedCampaign;
            dispatch(getCampaign(companyId, campaignId));
            if(updatedCampaign && updatedCampaign.length){
              setSelectedCampaignId(updatedCampaign.id);
              setSelectedCampaign(updatedCampaign);
            }
        }
        if (isMarketPlaceUpdated) {
            dispatch(getMarketPlace(companyId, marketId));
        }
    }, [dispatch, isCampaignUpdated, isMarketPlaceUpdated, companyId, updateError]);

    const getCampaignsOfMarket = (market: any) => {
        return ((campaign || []).filter(c => c['amazonmarketplace']['id'] + '' === market['id'] + '')) || [];
    }

    const getTotalOfMarket = (market: any, key: string) => {
        const camps = getCampaignsOfMarket(market);
        return camps.reduce((a, b) => a + (b[key] || 0), 0);
    }


    useEffect(() => {
        if (campaign && campaign.length) {
            setSelectedCampaignId(campaign['id']);
            setSelectedCampaign(campaign);
        }
    }, [campaign]);

    const onSelect = (campaign) => {
        setSelectedCampaignId(campaign['id']);
        setSelectedCampaign(null);

        setTimeout(() => {
            setSelectedCampaign(campaign);
        });
    }

    useEffect(() => {
        if (isCampaignUpdated || updateError) {
            const updatedCampaign = selectedCampaign;
            dispatch(getCampaign(companyId, campaignId));
            if(updatedCampaign && updatedCampaign.length){
              setSelectedCampaignId(updatedCampaign.id);
              setSelectedCampaign(updatedCampaign);
            }
        }
    }, [dispatch, isCampaignUpdated, companyId, campaignId, updateError]);

    let email = "";
    if(market && market['email']){
      email = market['email'];
    }

    // change this one later
    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: email,
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
                                                        value={validator.values.email}
                                                        isInvalid={validator.touched.email && validator.errors && validator.errors.email ? true : false}
                                                         />

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
                                      {campaign ? <>
                                        <div>
                                            <Campaign campaign={campaign} templates={templates} companyId={companyId} market={market} orderStatuses={orderStatuses} setSelectedCampaign={setSelectedCampaign} />
                                        </div>
                                        </> : null }
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
