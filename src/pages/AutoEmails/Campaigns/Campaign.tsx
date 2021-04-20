import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

import { useTranslation } from 'react-i18next';

//components
import MessageAlert from "../../../components/MessageAlert";

//plug-ins
import { format } from 'date-fns'

//actions
import { updateCampaign, } from "../../../redux/actions";

import EmailTemplate from "./EmailTemplate";
import EditCompanyInfo from "./EditCompanyInfo";

interface CampaignProps {
    campaign: any;
    market: any;
    companyId: string | number;
}
const Campaign = ({ companyId, campaign, market }: CampaignProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();


    const { isCampaignUpdated, updateError, isCompanyUpdated } = useSelector((state: any) => ({
        isCampaignUpdated: state.Company.AutoEmails.isCampaignUpdated,
        updateError: state.Company.AutoEmails.updateError,
        isCompanyUpdated: state.Company.AmazonCompany.isCompanyUpdated,
    }));

    const getDate = (date) => {
        if (date) {
            var fulldate = date.split('T');
            return fulldate[0];
        } else {
            return "";
        }
    }

    const [status, setStatus] = useState(campaign['status'] && campaign['status']['name'] && campaign['status']['name'].toLowerCase() === 'active');

    const [scheduledays, setScheduledays] = useState(campaign['schedule_days']);
    const [activationdate, setActivationdate] = useState(getDate(campaign['activation_date']));
    const [includeInvoice, setIncludeInvoice] = useState<any>(campaign['include_invoice']);
    const [channels, setChannels] = useState(campaign['channel']);

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

    const EXCLUDE_ORDERS = ["Positive Feedback(4 star)", "Positive Feedback(5 star)", "With Returns", "With Refunds"];

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

    const saveCampaign = () => {
        const camp = {
            status: status ? 'Active' : 'Inactive', channel: channels, exclude_orders: excludeOrders,
            schedule_days: scheduledays,
            activation_date: format(new Date(activationdate), 'yyyy-MM-dd hh:mm'),
            include_invoice: includeInvoice
        };

        dispatch(updateCampaign(companyId, campaign['id'], camp));
    }

    const [showEmailTemplate, setShowEmailTemplate] = useState(false);

    const [showCompanyAccount, setShowCompanyAccount] = useState<any>(false);

    return (
        <>
            {campaign ? <div className="px-2">
                <Row>
                    <Col lg={12}>
                        <Form.Label className="font-weight-semibold">Status</Form.Label>
                        <Form.Check
                            type="switch"
                            id="status-check"
                            label=""
                            checked={status}
                            onChange={(e: any) => setStatus(e.target.checked)}
                        />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col sm={2}>
                        <Form.Label className="font-weight-semibold">{t("Activation Date")}</Form.Label>
                        <Form.Control
                            type="date"
                            className="form-control"
                            id="activation_date"
                            name="activation_date"
                            placeholder="Select Activation date"
                            value={activationdate}
                            onChange={(e: any) => setActivationdate(e.target.value)}
                        />
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col lg={12}>
                        <Form.Label className="font-weight-semibold">Email Template</Form.Label>
                        <p className="mb-0 text-muted font-weight-semibold">
                            {campaign['emailtemplate']['name']} - {campaign['emailtemplate']['slug']}

                            <Link to='#' className='ml-4 text-link' onClick={() => setShowEmailTemplate(true)}>{t('View Email Template')}</Link>
                        </p>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col lg={12}>
                        <Form.Label className="font-weight-semibold">Order Status</Form.Label>
                        <p className="mb-0 text-muted font-weight-semibold">
                            {campaign['order_status']['name']}
                        </p>
                    </Col>
                </Row>
                {campaign["name"].toLowerCase().includes("order confirmation") ?
                    <Row className="mt-4">
                        <Col lg={'auto'}>
                            <Form.Label className="font-weight-semibold">Include Invoice (additional email)</Form.Label>
                            <Row>
                                <Col lg="auto">
                                    <Form.Check
                                        type='switch'
                                        id="include_invoice-check"
                                        label="Yes"
                                        checked={includeInvoice}
                                        onChange={(e: any) => setIncludeInvoice(e.target.checked)}
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
                        <Form.Label className="font-weight-semibold">Channel</Form.Label>
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
                                Exclude Orders
                            <span className="text-muted ml-2 font-13 font-weight-normal">(All negative(1-2 star) and neutral (3 star) feedback are excluded by default)</span>
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
                    <Col lg={12}>
                        <Form.Label className="font-weight-semibold">Schedule</Form.Label>
                        <p className="mb-0 text-muted font-weight-semibold">
                            {campaign['schedule'] === "Daily" ? "Number of Days after order is " + campaign['order_status']['name'] : campaign['schedule']}
                        </p>
                        {campaign['schedule'] === "Daily" ?
                            <Form.Control as="select" size="sm" className="mt-1 col-1" placeholder={t("Number of Days")}
                                name="schedule_days" id="schedule_days"
                                value={scheduledays}
                                onChange={(e: any) => setScheduledays(e.target.value)}
                            >
                                {[...Array(61)].map((e, i) => {
                                    return i >= 5 ?
                                        <option value={i}>{i}</option>
                                        : ""
                                })}
                            </Form.Control>
                            : ""}
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col lg={12}>
                        <Form.Label className="font-weight-semibold">Products</Form.Label>
                        <p className="mb-0 text-muted font-weight-semibold">
                            {t('All Products')}
                        </p>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col lg={12} className='text-right'>
                        <Button variant='primary' type='button' onClick={saveCampaign}>Save</Button>
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
