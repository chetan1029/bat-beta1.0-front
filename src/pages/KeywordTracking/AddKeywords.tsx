import React, { useEffect, useState } from 'react';
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

//plug-ins
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Import loader
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import searchIcon from "../../assets/images/search_icon.svg";
import ExistingDataWarning from "../../components/ExistingDataWarning";

//action
import { createKeywords, resetkeywordTracking, suggestKeywords } from "../../redux/actions";
interface AddKeywordsProps {
    isOpen: boolean;
    onClose: any;
    companyId: any;
    productId: any;
}
const AddKeywords = ({ isOpen, onClose, companyId, productId }: AddKeywordsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetkeywordTracking());
    }, [dispatch]);

    const [asins, setAsins] = useState<any>([]);

    const { createKeywordsError, isKeywordsCreated, loading, suggest_keyword } = useSelector((state: any) => ({
        createKeywordsError: state.Company.KeywordTracking.createKeywordsError,
        isKeywordsCreated: state.Company.KeywordTracking.isKeywordsCreated,
        loading: state.Company.KeywordTracking.loading,
        suggest_keyword: state.Company.KeywordTracking.suggest_keyword,
    }));

    const handleAsinsKeyDown = (event: any) => {
  		const { value } = event.target;
  		setAsins(value);
  		if ([13].includes(event.keyCode)) {
  			dispatch(suggestKeywords(companyId, { asins: value}));
  		}
  	};


    /*
    validation
    */
    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            keywords: '',
        },
        validationSchema: Yup.object({
            keywords: Yup.string().required(t('Keywords is required')),
        }),
        onSubmit: values => {
          dispatch(createKeywords(companyId, { ...values, amazon_product_pk: productId}));
        },
    });


    const onCancel = () => {
        validator.resetForm();
        onClose();
    }

    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-hscode-modal-header">
                <Modal.Title>{t("Add Keywords")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="position-relative">

                    <div>
                      <div className="d-flex align-items-center">
                        <div className="search">
                          <input type="text" placeholder="Search"
                            onChange={(e: any) => setAsins(e.target.value)}
                            onKeyDown={handleAsinsKeyDown} />
                          <button type="submit">
                            <img src={searchIcon} alt=""
                              onClick={() => dispatch(suggestKeywords(companyId, {asins: asins}))} />
                          </button>
                        </div>
                      </div>
                        {(!isKeywordsCreated && createKeywordsError) ? <AlertMessage error={createKeywordsError} /> : null}

                        <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>

                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="usr">{t('Keywords')}</Form.Label>
                                <Form.Control as="textarea" rows={15} className="form-control" id="keywords" name="keywords" placeholder="Keywords"
                                    onBlur={validator.handleBlur}
                                    value={suggest_keyword}
                                    onChange={validator.handleChange}
                                    isInvalid={validator.touched.keywords && validator.errors && validator.errors.keywords ? true : false}
                                    maxLength={200} />


                                {validator.touched.keywords && validator.errors.keywords ? (
                                    <Form.Control.Feedback type="invalid">{validator.errors.keywords}</Form.Control.Feedback>
                                ) : null}
                            </Form.Group>
                            <div>
                                <Button type="button" onClick={() => onCancel()} variant="outline-primary" className="mr-3" >{t('Cancel')}</Button>
                                <Button type="submit" variant="primary">{t("Add Keywords")}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export default AddKeywords;
