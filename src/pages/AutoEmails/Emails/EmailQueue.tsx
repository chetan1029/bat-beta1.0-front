import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Media, Table, Accordion } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../../components/Icon";

//actions
import { getEmailQueues } from "../../../redux/actions";

import Loader from "../../../components/Loader";

interface EmailQueueCardItemProps {
    delivery: any;
    companyId: any;
}

const EmptyState = () => {
    const { t } = useTranslation();
    return (
        <Card className="payment-terms-card mb-2">
            <Card.Body>
                <div className="p-2">
                    <h5 className="font-weight-normal my-0">{t('There are no delivery terms available')}</h5>
                </div>
            </Card.Body>
        </Card>
    )
}

const BuyerPays = ({ whopays }) => {

    if (whopays === "Buyer") {
        return (
            <Icon name="check" className="icon icon-sm svg-outline-success" />
        )
    } else {
        return (
            <Icon name="x" className="icon icon-sm svg-outline-muted" />
        )
    }
}

const SellerPays = ({ whopays }) => {
    if (whopays === "Seller") {
        return (
            <Icon name="check" className="icon icon-sm svg-outline-success" />
        )
    } else {
        return (
            <Icon name="x" className="icon icon-sm svg-outline-muted" />
        )
    }
}

const EmailQueueCardItem = ({ delivery, companyId }: EmailQueueCardItemProps) => {

    return (<>
        <Card className="mb-2">
            <Accordion.Toggle as={Card.Header} eventKey={delivery.id}>
                <span>{delivery.code} ({delivery.name})</span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={delivery.id}>
                <Card.Body>
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Services</th>
                                <th>Buyer</th>
                                <th>Seller</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                delivery["deliveryterms"].map((term, key) =>
                                    <tr>
                                        <td>{term.service_name}</td>
                                        <td><BuyerPays whopays={term.who_pays} /></td>
                                        <td><SellerPays whopays={term.who_pays} /></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    </>
    )
}

interface EmailQueueProps {
    match: any;
}
const EmailQueue = (props: EmailQueueProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { emailQueues, isEmailQueuesFetched } = useSelector((state: any) => ({
        emailQueues: state.Company.AutoEmails.emailQueues,

        //flags
        isEmailQueuesFetched: state.Company.AutoEmails.isEmailQueuesFetched,
    }));

    const companyId = props.match.params.companyId;
    /*
    delivery tems
    */
    useEffect(() => {
        const companyId = props.match.params.companyId;
        if (companyId) {
            dispatch(getEmailQueues(companyId, { is_active: true }));
        }
    }, [dispatch, props.match.params.companyId]);


    /*
        delivery terms
    */

    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/settings/${companyId}`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Delivery Terms')}</h1>
                        </div>
                    </Col>

                </Row>
            </div>

            {
                !isEmailQueuesFetched ?
                    <Loader />
                    :
                    <div>
                        <Card>
                            <Card.Body className="">
                                <div className="p-2">
                                    <Row>
                                        <Col lg={6} xs={12}>
                                            <Accordion>
                                                {
                                                    emailQueues['results'].length > 0 ?
                                                        emailQueues['results'].map((delivery, key) =>
                                                            <EmailQueueCardItem delivery={delivery}
                                                                key={key} companyId={companyId}
                                                            />
                                                        ) : <EmptyState />
                                                }

                                            </Accordion>
                                        </Col>
                                        <Col lg={6} xs={12}>
                                            <div>
                                                <Media>
                                                    <div className="pt-1">
                                                        <Icon name="info" className="icon icon-sm svg-outline-secondary" />
                                                    </div>
                                                    <Media.Body>
                                                        <div className="px-3">
                                                            <h2 className="m-0 mb-2"> Luctus sed ut elit nibh </h2>
                                                            <p className="text-wrap pb-0 text-muted">Some quick example text to build on the card title and make up the bulk
                                                            of the card's content.Some quick example text to build on the card title and make up the bulk
        of the card's content.</p>
                                                        </div>
                                                    </Media.Body>
                                                </Media>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
            }

        </>
    );
}

export default withRouter(EmailQueue);
