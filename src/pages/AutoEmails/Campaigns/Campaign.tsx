import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

import { useTranslation } from 'react-i18next';

//components
import MessageAlert from "../../../components/MessageAlert";


//actions
import { updateCampaign } from "../../../redux/actions";

import EmailTemplate from "./EmailTemplate";

interface CampaignProps {
    campaign: any;
    companyId: string | number;
}
const Campaign = ({ companyId, campaign }: CampaignProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();


    const { isCampaignUpdated, updateError } = useSelector((state: any) => ({
        isCampaignUpdated: state.Company.AutoEmails.isCampaignUpdated,
        updateError: state.Company.AutoEmails.updateError
    }));

    const [status, setStatus] = useState(campaign['status'] && campaign['status']['name'] && campaign['status']['name'].toLowerCase() === 'active');

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
            status: status ? 'Active' : 'InActive', channel: channels, exclude_orders: excludeOrders,
            include_invoice: includeInvoice
        };

        dispatch(updateCampaign(companyId, campaign['id'], camp));
    }

    const [showEmailTemplate, setShowEmailTemplate] = useState(false);

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
                    <Col lg={12}>
                        <Form.Label className="font-weight-semibold">Email Template</Form.Label>
                        <p className="mb-0 text-muted font-weight-semibold">
                            {campaign['emailtemplate']['name']} - {campaign['emailtemplate']['slug']}

                            <Link to='#' className='ml-4 text-primary' onClick={() => setShowEmailTemplate(true)}>View Email Template</Link>
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

                <Row className="mt-4">
                    <Col lg={12}>
                        <Form.Label className="font-weight-semibold">Include Invoice (additional email)</Form.Label>
                        <Form.Check
                            type='switch'
                            id="include_invoice-check"
                            label="Yes"
                            checked={includeInvoice}
                            onChange={(e: any) => setIncludeInvoice(e.target.checked)}
                        />
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col lg={12}>
                        <Form.Label className="font-weight-semibold">Channel</Form.Label>
                        <div>
                            {CHANNELS.map((ch, idx) => {
                                return <Form.Check key={idx}
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
                            Exclude Orders
                            <span className="text-muted ml-2 font-13 font-weight-normal">(All negative(1-2 star) and neutral (3 star) feedback are excluded by default)</span>
                        </Form.Label>
                        <div>
                            {EXCLUDE_ORDERS.map((ex, idx) => {
                                return <Form.Check key={idx}
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
                    <Col lg={12}>
                        <Form.Label className="font-weight-semibold">Schedule</Form.Label>
                        <p className="mb-0 text-muted font-weight-semibold">
                            {campaign['schedule']}
                        </p>
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

            {isCampaignUpdated ? <MessageAlert message={t('The campaign is updated successfully')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
            {updateError ? <MessageAlert message={updateError} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

            {showEmailTemplate ? <EmailTemplate campaign={campaign} companyId={companyId} onClose={() => setShowEmailTemplate(false)} /> : null}
        </>
    );
}

export default withRouter(Campaign);