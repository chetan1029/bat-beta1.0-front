import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Media } from "react-bootstrap";
import { Link, withRouter, Redirect } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import classNames from "classnames";

//components
import Icon from "../../components/Icon";
import PaymentTerms from "./PaymentTerms";
import Members from "./Members/";
import Bank from "./Bank";
import Location from "./Location";
import PackingBox from "./PackingBox";
import Hscode from "./Hscode";
import Tax from "./Tax";
import DeliveryTerms from "./DeliveryTerms";

interface DefaultViewProps {
    items: any;
    companyId: any;
}
const DefaultView = ({ items, companyId }: DefaultViewProps) => {
    const { t } = useTranslation();
    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Icon name="settings" className="icon icon-xs svg-outline-primary mr-2" />
                            <h1 className="m-0">
                                {t('Settings')}
                            </h1>
                        </div>
                    </Col>
                </Row>
            </div>
            <div>
                {items.map((item, key) => {
                    return <Card key={key} className="mb-3">
                        <Card.Body className="">
                            <Row>
                                <Col>
                                    <h4>{item['label']}</h4>
                                    <div>
                                        <Row>
                                            {
                                                item['items'].map((subItem, key) => {

                                                    return <Col md={4} xs={12} key={key}>
                                                        <Link to={`/settings/${companyId}/${subItem.key}`}>
                                                            <Media className={classNames('mt-3 mb-2')}>
                                                                <div className="pt-1">
                                                                    <Icon name={subItem.icon} className="icon icon-sm svg-outline-primary" />
                                                                </div>
                                                                <Media.Body>
                                                                    <div className="px-3">
                                                                        <h2 className="m-0 mb-2"> {subItem.title} </h2>
                                                                        <p className="text-wrap pb-0 text-muted">{subItem.desc}</p>
                                                                    </div>
                                                                </Media.Body>
                                                            </Media>
                                                        </Link>
                                                    </Col>
                                                })
                                            }
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                })}
            </div>
        </>
    )
}


interface IndexProps {
    match: any
}
const Index = ({ match }: IndexProps) => {
    const { t } = useTranslation();
    const companyId = match.params.companyId;
    const view = match.params.view;

    const [selectedView, setselectedView] = useState("default");

    useEffect(() => {
        setselectedView(view || 'default');
    }, [view]);


    const items = [
        {
            label: t('Basic'), items: [
                { title: "Company Profile", key: "profile", icon: "company-profile", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
                { title: "User Permissions", key: "members", icon: "members", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
                { title: "Membership Plan", key: "membership_plan", icon: "document", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
                { title: "Amazon Accounts", key: "amazon_accounts", icon: "amazon", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." }
            ]
        },
        {
            label: 'Logistic', items: [
                { title: "Location", key: "location", icon: "location", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
                { title: "Hs Code", key: "hscode", icon: "ticket", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
                { title: "Packing Box", key: "packing_box", icon: "packing", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
                { title: "Delivery Terms", key: "delivery_terms", icon: "shipment", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
                { title: "Logistic Lead Time", key: "logistic_lead_time", icon: "document", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." }
            ]
        },
        {
            label: t('Finance'), items: [
                { title: "Payment Terms", key: "payment_terms", icon: "wallet", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
                { title: "Banks", key: "bank", icon: "bank", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
                { title: "Taxes", key: "tax", icon: "tax", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
                { title: "Assets", key: "asset", icon: "shop", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." }]
        }

    ];

    return (
        <React.Fragment>
            {(() => {
                switch (selectedView) {
                    case "payment_terms":
                        return <PaymentTerms />;
                    case "members":
                        return <Members />;
                    case "bank":
                        return <Bank />;
                    case "location":
                        return <Location />;
                    case "packing_box":
                        return <PackingBox />;
                    case "hscode":
                        return <Hscode />;
                    case "tax":
                        return <Tax />;
                    case "delivery_terms":
                        return <DeliveryTerms />;
                    case "profile":
                        return <Redirect to={`/settings/${companyId}/edit`} />;

                    default:
                        return <DefaultView items={items} companyId={companyId} />;
                }
            })()}

        </React.Fragment>
    );
}

export default withRouter(Index);
