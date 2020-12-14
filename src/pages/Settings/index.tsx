import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Media } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";
import PaymentTerms from "./PaymentTerms";
import Members from "./Members/";
import Bank from "./Bank";
import Location from "./Location";
import PackingBox from "./PackingBox";
import Hscode from "./Hscode";
import Tax from "./Tax";

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
                <Card>
                    <Card.Body className="">
                        <Row>
                            {
                                items.map((item, key) =>
                                    <Col md={4} xs={12} key={key}>
                                        <Link to={`/settings/${companyId}/${item.key}`}>
                                            <div className="pb-3 settings-cards">
                                                <Media>
                                                    <div className="pt-1">
                                                        <Icon name={item.icon} className="icon icon-sm svg-outline-primary" />
                                                    </div>
                                                    <Media.Body>
                                                        <div className="px-3">
                                                            <h2 className="m-0 mb-2"> {item.title} </h2>
                                                            <p className="text-wrap pb-0 text-muted">{item.desc}</p>
                                                        </div>
                                                    </Media.Body>
                                                </Media>
                                            </div>
                                        </Link>
                                    </Col>
                                )
                            }

                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}


interface IndexProps {
    match: any
}
const Index = ({ match }: IndexProps) => {

    const companyId = match.params.companyId;
    const view = match.params.view;

    const [selectedView, setselectedView] = useState("default");

    useEffect(() => {
        setselectedView(view || 'default');
    }, [view]);


    const items = [
        { title: "Company Profile", key: "settings", icon: "company-profile", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
        { title: "Members", key: "members", icon: "members", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
        { title: "Membership Plan", key: "membership_plan", icon: "document", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
        { title: "Payment Terms", key: "payment_terms", icon: "wallet", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
        { title: "Banks", key: "bank", icon: "bank", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
        { title: "Taxes", key: "tax", icon: "tax", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
        { title: "Location", key: "location", icon: "location", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
        { title: "Packing Box", key: "packing_box", icon: "packing", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
        { title: "Hs Code", key: "hscode", icon: "ticket", desc: "Non, massa orci turpis aliquet diam mangna. Pleatea senectus nisl id." },
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

                    default:
                        return <DefaultView items={items} companyId={companyId} />;
                }
            })()}

        </React.Fragment>
    );
}

export default withRouter(Index);
