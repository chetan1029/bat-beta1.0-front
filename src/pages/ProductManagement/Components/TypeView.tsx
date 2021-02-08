import React from 'react';
import { Col, Row, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import Icon from "../../../components/Icon";
import dummyImage from "../../../assets/images/dummy_image.svg";

interface TypeProps {
    type: any;
    onClick: any;
}

const Type = (props: TypeProps) => {
    const { t } = useTranslation();
    const { type, onClick } = props;

    return <Card className="payment-terms-card mb-2 cursor-pointer" onClick={() => { onClick(type['type']) }}>
        <Card.Body>
            <Row>
                <Col lg={3}>
                    <Icon name='box-3' className='text-primary icon icon-md' />
                </Col>
                <Col lg={9} className="text-right">
                    <div className="type-product-image-list">
                        {(type['products'] || []).map((product, idx) => {
                            return <img src={product ? product : dummyImage} key={idx} className="type-product-image" alt="" />
                        })}
                        {type['total'] > 3 ? <div className="type-product-image-more">{t('+')}{type['total'] - 3}</div> : null}
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col>
                    <h5 className="font-15 my-1">{type['type']}</h5>
                    <p className="mb-0 text-muted">{type['total']}&nbsp;{t('Products')}</p>
                </Col>
            </Row>

        </Card.Body>
    </Card>
}


interface TypeViewProps {
    types: any;
    onClick: any;
}

const TypeView = (props: TypeViewProps) => {
    const { types, onClick } = props;

    return <>
        <Row className="mt-4">
            {(types || []).map((type, idx) => {
                return <Col lg={4} key={idx}>
                    <Type type={type} onClick={onClick}></Type>
                </Col>
            })}
        </Row>
    </>
}

export default TypeView;
