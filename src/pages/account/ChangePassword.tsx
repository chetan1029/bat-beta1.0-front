import React from "react";
import { useDispatch } from 'react-redux';
import { Row, Col, Card } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import ConfirmMessage from "../../components/ConfirmMessage";
import TabMenu from "../../components/TabMenu";


interface ChangePasswordProps {

}

const ChangePassword = (props: ChangePasswordProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();


    const menuItems: Array<any> = [
        { label: t('General info'), name: 'general', to: '/profile/general' },
        { label: t('Change password'), name: 'change-password', to: '/profile/change-password' }
    ];

    return <>
        <div className="py-4 px-3">
            <Row>
                <Col>
                    <div className="d-flex align-items-center">
                        <Icon name="user" className="icon icon-xs mr-2" />
                        <h1 className="m-0">{t('Profile')}</h1>
                    </div>
                </Col>
            </Row>
        </div>

        <Card>
            <Card.Body className="">
                <TabMenu items={menuItems} defaultSelectedItem={'change-password'} />
            </Card.Body>
        </Card>
    </>;
}

export default ChangePassword;