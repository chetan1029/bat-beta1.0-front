import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Nav, Row, Media, Dropdown } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { get, map, find, size } from 'lodash';
import DisplayDate from "../../../components/DisplayDate";
//components
import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader";
import dummyImage from "../../../assets/images/dummy_image.svg";
import ComponentDetailsPackingBox from "./ComponentDetailsPackingBox";
import ComponentDetailsME from "./ComponentDetailsME";
import ComponentDetailsProducts from "./ComponentDetailsProducts";

//actions
import { archiveComponent, discontinueComponent, getComponentDetails, resetComponents } from "../../../redux/actions";
import { AnyARecord } from "dns";

export const description_tab = 'description';
export const packing_boxes_tab = 'packing-boxes';
export const products_tag = 'products';
export const me_tag = 'me';

const TabMenu = ({ onChange, selectedView }) => {
	const { t } = useTranslation();

	return <div className="px-2 pb-2 mb-4">
		<Nav variant="tabs" className="nav-bordered m-0" activeKey={selectedView} onSelect={onChange} as='ul'>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey={description_tab}>{t('Details')}</Nav.Link>
			</Nav.Item>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey={products_tag}>{t('Products')}</Nav.Link>
			</Nav.Item>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey={packing_boxes_tab}>{t('Packing Boxes')}</Nav.Link>
			</Nav.Item>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey={me_tag}>{t('ME')}</Nav.Link>
			</Nav.Item>
		</Nav>
	</div>;
};


interface ComponentDetailsProps {
	match: any;
	history: any
}

const ComponentDetails = (props: ComponentDetailsProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [selectedView, setSelectedView] = useState<any>(description_tab);
	const [showMore, setShowMore] = useState<any>(false);

	const {
		loading,
		component,
		isComponentArchived,
		isComponentDiscontinued
	} = useSelector(({ ProductManagement: { Components } }: any) => ({
		loading: Components.loading,
		component: Components.component,
		isComponentArchived: Components.isComponentArchived,
		isComponentDiscontinued: Components.isComponentDiscontinued,
	}));

	const companyId = props.match.params.companyId;
	const componentId = props.match.params.componentId;
	const tabName = props.match.params.tabName;

	useEffect(() => {
		dispatch(resetComponents());
		if (companyId && componentId) {
			dispatch(getComponentDetails(companyId, componentId));
		}
	}, [dispatch, companyId, componentId]);

	useEffect(() => {
		if(!!tabName) {
			setSelectedView(tabName)
			if(tabName === description_tab){
				dispatch(getComponentDetails(companyId, componentId));
			}
		}
	}, [tabName]);


	const renderDescription = () => {
		return (
			<>
			<Row>
			<Col lg={6}></Col>
			<Col lg={6}>
					<Card>
							<Card.Body>

											<div className="">
													<Media>
													{/* main image */}
															<img className="mr-3" src={size(component.images) > 0 ? (
												find(component.images, img => !!img.main_image) ?
													find(component.images, img => !!img.main_image).image :
													get(component, "images[0].image")) :
												dummyImage
											} alt="" />
											{/* more images */}
											{component.images && component.images.length > 0 &&
											<div>
												{map(component.images, (image, i) =>
													<React.Fragment key={i}>
														{i > 0 && !image.main_image &&
															<img key={i} className={"component-image mt-4 mr-4"} src={image.image}
																alt={component.title} />
														}
													</React.Fragment>
												)}
											</div>
											}
													</Media>
													<h5 className="mt-3">General Info</h5>
													<Row className="mt-3">
															<Col>
																	<p className="m-0 text-muted">{t('Model Number')}</p>
																	<p className="m-0">{component.model_number}</p>
															</Col>
															<Col>
																	<p className="m-0 text-muted">{t('Manufacturer Part Number')}</p>
																	<p className="m-0">{component.manufacturer_part_number}</p>
															</Col>
													</Row>
													<Row className="mt-3">
															<Col>
																	<p className="m-0 text-muted">{t('Component Type')}</p>
																	<p className="m-0">{component.type}</p>
															</Col>
															<Col>
																	<p className="m-0 text-muted">{t('HS Code')}</p>
																	<p className="m-0">{component.hscode}</p>
															</Col>
													</Row>
													<Row className="mt-3">
															<Col>
																	<p className="m-0 text-muted">{t('Dimensions')}</p>
																	<p className="m-0">{component.length ? component.length: "--"}x{component.width ? component.width: "--"}x{component.depth ? component.depth: "--"} {component.length_unit ? component.length_unit: "--"}</p>
															</Col>
															<Col>
																	<p className="m-0 text-muted">{t('Weight')}</p>
																	<p className="m-0">{get(component, 'weight.value')} {get(component, 'weight.unit')}</p>
															</Col>
													</Row>
													<Row className="mt-3">
															<Col>
																<p className="m-0 text-muted">{t('Tags')}</p>
																<p className="m-0 mt-2">
																{component.tags && component.tags.length > 0 && map(component.tags.split(","), (tag, i) => (
																	<span key={i} className={"component-tags"}>{tag}</span>
																))}
																</p>
															</Col>
													</Row>
													<h5 className="mt-3">Details</h5>
													<div className="mt-3">
														<p className="m-0 text-muted">{t('Bullet Points')}</p>
														<p className="m-0 mt-2">{component.bullet_points ? component.bullet_points: "---"}</p>
													</div>
													<div className="mt-3">
														<p className="m-0 text-muted">{t('Description')}</p>
														<p className="m-0 mt-2">{component.description ? component.description: "---"}</p>
													</div>
													<Row className="mt-4">
															<Col>
																	<span className="text-muted">{t('Created')}: </span> {component.create_date ? <DisplayDate dateStr={component.create_date} /> : null}
															</Col>
															<Col>
																	<span className="text-muted">{t('Updated')}: </span> {component.update_date ? <DisplayDate dateStr={component.update_date} /> : null}
															</Col>
													</Row>
											</div>

							</Card.Body>
					</Card>
			</Col>
			</Row>
			</>
		)
	}

	const renderContent = () => {
		switch (selectedView) {
			case description_tab:
				return renderDescription()
			case packing_boxes_tab:
				return <ComponentDetailsPackingBox />
			case products_tag:
				return <ComponentDetailsProducts />
			case me_tag:
				return <ComponentDetailsME />
			default:
				return null;
		}
	}

	const onChangeTab = (value) => {
		props.history.push(`/product-management/${companyId}/components/${componentId}/${value}`)
	}

	return (
		<>
			{(isComponentArchived || isComponentDiscontinued) ? <Redirect to={`/product-management/${companyId}/components`} /> : null}
			{loading ? <Loader /> : null}
			{component &&
				<><div className="py-4 px-3">
					<Row>
						<Col>
							<div className="d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center">
									<Link to={`/product-management/${companyId}/components`}>
										<Icon name="arrow_left_2" className="icon icon-xs mr-2" />
									</Link>
									<h1 className="m-0">{component && component.title}
									<Link to={"#"} className="active-label btn btn-outline-primary ml-3">
										{component.status && t(component.status.name)}
									</Link>
									</h1>
								</div>
								<div className="d-flex align-items-center">
									<Dropdown>
										<Dropdown.Toggle variant="none" id="more" className='p-0 border-0 mx-3 export'
														 as={Link}>
											More actions
										</Dropdown.Toggle>
										<Dropdown.Menu>
											<Dropdown.Item key="archive"
																 onClick={() => dispatch(archiveComponent(companyId, component.id, component))}>
													Archive
											</Dropdown.Item>
											<Dropdown.Item key="discontinue"
															   onClick={() => dispatch(discontinueComponent(companyId, component.id, component))}>
													Discontinue
											</Dropdown.Item>
										</Dropdown.Menu>
									</Dropdown>
								</div>
							</div>
						</Col>
					</Row>
					</div>

					<Row>
							<Col lg={12}>
									<Card>
											<Card.Body className="">
												<TabMenu onChange={onChangeTab} selectedView={selectedView} />
												{renderContent()}
											</Card.Body>
									</Card>
							</Col>

					</Row>
				</>
			}
		</>
	);
};

export default withRouter(ComponentDetails);
