import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Nav, Row, Media } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { get, map, find, size } from 'lodash';
import DisplayDate from "../../../components/DisplayDate";
//components
import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader";
import dummyImage from "../../../assets/images/dummy_image.svg";

//actions
import { archiveComponent, discontinueComponent, getComponentDetails, resetComponents } from "../../../redux/actions";

const TabMenu = ({ onChange, selectedView }) => {
	const { t } = useTranslation();

	return <div className="px-2 pb-2 mb-4">
		<Nav variant="tabs" className="nav-bordered m-0" activeKey={selectedView} onSelect={onChange} as='ul'>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey="description">{t('Details')}</Nav.Link>
			</Nav.Item>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey="products">{t('Products')}</Nav.Link>
			</Nav.Item>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey="packing-box">{t('Packing Box')}</Nav.Link>
			</Nav.Item>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey="me">{t('ME')}</Nav.Link>
			</Nav.Item>
		</Nav>
	</div>;
};


interface ComponentDetailsProps {
	match: any;
}

const ComponentDetails = (props: ComponentDetailsProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [selectedView, setSelectedView] = useState<any>("description");
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

	useEffect(() => {
		dispatch(resetComponents());
		if (companyId && componentId) {
			dispatch(getComponentDetails(companyId, componentId));
		}
	}, [dispatch, companyId, componentId]);

	return (
		<>
			{(isComponentArchived || isComponentDiscontinued) ? <Redirect to={`/product-management/${companyId}/components`} /> : null}
			{loading ? <Loader /> : null}
			{component &&
				<div className="py-4 px-3">
					<Row>
						<Col>
							<div className="d-flex align-items-center justify-content-between">
								<div className="d-flex align-items-center">
									<Link to={`/product-management/${companyId}/components`}>
										<Icon name="arrow_left_2" className="icon icon-xs mr-2" />
									</Link>
									<h1 className="m-0">{component && component.title}</h1>
								</div>
								<div className="d-flex align-items-center">
									<Link to={"#"}
										onClick={() => dispatch(archiveComponent(companyId, component.id, component))}>
										<Icon name="archive" className="mx-2 svg-outline-primary cursor-pointer" />
									</Link>
									<Link to={"#"}
										onClick={() => dispatch(discontinueComponent(companyId, component.id, component))}>
										<Icon name="archive" className="mx-1 svg-outline-danger cursor-pointer" />
									</Link>
								</div>
							</div>
						</Col>
					</Row>

					<Row>
							<Col lg={12}>
					<Card>
						<Card.Body>
						<TabMenu onChange={setSelectedView} selectedView={selectedView} />
						<Row>
								<Col lg={6}></Col>
								<Col lg={6}>
										<Card>
												<Card.Body>

																<div className="">
																		<Media>
																				<img className="mr-3" src={size(component.images) > 0 ? (
																					find(component.images, img => !!img.main_image) ?
																						find(component.images, img => !!img.main_image).image :
																						get(component, "images[0].image")) :dummyImage }
																						alt={component.title} />
																				<Media.Body>
																						<h5 className="my-0">{component.title}</h5>
																				</Media.Body>
																		</Media>
																		<Row className="mt-3">
																				<Col>
																						<p className="m-0 text-muted">{t('Model Number')}</p>
																						<p className="m-0">{component.model_number}</p>
																				</Col>
																		</Row>

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
						</Card.Body>
					</Card>
					</Col>
			</Row>
				</div>
			}
		</>
	);
};

export default withRouter(ComponentDetails);
