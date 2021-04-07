import React, { useEffect } from "react";
import Select from "react-select";
import { Row, Col, Form, Modal, Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import classNames from "classnames";
//plug-ins
import { useFormik } from "formik";
import * as Yup from "yup";
import { format } from 'date-fns'
//action
import { fetchAssetTransfers, transferAsset, resetAsset, getLocations } from "../../redux/actions";
import Loader from "../../components/Loader";
import AlertMessage from "../../components/AlertMessage";
import ExistingDataWarning from "../../components/ExistingDataWarning";
import { COUNTRIES } from "../../constants";
import DisplayDate from "../../components/DisplayDate";

const getAddress = (location: any) => {
  return `${location.address1}${location.address2 ? ' ' + location.address2 : ''}, ${location.city} ${location.zip}, ${COUNTRIES[location.country]}`;
}

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
    dispatch(fetchAssetTransfers(companyId, asset.id));
  }, [dispatch, companyId, asset.id]);

  const {
    transferAssetError,
    isAssetTransferred,
    loading,
    locations,
    assetTransferrs,
  } = useSelector((state: any) => ({
    locations: state.Company.AssetsState.locations,
    transferAssetError: state.Company.AssetsState.transferAssetError,
    isAssetTransferred: state.Company.AssetsState.isAssetTransferred,
    loading: state.Company.AssetsState.loading,
    isTransferrsFetched: state.Company.AssetsState.loading,
    assetTransferrs: state.Company.AssetsState.assetTransferrs,
  }));


  const defaultLocations =
    locations.results.length > 0 &&
    locations.results.map((location) => {
      return {
        label: location.name,
        value: location.id,
      };
    });

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
    onSubmit: (values: any) => {
      // Date dd/MM/YYYY not accepeted
      if (values.date) {
        values.date = format(new Date(values.date), 'yyyy-MM-dd hh:mm')
      }
      if (asset) {
        dispatch(transferAsset(companyId, { ...values, from_location: values['from_location']['value'], to_location: values['to_location']['value'], asset: asset.id }));
      }
    },
  });

  const onCancel = () => {
    validator.resetForm();
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="xl">
      <Modal.Header closeButton className="add-payment-modal-header">
        <Modal.Title>{t("Transfer Asset")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="position-relative">
          {loading ? <Loader /> : null}

          <div>
            {transferAssetError && transferAssetError["existing_items"] ? (
              <ExistingDataWarning
                name={t("Asset(s)")}
                message={transferAssetError}
                onConfirm={() => {
                  if (validator.values) {
                    const val: any = validator.values;
                    dispatch(
                      transferAsset(companyId, {
                        ...val, from_location: val['from_location']['value'], to_location: val['to_location']['value'], asset: asset.id,
                        force_create: true,
                      })
                    );
                  }
                }}
                onClose={() => { }}
                displayField={"title"}
              />
            ) : null}
            {!isAssetTransferred &&
              transferAssetError &&
              !transferAssetError["existing_items"] ? (
                <AlertMessage error={transferAssetError} />
              ) : null}

            <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>

              <Row>
                <Col>
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="usr">{t("From Location")}</Form.Label>
                    <Select
                      id="from_location"
                      name="from_location"
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
                    <Form.Label htmlFor="to_location">{t("To Location")}</Form.Label>
                    <Select
                      id="to_location"
                      name="to_location"
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
                    <Form.Label htmlFor="date">{t("Date")}</Form.Label>
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
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="note">{t("Note")}</Form.Label>
                    <Form.Control
                      as="textarea"
                      id="note"
                      name="note"
                      rows={3}
                      onBlur={validator.handleBlur}
                      value={validator.values.note}
                      onChange={validator.handleChange}
                      isInvalid={!!(validator.touched.note && validator.errors && validator.errors.note)}
                    />
                    {validator.touched.note && validator.errors.note ? (
                      <Form.Control.Feedback type="invalid">
                        {validator.errors.note}
                      </Form.Control.Feedback>
                    ) : null}
                  </Form.Group>
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

            <Row className='mt-4 border-top py-3'>
              <Col xs={12}>
                <h5>{t('Transfer History')}</h5>
              </Col>
              <Col xs={12}>
                <Table hover>
                  <thead>
                    <tr>
                      <th>{t("From Location")}</th>
                      <th>{t("To Location")}</th>
                      <th>{t("Date")}</th>
                      <th>{t("Note")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(assetTransferrs || []).map((transfer, i) => (
                      <tr key={i}>
                        <td>
                          <h6 className="m-0">{transfer['from_location']['name']}</h6>
                          <p className="m-0">{getAddress(transfer['from_location'])}</p>
                        </td>
                        <td>
                          <h6 className="m-0">{transfer['to_location']['name']}</h6>
                          <p className="m-0">{getAddress(transfer['to_location'])}</p>
                        </td>
                        <td width='15%'>
                          {transfer['date'] ? <DisplayDate dateStr={transfer['date']} hideTime={true} /> : ''}
                        </td>
                        <td width='20%'>
                          <p className="m-0">{transfer['note']}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TransferAsset;
