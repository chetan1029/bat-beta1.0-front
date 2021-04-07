import React, { useEffect, useRef, useState } from "react";
import { Form, Media, Table, Dropdown, DropdownButton, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { filter, findIndex, get, isEqual, map, find, size } from "lodash";
import { Formik, Form as ForMikForm, FieldArray } from 'formik';
import * as Yup from 'yup';

import Icon from "../../../components/Icon";
import { createComponentProducts, getComponents, getTagsAndTypes, resetComponents } from "../../../redux/actions";
import MessageAlert from "../../../components/MessageAlert";
import Pagination from "../../../components/Pagination";
import searchIcon from "../../../assets/images/search_icon.svg";
import FilterDropDown from "../../../components/FilterDropDown";
import AlertMessage from "../../../components/AlertMessage";

import dummyImage from "../../../assets/images/dummy_image.svg";

interface AddEditProductProps {
	isOpen: boolean;
	onClose: any;
	defaultData?: any;
	companyId: any;
	componentId: any;
	productId: any;
	props: any;
}

const QUANTITY_DOWN = 0;
const QUANTITY_UP = 1;

const AddEditProduct = ({ isOpen, onClose, defaultData, companyId, componentId, productId, ...props }: AddEditProductProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const [selectedView, setSelectedView] = useState<any>("list");
	const [selectedComponents, setSelectedComponents] = useState<any>([]);
	const limit = selectedView === "list" ? 5 : 8;
	const [filters, setFilters] = useState<any>({
		is_component: false,
		is_active: true,
		status: "active",
		limit,
		offset: 0
	});
	const [search, setSearch] = useState<any>({
		is_component: false,
		is_active: true,
		status: "active",
		limit,
		offset: 0
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(getTagsAndTypes(companyId));
	}, [dispatch, companyId]);

	const {
		loading,
		components,
		isComponentCreated,
		archiveComponentError,
		isComponentArchived,
		tagsAndTypes,
		isExported,
		isComponentDiscontinued,
		isComponentProductsCreated,
		createComponentProductsError,
		editComponentProductsError,
		isComponentProductsEdited,
	} = useSelector(({ ProductManagement: { Components } }: any) => ({
		loading: Components.loading,
		components: Components.components,
		isComponentCreated: Components.isComponentCreated,
		archiveComponentError: Components.archiveComponentError,
		isComponentArchived: Components.isComponentArchived,
		tagsAndTypes: Components.tagsAndTypes,
		isExported: Components.isExported,
		isComponentDiscontinued: Components.isComponentDiscontinued,

		isComponentProductsCreated: Components.isComponentProductsCreated,
		createComponentProductsError: Components.createComponentProductsError,
		editComponentProductsError: Components.editComponentProductsError,
		isComponentProductsEdited: Components.isComponentProductsEdited,
	}));

	const prevFiltersRef = useRef();

	useEffect(() => {
		prevFiltersRef.current = filters;
	});

	const prevFilters = prevFiltersRef.current;

	useEffect(() => {
		if (!(isEqual(prevFilters, filters))) {
			dispatch(getComponents(companyId, filters));
		}
	}, [filters, prevFilters]); // eslint-disable-line react-hooks/exhaustive-deps

	/*
	reset for all the notification
	*/
	useEffect(() => {
		if (isComponentCreated || isComponentArchived || isComponentDiscontinued || isExported) {
			setTimeout(() => {
				dispatch(resetComponents());
			}, 10000);
		}
	}, [isComponentCreated, isComponentArchived, isComponentDiscontinued, isExported, dispatch]);


	const onChangePage = (page) => {
		setFilters({ ...filters, offset: (page - 1) * 5 });
		window.scrollTo(0, 0);
	};

	const handleSearchKeyDown = (event: any) => {
		const { value } = event.target;
		setSearch(value);
		if ([13].includes(event.keyCode)) {
			setFilters({ ...filters, search: value, offset: 0 });
		}
	};

	const handleOnClickOrderBy = (value: any) => {
		setFilters({ ...filters, ordering: value });
	};

	const handleOnSelectFilters = (options: any) => {
		let tags: string = "";
		let type: string = "";
		if (options["Tagged with"]) {
			tags = options["Tagged with"].toString();
		}
		if (options["Component type"]) {
			type = options["Component type"].toString();
		}
		setFilters({ ...filters, tags, type });
	};

	const handleOnSelectComponents = (e: any, component: any) => {
		const index = findIndex(selectedComponents, _component => _component.id === component.id);
		if (index === -1) {
			setSelectedComponents([...selectedComponents, component]);
		} else {
			setSelectedComponents(selectedComponents.filter((component, i) => i !== index));
		}
	};

	const handleOnSelectAllComponents = (e: any) => {
		if (e.target.checked) {
			setSelectedComponents([...selectedComponents, ...components.results]);
		} else {
			setSelectedComponents([]);
		}
	};

	const validator = {
		enableReinitialize: true,
		initialValues: {
			components: []
		},
		validationSchema: Yup.object({
			components: Yup.array().of(Yup.object().shape({
				// component: Yup.number().required(t('Component is required')),
				// quantity: Yup.number().required(t('Quantity is required')),
			}))
		}),
		onSubmit: values => {
			let _values = values.components.filter(v => !!v);
			let sendData:any = [];
			selectedComponents.map(v => {
				let _find_product = find(_values, ['product', v.id]);
				if(!!_find_product){
					sendData = [...sendData, _find_product];
				} else {
					let _default_product = {
						component: componentId,
						quantity: 1,
						product: v.id
					}
					sendData = [ ...sendData, _default_product]
				}
			})

			if (!!defaultData) {
				// dispatch(editComponentME(companyId, componentId, defaultData.id, values));
			} else {
				dispatch(createComponentProducts(companyId, componentId, sendData));
			}
		},
	};

	const handleQuantityChange = (type, setFieldValue, values, component) => {
		let quantity = get(values, `components[${component.id}].quantity`, 1);
		quantity = Number(quantity);
		if (quantity >= 1 && quantity < 2147483647)
			type === QUANTITY_DOWN ? (quantity > 1 && (quantity -= 1)) : (quantity += 1);
		else
			quantity = 1;
		setFieldValue(`components[${component.id}].quantity`, quantity);
		setFieldValue(`components[${component.id}].product`, component.id);
		setFieldValue(`components[${component.id}].component`, componentId);
	}

	const renderFromTable = ({ values, handleChange, handleBlur, touched, errors, setFieldValue }) => arrays => {
		return get(components, "results") && get(components, "results").length > 0 ?
			<>
				<div className={"list-view"}>
					<Table>
						<thead>
							<tr>
								<th className="index">
									<Form.Check
										type="switch"
										id={"checkbox"}
										label=""
										onChange={(e: any) => handleOnSelectAllComponents(e)}
									/>
								</th>
								<th><Button type="submit" variant="primary" className="px-3 py-2">{t("Submit")}</Button></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{map(components.results, (component, i) => (
								<tr key={i}>
									<td>
										<Form.Check
											type="switch"
											key={component.id}
											id={`checkbox${component.id}`}
											label=""
											checked={!!find(selectedComponents, _component => _component.id === component.id)}
											onChange={(e: any) => handleOnSelectComponents(e, component)}
										/>
									</td>
									<td>
										<Media>
											<img className="mr-3 img-sm" src={size(component.images) > 0 ? (
												find(component.images, img => !!img.main_image) ?
													find(component.images, img => !!img.main_image).image :
													get(component, "images[0].image")) :
												dummyImage}
												alt={component.title} />
											<Media.Body>
												<p className="my-0 font-weight-semibold">
													{/* <Link to={`/product-management/${companyId}/components/${component.id}`}> */}
														{component.title}
													{/* </Link> */}
												</p>
												<p className="my-0 text-muted">{component.model_number}</p>
											</Media.Body>
										</Media>
									</td>
									<td>{component.type}</td>
									<td>
										<Link to={"#"} className="active-label btn btn-outline-primary">
											{component.status && t(component.status.name)}
										</Link>
									</td>
									<td>{component.ean}</td>
									<td width="20%">
										<div className="d-flex">
											<Button className="btn btn-light py-2 px-2 text-center mr-2" onClick={() => handleQuantityChange(QUANTITY_DOWN, setFieldValue, values, component)} disabled={!find(selectedComponents, _component => _component.id === component.id)}>
												<Icon name="minus" className="icon icon-sm svg-outline-primary"/>
											</Button>
											<Form.Control type="number" className="form-control text-center"
												name={`components[${component.id}].quantity`}
												min={1}
												max={2147483647}
												autoComplete="off"
												value={get(values, `components[${component.id}].quantity`, 1)}
												onChange={(e) => {
													setFieldValue(`components[${component.id}].quantity`, e.target.value);
													setFieldValue(`components[${component.id}].product`, component.id);
													setFieldValue(`components[${component.id}].component`, componentId);
												}}
												disabled={!find(selectedComponents, _component => _component.id === component.id)}
											/>
											<Button className="btn btn-light py-2 px-2 text-center ml-2" onClick={() => handleQuantityChange(QUANTITY_UP, setFieldValue, values, component)} disabled={!find(selectedComponents, _component => _component.id === component.id)}>
												<Icon name="plus" className="icon icon-sm svg-outline-primary" />
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</div>
				<Pagination onPageChange={onChangePage} pageCount={components.count / 5} />
			</> : null;

	}

	return (
		<div className={"components"}>
			<div className="d-flex align-items-center px-2 pb-2">
				<span role="button" onClick={() => onClose()}><Icon name="arrow_left_2" className="icon icon-xs mr-2" /></span>
				<h1 className="m-0">{!!defaultData ? t('Edit Component to Products') : t('Add Component to Products')}</h1>
			</div>
			<div className="d-flex align-items-center justify-content-between mb-3">

				<div className="d-flex align-items-center w-50">
					<div className="search">
						<input type="text" placeholder="Search"
							onChange={(e: any) => setSearch(e.target.value)}
							onKeyDown={handleSearchKeyDown} />
						<button type="submit">
							<img src={searchIcon} alt=""
								onClick={() => setFilters({ ...filters, search, offset: 0 })} />
						</button>
					</div>
				</div>

				<div className="d-flex align-items-center">

					<FilterDropDown
						filters={{
							"Component type": tagsAndTypes && filter(tagsAndTypes.type_data, type => type !== ""),
							"Tagged with": tagsAndTypes && filter(tagsAndTypes.tag_data, tag => tag !== ""),
						}}
						onChangeFilters={handleOnSelectFilters}
					/>
					<DropdownButton variant="outline-secondary" id="dropdown-basic-button" title="Order By">
						<Dropdown.Item
							onClick={() => handleOnClickOrderBy("create_date")}>{t('Created Date- ASC')}</Dropdown.Item>
						<Dropdown.Item
							onClick={() => handleOnClickOrderBy("-create_date")}>{t('Created Date- DESC')}</Dropdown.Item>
						<Dropdown.Item
							onClick={() => handleOnClickOrderBy("title")}>{t('Title- ASC')}</Dropdown.Item>
						<Dropdown.Item
							onClick={() => handleOnClickOrderBy("-title")}>{t('Title- DESC')}</Dropdown.Item>
					</DropdownButton>
				</div>
			</div>
			<Formik
				enableReinitialize={true}
				initialValues={validator.initialValues}
				validationSchema={validator.validationSchema}
				onSubmit={validator.onSubmit}
				render={props => <ForMikForm className="mt-3" noValidate ><FieldArray name="components" render={renderFromTable(props)} /> </ForMikForm>}
			/>

			{
				get(components, "results") && get(components, "results").length === 0 && <p className="d-flex justify-content-center lead mt-5 mb-5"><img src={searchIcon} className="mr-2" /> {t('No components found')}</p>
			}


			{(!isComponentProductsCreated && createComponentProductsError) && <AlertMessage error={createComponentProductsError} />}
			{(!isComponentProductsEdited && editComponentProductsError) && <AlertMessage error={editComponentProductsError} />}
			{!!isComponentProductsCreated ? <MessageAlert message={t('Add Component to Products successfully!')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
			{!!isComponentProductsEdited ? <MessageAlert message={t('Edit Component to Products successfully!')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

		</div>
	);
};

export default withRouter(AddEditProduct);
