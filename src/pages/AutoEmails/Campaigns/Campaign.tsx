import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { Link, withRouter, useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker';

import { useTranslation } from 'react-i18next';

//components
import MessageAlert from "../../../components/MessageAlert";
import EmailTemplate from "../Templates/EmailTemplate";
//plug-ins
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { useFormik } from "formik";
import * as Yup from "yup";
import { get } from 'lodash';
//actions
import { updateCampaign, getTemplate } from "../../../redux/actions";

import EditCompanyInfo from "./EditCompanyInfo";
import classNames from "classnames";
import Select from "react-select";

interface CampaignProps {
    campaign: any;
    templates: any;
    market: any;
    companyId: string | number;
    orderStatuses: any;
    setSelectedCampaign: any;
}
const Campaign = ({ companyId, campaign, templates, orderStatuses, market, setSelectedCampaign }: CampaignProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const { isCampaignUpdated, updateError, isCompanyUpdated, template } = useSelector((state: any) => ({
        isCampaignUpdated: state.Company.AutoEmails.isCampaignUpdated,
        updateError: state.Company.AutoEmails.updateError,
        isCompanyUpdated: state.Company.AmazonCompany.isCompanyUpdated,
        template: state.Company.AutoEmails.template,
    }));

    useEffect(() => {
        if(campaign && campaign.length){
          dispatch(getTemplate(companyId, campaign["emailtemplate"]["id"]));
        }
    }, [dispatch, campaign]);


    const getDate = (value) => {
        return typeof value === 'string' ? new Date(Date.parse(value)) : value;
    }

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

    const [status, setStatus] = useState(campaign['status'] && campaign['status']['name'] && campaign['status']['name'].toLowerCase() === 'active');

    const [channels, setChannels] = useState(campaign['channel']);

    const [templateId, setTemplateId] = useState(campaign["emailtemplate"]["id"]);
    const [scheduleType, setScheduleType] = useState(campaign['schedule']);

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

    const [excludeOrders, setExcludeOrders] = useState(campaign['exclude_orders']);

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

    const [purchaseCount, setPurchaseCount] = useState(campaign['buyer_purchase_count']);

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

    const viewEmailTemplate = () =>{
      setShowEmailTemplate(true);
      dispatch(getTemplate(companyId, templateId));
    }

    const validator = useFormik({
      enableReinitialize: true,
      initialValues: {
        name: campaign["name"],
        status: status,
        emailtemplate: { label: campaign["emailtemplate"]["name"], value: campaign["emailtemplate"]["id"] },
        order_status: { label: campaign['order_status']['name'], value: campaign['order_status']['id'] },
        schedule: { label: campaign['schedule'], value: campaign['schedule'] },
        schedule_days: campaign['schedule_days'],
        include_invoice: campaign['include_invoice'],
        send_optout: campaign['send_optout'],
        activation_date: getDate(campaign['activation_date']),
      },
      validationSchema: Yup.object({
        name: Yup.string().required(t("Name is required")),
        emailtemplate: Yup.object().required(t("Email Template is required")).nullable(),
        order_status: Yup.object().required(t("Order Status is required")).nullable(),
        schedule: Yup.object().required(t("Schedule is required")).nullable(),
      }),
      onSubmit: values => {
        dispatch(updateCampaign(companyId, campaign["id"],{ ...values, amazonmarketplace: get(values, 'amazonmarketplace.value'), order_status: get(values, 'order_status.value'),
        emailtemplate: get(values, 'emailtemplate.value'), schedule: get(values, 'schedule.value'), channel: channels, exclude_orders: excludeOrders, buyer_purchase_count: purchaseCount, status: status ? 'Active': 'Inactive'}));
      },
    });

    const [showEmailTemplate, setShowEmailTemplate] = useState(false);

    const [showCompanyAccount, setShowCompanyAccount] = useState<any>(false);

    const minActivationDate = new Date(new Date().getTime() - (10 * 24 * 60 * 60 * 1000));

    const openDetails = (status: any) => {
        history.push(`/auto-emails/${companyId}/campaigns/${market['id']}/${campaign['id']}/email-queue/${status}`);
    }

    return (
        <>
            {campaign ? <div className="px-2">
              <Row>
                  <Col lg={2}>
                      <Card>
                          <Card.Body className="clickable-row" onClick={() =>openDetails("send")}>
                              <h6 className="mt-0 text-muted">{t('Sent Emails')}</h6>
                              <h1 className="mb-0">{campaign['email_sent']}</h1>
                          </Card.Body>
                      </Card>
                  </Col>
                  <Col lg={2}>
                      <Card>
                          <Card.Body className="clickable-row" onClick={() =>openDetails("queued")}>
                              <h6 className="mt-0 text-muted">{t('Email in Queue')}</h6>
                              <h1 className="mb-0">{campaign['email_in_queue']}</h1>
                          </Card.Body>
                      </Card>
                  </Col>
                  <Col lg={2}>
                      <Card>
                          <Card.Body className="clickable-row" onClick={() =>openDetails("opt-out")}>
                              <h6 className="mt-0 text-muted">{t('Opt-out Emails')}</h6>
                              <h1 className="mb-0">{campaign['email_opt_out']}</h1>
                          </Card.Body>
                      </Card>
                  </Col>
                  <Col lg={2}>
                      <Card>
                          <Card.Body className="">
                              <h6 className="mt-0 text-muted">{t('Sent Emails - Today')}</h6>
                              <h1 className="mb-0">{campaign['email_sent_today']}</h1>
                          </Card.Body>
                      </Card>
                  </Col>
                  <Col lg={2}>
                      <Card>
                          <Card.Body className="">
                              <h6 className="mt-0 text-muted">{t('Email in Queue - Today')}</h6>
                              <h1 className="mb-0">{campaign['email_queue_today']}</h1>
                          </Card.Body>
                      </Card>
                  </Col>
                  <Col lg={2}>
                      <Card>
                          <Card.Body className="">
                              <h6 className="mt-0 text-muted">{t('Opt-out Emails - Today')}</h6>
                              <h1 className="mb-0">{campaign['email_opt_out_today']}</h1>
                          </Card.Body>
                      </Card>
                  </Col>
                  { campaign["send_optout"] ?
                  <Col lg={3}>
                      <Card>
                          <Card.Body className="">
                              <h6 className="mt-0 text-muted">{t('Reattempted Review Requests')}</h6>
                              <h1 className="mb-0">{campaign['reattempted_reviews']}</h1>
                          </Card.Body>
                      </Card>
                  </Col>
                  : null
                }
              </Row>
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
                            name="activation_date"
                            selected={validator.values.activation_date}
                            dateFormat={"yyyy-MM-dd"}
                            timeFormat="hh:mm"
                            minDate={minActivationDate}
                            startDate={minActivationDate}
                            onChange={(date: any) => {
                              validator.setFieldValue("activation_date", date);
                            }}
                            id="activation_date"
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
                              value={validator.values.emailtemplate}
                              className={classNames(
                                "react-select",
                                "react-select-regular",
                                validator.touched.emailtemplate &&
                                validator.errors.emailtemplate &&
                                "is-invalid"
                              )}
                              onChange={(value: any) => {
                                validator.setFieldValue("emailtemplate", value);
                                setTemplateId(value.value);
                              }}
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
                                <Link to='#' className='ml-4 text-link' onClick={() => viewEmailTemplate()}>{t('View Email Template')}</Link>
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
                                <Col>
                                    <Link to='#' className='ml-1 text-link d-inline font-weight-semibold' onClick={() => setShowCompanyAccount(true)}>{t('Edit Company Info')}</Link>
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
                                setScheduleType(value.value);
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
                          <Col sm={3}>
                            <p className="mb-0 text-muted font-weight-semibold">
                                {scheduleType === "Daily" ? "Number of Days after order is " + campaign['order_status']['name'] : ""}
                            </p>
                          {scheduleType === "Daily" ?
                                <Form.Control as="select" size="sm" className="mt-1 col-3" placeholder={t("Number of Days")}
                                    name="schedule_days" id="schedule_days"
                                    value={validator.values.schedule_days}
                                    onChange={(e: any) => validator.setFieldValue('schedule_days', e.target.value)}
                                >
                                    {[...Array(61)].map((e, i) => {
                                        return i >= 5 ?
                                            <option value={i} key={i}>{i}</option>
                                            : ""
                                    })}
                                </Form.Control>
                                : ""}
                          </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col lg={12}>
                        <Form.Label className="font-weight-semibold">{t('Products')}</Form.Label>
                        <p className="mb-0 text-muted font-weight-semibold">
                            {t('All Products')}
                        </p>
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
                    to={`/auto-emails/${companyId}/campaigns`}
                  >
                    {t("Cancel")}
                  </Link>
                  <Button type="submit" variant="primary">
                    {t("Update Campaign")}
                  </Button>
                </div>
              </Form>
            </div> : null}

            {isCompanyUpdated ? <MessageAlert message={t('The company account updated')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
            {isCampaignUpdated ? <MessageAlert message={t('The campaign is updated successfully')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
            {updateError ? <MessageAlert message={updateError} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {showEmailTemplate ? <EmailTemplate emailTemplate={template} companyId={companyId} campaignId={campaign["id"]} onClose={() => setShowEmailTemplate(false)} /> : null}

            {showCompanyAccount ? <EditCompanyInfo companyId={companyId} market={market} onClose={() => setShowCompanyAccount(false)} /> : null}
        </>
    );
}

export default withRouter(Campaign);
