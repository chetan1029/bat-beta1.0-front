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
    emailqueues: any;
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


const EmailQueueTable = ({ emailqueues, companyId }: EmailQueueCardItemProps) => {

    return (<>
      <Table bordered className="mt-4">
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Email Campaign</th>
                <th>Email</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
        {
        emailqueues['results'].map((email, key) =>
        <tr>
          <td>{email.amazonorder.order_id}</td>
          <td>{email.emailcampaign.name}</td>
          <td>{email.sent_to}</td>
          <td>{email.status.name}</td>
        </tr>
        )
        }
        </tbody>
      </Table>
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
                            <h1 className="m-0">{t('Email Queue')}</h1>
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
                                    {
                                        emailQueues['results'].length > 0 ?
                                        <EmailQueueTable emailqueues={emailQueues}
                                            companyId={companyId}
                                        />
                                        : <EmptyState />

                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
            }

        </>
    );
}

export default withRouter(EmailQueue);
