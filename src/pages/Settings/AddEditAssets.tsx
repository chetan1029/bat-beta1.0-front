import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { Row, Col, Form, Modal, Button, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
import { map } from "lodash";
//plug-ins
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from 'date-fns'
//action
import { createAsset, editAsset, resetAsset, getAssetType, getLocations } from "../../redux/actions";
import { CURRENCIES } from "../../constants";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import ExistingDataWarning from "../../components/ExistingDataWarning";
import CurrenciesDropdown from "../../components/CurrenciesDropdown";


interface AddEditAssetsProps {
  isOpen: boolean;
  onClose: any;
  asset?: any;
  companyId: any;
}
const AddEditAssets = ({
  isOpen,
  onClose,
  asset,
  companyId
}: AddEditAssetsProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetAsset());
    dispatch(getLocations(companyId, { is_active: true }));
    dispatch(getAssetType(companyId, { is_active: true }));
  }, [dispatch]);

  const {
    createAssetError,
    isAssetCreated,
    editAssetError,
    isAssetUpdated,
    loading,
    locations,
    assettypes,
  } = useSelector((state: any) => ({
    createAssetError: state.Company.AssetsState.createAssetError,
    isAssetCreated: state.Company.AssetsState.isAssetCreated,
    locations: state.Company.AssetsState.locations,
    assettypes: state.Company.AssetsState.assettypes,
    editAssetError: state.Company.AssetsState.editAssetError,
    isAssetUpdated: state.Company.AssetsState.isAssetUpdated,
    loading: state.Company.AssetsState.loading,
  }));

  const [showTotalError, setshowTotalError] = useState(false);

  const defaultTypes = assettypes && map(assettypes.type_data, (type: any) => ({
    label: type,
    value: type
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
      title: asset ? asset.title : "",
      detail: asset ? asset.detail : "",
      date: asset ? getDate(asset.date) : "",
      current_location: asset ? { label: asset.current_location.name, value: asset.current_location.id } : "",
      type: asset ? { label: asset.type, value: asset.type } : "",
      price: asset ? asset.price : { amount: "", currency: "USD" },
      asset_id: asset ? asset.asset_id : "",
      receipt: asset ? asset.receipt : "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required(t("Asset title is required")),
      detail: Yup.string().required(t("Asset detail is required")),
      date: Yup.date().required(t("Asset date is required")),
      price: Yup.object({
        amount: Yup.number().required(t('Price amount is required')),
        currency: Yup.string().required(t('Price currency is required'))
      }),
      type: Yup.object().required(t("Asset type is required")),
      current_location: Yup.object().required(t("Asset location is required")),
      asset_id: Yup.string().required(t("A unique ID for the asset is required. You can put order number as a Asset ID also.")),
    }),
    onSubmit: (values) => {
      // React-select retrun object issue
      values.type = values.type["value"]
      values.current_location = values.current_location["value"]
      // Date dd/MM/YYYY not accepeted
      if (values.date) {
        values.date = format(new Date(values.date), 'yyyy-MM-dd hh:mm')
      }

      if (receiptFile) {
        values.receipt = receiptFile;
      } else {
        delete values.receipt;
      }
      if (asset) {
        dispatch(editAsset(companyId, asset.id, { ...values, price: JSON.stringify(values['price']) }));
      } else {
        dispatch(createAsset(companyId, { ...values, price: JSON.stringify(values['price']) }));
      }
    },
  });

  const onCancel = () => {
    validator.resetForm();
    onClose();
  };

  const [receiptFile, setreceiptFile] = useState<any>();
  const onReceiptFile = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setreceiptFile(file);
    }
  }

  let selectedCurrency = validator.values && validator.values.price && validator.values.price.currency ? { label: validator.values.price.currency, value: validator.values.price.currency } : null;


  return (
    <Modal show={isOpen} onHide={onClose} size="lg">
      <Modal.Header closeButton className="add-payment-modal-header">
        <Modal.Title>{asset ? t("Edit Asset") : t("Add Asset")}</Modal.Title>
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
              <Form.Group className="mb-4">
                <Form.Label htmlFor="usr">{t("Asset ID")}</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="asset_id"
                  name="asset_id"
                  placeholder="Enter asset id"
                  onBlur={validator.handleBlur}
                  value={validator.values.asset_id}
                  onChange={validator.handleChange}
                  isInvalid={
                    validator.touched.asset_id &&
                      validator.errors &&
                      validator.errors.asset_id
                      ? true
                      : false
                  }
                />

                {validator.touched.asset_id && validator.errors.asset_id ? (
                  <Form.Control.Feedback type="invalid">
                    {validator.errors.asset_id}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label htmlFor="usr">{t("Asset Title")}</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  placeholder="Enter asset title"
                  onBlur={validator.handleBlur}
                  value={validator.values.title}
                  onChange={validator.handleChange}
                  isInvalid={
                    validator.touched.title &&
                      validator.errors &&
                      validator.errors.title
                      ? true
                      : false
                  }
                />

                {validator.touched.title && validator.errors.title ? (
                  <Form.Control.Feedback type="invalid">
                    {validator.errors.title}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label htmlFor="usr">{t("Asset Detail")}</Form.Label>
                <Form.Control
                  as="textarea"
                  className="form-control"
                  id="detail"
                  name="detail"
                  placeholder="Enter asset detail"
                  rows={5}
                  onBlur={validator.handleBlur}
                  value={validator.values.detail}
                  onChange={validator.handleChange}
                  isInvalid={
                    validator.touched.detail &&
                      validator.errors &&
                      validator.errors.detail
                      ? true
                      : false
                  }
                />

                {validator.touched.detail && validator.errors.detail ? (
                  <Form.Control.Feedback type="invalid">
                    {validator.errors.detail}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="usr">{t("Asset Type")}</Form.Label>
                    <CreatableSelect
                      id={"type"}
                      name={"type"}
                      placeholder={t('Asset type')}
                      isClearable
                      options={defaultTypes || []}
                      onChange={(value: any) => validator.setFieldValue('type', value)}
                      value={validator.values.type}
                      className={classNames("react-select", "react-select-regular", validator.touched.type && validator.errors.type && "is-invalid")}
                      classNamePrefix="react-select"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label htmlFor="usr">{t("Price")}</Form.Label>
                  <Form.Group className="mb-4">
                    <InputGroup>
                      <Form.Control type="number" className="form-control w-75" id="price" name="price.amount" placeholder="Amount"
                        onBlur={validator.handleBlur}
                        value={validator.values.price.amount}
                        onChange={validator.handleChange}
                        isInvalid={validator.touched.price && validator.errors && validator.errors.price ? true : false}
                      />
                      <CurrenciesDropdown name='currency' placeholder={t('Currency')}
                        onChange={(value) => validator.setFieldValue('price.currency', value ? value['value'] : value)}
                        className="w-25 currency-input-group" showInternal={true}
                        value={selectedCurrency} isSingle={true} />
                    </InputGroup>
                    {validator.touched.price && validator.errors.price && validator.errors.price['amount'] ? (
                      <Form.Control.Feedback type="invalid" className='show'>{validator.errors.price['amount']}</Form.Control.Feedback>
                    ) : null}
                    {validator.touched.price && validator.errors.price && validator.errors.price['currency'] ? (
                      <Form.Control.Feedback type="invalid" className='show'>{validator.errors.price['currency']}</Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
                </Col>

              </Row>

              <Row>
                <Col>
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="usr">{t("Asset Date")}</Form.Label>
                    <Form.Control
                      type="date"
                      className="form-control"
                      id="date"
                      name="date"
                      placeholder="Select asset date"
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
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="usr">{t("Asset Location")}</Form.Label>
                    <Select
                      id="current_location"
                      name="current_location"
                      placeholder={t("Select asset location")}
                      isClearable
                      options={defaultLocations || []}
                      onChange={(value: any) => {
                        validator.setFieldValue("current_location", value);
                      }}
                      value={validator.values.current_location}
                      className={classNames(
                        "react-select",
                        "react-select-regular",
                        validator.touched.current_location &&
                        validator.errors.current_location &&
                        "is-invalid"
                      )}
                      classNamePrefix="react-select"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group>
                <Form.Label>{t('Asset Receipt')}</Form.Label>
                <Form.Control type="file" name="receipt" id="receipt"
                  onChange={onReceiptFile} custom />

                {asset && asset.receipt ? <p className="mb-0">
                  {t('Asset Receipt')}: <a href={asset.receipt} target='_blank' className='text-primary' rel="noreferrer">{t('View Receipt File')}</a>
                </p> : null}
              </Form.Group>

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
                  {asset ? t("Edit Asset") : t("Add Asset")}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditAssets;
