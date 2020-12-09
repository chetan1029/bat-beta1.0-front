import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../../components/Icon";

interface ComponentsProps {
    match: any;
}

const Components = (props: ComponentsProps) => {
    const { t } = useTranslation();
    const companyId = props.match.params.companyId;

    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/settings/${companyId}`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Components')}</h1>
                        </div>
                    </Col>
                    <Col className="text-right">
                        <Link to={`/product-management/${companyId}/components/add`} className="btn btn-primary">{t('Add Component')}</Link>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default withRouter(Components);