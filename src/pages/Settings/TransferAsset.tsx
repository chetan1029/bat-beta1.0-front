import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { Row, Col, Form, Modal, Button, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { map } from "lodash";
//plug-ins
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from 'date-fns'
//action
import { createAsset, editAsset, resetAsset, getLocations } from "../../redux/actions";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import ExistingDataWarning from "../../components/ExistingDataWarning";


interface TransferAssetProps {
  isOpen: boolean;
  onClose: any;
  asset?: any;
  companyId: any;
}
const TransferAsset = ({
  isOpen,
  onClose,
  asset,
  companyId
}: TransferAssetProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAsset());
    dispatch(getLocations(companyId, { is_active: true }));
  }, [dispatch]);

  const {
    createAssetError,
    isAssetCreated,
    editAssetError,
    isAssetUpdated,
    loading,
    locations,
  } = useSelector((state: any) => ({
    locations: state.Company.AssetsState.locations,
    createAssetError: state.Company.AssetsState.createAssetError,
    isAssetCreated: state.Company.AssetsState.isAssetCreated,

    editAssetError: state.Company.AssetsState.editAssetError,
    isAssetUpdated: state.Company.AssetsState.isAssetUpdated,
    loading: state.Company.AssetsState.loading,
  }));


  const defaultLocations =
    locations.results.length > 0 &&
    locations.results.map((location) => {
      return {
        label: location.name,
        value: location.id,
      };
    });

  /*
    validation
    */

  const getDate = (date) => {
    if (date) {
      var fulldate = date.split('T');
      return fulldate[0];
    } else {
      return "";
    }
  }

  const validator = useFormik({
    enableReinitialize: true,
    initialValues: {
      from_location: null,
      to_location: null,
      date: "",
      note: ""
    },
    validationSchema: Yup.object({
      date: Yup.date().required(t("Date is required")),
      from_location: Yup.object({
        label: Yup.string(),
        value: Yup.string().required(t('From Location is required'))
      }),
      to_location: Yup.object({
        label: Yup.string(),
        value: Yup.string().required(t('To Location is required'))
      }),
      note: Yup.string()
    }),
    onSubmit: (values) => {
      // Date dd/MM/YYYY not accepeted
      if (values.date) {
        values.date = format(new Date(values.date), 'yyyy-MM-dd hh:mm')
      }

      if (asset) {
        dispatch(editAsset(companyId, asset.id, values));
      } else {
        dispatch(createAsset(companyId, values));
      }
    },
  });

  console.log(validator);

  const onCancel = () => {
    validator.resetForm();
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg">
      <Modal.Header closeButton className="add-payment-modal-header">
        <Modal.Title>{asset ? t("Transfer Asset") : t("Transfer Asset")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="position-relative">
          {loading ? <Loader /> : null}

          <div>
            {createAssetError && createAssetError["existing_items"] ? (
              <ExistingDataWarning
                name={t("Asset(s)")}
                message={createAssetError}
                onConfirm={() => {
                  dispatch(
                    createAsset(companyId, {
                      ...validator.values,
                      force_create: true,
                    })
                  );
                }}
                onClose={() => { }}
                displayField={"title"}
              />
            ) : null}
            {!isAssetCreated &&
              createAssetError &&
              !createAssetError["existing_items"] ? (
                <AlertMessage error={createAssetError} />
              ) : null}
            {!isAssetUpdated && editAssetError && (
              <AlertMessage error={editAssetError} />
            )}

            <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>

              <Row>
                <Col>
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="usr">{t("From Location")}</Form.Label>
                    <Select
                      id="current_location"
                      name="current_location"
                      placeholder={t("Select location")}
                      isClearable
                      options={defaultLocations || []}
                      onChange={(value: any) => {
                        validator.setFieldValue("from_location", value);
                      }}
                      value={validator.values.from_location}
                      className={classNames(
                        "react-select",
                        "react-select-regular",
                        validator.touched.from_location &&
                        validator.errors.from_location &&
                        "is-invalid"
                      )}
                      classNamePrefix="react-select"
                    />
                    {validator.touched.to_location && validator.errors.to_location ? (
                      <Form.Control.Feedback type="invalid">
                        {t('From Location is required')}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="usr">{t("To Location")}</Form.Label>
                    <Select
                      id="current_location"
                      name="current_location"
                      placeholder={t("Select location")}
                      isClearable
                      options={defaultLocations || []}
                      onChange={(value: any) => {
                        validator.setFieldValue("to_location", value);
                      }}
                      value={validator.values.to_location}
                      className={classNames(
                        "react-select",
                        "react-select-regular",
                        validator.touched.to_location &&
                        validator.errors.to_location &&
                        "is-invalid"
                      )}
                      classNamePrefix="react-select"
                    />
                    {validator.touched.to_location && validator.errors.to_location ? (
                      <Form.Control.Feedback type="invalid">
                        {t('To Location is required')}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="usr">{t("Date")}</Form.Label>
                    <Form.Control
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      placeholder="Select date"
                      onBlur={validator.handleBlur}
                      value={validator.values.date}
                      onChange={validator.handleChange}
                      isInvalid={
                        validator.touched.date &&
                          validator.errors &&
                          validator.errors.date
                          ? true
                          : false
                      }
                    />

                    {validator.touched.date && validator.errors.date ? (
                      <Form.Control.Feedback type="invalid">
                        {validator.errors.date}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </Col>
                <Col>

                </Col>
              </Row>

              <div>
                <Button
                  type="button"
                  onClick={() => onCancel()}
                  variant="outline-primary"
                  className="mr-3"
                >
                  {t("Cancel")}
                </Button>
                <Button type="submit" variant="primary">
                  {t("Submit")}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TransferAsset;
