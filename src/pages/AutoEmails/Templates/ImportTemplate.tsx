import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Row, Col, Modal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';

import { testTemplate } from "../../../redux/actions";
import Loader from "../../../components/Loader";
import MessageAlert from "../../../components/MessageAlert";
import classNames from "classnames";
import {
    getGlobalTemplates, getGlobalTemplate, createTemplate
} from "../../../redux/actions";
import Select, { components } from 'react-select';

const isValidEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

interface EmailTemplateProps {
    companyId: string | number;
    onClose: any;
}
const EmailTemplate = ({ companyId, onClose }: EmailTemplateProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, globaltemplates, globaltemplate, isTemplatesFetched } = useSelector((state: any) => ({
        loading: state.Company.AutoEmails.templateTestLoading,
        globaltemplates: state.Company.AutoEmails.globaltemplates,
        globaltemplate: state.Company.AutoEmails.globaltemplate,
        isTemplatesFetched: state.Company.AutoEmails.isTemplatesFetched,
    }));

    // get the data
    useEffect(() => {
        dispatch(getGlobalTemplates({ 'limit': 100000000 }));
    }, [dispatch, companyId]);

    const [email, setEmail] = useState("");
    const [templateValue, setTemplateValue] = useState({ label: "Select Prebuild Email Template", value: "" });

    const isEnabled = email && isValidEmail(email) ? true: false;

    const onSelectTemplate = (prebuildTemplate:any) => {
        setTemplateValue(prebuildTemplate);
        dispatch(getGlobalTemplate(prebuildTemplate['value']));
    }

    let templateOpts: Array<any> = [];

    if (isTemplatesFetched){
      for (const globaltemplate of globaltemplates.filter(m => m['is_active'] === true)) {
          templateOpts.push({
              label: globaltemplate['name'],
              value: globaltemplate['id']
          });
      }
    }

    const saveTemplate = (template:any, companyId:number|string) => {
      dispatch(createTemplate(companyId, { ...template }));
      onClose();
    }


    return <>
        <Modal show={true} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-payment-modal-header py-1"></Modal.Header>
            <Modal.Body className="p-4">
                {loading ? <Loader /> : null}

                <h4>{t('PreBuild Email Template')}</h4>

                <Form.Group className="mb-4">
                  <Select
                    id="prebuild_template"
                    name="prebuild_template"
                    placeholder={t("Select Prebuild Template")}
                    isClearable
                    options={templateOpts || []}
                    onChange={(value: any) => {
                      onSelectTemplate(value)
                    }}
                    value={templateValue}
                    className={classNames(
                      "react-select",
                      "react-select-regular",
                    )}
                    classNamePrefix="react-select"
                  />
                </Form.Group>

                {globaltemplate ? <>
                <h6 className="mt-3 no-action">{t('Email Subject')}</h6>
                <p className="mb-0 text-muted no-action">{globaltemplate['subject']}</p>

                <h6 className="mt-3 no-action">{t('Email Body')}</h6>
                <p className="mb-1 text-muted no-action"><div dangerouslySetInnerHTML={{__html: globaltemplate['template']}} /></p>

                <div className="mt-5">
                <Button variant={"primary"} className="mr-2" onClick={() => saveTemplate(globaltemplate, companyId)}>{t('Save Template')}</Button>
                <Button variant="outline-primary" onClick={onClose} className="">{t('Close')}</Button>
                </div>
                </>: null}
            </Modal.Body>
        </Modal>
    </>;
}

export default EmailTemplate;
