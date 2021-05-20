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
    getTemplates,
    getMembershipPlan, deleteTemplate
} from "../../../redux/actions";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

interface TemplatesProps {
    match: any;
    location?: any;
}
const Templates = (props: TemplatesProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();

    const queryParam: any = props.location.search;
    const [successMsg, setSuccessMsg] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState<any>(null);

    const api = new APICore();

    const loggedInUser = api.getLoggedInUser();

    useEffect(() => {
        const params = new URLSearchParams(queryParam);
        const success = params.get('success');
        const error = params.get('error');

        if (success) {
            setSuccessMsg(success);
            setErrorMsg(null);
        }
        if (error) {
            setSuccessMsg(null);
            setErrorMsg(error);
        }
    }, [queryParam]);


    const { loading, templates, markets, membershipPlan, isTemplatesFetched } = useSelector((state: any) => ({
        loading: state.Company.AutoEmails.loading || state.MarketPlaces.loading,
        isTemplatesFetched: state.Company.AutoEmails.isTemplatesFetched,
        templates: state.Company.AutoEmails.templates,
        markets: state.MarketPlaces.markets,
        membershipPlan: state.Company.MembershipPlan.membershipPlan,
    }));


    const companyId = props.match.params.companyId;

    const defaultParams = useMemo(() => ({ 'limit': 100000000 }), []);

    // get the data
    useEffect(() => {
        dispatch(getTemplates(companyId, defaultParams));
        dispatch(getMembershipPlan(companyId, { is_active: true }));
    }, [dispatch, companyId, defaultParams]);


    // Delete template
    const ondeleteTemplate = (template: any) => {
      setselectedTemplateForDelete(template);
      dispatch(getTemplates(companyId, defaultParams));
    };

    const [selectedTemplateForDelete, setselectedTemplateForDelete] = useState<any>(null);


    const plan = membershipPlan && membershipPlan.results && membershipPlan.results.length ? membershipPlan.results[0]['plan'] : null;
    const quotas = plan ? (plan['plan_quotas'] || []).find(pq => (pq['quota'] && pq['quota']['codename'] === "MARKETPLACES")) : {};

    const isActiveMarket = quotas && quotas['available_quota'] > 0 ? true : false;

    return (
        <>
            <div className="py-4">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Icon name="mail2" className="icon icon-xs  mr-2" />
                            <h1 className="m-0">{t('Manage Templates')}</h1>
                        </div>
                    </Col>
                    <Col className="text-right">
                        <Link
                          className="btn btn-primary"
                          to={`/auto-emails/${companyId}/templates/add`}
                        >
                          {t("Add Template")}
                        </Link>
                    </Col>
                </Row>
            </div>
            { loggedInUser['first_login'] ?
            <AlertDismissible heading="Getting started guide!" message="Do you wanna go through getting started guide." cancelBtnVariant="danger" cancelBtnLabel="I will figure it out!" confirmBtnVariant="primary" confirmBtnLabel="Go to Getting Started" confirmBtnLink={`/get-started/${companyId}`} />
            : null}

                    {loading ? <Loader /> : <div>
                        <div>
                            <Row>
                                <Col lg={12}>
                                    <div className={"list-view"}>
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>{t("Template Name")}</th>
                                                    <th>{t("Language")}</th>
                                                    <th>{t("Subject")}</th>
                                                    <th>{t("Action")}</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {templates.map((template, idx) => {
                                                    return <React.Fragment key={idx}>
                                                        <tr>
                                                            <td className='clickable-row font-weight-bold'>
                                                              {template['name']}
                                                            </td>
                                                            <td className='clickable-row'>
                                                              {template['language']}
                                                            </td>
                                                            <td className='clickable-row'>
                                                              {template['subject']}
                                                            </td>
                                                            <td>
                                                                <Link to={`/auto-emails/${companyId}/templates/edit/${template.id}`} className="btn btn-sm btn-primary">{t('Edit')}</Link>
                                                                <Button onClick={() => ondeleteTemplate(template)} className="btn btn-sm btn-danger ml-2">{t('Delete')}</Button>
                                                            </td>
                                                        </tr>
                                                    </React.Fragment>
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>}

              {selectedTemplateForDelete ? <ConfirmMessage message={`Are you sure you want to delete ${selectedTemplateForDelete.name}?`} onConfirm={() => {
                  dispatch(deleteTemplate(companyId, selectedTemplateForDelete.id));
              }} onClose={() => setselectedTemplateForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Delete')}></ConfirmMessage> : null}

            {successMsg ? <MessageAlert message={successMsg} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
            {errorMsg ? <MessageAlert message={errorMsg} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
        </>
    );
}

export default withRouter(Templates);
