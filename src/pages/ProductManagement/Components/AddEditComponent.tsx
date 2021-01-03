import React, { useEffect, useRef, useState } from "react";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import * as Yup from 'yup';
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Icon from "../../../components/Icon";
import MediaInput from "../../../components/MediaInput";

//plug-ins
import { useFormik } from 'formik';
import classNames from "classnames";
import { forEach, map } from "lodash";
import { useDispatch, useSelector } from "react-redux";
//action
import { createComponent, getTagsAndTypes, resetComponents } from "../../../redux/actions";
import MessageAlert from "../../../components/MessageAlert";
import VariationDetails from "../../../components/VariationDetails";
import Loader from "../../../components/Loader";

const STATUSES: Array<string> = ["Draft", "Active", "Archive"];

interface AddEditComponentProps {
	match: any;
}

const AddEditComponent = ({ match }: AddEditComponentProps) => {
	const { t } = useTranslation();
	const [files, setFiles] = useState<any>([]);
	const variationRef = useRef({});
	const [variationOptions, setVariationOptions] = useState<any>([]);
	const dispatch = useDispatch();
	const companyId = match.params.companyId;
	let statusOptions: Array<any> = [];

	for (const status of STATUSES) {
		statusOptions.push({
			label: t(status),
			value: status
		});
	}

	useEffect(() => {
		dispatch(getTagsAndTypes(companyId));
		dispatch(resetComponents());
	}, [dispatch, companyId]);

	const {
		loading,
		isComponentCreated,
		createComponentError,
		tagsAndTypes,
	} = useSelector(({ ProductManagement: { Components } }: any) => ({
		loading: Components.loading,
		isComponentCreated: Components.isComponentCreated,
		createComponentError: Components.createComponentError,
		tagsAndTypes: Components.tagsAndTypes
	}));

	const defaultTypes = tagsAndTypes && map(tagsAndTypes.type_data, (type: any) => ({
		label: type,
		value: type
	}));

	const defaultSeries = tagsAndTypes && map(tagsAndTypes.series_data, (series: any) => ({
		label: series,
		value: series
	}));

	const defaultTags = tagsAndTypes && map(tagsAndTypes.tag_data, (tag: any) => ({
		label: tag,
		value: tag
	}));

	const validator = useFormik({
		enableReinitialize: true,
		initialValues: {
			title: "",
			type: "",
			series: "",
			description: "",
			status: statusOptions[0],
			tags: [],
		},
		validationSchema: Yup.object({
			title: Yup.string().required(t('Title is required')),
		}),
		onSubmit: (values: any, { setSubmitting }) => {
			onHandleSubmit(values, setSubmitting);
		},
	});

	const onHandleSubmit = (values: any, setSubmitting: any) => {
		let valid: boolean[] = [];
		const hasMultiVariations = variationRef.current && !!variationRef.current["hasMultiVariations"];
		variationRef.current && variationRef.current["onSubmit"]();
		variationOptions.length > 0 && forEach(variationOptions, (option, i) => {
			if (hasMultiVariations) {
				typeof option.value === "object" && forEach(option.value, (opt, index) => {
					valid[i] = (opt.name !== "" && option["model_number"] !== "" && option["manufacturer_part_number"] !== "" && option["weight"].value !== "");
				});
			} else {
				valid[i] = (option["model_number"] !== "" && option["manufacturer_part_number"] !== "" && option["weight"].value !== "");
			}
		});

		if (!valid.includes(false)) {
			const tags = values.tags.map(tag => tag.value).toString();

			let data = {
				...values,
				...{
					is_component: true,
					tags: tags,
					type: values.type['value'],
					series: values.series['value'],
					status: values.status['value'],
					products: map(variationOptions, opt => ({
						title: `${values.title} ${opt.name}`,
						type: values.type['value'],
						tags: tags,
						model_number: opt.model_number,
						manufacturer_part_number: opt.manufacturer_part_number,
						weight: opt.weight,
						product_variation_options: map(opt.value, value => ({ productoption: value })),
					}))
				}
			};
			dispatch(createComponent(companyId, data, {
				productImages: files,
				variationImages: map(variationOptions, opt => opt.image)
			}));
		}
		setSubmitting(false);
	};

	return (
		<>
			{isComponentCreated ? <Redirect to={`/product-management/${companyId}/components`}/> : null}

			<div className="py-4 px-3">
				<Row>
					<Col>
						<div className="d-flex align-items-center">
							<Link to={`/product-management/${companyId}/components`}>
								<Icon name="arrow_left_2" className="icon icon-xs  mr-2"/>
							</Link>
							<h1 className="m-0">{t('Add Component')}</h1>
						</div>
					</Col>
				</Row>
			</div>

			<div className='position-relative'>
				{loading ? <Loader/> : null}
				<Card>
					<Card.Body>
						<div className="p-2">
							<Form noValidate onSubmit={validator.handleSubmit} className="mt-0">
								<h4 className="mt-0 mb-3">{t('Component detail')}</h4>
								<Row>
									<Col lg={6} xs={12}>
										<Form.Group className="mb-4">
											<Form.Label htmlFor="usr">{t('Title')}</Form.Label>
											<Form.Control type="text" className="form-control" id="title" name="title"
														  placeholder={t('Title')}
														  autoComplete="off"
														  onBlur={validator.handleBlur}
														  value={validator.values.title}
														  onChange={validator.handleChange}
														  isInvalid={validator.touched.title && validator.errors && !!validator.errors.title}/>

											{validator.touched.title && validator.errors.title &&
                                            <Form.Control.Feedback type="invalid">
												{validator.errors.title}
                                            </Form.Control.Feedback>
											}
										</Form.Group>
									</Col>

									<Col lg={6} xs={12}>
										<Form.Group className="mb-4">
											<Form.Label htmlFor="usr">{t('Component Type')}</Form.Label>
											<CreatableSelect
												id={"type"}
												name={"type"}
												placeholder={t('Component Type')}
												isClearable
												options={defaultTypes || []}
												onChange={(value: any) => validator.setFieldValue('type', value)}
												value={validator.values.type}
												className={classNames("react-select", "react-select-regular", validator.touched.type && validator.errors.type && "is-invalid")}
												classNamePrefix="react-select"
											/>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col lg={6} xs={12}>
										<Form.Group className="mb-4">
											<Form.Label htmlFor="tags">{t('Tags')}</Form.Label>
											<CreatableSelect
												isMulti
												id={"tags"}
												name={"tags"}
												placeholder={t('Tags')}
												onChange={(value: any) => validator.setFieldValue('tags', value)}
												options={defaultTags || []}
												value={validator.values.tags}
												className={"react-select react-select-regular tags mt-0"}
												classNamePrefix="react-select"
											/>
										</Form.Group>
									</Col>

									<Col lg={6} xs={12}>
										<Form.Group className="mb-4">
											<Form.Label htmlFor="usr">{t('Series')}</Form.Label>
											<CreatableSelect
												id={"series"}
												name={"series"}
												placeholder={t('Series')}
												isClearable
												options={defaultSeries || []}
												onChange={(value: any) => validator.setFieldValue('series', value)}
												value={validator.values.series}
												className={classNames("react-select", "react-select-regular", validator.touched.type && validator.errors.series && "is-invalid")}
												classNamePrefix="react-select"
											/>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col lg={6} xs={12}>
										<Form.Group className="mb-4">
											<Form.Label htmlFor="status">{t('Status')}</Form.Label>
											<Select
												placeholder={t('Status')}
												options={statusOptions}
												value={validator.values.status}
												onChange={(value: any) => validator.setFieldValue('status', value)}
												className={"react-select react-select-regular"}
												classNamePrefix="react-select"
											/>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col lg={12} md={12}>
										<Form.Group className="mb-4">
											<h4 className="mt-0 mb-3">{t('Description')}</h4>
											<Form.Control
												as="textarea"
												id="description"
												name="description"
												rows={5}
												onBlur={validator.handleBlur}
												value={validator.values.description}
												onChange={validator.handleChange}
												isInvalid={!!(validator.touched.description && validator.errors && validator.errors.description)}
											/>
										</Form.Group>
									</Col>
								</Row>
								<Row>
									<Col lg={12} md={12}>
										<MediaInput label={t('Media Library')} onSetFiles={setFiles}/>
									</Col>
								</Row>
								<Row>
									<Col lg={12} md={12}>
										<Form.Group className="mt-2 mb-0">
											<VariationDetails
												inputRef={variationRef}
												validator={validator}
												errors={validator.errors}
												label={t('Variation Details')}
												onSetVariationOptions={(variationOptions) => {
													setVariationOptions(variationOptions);
												}}
											/>
										</Form.Group>
									</Col>
								</Row>
								{createComponentError &&
                                <MessageAlert
                                  message={createComponentError} icon={"x"}
                                  showAsNotification={false}
                                />}
								<Form.Group className="mt-2 mb-0">
									<Button variant="primary" type="submit">
										{t('Submit')}
									</Button>
								</Form.Group>
							</Form>
						</div>
					</Card.Body>
				</Card>
			</div>
		</>
	);
};

export default withRouter(AddEditComponent);
