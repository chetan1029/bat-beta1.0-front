import React, { useEffect, useRef, useState } from "react";
import { Form, Col, Dropdown, DropdownButton, Button, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { filter, findIndex, get, isEqual } from "lodash";

import { archiveComponentProducts, restoreComponentProducts, getComponentsProducts, getTagsAndTypes, resetComponents, deleteComponentProducts } from "../../../redux/actions";
import MessageAlert from "../../../components/MessageAlert";
import Pagination from "../../../components/Pagination";
import searchIcon from "../../../assets/images/search_icon.svg";
import FilterDropDown from "../../../components/FilterDropDown";
import Loader from "../../../components/Loader";
import ListViewProducts from "./ListViewProducts";
import AddEditProduct from "./AddEditProduct";
import { products_tag } from "./ComponentDetails";
import ConfirmMessage from "../../../components/ConfirmMessage";

interface componentDetailsProductsProps {
	match: any;
}

const ComponentDetailsProducts = (props: componentDetailsProductsProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const companyId = props.match.params.companyId;
	const componentId = props.match.params.componentId;
	const tabName = props.match.params.tabName;

	const [selectedView, setSelectedView] = useState<any>("list");
	const [selectedComponents, setSelectedComponents] = useState<any>([]);
	const limit = selectedView === "list" ? 5 : 8;
	const [filters, setFilters] = useState<any>({
		is_component: true,
		is_active: true,
		status: "active",
		limit,
		offset: 0
	});
	const [search, setSearch] = useState<any>({
		is_component: true,
		is_active: true,
		status: "active",
		limit,
		offset: 0
	});
	const [openAdd, setOpenAdd] = useState(false);
	const [showArchived, setshowArchived] = useState(false);
	const [selectedProduct, setselectedProduct] = useState<any>();
	const [selectedForDelete, setselectedForDelete] = useState<any>(null);


	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(getTagsAndTypes(companyId));
	}, [dispatch, companyId]);

	const {
		loading,
		components,
		archiveComponentError,
		isComponentArchived,
		tagsAndTypes,
		isExported,
		isComponentDiscontinued,

		isComponentProductsCreated,
		isComponentProductsEdited,
		isComponentProductsDeleted,
		isComponentProductsArchived,
		isComponentProductsRestored,
	} = useSelector(({ ProductManagement: { Components } }: any) => ({
		loading: Components.loading,
		components: Components.componentsProducts,
		archiveComponentError: Components.archiveComponentError,
		isComponentArchived: Components.isComponentArchived,
		tagsAndTypes: Components.tagsAndTypes,
		isExported: Components.isExported,
		isComponentDiscontinued: Components.isComponentDiscontinued,

		isComponentProductsCreated: Components.isComponentProductsCreated,
		isComponentProductsEdited: Components.isComponentProductsEdited,
		isComponentProductsDeleted: Components.isComponentProductsDeleted,
		isComponentProductsArchived: Components.isComponentProductsArchived,
		isComponentProductsRestored: Components.isComponentProductsRestored,
	}));

	const prevFiltersRef = useRef();

	useEffect(() => {
		prevFiltersRef.current = filters;
	});

	const prevFilters = prevFiltersRef.current;

	useEffect(() => {
		if (!(isEqual(prevFilters, filters)) && tabName === products_tag) {
			getLists(filters);
		}
	}, [filters, prevFilters, componentId, tabName]); // eslint-disable-line react-hooks/exhaustive-deps
	/*
		close modal for after creating payment term
		*/
	useEffect(() => {
		if (isComponentProductsCreated || isComponentProductsEdited) {
			setOpenAdd(false);
			setTimeout(() => {
				getLists(filters);
			}, 1000);
		}
	}, [isComponentProductsCreated, isComponentProductsEdited, dispatch, companyId, componentId, tabName]);


	const getLists = (filters_list = filters) => {
		dispatch(getComponentsProducts(companyId, componentId, filters_list));
	}

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

	const onChangeShowArchive = (checked: boolean) => {
		setshowArchived(checked);
		let _filters = { ...filters, is_active: !checked };
		setFilters(_filters);
		getLists(_filters)
	}

	const handleOnDeleteComponent = component => {
		setselectedForDelete(component)
	}

	const handleOnArchiveComponent = (component, type = false) => {
		if (!!type) {
			dispatch(archiveComponentProducts(companyId, componentId, component.id, component, filters))
		} else {
			dispatch(restoreComponentProducts(companyId, componentId, component.id, component, filters))
		}
	}

	const renderProductLists = () => {
		return (
			<>
				<div className="px-2 pb-2">
					<Row>
						<Col>
							<div className="d-flex align-items-center">
								<h1 className="m-0">{t('Manufacturing Expectations')}</h1>
								<div className="d-flex align-items-center pl-3">
									<span className="m-0 font-16 mr-2">
										{t('Show archived')}
									</span>
									<Form.Check
										type="switch"
										id="custom-switch"
										label=""
										checked={showArchived}
										onChange={(e: any) => onChangeShowArchive(e.target.checked)}
									/>
								</div>
							</div>
						</Col>
						<Col className="text-right">
							<Button variant="primary" onClick={() => { setOpenAdd(true); setselectedProduct(null) }}>{t('Add Product')}</Button>
						</Col>
					</Row>
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
				{
					get(components, "results") && get(components, "results").length > 0 ?
						<>
							<ListViewProducts
								companyId={companyId}
								components={components}
								selectedComponents={selectedComponents}
								archiveComponent={handleOnArchiveComponent}
								deleteComponent={handleOnDeleteComponent}
								onSelectComponent={handleOnSelectComponents}
								onSelectAllComponents={handleOnSelectAllComponents}
							/>
							<Pagination onPageChange={onChangePage} pageCount={components.count / 5} />
						</> :
						get(components, "results") && get(components, "results").length === 0 &&
						<p className="d-flex justify-content-center lead mt-5 mb-5"><img src={searchIcon} className="mr-2" /> {t('No components found')}</p>
				}

				{
					selectedForDelete ?
						<ConfirmMessage message={`Are you sure you want to delete ${get(selectedForDelete, 'product.title')} with quantity is ${get(selectedForDelete, 'quantity')}?`}
							onConfirm={() => {
								setselectedForDelete(null);
								dispatch(deleteComponentProducts(companyId, componentId, selectedForDelete.id, filters));
							}}
							onClose={() => setselectedForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Delete')} />
						: null
				}
			</>
		)

	}

	return (
		<div className={"components"}>
			{
				openAdd ? <AddEditProduct
					isOpen={openAdd}
					onClose={() => {
						setOpenAdd(false);
					}}
					companyId={companyId}
					componentId={componentId}
					defaultData={selectedProduct}
				/> : renderProductLists()
			}
			{archiveComponentError && <MessageAlert message={archiveComponentError}
				icon={"x"} showAsNotification={false} />}
			{isComponentArchived ? <MessageAlert message={t('Component is archived')} icon={"check"}
				iconWrapperClass="bg-success text-white p-2 rounded-circle"
				iconClass="icon-sm" /> : null}
			{isComponentDiscontinued ? <MessageAlert message={t('Component is discontinued')} icon={"check"}
				iconWrapperClass="bg-success text-white p-2 rounded-circle"
				iconClass="icon-sm" /> : null}
			{isExported ? <MessageAlert message={t('File exported successfully')} icon={"check"}
				iconWrapperClass="bg-success text-white p-2 rounded-circle"
				iconClass="icon-sm" /> : null}

			{!!isComponentProductsCreated ? <MessageAlert message={t('Add Component to Products successfully!')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
			{!!isComponentProductsEdited ? <MessageAlert message={t('Edit Component to Products successfully!')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
			{!!isComponentProductsDeleted ? <MessageAlert message={t('Delete successfully!')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
			{!!isComponentProductsArchived ? <MessageAlert message={t('Archived successfully!')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
			{!!isComponentProductsRestored ? <MessageAlert message={t('Restored successfully!')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

		</div>
	);
};

export default withRouter(ComponentDetailsProducts);
