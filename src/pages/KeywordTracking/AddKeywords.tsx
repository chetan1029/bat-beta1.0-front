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
    amazonaccountId: any;
}
const AddKeywords = ({ isOpen, onClose, companyId, productId, amazonaccountId }: AddKeywordsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetkeywordTracking());
    }, [dispatch]);

    const [asins, setAsins] = useState<any>([]);

    const { createKeywordsError, isKeywordsCreated, suggestedkeywords } = useSelector((state: any) => ({
        createKeywordsError: state.Company.KeywordTracking.createKeywordsError,
        isKeywordsCreated: state.Company.KeywordTracking.isKeywordsCreated,
        suggestedkeywords: state.Company.KeywordTracking.suggestedkeywords,
    }));

    const handleAsinsKeyDown = (event: any) => {
  		const { value } = event.target;
  		setAsins(value);
  		if ([13].includes(event.keyCode)) {
  			dispatch(suggestKeywords(companyId, { asins: value, amazonaccount_id: amazonaccountId}));
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

    var keywords = ""
    var keywords_count = 0
    if (suggestedkeywords && suggestedkeywords.data){
      keywords_count = suggestedkeywords.data.length
      suggestedkeywords.data.map((keyword, key)=>
      validator.values.keywords += keyword+"\n"
    )
    }

    return (
        <Modal show={isOpen} onHide={onClose} size="lg">
            <Modal.Header closeButton className="add-hscode-modal-header">
                <Modal.Title>{t("Add Keywords")}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="position-relative">

                    <div>
                      <div className="d-flex">
                        <div className="search w-100">
                          <input type="text" placeholder="Enter ASIN's to search for keywords"
                            onChange={(e: any) => setAsins(e.target.value)}
                            onKeyDown={handleAsinsKeyDown} />
                          <button type="submit">
                            <img src={searchIcon} alt=""
                              onClick={() => dispatch(suggestKeywords(companyId, {asins: asins, amazonaccount_id: amazonaccountId}))} />
                          </button>
                        </div>
                      </div>
                        {(!isKeywordsCreated && createKeywordsError) ? <AlertMessage error={createKeywordsError} /> : null}

                        <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="usr">{t('Keywords')}</Form.Label>
                                <Form.Control as="textarea" rows={15} className="form-control" id="keywords" name="keywords" placeholder="Keywords"
                                    onBlur={validator.handleBlur}
                                    value={validator.values.keywords}
                                    onChange={validator.handleChange}
                                    isInvalid={validator.touched.keywords && validator.errors && validator.errors.keywords ? true : false}
                                    />


                                {validator.touched.keywords && validator.errors.keywords ? (
                                    <Form.Control.Feedback type="invalid">{validator.errors.keywords}</Form.Control.Feedback>
                                ) : null}
                                {keywords_count ?
                                <Form.Text className={"text-success mt-2 h6"}>
                                  {keywords_count} Keywords
                                </Form.Text>: ""}
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
