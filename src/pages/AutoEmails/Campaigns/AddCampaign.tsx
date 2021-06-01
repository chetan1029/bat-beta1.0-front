import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Card, Table, Button } from "react-bootstrap";
import { useHistory, withRouter, Link } from "react-router-dom";
import Icon from "../../../components/Icon";
import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next';
import Select from "react-select";
import classNames from "classnames";
//components
import Loader from "../../../components/Loader";
import DisplayDate from "../../../components/DisplayDate";
import MessageAlert from "../../../components/MessageAlert";
import AlertDismissible from "../../../components/AlertDismissible";
import ConfirmMessage from "../../../components/ConfirmMessage";
import EmailTemplate from "./EmailTemplate";
import MarketPlacesDropdown from "../../../components/MarketPlacesDropdown";

//plug-ins
import { get } from 'lodash';
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from 'date-fns'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import DatePicker from 'react-datepicker';
//actions
import { APICore } from '../../../api/apiCore';
import {
    resetAutoEmails, createCampaign, getTemplates, getAllStatuses, getMarketPlace
} from "../../../redux/actions";


interface AddCampaignProps {
    match: any;
}
const AddCampaign = (props: AddCampaignProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const api = new APICore();

    const { loading, templates, orderStatuses, isCampaignCreated, createCampaignError } = useSelector((state: any) => ({
        loading: state.Company.AutoEmails.loading || state.MarketPlaces.loading,
        isCampaignCreated: state.Company.AutoEmails.isCampaignCreated,
        createCampaignError: state.Company.AutoEmails.createCampaignError,
        templates: state.Company.AutoEmails.templates,
        orderStatuses: state.Common.statuses,
    }));


    const companyId = props.match.params.companyId;
    const marketId = props.match.params.marketId;

    const [status, setStatus] = useState(false);
    const [showEmailTemplate, setShowEmailTemplate] = useState(false);
    const [channels, setChannels] = useState(['FBA', 'FBM']);
    const [excludeOrders, setExcludeOrders] = useState(["With Returns", "With Refunds"]);
    const [purchaseCount, setPurchaseCount] = useState(["1st Purchase"]);

    const defaultParams = { 'limit': 100000000};

    const defaultTemplates =
      templates && templates.length > 0 &&
      templates.map((template) => {
        return {
          label: template.name,
          value: template.id,
        };
      });

    const orderStatusOptions =
      orderStatuses.results && orderStatuses.results.length > 0 &&
      orderStatuses.results.map((orderStatus) => {
        return {
          label: orderStatus.name,
          value: orderStatus.id,
        };
      });

    const CHANNELS: Array<string> = ['FBA', 'FBM'];

    const selectChannel = (channel: string, selected: boolean) => {
        let chs = [...channels];
        if (selected) {
            chs.push(channel);
        } else {
            chs = chs.filter(c => c !== channel);
        }
        setChannels(chs);
    }

    const SCHEDULES: Array<string> = ["Daily", "As soon as possible"];

    let scheduleOptions: Array<any> = [];

  	for (const schedule of SCHEDULES) {
  		scheduleOptions.push({
  			label: t(schedule),
  			value: schedule
  		});
  	}

    const EXCLUDE_ORDERS = ["Positive Feedback(4 star)", "Positive Feedback(5 star)", "With Returns", "With Refunds", "Item Discount", "Shipping Discount"];

    const selectExcludeOrder = (orderStr: string, selected: boolean) => {
        let orders = [...excludeOrders];
        if (selected) {
            orders.push(orderStr);
        } else {
            orders = orders.filter(c => c !== orderStr);
        }
        setExcludeOrders(orders);
    }

    const PURCHASE_COUNT = ["1st Purchase", "2nd Purchase", "3rd Purchase", "4th Purchase"];

    const selectPurchaseCount = (purchaseStr: string, selected: boolean) => {
        let purchase = [...purchaseCount];
        if (selected) {
            purchase.push(purchaseStr);
        } else {
            purchase = purchase.filter(c => c !== purchaseStr);
        }
        setPurchaseCount(purchase);
    }

    const onChangeStatus = (value: any) => {
      setStatus(value);
    }


    // get the data
    useEffect(() => {
        dispatch(resetAutoEmails());
        dispatch(getTemplates(companyId, defaultParams));
        dispatch(getAllStatuses({'parent_name': "Order"}));
    }, [dispatch, companyId]);


    if (isCampaignCreated){
        history.push(`/auto-emails/${companyId}/campaigns`);
    }

    const validator = useFormik({
      enableReinitialize: true,
      initialValues: {
        name: "",
        emailtemplate: null,
        order_status: null,
        schedule: null,
        amazonmarketplace: null,
        include_invoice: false,
        send_optout: false,
      },
      validationSchema: Yup.object({
        name: Yup.string().required(t("Name is required")),
        emailtemplate: Yup.object().required(t("Email Template is required")).nullable(),
        order_status: Yup.object().required(t("Order Status is required")).nullable(),
        schedule: Yup.object().required(t("Schedule is required")).nullable(),
        amazonmarketplace: Yup.object().required(t("Marketplace is required")).nullable(),
      }),
      onSubmit: values => {
        dispatch(createCampaign(companyId, { ...values, amazonmarketplace: get(values, 'amazonmarketplace.value'), order_status: get(values, 'order_status.value'),
        emailtemplate: get(values, 'emailtemplate.value'), schedule: get(values, 'schedule.value'), channel: channels, exclude_orders: excludeOrders, buyer_purchase_count: purchaseCount, status: values["status"] ? 'Active': 'Inactive'}));
      },
    });

    const minActivationDate = new Date(new Date().getTime() - (10 * 24 * 60 * 60 * 1000));
    const activationdate = new Date();

    return (
        <>
            <div className="py-4">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                          <Link to={`/auto-emails/${companyId}/campaigns`}>
                              <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                          </Link>
                          <div className="d-flex">
                            <h1 className="m-0">{t('Create a Campaign')}</h1>
                          </div>
                        </div>
                    </Col>
                </Row>
            </div>
            {loading ? <Loader /> : ""}
            <div>
              <Card>
                <Card.Body>
                    <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>
                      <Row>
                          <Col sm={6}>
                            <Form.Label htmlFor="usr">{t("Campaign Name")}</Form.Label>
                              <Form.Control
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Campaign Name"
                                value={validator.values.name}
                                onBlur={validator.handleBlur}
                                onChange={validator.handleChange}
                                isInvalid={
                                  validator.touched.name &&
                                    validator.errors &&
                                    validator.errors.name
                                    ? true
                                    : false
                                }
                              />

                              {validator.touched.name && validator.errors.name ? (
                                <Form.Control.Feedback type="invalid">
                                  {validator.errors.name}
                                </Form.Control.Feedback>
                              ) : null}
                          </Col>
                      </Row>
                      <Row className={"mt-4"}>
                          <Col sm={2}>
                            <Form.Label htmlFor="usr">{t("Marketplace")}</Form.Label>
                              <MarketPlacesDropdown
                                name='amazonmarketplace'
                                placeholder={t('Amazon Marketplace')}
                                className={classNames(
                                  validator.touched.emailtemplate &&
                                  validator.errors.emailtemplate &&
                                  "is-invalid"
                                )}
                                isSingle={true}
                                companyId={companyId}
                                value={validator.values.amazonmarketplace}
                                onChange={(value: any) => {
                                  validator.setFieldValue("amazonmarketplace", value);
                                }}
                                 />

                              {validator.touched.amazonmarketplace && validator.errors.amazonmarketplace ? (
                                <Form.Control.Feedback type="invalid">
                                  {validator.errors.amazonmarketplace}
                                </Form.Control.Feedback>
                              ) : null}
                          </Col>
                      </Row>
                      <Row className="mt-4">
                          <Col lg={12}>
                            <Form.Label className="font-weight-semibold">{t("Status")}</Form.Label><br />
                            <BootstrapSwitchButton
                                onlabel='Active'
                                offlabel='Inactive'
                                checked={status}
                                width={150}
                                height={40}
                                style={"status-switch"}
                                onstyle='success'
                                offstyle='danger'
                                onChange={(checked: boolean) => onChangeStatus(checked)}
                            />
                          </Col>
                      </Row>

                      <Row className="mt-4">
                          <Col sm={2}>
                              <Form.Label className="font-weight-semibold">{t("Activation Date")}</Form.Label>
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
                                  name="activationDate"
                                  selected={activationdate}
                                  dateFormat={"yyyy-MM-dd"}
                                  timeFormat="hh:mm"
                                  minDate={minActivationDate}
                                  startDate={minActivationDate}
                                  id="activationDate"
                              />
                          </Col>
                      </Row>

                      <Row className="mt-4">
                          <Col sm={12}>
                              <Form.Label className="font-weight-semibold">{t('Email Template')}</Form.Label>
                              <Row>
                                <Col sm={2}>
                                  <Select
                                    id="emailtemplate"
                                    name="emailtemplate"
                                    placeholder={t("Select Email Template")}
                                    options={defaultTemplates || []}
                                    onChange={(value: any) => {
                                      validator.setFieldValue("emailtemplate", value);
                                    }}
                                    value={validator.values.emailtemplate}
                                    className={classNames(
                                      "react-select",
                                      "react-select-regular",
                                      validator.touched.emailtemplate &&
                                      validator.errors.emailtemplate &&
                                      "is-invalid"
                                    )}
                                    classNamePrefix="react-select"
                                  />
                                  {validator.touched.emailtemplate && validator.errors.emailtemplate ? (
                                    <Form.Control.Feedback type="invalid">
                                      {validator.errors.emailtemplate}
                                    </Form.Control.Feedback>
                                  ) : null}
                                </Col>
                                <Col sm={3}>
                                  <p className="mb-0 text-muted font-weight-semibold">
                                      <Link to='#' className='ml-4 text-link' onClick={() => setShowEmailTemplate(true)}>{t('View Email Template')}</Link>
                                  </p>
                                </Col>
                              </Row>
                          </Col>
                      </Row>

                      <Row className="mt-4">
                          <Col sm={2}>
                              <Form.Label className="font-weight-semibold">{t('Order Status')}</Form.Label>
                              <Select
        												placeholder={t('Status')}
        												options={orderStatusOptions}
        												classNamePrefix="react-select"
                                name= "order_status"
                                id="order_status"
                                onChange={(value: any) => {
                                  validator.setFieldValue("order_status", value);
                                }}
                                value={validator.values.order_status}
                                className={classNames(
                                  "react-select",
                                  "react-select-regular",
                                  validator.touched.order_status &&
                                  validator.errors.order_status &&
                                  "is-invalid"
                                )}
                              />
                              {validator.touched.order_status && validator.errors.order_status ? (
                                <Form.Control.Feedback type="invalid">
                                  {validator.errors.order_status}
                                </Form.Control.Feedback>
                              ) : null}
                          </Col>
                      </Row>

                      <Row className="mt-4">
                          <Col lg={'auto'}>
                              <Form.Label className="font-weight-semibold">{t('Include Invoice (additional email)')}</Form.Label>
                              <Row>
                                  <Col lg="auto">
                                      <Form.Check
                                      type='switch'
                                      id="include_invoice-check"
                                      label="Yes"
                                      checked={validator.values.include_invoice}
                                      onChange={(e: any) => validator.setFieldValue("include_invoice", e.target.checked)}
                                      />
                                  </Col>

                              </Row>
                          </Col>
                      </Row>

                      <Row className="mt-4">
                          <Col lg={'auto'}>
                              <Form.Label className="font-weight-semibold">{t('Sent Review Template for Opt-Out users')}</Form.Label>
                              <Row>
                                  <Col lg="auto">
                                      <Form.Check
                                      type='switch'
                                      id="include_optout-check"
                                      label="Yes"
                                      checked={validator.values.send_optout}
                                      onChange={(e: any) => validator.setFieldValue("send_optout", e.target.checked)}
                                      />
                                  </Col>

                              </Row>
                          </Col>
                      </Row>

                      <Row className="mt-4">
                          <Col lg={12}>
                              <Form.Label className="font-weight-semibold">{t('Channel')}</Form.Label>
                              <div key={`custom-checkbox`}>
                                  {CHANNELS.map((ch, idx) => {
                                      return <Form.Check
                                          custom
                                          key={idx}
                                          type='checkbox'
                                          inline
                                          id={`channel-check-${idx + 1}`}
                                          label={ch}
                                          checked={channels.includes(ch)}
                                          onChange={(e: any) => selectChannel(ch, e.target.checked)}
                                      />
                                  })}
                              </div>
                          </Col>
                      </Row>

                      <Row className="mt-4">
                          <Col lg={12}>
                              <Form.Label className="font-weight-semibold">
                                  {t('Exclude Orders')}
                              <span className="text-muted ml-2 font-13 font-weight-normal">{t('(All negative(1-2 star) and neutral (3 star) feedback are excluded by default)')}</span>
                              </Form.Label>
                              <div key={`custom-checkbox`}>
                                  {EXCLUDE_ORDERS.map((ex, idx) => {
                                      return <Form.Check
                                          custom
                                          key={idx}
                                          type='checkbox'
                                          inline
                                          id={`exclude-order-check-${idx + 1}`}
                                          label={ex}
                                          checked={excludeOrders.includes(ex)}
                                          onChange={(e: any) => selectExcludeOrder(ex, e.target.checked)}
                                      />
                                  })}
                              </div>
                          </Col>
                      </Row>

                      <Row className="mt-4">
                          <Col sm={12}>
                              <Form.Label className="font-weight-semibold">{t('Schedule')}</Form.Label>
                              <Row>
                                <Col sm={2}>
                                  <Select
                                    name="schedule"
                                    id="schedule"
                                    placeholder={t('Schedule')}
                                    options={scheduleOptions}
                                    classNamePrefix="react-select"
                                    onChange={(value: any) => {
                                      validator.setFieldValue("schedule", value);
                                    }}
                                    value={validator.values.schedule}
                                    className={classNames(
                                      "react-select",
                                      "react-select-regular",
                                      validator.touched.schedule &&
                                      validator.errors.schedule &&
                                      "is-invalid"
                                    )}
                                  />
                                  {validator.touched.schedule && validator.errors.schedule ? (
                                    <Form.Control.Feedback type="invalid">
                                      {validator.errors.schedule}
                                    </Form.Control.Feedback>
                                  ) : null}
                                </Col>
                              </Row>
                          </Col>
                      </Row>

                      <Row className="mt-4">
                          <Col lg={12}>
                              <Form.Label className="font-weight-semibold">
                                  {t('Buyer Purchase Count')}
                              </Form.Label>
                              <div key={`custom-checkbox`}>
                                  {PURCHASE_COUNT.map((ex, idx) => {
                                      return <Form.Check
                                          custom
                                          key={idx}
                                          type='checkbox'
                                          inline
                                          id={`buyer-purchase-count-${idx + 1}`}
                                          label={ex}
                                          checked={purchaseCount.includes(ex)}
                                          onChange={(e: any) => selectPurchaseCount(ex, e.target.checked)}
                                      />
                                  })}
                              </div>
                          </Col>
                      </Row>


                      <div className="mt-4">
                        <Link
                          className="btn btn-outline-primary mr-3"
                          to={`/auto-emails/${companyId}/campaign`}
                        >
                          {t("Cancel")}
                        </Link>
                        <Button type="submit" variant="primary">
                          {t("Create a Campaign")}
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
        				</Card>
            </div>
            {showEmailTemplate ? <EmailTemplate campaign={""} companyId={companyId} onClose={() => setShowEmailTemplate(false)} /> : null}

            {isCampaignCreated ? <MessageAlert message={t('The campaign is created successfully')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
            {createCampaignError ? <MessageAlert message={createCampaignError} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

        </>
    );
}

export default withRouter(AddCampaign);
