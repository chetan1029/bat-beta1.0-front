import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { useHistory, withRouter, Link } from "react-router-dom";
import Icon from "../../../components/Icon";
import { useTranslation } from 'react-i18next';

//components
import Loader from "../../../components/Loader";
import { TEMPLATE_LANGS, TemplateLanguageDropdown } from "../../../components/TemplateLanguageDropdown";

//plug-ins
import { useFormik } from "formik";
import * as Yup from "yup";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

//actions
import { APICore } from '../../../api/apiCore';
import {
  getTemplate, resetAutoEmails, createTemplate, editTemplate
} from "../../../redux/actions";


interface AddEditTemplateProps {
  match: any;
  location?: any;
}
const AddEditTemplate = (props: AddEditTemplateProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const api = new APICore();

  const loggedInUser = api.getLoggedInUser();


  const { loading, templateDetail, isTemplateUpdated, isTemplateCreated } = useSelector((state: any) => ({
    loading: state.Company.AutoEmails.loading || state.MarketPlaces.loading,
    templateDetail: state.Company.AutoEmails.template,
    isTemplateUpdated: state.Company.AutoEmails.isTemplateUpdated,
    isTemplateCreated: state.Company.AutoEmails.isTemplateCreated,
  }));


  const companyId = props.match.params.companyId;
  const templateId = props.match.params.templateId;

  const defaultParams = useMemo(() => ({ 'limit': 100000000 }), []);


  // get the data
  useEffect(() => {
    dispatch(resetAutoEmails());
    if (templateId) {
      dispatch(getTemplate(companyId, templateId));
    }
  }, [dispatch, companyId, templateId, defaultParams]);


  if (isTemplateUpdated || isTemplateCreated) {
    history.push(`/auto-emails/${companyId}/templates`);
  }

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const validator = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: templateDetail ? templateDetail.name : "",
      subject: templateDetail ? templateDetail.subject : "",
      language: templateDetail ? { label: TEMPLATE_LANGS[templateDetail.language], value: templateDetail.language } : "",
      template: templateDetail ? templateDetail.template: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t("Name is required")),
      subject: Yup.string().required(t("Subject is required")),
      language: Yup.object().required(t("Language is required")),
      template: Yup.string().required(t("Detail is required")),
    }),
    onSubmit: (values) => {
      if (templateDetail) {
        dispatch(editTemplate(companyId, templateDetail.id, { ...values, language: values['language']['value'] }));
      } else {
        dispatch(createTemplate(companyId, { ...values, language: values['language']['value'] }));
      }
    },
  });

  useEffect(() => {
    if (templateDetail && templateDetail.template) {
      const { contentBlocks, entityMap } = htmlToDraft(templateDetail.template);
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      console.log(contentState);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [templateDetail]);

  return (
    <>
      <div className="py-4">
        <Row className='align-items-center'>
          <Col>
            <div className="d-flex align-items-center">
              <Link to={`/auto-emails/${companyId}/templates`}>
                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
              </Link>
              <h1 className="m-0">{templateDetail ? t('Edit Template') : t('Add Template')}</h1>
            </div>
          </Col>
        </Row>
      </div>
      {loading ? <Loader /> : ""}
      <div>
        <Card>
          <Card.Body>
            <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>

              <Form.Group className="mb-4">
                <Form.Label htmlFor="usr">{t("Template Name")}</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Template Name"
                  onBlur={validator.handleBlur}
                  value={validator.values.name}
                  onChange={validator.handleChange}
                  isInvalid={
                    validator.touched.name &&
                      validator.errors &&
                      validator.errors.name
                      ? true
                      : false
                  }
                />

                {validator.touched.name && validator.errors.name ? (
                  <Form.Control.Feedback type="invalid">
                    {validator.errors.name}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label htmlFor="usr">{t("Email Subject")}</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  placeholder="Email Subject"
                  onBlur={validator.handleBlur}
                  value={validator.values.subject}
                  onChange={validator.handleChange}
                  isInvalid={
                    validator.touched.subject &&
                      validator.errors &&
                      validator.errors.subject
                      ? true
                      : false
                  }
                />

                {validator.touched.subject && validator.errors.subject ? (
                  <Form.Control.Feedback type="invalid">
                    {validator.errors.subject}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label htmlFor="usr">{t("Email Content")}</Form.Label>
                <Editor
                  wrapperClassName="wrapper-class"
                  editorClassName="editor-class"
                  toolbarClassName="toolbar-class"
                  toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'list', 'remove', 'history'],
                    inline: {
                      inDropdown: false,
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                      options: ['bold', 'italic', 'underline'],
                    }
                  }}
                  editorState={editorState}
                  onEditorStateChange={(eState: any) => {
                    const body = draftToHtml(convertToRaw(eState.getCurrentContent()));
                    validator.setFieldValue('template', body);
                    setEditorState(eState);
                  }}
                />

                {/* <Form.Control
                  as="textarea"
                  className="form-control"
                  id="template"
                  name="template"
                  placeholder="Email Content"
                  rows={5}
                  onBlur={validator.handleBlur}
                  value={validator.values.template}
                  onChange={validator.handleChange}
                  isInvalid={
                    validator.touched.template &&
                      validator.errors &&
                      validator.errors.template
                      ? true
                      : false
                  }
                /> */}

                {validator.errors.template ? (
                  <Form.Control.Feedback type="invalid">
                    {validator.errors.template}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>{t('Email Language')}</Form.Label>
                    <TemplateLanguageDropdown name='language' placeholder={t('Language')}
                      className={validator.touched.language && validator.errors.language ? "is-invalid" : ""}
                      onChange={(value) => validator.setFieldValue('language', value)}
                      value={validator.values.language} />

                    {validator.touched.language && validator.errors.language ? (
                      <Form.Control.Feedback type="invalid" className="d-block">
                        {validator.errors.language}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <div>
                <Link
                  className="btn btn-outline-primary mr-3"
                  to={`/auto-emails/${companyId}/templates/`}
                >
                  {t("Cancel")}
                </Link>
                <Button type="submit" variant="primary">
                  {templateDetail ? t("Edit Template") : t("Add Template")}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>

    </>
  );
}

export default withRouter(AddEditTemplate);
