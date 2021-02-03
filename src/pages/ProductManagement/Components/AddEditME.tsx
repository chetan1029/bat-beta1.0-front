import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Row, Col, Form, Modal, Button, InputGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

//plug-ins
import { map, get, omit } from 'lodash';
import { Formik, Form as ForMikForm, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import classNames from "classnames";

import Icon from "../../../components/Icon";

//action
import {
	createComponentME,
	editComponentME,
	getPackingBox,
	resetComponents,
} from "../../../redux/actions";
import Loader from "../../../components/Loader";
import AlertMessage from "../../../components/AlertMessage";


interface AddEditMEProps {
	isOpen: boolean;
	onClose: any;
	defaultData?: any;
	companyId: any;
	componentId: any;
	productId: any;
}
const AddEditME = ({ isOpen, onClose, defaultData, companyId, componentId, productId }: AddEditMEProps) => {
	const { isComponentMECreated, isComponentPackingBoxEdited, editComponentPackingBoxError, createComponentMEError } = useSelector(
		(state: any) => ({
			newComponentPackingBox: state.ProductManagement.Components.newComponentPackingBox,
			loading: state.ProductManagement.Components.loading,
			isComponentMECreated: state.ProductManagement.Components.isComponentMECreated,
			createComponentMEError: state.ProductManagement.Components.createComponentMEError,
			editComponentPackingBoxError: state.ProductManagement.Components.editComponentPackingBoxError,
			isComponentPackingBoxEdited: state.ProductManagement.Components.isComponentPackingBoxEdited,
		})
	);


	const { t } = useTranslation();
	const dispatch = useDispatch();

	let defaultFile = {
		title: '',
		version: '',
		file: null
	}

	const validator = {
		enableReinitialize: true,
		initialValues: {
			version: get(defaultData, 'version', ''),
			revision_history: get(defaultData, 'revision_history', ''),
			component: componentId,
			files: [
				defaultFile,
				defaultFile,
			],
			status: 'Active',
		},
		validationSchema: Yup.object({
			version: Yup.number().required(t('Version is required')),
			revision_history: Yup.string().required(t('Revision History is required')),
		}),
		onSubmit: values => {
			if (!!defaultData) {
				dispatch(editComponentME(companyId, componentId, defaultData.id, values));
			} else {
				dispatch(createComponentME(companyId, componentId, values));
			}
		},
	};


	const onCancel = () => {
		// validator.resetForm();
		onClose();
	}

	const renderDefaultFiles = () => {
		return defaultData && defaultData.files.length > 0 && defaultData.files.map((value, index) => (
			<Row key={index}>
				<Col lg={6} xs={12}>
					<Form.Group className="mb-4">
						<Form.Label htmlFor="usr">{t('File Name')}</Form.Label>
						<Field type="text" className="form-control" name={`default_files[${index}].title`} id={`default_files[${index}].title`}
							placeholder={t('File Name')}
							value={value.title}
							autoComplete="off"
							disabled
						/>
					</Form.Group>
				</Col>
				<Col lg={3} xs={12}>
					<Form.Group className="mb-4">
						<Form.Label htmlFor="usr">{t('File Version')}</Form.Label>
						<Field type="text" className="form-control" name={`default_files[${index}].version`} id={`default_files[${index}].version`}
							placeholder={t('File Version')}
							autoComplete="off"
							value={value.version}
						/>
					</Form.Group>
				</Col>
				<Col lg={3} xs={12}>
					<Row className="mt-4">
						<Col lg={9} xs={8}>
							<div className={"react-dropzone m-0"}>
								<label className="dropzone custom m-0" style={{ minHeight: 'initial' }}>
										<Icon name={"document"} />
								</label>
							</div>
						</Col>
						<Col lg={3} xs={4} className="d-flex justify-content-right align-items-center">
							<span role="button" onClick={() => console.log(value)}><Icon name="delete" className="ml-2 svg-outline-danger" /></span>
						</Col>
					</Row>
				</Col>
			</Row>
		))
	}

	return (
		<div className="position-relative p-2">
			<div className="d-flex align-items-center">
				<span role="button" onClick={() => onClose()}><Icon name="arrow_left_2" className="icon icon-xs mr-2" /></span>
				<h1 className="m-0">{t('Add Manufacturing Expectations')}</h1>
			</div>
			{/* {loading ? <Loader /> : null} */}

			<div>
				{(!isComponentMECreated && createComponentMEError) && <AlertMessage error={createComponentMEError} />}
				{(!isComponentPackingBoxEdited && editComponentPackingBoxError) && <AlertMessage error={editComponentPackingBoxError} />}
				<Formik
					enableReinitialize={true}
					initialValues={validator.initialValues}
					validationSchema={validator.validationSchema}
					onSubmit={validator.onSubmit}
					render={({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => (
						<ForMikForm className="mt-3" noValidate >
							<Row>
								<Col lg={12} xs={12}>
									<Form.Group className="mb-4">
										<Form.Label htmlFor="usr">{t('Version')}</Form.Label>
										<Form.Control type="number" className="form-control" id="version" name="version"
											min={0}
											placeholder={t('Version')}
											autoComplete="off"
											onBlur={handleBlur}
											value={values.version}
											onChange={handleChange}
											isInvalid={touched.version && errors && !!errors.version} />

										{touched.version && errors.version &&
											<Form.Control.Feedback type="invalid">
												{errors.version}
											</Form.Control.Feedback>
										}
									</Form.Group>
								</Col>
								<Col lg={12} xs={12}>
									<Form.Group className="mb-4">
										<Form.Label htmlFor="usr">{t('Revision History')}</Form.Label>
										<Form.Control as="textarea" className="form-control" id="revision_history" name="revision_history"
											placeholder={t('Revision History')} rows={5}
											autoComplete="off"
											onBlur={handleBlur}
											value={values.revision_history}
											onChange={handleChange}
											isInvalid={touched.revision_history && errors && !!errors.revision_history} />

										{touched.revision_history && errors.revision_history &&
											<Form.Control.Feedback type="invalid">
												{errors.revision_history}
											</Form.Control.Feedback>
										}
									</Form.Group>
								</Col>
								<Col lg={12} xs={12}>
									<FieldArray
										name="files"
										render={arrayHelpers => (
											<div>
												<Row>
													<Col lg={12} xs={12} className="mb-2 d-flex align-items-center justify-content-between">
														<h2>{t('ME File Upload')}</h2>
														<h6 className="link  text-blue text-right m-3" onClick={() => arrayHelpers.insert(values.files.length, defaultFile)} >+ {t('Add one more')}</h6>
													</Col>
												</Row>
												{/* {renderDefaultFiles()} */}
												{(values.files && values.files.length > 0) && (
													values.files.map((friend, index) => (
														<Row key={index}>
															<Col lg={6} xs={12}>
																<Form.Group className="mb-4">
																	<Form.Label htmlFor="usr">{t('File Name')}</Form.Label>
																	<Field type="text" className="form-control" name={`files[${index}].title`} id={`files[${index}].title`}
																		placeholder={t('File Name')}
																		autoComplete="off"
																	/>
																</Form.Group>
															</Col>
															<Col lg={3} xs={12}>
																<Form.Group className="mb-4">
																	<Form.Label htmlFor="usr">{t('File Version')}</Form.Label>
																	<Field type="text" className="form-control" name={`files[${index}].version`} id={`files[${index}].version`}
																		placeholder={t('File Version')}
																		autoComplete="off"
																	/>
																</Form.Group>
															</Col>
															<Col lg={3} xs={12}>
																<Row className="mt-4">
																	<Col lg={9} xs={8}>
																		<div className={"react-dropzone m-0"}>
																			<label className="dropzone custom m-0" style={{ minHeight: 'initial' }}>
																				<Field type="file" className="d-none" name={`files[${index}].file_input`}
																					onChange={(e) => {
																						setFieldValue(`files[${index}].file`, e.currentTarget.files[0]);
																					}}
																				/>
																				{
																					!values.files[index].file ?
																						<>
																							<Icon name={"upload"} />
																							<p>{t('Upload')}</p>
																						</> :
																						<>
																							<Icon name={"document"} />
																							<p className="file-name">{get(values, `files[${index}].file.name`)}</p>
																						</>
																				}
																			</label>
																		</div>
																	</Col>
																	<Col lg={3} xs={4} className="d-flex justify-content-right align-items-center">
																		<span role="button" onClick={() => arrayHelpers.remove(index)}><Icon name="delete" className="ml-2 svg-outline-danger" /></span>
																	</Col>
																</Row>
															</Col>
														</Row>
													))
												)}
												<div>
												</div>

											</div>
										)}
									/>
								</Col>
							</Row>
							<div>
								<Button type="submit" variant="primary">{t("Submit")}</Button>
							</div>
						</ForMikForm>
					)}
				/>
			</div>
		</div>
	);
}

export default AddEditME;
