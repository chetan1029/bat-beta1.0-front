import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const AccessDenied = () => {
    useEffect(() => {
        document['body'].classList.add('auth-bg');

        return () => {
            document['body'].classList.remove('auth-bg');
        }
    }, []);

    const { t } = useTranslation();


    return <>

        <div className="h-100 d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Card>
                            <Card.Body className="p-4">
                                <Row className="no-gutters">
                                    <Col>
                                        <div className="text-center">
                                            <h1 className="my-0 display-1">{t('403')}</h1>
                                            <h1>{t('Oops! Access Deined/Forbidden')}</h1>

                                            <p className="text-muted mt-1 mb-4">
                                                {t('Sorry, you don\'t have permission to access this page or resource. If you think something is broken, contact us.')}
                                            </p>

                                            <Link to='/' className="btn btn-primary">{t('Back to Home')}</Link>
                                        </div>
                                    </Col>
                                </Row>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>
        </div>
    </>;
}

export default AccessDenied;