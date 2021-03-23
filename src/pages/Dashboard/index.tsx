import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Table } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import Icon from "../../components/Icon";
import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next';

//components
import Loader from "../../components/Loader";
import DisplayDate from "../../components/DisplayDate";

interface DashboardProps {

}

const Dashboard = (props: DashboardProps) => {
    return (<>
        <div className="py-4">
            <Row className='align-items-center'>
                <Col>
                    <div className="d-flex align-items-center">
                        <Icon name="home" className="icon icon-xs  mr-2" />
                        <h1 className="m-0">Dashboard</h1>
                    </div>
                </Col>
                <Col className="text-right"></Col>
            </Row>
        </div>

        <Card>
            <Card.Body className="">

                <div>
                    <div className="px-2">
                        <Row className="mt-5 mb-5">
                            <Col lg={12}>
                                <div className={"list-view"}>
                                  <h3>Graph</h3>
                                </div>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col lg={3}>
                              <Card className="pt-2 mb-2">
                                  <Card.Body className="">
                                    <h3>$112,455 Sales</h3>
                                  </Card.Body>
                              </Card>
                            </Col>
                            <Col lg={3}>
                              <Card className="pt-2 mb-2">
                                  <Card.Body className="">
                                    <h3>2345 Orders</h3>
                                  </Card.Body>
                              </Card>
                            </Col>
                            <Col lg={3}>
                              <Card className="pt-2 mb-2">
                                  <Card.Body className="">
                                    <h3>2340 Email Sent</h3>
                                  </Card.Body>
                              </Card>
                            </Col>
                            <Col lg={3}>
                              <Card className="pt-2 mb-2">
                                  <Card.Body className="">
                                    <h3>4567 Email in Queue</h3>
                                  </Card.Body>
                              </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Card.Body>
        </Card>
    </>);
}

export default Dashboard;
