import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Dropdown, DropdownButton, Nav, Row } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { filter, findIndex, get, isEqual, map } from "lodash";
import { isMobileOnly } from "react-device-detect";

import Icon from "../../../components/Icon";
import { archiveComponent, restoreComponent, exportComponent, getComponents, getTagsAndTypes } from "../../../redux/actions";
import MessageAlert from "../../../components/MessageAlert";
import Pagination from "../../../components/Pagination";
import searchIcon from "../../../assets/images/search_icon.svg";
import FilterDropDown from "../../../components/FilterDropDown";
import Loader from "../../../components/Loader";
import ListView from "./ListView";
import GridView from "./GridView";

const FILETYPES: Array<any> = [
	{ label: "As csv", value: "csv" },
	{ label: "As xlsx", value: "xlsx" },
];

const TabMenu = ({ onChange, selectedTab }) => {
	const { t } = useTranslation();

	return <div className="px-2 pb-2 mb-4">
		<Nav variant="tabs" className="nav-bordered m-0" activeKey={selectedTab} onSelect={onChange} as='ul'>
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
		isComponentRestored,
		restoreComponentError
	} = useSelector(({ ProductManagement: { Components } }: any) => ({
		loading: Components.loading,
		components: Components.components,
		isComponentCreated: Components.isComponentCreated,
		archiveComponentError: Components.archiveComponentError,
		isComponentArchived: Components.isComponentArchived,
		tagsAndTypes: Components.tagsAndTypes,
		isExported: Components.isExported,
		isComponentDiscontinued: Components.isComponentDiscontinued,
		isComponentRestored: Components.isComponentRestored,
		restoreComponentError: Components.restoreComponentError,
	}));

	const prevFiltersRef = useRef();

	useEffect(() => {
		prevFiltersRef.current = filters;
	}, [filters]);

	useEffect(() => {
		if (isMobileOnly) {
			setSelectedView('grid');
		}
	}, []);

	const prevFilters = prevFiltersRef.current;

	useEffect(() => {
		if (!(isEqual(prevFilters, filters))) {
			dispatch(getComponents(companyId, filters));
		}
	}, [filters, prevFilters]); // eslint-disable-line react-hooks/exhaustive-deps

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

	const handleOnTabChange = (tab) => {
		setSelectedTab(tab);
		if (tab !== 'archive') {
			setFilters({ ...filters, status: tab, limit, offset: 0, is_active: true });
		} else {
			const f = { ...filters, limit, offset: 0, is_active: false };
			delete f['status'];
			setFilters(f);
		}
	};

	const onChangeView = () => {
		if(selectedView === "list") {
			setSelectedView("grid");
		} else if(selectedView === "grid") {
			setSelectedView("list");
		}
	};

	return (
		<div className={"components"}>
			<div className="pt-4 pb-3 px-3">
				<Row>
					<Col md={6}>
						<div className="d-flex align-items-center">
							<Icon name="components" className="icon icon-xs  mr-2"/>
							<h1 className="m-0">{t('Components')}</h1>
						</div>
					</Col>
					<Col className="text-md-right d-flex flex-row align-items-center justify-content-md-end mt-2 mt-md-0" md={6}>
						<div className="d-flex align-items-center">
                            <span>
                                <Icon name="import" className="icon icon-xs mr-1"/>
                                <b>{t('Import')}</b>
                            </span>

							<Dropdown>
								<Dropdown.Toggle variant="none" id="export" className='p-0 border-0 mx-3 export' as={'button'}>
									<Icon name="export" className="icon icon-xs mr-1"/>
									<span className='font-weight-bold'>{t('Export')}</span>
								</Dropdown.Toggle>

								<Dropdown.Menu>
									{map(FILETYPES, (file, index) => (
										<Dropdown.Item key={index}
													   onClick={() => dispatch(exportComponent(companyId, file.value, filters))}>
											{file.label}
										</Dropdown.Item>
									))}
								</Dropdown.Menu>
							</Dropdown>
						</div>
						<Link to={`/product-management/${companyId}/components/add`}
							  className="btn btn-primary d-none d-md-block">{t('Add Component')}</Link>
						<Link to={`/product-management/${companyId}/components/add`}
							  className="btn btn-primary btn-sm d-block d-md-none">{t('Add Component')}</Link>
					</Col>
				</Row>
			</div>

			<Card>
				<Card.Body>
					{loading ? <Loader/> : null}
					<TabMenu onChange={handleOnTabChange} selectedTab={selectedTab}/>

					<Link to={"#"} className={"view-icon p-3 d-none d-sm-block"} onClick={onChangeView}>
						<Icon name="components" className="icon icon-xs svg-outline-primary mr-2"/>
					</Link>
					
					<div className="d-md-flex align-items-md-center justify-content-md-between mb-3">
						<div className="d-flex align-items-center filter-left">
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
							
							<div className="search ml-4">
								<input type="text" placeholder="Search"
									   onChange={(e: any) => setSearch(e.target.value)}
									   onKeyDown={handleSearchKeyDown}/>
								<button type="submit">
									<img src={searchIcon} alt=""
										 onClick={() => setFilters({ ...filters, search, offset: 0 })}/>
								</button>
							</div>
						</div>
						
						<FilterDropDown
							filters={{
								"Tagged with": tagsAndTypes && filter(tagsAndTypes.tag_data, tag => tag !== ""),
								"Component type": tagsAndTypes && filter(tagsAndTypes.type_data, type => type !== ""),
							}}
							onChangeFilters={handleOnSelectFilters}
						/>
					</div>
					{archiveComponentError && <MessageAlert message={archiveComponentError}
                                                            icon={"x"} showAsNotification={false}/>}

					{restoreComponentError && <MessageAlert message={restoreComponentError}
						icon={"x"} showAsNotification={false} />}

					{get(components, "results") && get(components, "results").length > 0 ?
						<>
							{selectedView === "list" ?
								<ListView
									companyId={companyId}
									components={components}
									selectedComponents={selectedComponents}
									archiveComponent={(component) => dispatch(archiveComponent(companyId, component.id, component, filters))}
									onSelectComponent={handleOnSelectComponents}
									onSelectAllComponents={handleOnSelectAllComponents}
									restoreComponent={(component) => dispatch(restoreComponent(companyId, component.id, filters))}
								/> :
								<GridView
									companyId={companyId}
									components={components}
									selectedComponents={selectedComponents}
									archiveComponent={(component) => dispatch(archiveComponent(companyId, component.id, component, filters))}
									onSelectComponent={handleOnSelectComponents}
									restoreComponent={(component) => dispatch(restoreComponent(companyId, component.id, filters))}
								/>
							}
							<Pagination onPageChange={onChangePage} pageCount={components.count / 5}/>
						</> :
						get(components, "results") && get(components, "results").length === 0 &&
                      <h3 className="d-flex justify-content-center">{t('No components found')}</h3>
					}
				</Card.Body>
			</Card>
			{isComponentCreated ? <MessageAlert message={t('A new component is created')} icon={"check"}
												iconWrapperClass="bg-success text-white p-2 rounded-circle"
												iconClass="icon-sm"/> : null}
			{isComponentArchived ? <MessageAlert message={t('Component is archived')} icon={"check"}
												 iconWrapperClass="bg-success text-white p-2 rounded-circle"
												 iconClass="icon-sm"/> : null}
			{isComponentRestored ? <MessageAlert message={t('Component is restored')} icon={"check"}
												 iconWrapperClass="bg-success text-white p-2 rounded-circle"
												 iconClass="icon-sm"/> : null}
			{isComponentDiscontinued ? <MessageAlert message={t('Component is discontinued')} icon={"check"}
													 iconWrapperClass="bg-success text-white p-2 rounded-circle"
													 iconClass="icon-sm"/> : null}
			{isExported ? <MessageAlert message={t('File exported successfully')} icon={"check"}
										iconWrapperClass="bg-success text-white p-2 rounded-circle"
										iconClass="icon-sm"/> : null}
		</div>
	);
};

export default withRouter(Components);