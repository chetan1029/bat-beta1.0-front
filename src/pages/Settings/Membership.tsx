import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Table, Accordion } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";

//actions
import { getMembershipPlan } from "../../redux/actions";

import Loader from "../../components/Loader";

interface MembershipPlanItemProps {
    membershipplan: any;
    companyId: any;
}

const EmptyState = () => {
    const { t } = useTranslation();
    return (
        <Card className="payment-terms-card mb-2">
            <Card.Body>
                <div className="p-2">
                    <h5 className="font-weight-normal my-0">{t('There are no Membership Plan available')}</h5>
                </div>
            </Card.Body>
        </Card>
    )
}


const MembershipPlanItem = ({ membershipplan, companyId }: MembershipPlanItemProps) => {
    const { t } = useTranslation();
    // const dispatch = useDispatch();


    return (<>
        <Row className="mt-3">
            <Col lg={12}>
                <Card className="payment-terms-card mb-2">
                    <Card.Header className="payment-card-title">
                      <Row>
                        <Col sm={6}>
                          <p className="m-0 text-muted">{t('Plan Name')}</p>
                          <h6 className="m-0">{membershipplan.plan.name}</h6>
                        </Col>
                        <Col sm={6}>
                          <p className="m-0 text-muted text-right">{t('Price')}</p>
                          {
                            membershipplan.plan.cost.amount ?
                          <h6 className="m-0 text-right">
                          {membershipplan.plan.cost.currency} {membershipplan.plan.cost.amount}/{ membershipplan.plan.recurrence_period != 1 ? membershipplan.plan.recurrence_period : "" } {membershipplan.plan.recurrence_unit}
                          </h6>
                          :<h6 className="m-0 text-right">Free</h6> }
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                        <p className="m-0 text-muted">{t('Detail')}</p>
                        <p className="m-0">{membershipplan.plan.description}</p>
                        <Row className="mt-3">
                            <Col xs={6} lg={4}>
                                <p className="m-0 text-muted">{t('Start Date')}</p>
                                <p className="m-0">{membershipplan.billing_start_date}</p>
                            </Col>
                        </Row>
                        <Table bordered className="mt-4">
                            <thead>
                                <tr>
                                    <th>Quota Name</th>
                                    <th>Alloted</th>
                                    <th>Used</th>
                                    <th>Available</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    membershipplan.plan["plan_quotas"].map((quota, key) =>
                                        <tr>
                                            <td>{quota.quota.name}</td>
                                            <td>{quota.value} {quota.quota.unit}</td>
                                            <td>{quota.used_quota} {quota.quota.unit}</td>
                                            <td>{quota.available_quota} {quota.quota.unit}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>
    )
}

interface MembershipPlanProps {
    match: any;
}
const MembershipPlan = (props: MembershipPlanProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { membershipPlan, isMembershipPlanFetched } = useSelector((state: any) => ({
        membershipPlan: state.Company.MembershipPlan.membershipPlan,

        //flags
        isMembershipPlanFetched: state.Company.MembershipPlan.isMembershipPlanFetched,
    }));

    const companyId = props.match.params.companyId;
    /*
    delivery tems
    */
    useEffect(() => {
        const companyId = props.match.params.companyId;
        if (companyId) {
            dispatch(getMembershipPlan(companyId, { is_active: true }));
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
                            <h1 className="m-0">{t('Membership Plan')}</h1>
                        </div>
                    </Col>

                </Row>
            </div>

            {
                !isMembershipPlanFetched ?
                    <Loader />
                    :
                    <div>
                        <div className="p-2">
                            <Row>
                                <Col md={{ span: 6, offset: 3 }}>
                                    <Accordion>
                                        {
                                            membershipPlan['results'].length > 0 ?
                                                membershipPlan['results'].map((membershipplan, key) =>
                                                    <MembershipPlanItem membershipplan={membershipplan}
                                                        key={key} companyId={companyId}
                                                    />
                                                ) : <EmptyState />
                                        }

                                    </Accordion>
                                </Col>
                            </Row>
                        </div>
                    </div>
            }

        </>
    );
}

export default withRouter(MembershipPlan);
