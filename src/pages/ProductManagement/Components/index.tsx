import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Dropdown, DropdownButton, Nav, Row, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { filter, findIndex, get, map } from "lodash";

import Icon from "../../../components/Icon";
import {
	archiveComponent, exportComponent, getComponents,
	getTagsAndTypes, getTypesAll, resetComponents,
	resetComponentsData, performBulkActionProduct
} from "../../../redux/actions";
import MessageAlert from "../../../components/MessageAlert";
import searchIcon from "../../../assets/images/search_icon.svg";
import FilterDropDown from "../../../components/FilterDropDown";
import Loader from "../../../components/Loader";
import ListView from "./ListView";
import GridView from "./GridView";
import TypeView from "./TypeView";
import Import from "./Import";


const FILETYPES: Array<any> = [
	{ label: "As csv", value: "csv" },
	{ label: "As xls", value: "xls" },
	{ label: "As csv (Filtered Data)", value: "csv-filtered" },
	{ label: "As xls (Filtered Data)", value: "xls-filtered" },
];

const TabMenu = ({ onChange, selectedTab }) => {
	const { t } = useTranslation();

	return <div className="px-2 pb-2 mb-4">
		<Nav variant="tabs" className="nav-bordered m-0" activeKey={selectedTab} onSelect={onChange} as='ul'>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey="all">{t('All')}</Nav.Link>
			</Nav.Item>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey="active">{t('Active')}</Nav.Link>
			</Nav.Item>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey="draft">{t('Draft')}</Nav.Link>
			</Nav.Item>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey="archive">{t('Archived')}</Nav.Link>
			</Nav.Item>
		</Nav>
	</div>;
};

interface ComponentsProps {
	match: any;
}

const Components = (props: ComponentsProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const companyId = props.match.params.companyId;
	const [selectedTab, setSelectedTab] = useState<any>("active");
	const [selectedView] = useState<any>("list");
	const [selectedComponents, setSelectedComponents] = useState<any>([]);
	const limit = selectedView === "list" ? 6 : 8;

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
		typesAll,
		isExported,
		isImported,
		isComponentDiscontinued,
		isBulkActionPerformed, bulkActionError, bulkActionResponse
	} = useSelector(({ ProductManagement: { Components } }: any) => ({
		loading: Components.loading,
		components: Components.components,
		isComponentCreated: Components.isComponentCreated,
		archiveComponentError: Components.archiveComponentError,
		isComponentArchived: Components.isComponentArchived,
		tagsAndTypes: Components.tagsAndTypes,
		typesAll: Components.typesAll,
		isExported: Components.isExported,
		isImported: Components.isImported,
		isComponentDiscontinued: Components.isComponentDiscontinued,
		isBulkActionPerformed: Components.isBulkActionPerformed,
		bulkActionError: Components.bulkActionError,
		bulkActionResponse: Components.bulkActionResponse,
	}));

	// const prevFiltersRef = useRef();

	// useEffect(() => {
	// 	prevFiltersRef.current = filters;
	// });

	// const prevFilters = prevFiltersRef.current;

	// useEffect(() => {
	// 	if (!(isEqual(prevFilters, filters))) {
	// 		dispatch(getComponents(companyId, filters));
	// 	}
	// }, [filters, prevFilters]); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (selectedTab !== 'all') {
			dispatch(getComponents(companyId, filters));
		} else {
			dispatch(getTypesAll(companyId, { is_component: true }));
		}
	}, [filters, companyId, dispatch, selectedTab]);

	/*
	reset for all the notification
	*/
	useEffect(() => {
		if (isComponentCreated || isComponentArchived || isComponentDiscontinued || isExported || isImported || isBulkActionPerformed) {
			setTimeout(() => {
				dispatch(resetComponents());
			}, 10000);
		}
	}, [isComponentCreated, isComponentArchived, isComponentDiscontinued, isExported, isImported, isBulkActionPerformed, dispatch]);


	useEffect(() => {
		if (isBulkActionPerformed) {
			dispatch(resetComponentsData());
			dispatch(getComponents(companyId, filters));
			setSelectedComponents([]);
		}
	}, [isBulkActionPerformed, companyId, dispatch, filters]);


	const onChangePage = useCallback((offset) => {
		const off = offset ? parseInt(offset) : offset;

		if (filters && off > filters['offset']) {
			setFilters(prevState => ({ ...prevState, offset: off }));
		}
	}, [filters]);

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
		dispatch(resetComponentsData());
		setSelectedComponents([]);
		setTimeout(() => {
			setFilters({ ...filters, tags, type });
		});
	};

	const handleOnSelectComponents = (e: any, component: any) => {
		const index = findIndex(selectedComponents, _component => _component.id === component.id);

		if (index === -1) {
			setSelectedComponents([...selectedComponents, component]);
		} else {
			setSelectedComponents(selectedComponents.filter((component, i) => i !== index));
		}
	};

	const handleOnSelectAllComponents = (e: any, selectedRecords?: Array<any>) => {
		if (e.target.checked) {
			setSelectedComponents([...(selectedRecords || [])]);
		} else {
			setSelectedComponents([]);
		}
	};

	const handleOnTabChange = (tab) => {
		const f = { ...filters };

		if (tab === 'all') {
			delete f['type'];
			dispatch(resetComponentsData());
		} else {
			delete f['type'];
			dispatch(resetComponentsData());
			setFilters({ ...f, status: tab, limit, offset: 0 });
		}
		setSelectedComponents([]);
		setFilters({ ...f, status: tab, limit, offset: 0 });
		setSelectedTab(tab);
	};

	const performBulkAction = (action: string) => {
		dispatch(performBulkActionProduct(companyId, action, selectedComponents.map(c => c['id'])));
	}

	// const onChangeView = (checked: boolean) => {
	// 	if (checked) {
	// 		setSelectedView("grid");
	// 	} else {
	// 		setSelectedView("list");
	// 	}
	// };

	const [openImport, setOpenImport] = useState(false);

	return (
		<div className={"components"}>
			<div className="pt-4 pb-3 px-3">
				<Row>
					<Col>
						<div className="d-flex align-items-center">
							<Icon name="components" className="icon icon-xs  mr-2" />
							<h1 className="m-0">{t('Components')}</h1>
						</div>
					</Col>
					<Col className="text-right d-flex flex-row align-items-center justify-content-end">
						<div className="d-flex align-items-center">
							<Button variant="none" id='import' onClick={() => setOpenImport(true)} className='p-0'>
								<Icon name="import" className="icon icon-xs  mr-2" />
								<b>{t('Import')}</b>
							</Button>

							<Dropdown>
								<Dropdown.Toggle variant="none" id="export" className='p-0 border-0 mx-3 export'
									as={Link}>
									<Icon name="export" className="icon icon-xs  mr-2" />
									<span className='font-weight-bold'>{t('Export')}</span>
								</Dropdown.Toggle>

								<Dropdown.Menu>
									{map(FILETYPES, (file, index) => (
										<Dropdown.Item key={index}
											onClick={() => {
												if (file.value === 'csv-filtered' || file.value === 'xls-filtered')
													dispatch(exportComponent(companyId, file.value, filters))
												else
													dispatch(exportComponent(companyId, file.value))
											}}>
											{file.label}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
						</div>
						<Link to={`/product-management/${companyId}/components/add`}
							className="btn btn-primary">{t('Add Component')}</Link>
					</Col>
				</Row>
			</div>

			<Card>
				<Card.Body>
					{loading ? <Loader /> : null}
					<TabMenu onChange={handleOnTabChange} selectedTab={selectedTab} />

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
					{archiveComponentError && <MessageAlert message={archiveComponentError}
						icon={"x"} showAsNotification={false} />}

					{selectedTab !== "all" ?
						[(get(components, "count") > 0 ?
							<>
								{selectedView === "list" ?
									<ListView
										companyId={companyId}
										components={components}
										selectedComponents={selectedComponents}
										archiveComponent={(component) => dispatch(archiveComponent(companyId, component.id, component, filters))}
										onSelectComponent={handleOnSelectComponents}
										onSelectAllComponents={handleOnSelectAllComponents}
										onChangePage={onChangePage}
										onPerformBulk={performBulkAction}
									/> :
									<GridView
										companyId={companyId}
										components={components}
										selectedComponents={selectedComponents}
										archiveComponent={(component) => dispatch(archiveComponent(companyId, component.id, component, filters))}
										onSelectComponent={handleOnSelectComponents}
										onChangePage={onChangePage}
									/>
								}
							</> : <p className="d-flex justify-content-center lead mt-5 mb-5"><img src={searchIcon} className="mr-2" alt="" /> {t('No components found')}</p>
						)]
						:
						[(typesAll ?
							<>
								<TypeView types={typesAll} onClick={(type) => {
									setSelectedTab('active');
									setFilters(prevState => ({ ...prevState, type: type, status: 'active' }));
								}} />
							</> : <p className="d-flex justify-content-center lead mt-5 mb-5"><img src={searchIcon} className="mr-2" alt="" /> {t('No components found')}</p>
						)]
					}
				</Card.Body>
			</Card>

			{openImport ? <Import onClose={() => setOpenImport(false)} companyId={companyId} /> : null}

			{isComponentCreated ? <MessageAlert message={t('A new component is created')} icon={"check"}
				iconWrapperClass="bg-success text-white p-2 rounded-circle"
				iconClass="icon-sm" /> : null}
			{isComponentArchived ? <MessageAlert message={t('Component is archived')} icon={"check"}
				iconWrapperClass="bg-success text-white p-2 rounded-circle"
				iconClass="icon-sm" /> : null}
			{isComponentDiscontinued ? <MessageAlert message={t('Component is discontinued')} icon={"check"}
				iconWrapperClass="bg-success text-white p-2 rounded-circle"
				iconClass="icon-sm" /> : null}
			{isExported ? <MessageAlert message={t('File exported successfully')} icon={"check"}
				iconWrapperClass="bg-success text-white p-2 rounded-circle"
				iconClass="icon-sm" /> : null}
			{isImported ? <MessageAlert message={t('File imported successfully')} icon={"check"}
				iconWrapperClass="bg-success text-white p-2 rounded-circle"
				iconClass="icon-sm" /> : null}

			{isBulkActionPerformed && bulkActionResponse ? <MessageAlert message={bulkActionResponse['message'] || bulkActionResponse['detail']} icon={"check"}
				iconWrapperClass="bg-success text-white p-2 rounded-circle"
				iconClass="icon-sm" /> : null}

			{bulkActionError && <MessageAlert message={bulkActionError}
				icon={"x"} showAsNotification={false} />}

		</div>
	);
};

export default withRouter(Components);
