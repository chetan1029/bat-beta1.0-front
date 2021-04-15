import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Card, Alert, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { withRouter } from "react-router-dom";

//components
import Icon from "../../components/Icon";


interface GetStartedProps {
  match?: any;
}


const GetStarted = (props: GetStartedProps) => {
  const { t } = useTranslation();

  return (<>
    <div className="py-4">
      <Row className='align-items-center'>
        <Col>
          <div className="d-flex align-items-center">
            <Icon name="home" className="icon icon-xs  mr-2" />
            <h1 className="m-0">Get Started</h1>
          </div>
        </Col>
        <Col className="text-right"></Col>
      </Row>
    </div>

    <Card>
      <Card.Body className="">
        <div>
          <div className="px-2">
          </div>
        </div>
      </Card.Body>
    </Card>
  </>);
}

export default withRouter(GetStarted);
