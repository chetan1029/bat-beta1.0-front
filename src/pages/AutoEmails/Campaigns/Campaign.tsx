import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Card } from "react-bootstrap";
import { Link, withRouter, useHistory } from "react-router-dom";
import DatePicker from 'react-datepicker';

import { useTranslation } from 'react-i18next';

//components
import MessageAlert from "../../../components/MessageAlert";

//plug-ins
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
//actions
import { updateCampaign, } from "../../../redux/actions";

import EmailTemplate from "./EmailTemplate";
import EditCompanyInfo from "./EditCompanyInfo";
import classNames from "classnames";
import Select from "react-select";

interface CampaignProps {
    campaign: any;
    templates: any;
    market: any;
    companyId: string | number;
    orderStatuses: any;
}
const Campaign = ({ companyId, campaign, templates, orderStatuses, market }: CampaignProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const { isCampaignUpdated, updateError, isCompanyUpdated } = useSelector((state: any) => ({
        isCampaignUpdated: state.Company.AutoEmails.isCampaignUpdated,
        updateError: state.Company.AutoEmails.updateError,
        isCompanyUpdated: state.Company.AmazonCompany.isCompanyUpdated,
    }));

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

    const [emailTemplate, setEmailTemplate] = useState({ label: campaign["emailtemplate"]["name"], value: campaign["emailtemplate"]["id"] });
    const [scheduledays, setScheduledays] = useState(campaign['schedule_days']);
    const [emailOrderStatus, setEmailOrderStatus] = useState({ label: campaign["order_status"]["name"], value: campaign["order_status"]["id"] });
    const [activationdate, setActivationdate] = useState(getDate(campaign['activation_date']));
    const [includeInvoice, setIncludeInvoice] = useState<any>(campaign['include_invoice']);
    const [channels, setChannels] = useState(campaign['channel']);
    const [schedule, setSchedule] = useState({ label: campaign['schedule'], value: campaign['schedule'] });

    const CHANNELS: Array<string> = ['FBA', 'FBM'];

    const selectChannel = (channel: string, selected: boolean) => {
        let chs = [...channels];
        if (selected) {
            chs.push(channel);
        } else {
            chs = chs.filter(c => c !== channel);
        }
        setChannels(chs);
        saveCampaign('channles', chs);
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
        saveCampaign('exclude_orders', orders);
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
        saveCampaign('buyer_purchase_count', purchase);
    }

    const saveCampaign = (field: string, value: any) => {
        const camp: any = {};

        switch (field) {
            case 'status': {
                camp['status'] = value ? 'Active' : 'Inactive';
                setStatus(value);
                break;
            }
            case 'activation_date': {
                camp['activation_date'] = value;
                setActivationdate(value);
                break;
            }
            case 'includeInvoice': {
                camp['include_invoice'] = value;
                setIncludeInvoice(value);
                break;
            }
            case 'channles': {
                camp['channel'] = value;
                break;
            }
            case 'exclude_orders':{
                camp['exclude_orders'] = value;
                break;
            }
            case 'schedule_days': {
                camp['schedule_days'] = value;
                setScheduledays(value);
                break;
            }
            case 'emailtemplate': {
                camp['emailtemplate'] = value.value;
                setEmailTemplate(value);
                break;
            }
            case 'order_status': {
                camp['order_status'] = value.value;
                setEmailOrderStatus(value);
                break;
            }
            case 'schedule': {
                camp['schedule'] = value.value;
                setSchedule(value);
                break;
            }
            case 'buyer_purchase_count': {
                camp['buyer_purchase_count'] = value;
                setPurchaseCount(value);
                break;
            }
        }

        dispatch(updateCampaign(companyId, campaign['id'], camp));
    }

    const [showEmailTemplate, setShowEmailTemplate] = useState(false);

    const [showCompanyAccount, setShowCompanyAccount] = useState<any>(false);

    const minActivationDate = new Date(new Date().getTime() - (10 * 24 * 60 * 60 * 1000));

    const openDetails = (status: any) => {
        history.push(`/auto-emails/${companyId}/campaigns/${campaign['id']}/email-queue/${status}`);
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
                          onChange={(checked: boolean) => saveCampaign('status', checked)}
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
                            selected={activationdate}
                            onChange={date => saveCampaign('activation_date', date)}
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
                              isClearable
                              options={defaultTemplates || []}
                              value={emailTemplate}
                              className={classNames(
                                "react-select",
                                "react-select-regular",
                              )}
                              onChange={emailTemplate => saveCampaign('emailtemplate', emailTemplate)}
                              classNamePrefix="react-select"
                            />
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
  												value={emailOrderStatus}
                          onChange={emailOrderStatus => saveCampaign('order_status', emailOrderStatus)}
  												className={"react-select react-select-regular"}
  												classNamePrefix="react-select"
  											/>
                    </Col>
                </Row>
                {campaign["name"].toLowerCase().includes("invoice") ?
                    <Row className="mt-4">
                        <Col lg={'auto'}>
                            <Form.Label className="font-weight-semibold">{t('Include Invoice (additional email)')}</Form.Label>
                            <Row>
                                <Col lg="auto">
                                    <Form.Check
                                        type='switch'
                                        id="include_invoice-check"
                                        label="Yes"
                                        checked={includeInvoice}
                                        onChange={(e: any) => saveCampaign('includeInvoice', e.target.checked)}
                                    />
                                </Col>
                                <Col>
                                    <Link to='#' className='ml-1 text-link d-inline font-weight-semibold' onClick={() => setShowCompanyAccount(true)}>{t('Edit Company Info')}</Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    : null
                }

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

                {campaign["name"].toLowerCase().includes("review request") ?
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
                    : null
                }

                <Row className="mt-4">
                    <Col sm={12}>
                        <Form.Label className="font-weight-semibold">{t('Schedule')}</Form.Label>
                        <Row>
                          <Col sm={2}>
                            <Select
                              placeholder={t('Schedule')}
                              options={scheduleOptions}
                              className={"react-select react-select-regular"}
                              classNamePrefix="react-select"
                              value={schedule}
                              onChange={schedule => saveCampaign('schedule', schedule)}
                            />
                          </Col>
                          <Col sm={3}>
                            <p className="mb-0 text-muted font-weight-semibold">
                                {campaign['schedule'] === "Daily" ? "Number of Days after order is " + campaign['order_status']['name'] : ""}
                            </p>
                          {campaign['schedule'] === "Daily" ?
                                <Form.Control as="select" size="sm" className="mt-1 col-3" placeholder={t("Number of Days")}
                                    name="schedule_days" id="schedule_days"
                                    value={scheduledays}
                                    onChange={(e: any) => saveCampaign('schedule_days', e.target.value)}
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
            </div> : null}

            {isCompanyUpdated ? <MessageAlert message={t('The company account updated')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
            {isCampaignUpdated ? <MessageAlert message={t('The campaign is updated successfully')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
            {updateError ? <MessageAlert message={updateError} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {showEmailTemplate ? <EmailTemplate campaign={campaign} companyId={companyId} onClose={() => setShowEmailTemplate(false)} /> : null}

            {showCompanyAccount ? <EditCompanyInfo companyId={companyId} market={market} onClose={() => setShowCompanyAccount(false)} /> : null}
        </>
    );
}

export default withRouter(Campaign);
