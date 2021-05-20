import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { useHistory, withRouter, Link } from "react-router-dom";
import Icon from "../../../components/Icon";
import Flag from 'react-flagkit';
import { useTranslation } from 'react-i18next';

//components
import Loader from "../../../components/Loader";
import DisplayDate from "../../../components/DisplayDate";
import MessageAlert from "../../../components/MessageAlert";
import AlertDismissible from "../../../components/AlertDismissible";
import ConfirmMessage from "../../../components/ConfirmMessage";

//actions
import { APICore } from '../../../api/apiCore';
import {
    getTemplate, resetAutoEmails
} from "../../../redux/actions";


interface AddEditTemplateProps {
    match: any;
    location?: any;
}
const AddEditTemplate = (props: AddEditTemplateProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const api = new APICore();

    const loggedInUser = api.getLoggedInUser();


    const { loading, template, isTemplateUpdated, isTemplateCreated } = useSelector((state: any) => ({
        loading: state.Company.AutoEmails.loading || state.MarketPlaces.loading,
        template: state.Company.AutoEmails.template,
        isTemplateUpdated: state.Company.AutoEmails.isTemplateUpdated,
        isTemplateCreated: state.Company.AutoEmails.isTemplateCreated,
    }));


    const companyId = props.match.params.companyId;
    const templateId = props.match.params.templateId;

    const defaultParams = useMemo(() => ({ 'limit': 100000000 }), []);

    // get the data
    useEffect(() => {
        dispatch(resetAutoEmails());
        dispatch(getTemplate(companyId, templateId));
    }, [dispatch, companyId, templateId, defaultParams]);


    return (
        <>
            <div className="py-4">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                          <Link to={`/auto-emails/${companyId}/templates`}>
                              <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                          </Link>
                          <h1 className="m-0">{t('Add Template')}</h1>
                        </div>
                    </Col>
                </Row>
            </div>

        </>
    );
}

export default withRouter(AddEditTemplate);
