import React, { useEffect, useRef, useState } from "react";
import { Card, Col, Dropdown, DropdownButton, Form, Nav, Row } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { filter, forEach, get, isEqual, map } from "lodash";

import Icon from "../../../components/Icon";
import { archiveComponent, getComponents, resetComponents } from "../../../redux/actions";
import MessageAlert from "../../../components/MessageAlert";
import Pagination from "../../../components/Pagination";
import searchIcon from "../../../assets/images/search_icon.svg";
import FilterDropDown from "../../../components/FilterDropDown";
import Loader from "../../../components/Loader";

const TabMenu = ({ onChange, selectedView }) => {
    const { t } = useTranslation();

    return <div className="px-2 pb-2 mb-4">
        <Nav variant="tabs" className="nav-bordered m-0" activeKey={selectedView} onSelect={onChange} as='ul'>
            <Nav.Item as="li">
                <Nav.Link className="pt-1" eventKey="all active">{t('All Active')}</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link className="pt-1" eventKey="draft">{t('Draft')}</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link className="pt-1" eventKey="archived">{t('Archived')}</Nav.Link>
            </Nav.Item>
        </Nav>
    </div>
}

const getTags = (components) => {
    let tags: any[] = [];
    forEach(components, component => {
        const componentTags = component.tags.split(",");
        forEach(componentTags, tag => {
            if (!map(tags, tag => tag.toLowerCase()).includes(tag.toLowerCase()))
                tags = [...tags, tag];
        })
    })
    return filter(tags, tag => tag !== "");
}

const getTypes = (components) => {
    let types: any[] = [];
    forEach(components, component => {
        if (!map(types, type => type.toLowerCase()).includes(component.type.toLowerCase()))
            types = [...types, component.type];
    })
    return filter(types, type => type !== "");
}

interface ComponentsProps {
    match: any;
}

const Components = (props: ComponentsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const companyId = props.match.params.companyId;
    const [selectedView, setSelectedView] = useState<any>("all active");
    const [filters, setFilters] = useState<any>({ is_component: true, is_active: true, limit: 5, offset: 0 });
    const [search, setSearch] = useState<any>({ is_component: true, is_active: true, limit: 5, offset: 0 });

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(getComponents(companyId, { is_component: true, is_active: true, limit: 5, offset: 0 }));
        dispatch(resetComponents());
    }, [dispatch, companyId]);

    const {
        loading,
        components,
        isComponentCreated,
        archiveComponentError,
    } = useSelector(({ ProductManagement: { Components } }: any) => ({
        loading: Components.loading,
        components: Components.components,
        isComponentCreated: Components.isComponentCreated,
        archiveComponentError: Components.archiveComponentError,
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
    }, [filters, prevFilters]);

    const onChangePage = (page) => {
        setFilters({ ...filters, offset: (page - 1) * 5 });
        window.scrollTo(0, 0);
    }

    const handleSearchKeyDown = (event: any) => {
        const { value } = event.target;
        setSearch(value);
        if ([13].includes(event.keyCode)) {
            setFilters({ ...filters, search: value, offset: 0 });
        }
    }

    const handleOnClickOrderBy = (value: any) => {
        setFilters({ ...filters, ordering: value });
    }

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
    }

    return (
        <div className={"components"}>
            <div className="pt-4 pb-3 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Icon name="components" className="icon icon-xs  mr-2"/>
                            <h1 className="m-0">{t('Components')}</h1>
                        </div>
                    </Col>
                    <Col className="text-right d-flex flex-row align-items-center justify-content-end">
                        <div>
                            <span>
                                <Icon name="import" className="icon icon-xs  mr-2"/>
                                <b>{t('Import')}</b>
                            </span>
                            <span className="m-3">
                                <Icon name="export" className="icon icon-xs  mr-2"/>
                                <b>{t('Export')}</b>
                            </span>
                        </div>
                        <Link to={`/product-management/${companyId}/components/add`}
                              className="btn btn-primary">{t('Add Component')}</Link>
                    </Col>
                </Row>
            </div>

            <Card className={"data-table"}>
                <Card.Body>
                    <TabMenu onChange={setSelectedView} selectedView={selectedView}/>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <div className="d-flex align-items-center w-75">
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
                                "Tagged with": getTags(components.results),
                                "Component type": getTypes(components.results)
                            }}
                            onChangeFilters={handleOnSelectFilters}
                        />
                    </div>
                    {archiveComponentError && <MessageAlert message={archiveComponentError}
                                                            icon={"x"} showAsNotification={false}/>}
                    <Row className={"header-row"}>
                        <div>
                            <Form.Check
                                type="checkbox"
                                id={"checkbox"}
                                label=""
                                onChange={(e: any) => null}
                            />
                        </div>
                        <Col lg={2} className="px-4">
                            {t("Image")}
                        </Col>
                        <Col lg={4} className="p-0">
                            {t("Title")}
                        </Col>
                        <Col lg={2} className="p-0">
                            {t("Status")}
                        </Col>
                        <Col lg={2} className="p-0">
                            {t("SKU")}
                        </Col>
                        <Col lg={1} className="p-0">
                            {t("Action")}
                        </Col>
                    </Row>
                    {loading ? <Loader/> : null}
                    {map(components.results, (component, i) => (
                        <div className={"body-row"} key={i}>
                            <Row className={"m-0 pb-4"}>
                                <div>
                                    <Form.Check
                                        type="checkbox"
                                        id={"checkbox"}
                                        label=""
                                        onChange={(e: any) => null}
                                    />
                                </div>
                                <Col lg={2} className="px-4">
                                    <div className={"image"}>
                                        <img src={get(component, "images[0].image")} alt={component.title}/>
                                    </div>
                                </Col>
                                <Col lg={4} className="p-0">
                                    <b>{component.title}</b><br/>
                                    <span className="text-muted">{component.description}</span>
                                </Col>
                                <Col lg={2} className="p-0">
                                    <span className="active-label btn btn-outline-primary">
                                        {component.is_active && t("Active")}
                                    </span>
                                </Col>
                                <Col lg={2} className="p-0">
                                    {component.sku}
                                </Col>
                                <Col lg={1} className="p-0">
                                    <span
                                        onClick={() => dispatch(archiveComponent(companyId, component.id, component, filters))}>
                                        <Icon name="archive" className="mx-1 svg-outline-primary cursor-pointer"/>
                                    </span>
                                </Col>
                            </Row>
                            <Row className={"extra-info"}>
                                <div className="p-0">
                                    {component.tags.length > 0 && map(component.tags.split(","), (tag, i) => (
                                        <span key={i} className={"tags"}>{tag}</span>
                                    ))}
                                </div>
                                <span className="product-detail btn btn-outline-primary">
                                        {component.is_active && t("Product Details")}
                                </span>
                            </Row>
                        </div>
                    ))}
                    <Pagination onPageChange={onChangePage} pageCount={components.count / 5}/>
                </Card.Body>
            </Card>
            {isComponentCreated ? <MessageAlert message={t('A new component is created')} icon={"check"}
                                                iconWrapperClass="bg-success text-white p-2 rounded-circle"
                                                iconClass="icon-sm"/> : null}
        </div>
    );
}

export default withRouter(Components);