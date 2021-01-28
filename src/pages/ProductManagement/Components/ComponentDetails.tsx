import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Nav, Row, Form, Button } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { get, map, find, size } from 'lodash';

//components
import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader";
import dummyImage from "../../../assets/images/dummy_image.svg";
import ConfirmMessage from "../../../components/ConfirmMessage";
import MessageAlert from "../../../components/MessageAlert";

//actions
import {
	archivePackingBox,
	restorePackingBox,
	getComponentsPackingBox,
	archiveComponent,
	discontinueComponent,
	getComponentDetails,
	resetComponents,
	deletePackingBox,
	archiveComponentPackingBox,
	restoreComponentPackingBox,
	deleteComponentPackingBox,
} from "../../../redux/actions";

import AddEditPackingBox from './AddEditPackingBox';

const packing_boxes_tab = 'packing_boxes_tab';
const products_tag = 'products_tag';
const me_tag = 'me_tag';

const EmptyState = ({ showArchived }) => {
	const { t } = useTranslation();
	return (
		<Card className="payment-terms-card mb-2">
			<Card.Body>
				<div className="p-2">
					{showArchived ? <h5 className="font-weight-normal my-0">{t('There are no archived packing box available')}</h5> : <h5 className="font-weight-normal my-0">{t('There are no packing box available')}</h5>}
				</div>
			</Card.Body>
		</Card>
	)
}

const TabMenu = ({ onChange, selectedView }) => {
	const { t } = useTranslation();

	return <div className="px-2 pb-2 mb-4">
		<Nav variant="tabs" className="nav-bordered m-0" activeKey={selectedView} onSelect={onChange} as='ul'>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey="description">{t('Description')}</Nav.Link>
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

const PaymentCardItem = ({ packingbox, onArchiveDeleteAction, onEditPackingBox, companyId, componentId, filters }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const [selectedTermForDelete, setselectedTermForDelete] = useState<any>(null);

	/*
	delete payment term
	*/
	const onDeletePackingBox = (id: any) => {
		onArchiveDeleteAction(packingbox);
		setselectedTermForDelete(packingbox);
	}

	const onClickArchiveUnArchive = (action: boolean) => {
		if (action) {
			dispatch(restoreComponentPackingBox(companyId, componentId, packingbox.id, packingbox, filters));
		} else {
			dispatch(archiveComponentPackingBox(companyId, componentId, packingbox.id, packingbox, filters));
		}
		onArchiveDeleteAction(packingbox);
	}

	return (<>
		<Row>
			<Col lg={12}>
				<Card className="payment-terms-card mb-2">
					<Link to="#" onClick={() => onEditPackingBox(packingbox)} className="payment-terms-link">
						<Card.Header className="payment-card-title">
							<div className="p-2">
								<h6 className="m-0 text-muted font-weight-bold">{t('Name')}</h6>
								<h6 className="m-0 font-weight-bold">{get(packingbox, 'packingbox.name')}</h6>
							</div>
						</Card.Header>
						<Card.Body>
							<div className="p-2">
								<Row>
									<Col xs={6} lg={3}>
										<h6 className="m-0 text-muted font-weight-bold">{t('Size')}</h6>
										<h6 className="m-0 font-weight-bold">{get(packingbox, 'packingbox.length')}x{get(packingbox, 'packingbox.width')}x{get(packingbox, 'packingbox.depth')} {get(packingbox, 'packingbox.length_unit')}</h6>
									</Col>
									<Col xs={6} lg={3}>
										<h6 className="m-0 text-muted font-weight-bold">{t('Package Weight')}</h6>
										<h6 className="m-0 font-weight-bold">{get(packingbox, 'packingbox.weight.value')} {get(packingbox, 'packingbox.weight.unit')}</h6>
									</Col>
									<Col xs={6} lg={3}>
										<h6 className="m-0 text-muted font-weight-bold">{t('Total Weight')}</h6>
										<h6 className="m-0 font-weight-bold">{get(packingbox, 'weight.value')} {get(packingbox, 'weight.unit')}</h6>
									</Col>
									<Col xs={6} lg={3}>
										<h6 className="m-0 text-muted font-weight-bold">{t('Number of Unit')}</h6>
										<h6 className="m-0 font-weight-bold">{get(packingbox, 'units')}</h6>
									</Col>
								</Row>
							</div>
						</Card.Body>
					</Link>
					<Card.Footer className="payment-card-footer">
						<div className="p-2 float-right">
							<div className="d-flex align-items-center">
								{
									!packingbox.is_active ?
										<Link to="#" onClick={() => onClickArchiveUnArchive(true)}><Icon name="un-archive" className="svg-outline-warning mr-2" /></Link> :
										<Link to="#" onClick={() => onClickArchiveUnArchive(false)}><Icon name="archive" className="svg-outline-primary mr-2" /></Link>
								}
								<Link to="#" onClick={() => onDeletePackingBox(packingbox.id)}><Icon name="delete" className="ml-2 svg-outline-danger" /></Link>

							</div>
						</div>
					</Card.Footer>
				</Card>
			</Col>
		</Row>
		{
			selectedTermForDelete ?
				<ConfirmMessage message={`Are you sure you want to delete ${get(selectedTermForDelete, 'packingbox.name')}?`}
					onConfirm={() => {
						setselectedTermForDelete(null);
						dispatch(deleteComponentPackingBox(companyId, componentId, selectedTermForDelete.id, filters));
					}}
					onClose={() => setselectedTermForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Delete')} />
				: null
		}
	</>
	)
}

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
		isComponentDiscontinued,
		componentsPackingBox,
		isComponentPackingBoxCreated,
		isComponentPackingBoxEdited
	} = useSelector(({ ProductManagement: { Components } }: any) => ({
		loading: Components.loading,
		component: Components.component,
		isComponentArchived: Components.isComponentArchived,
		isComponentDiscontinued: Components.isComponentDiscontinued,

		componentsPackingBox: Components.componentsPackingBox,
		isComponentPackingBoxCreated: Components.isComponentPackingBoxCreated,
		isComponentPackingBoxEdited: Components.isComponentPackingBoxEdited,
	}));

	const companyId = props.match.params.companyId;
	const componentId = props.match.params.componentId;

	useEffect(() => {
		dispatch(resetComponents());
		if (companyId && componentId) {
			dispatch(getComponentDetails(companyId, componentId));
		}
	}, [dispatch, companyId, componentId]);

	/*
		close modal for after creating payment term
		*/
	useEffect(() => {
		if (isComponentPackingBoxCreated || isComponentPackingBoxEdited) {
			setTimeout(() => {
				setisOpenAddPackingBox(false);
				getPackingbox();
			}, 1000);
		}
	}, [isComponentPackingBoxCreated, isComponentPackingBoxEdited, dispatch, companyId, componentId]);

	const [isOpenAddPackingBox, setisOpenAddPackingBox] = useState(false);
	const [showArchived, setshowArchived] = useState(false);

	const onChangeShowArchive = (checked: boolean) => {
		setshowArchived(checked);
		getPackingbox({ is_active: !checked })
	}

	const onSetSelectedView = (value) => {
		setSelectedView(value)
		switch (value) {
			case packing_boxes_tab:
				getPackingbox();
				break;

			default:
				break;
		}
	}

	const onArchiveDeleteAction = () => {

	}

	const [selectedPackingBox, setselectedPackingBox] = useState<any>();

	const setPackingBox = (data: any) => {
			setselectedPackingBox(data);
			setisOpenAddPackingBox(true);
	}

	const getPackingbox = (filters = { is_active: true }) => {
		dispatch(getComponentsPackingBox(companyId, componentId, filters));
	}

	const renderPackingBoxes = () => {
		return (
			<>
				<div className="px-3 pb-3">
					<Row>
						<Col>
							<div className="d-flex align-items-center">
								<h1 className="m-0">{t('Packing Box')}</h1>
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
							<Button variant="primary" onClick={() => {setisOpenAddPackingBox(true); setselectedPackingBox(null)}}>{t('Add Packing Box')}</Button>
						</Col>
					</Row>
					{isOpenAddPackingBox ? <AddEditPackingBox isOpen={isOpenAddPackingBox} onClose={() => setisOpenAddPackingBox(false)} companyId={companyId} componentId={componentId} productId={get(component, 'products[0].id')} defaultPackingBox={selectedPackingBox} /> : null}
				</div>

				<div className="p-2">
					<Row>
						<Col lg={12} xs={12}>
							{
								componentsPackingBox && componentsPackingBox['results'].length > 0 ?
									componentsPackingBox['results'].map((packing, key) =>
										<PaymentCardItem packingbox={packing}
											key={key} companyId={companyId} componentId={componentId}
											onArchiveDeleteAction={onArchiveDeleteAction}
											onEditPackingBox={setPackingBox}
											filters={{ is_active: !showArchived }}
										/>
									) : <EmptyState showArchived={showArchived} />
							}
						</Col>
					</Row>
				</div>
			</>
		)
	}

	const renderProducts = () => {
		return products_tag
	}

	const renderMe = () => {
		return me_tag
	}

	return (
		<>
			{(isComponentArchived || isComponentDiscontinued) ? <Redirect to={`/product-management/${companyId}/components`} /> : null}
			{loading ? <Loader /> : null}

			{!!isComponentPackingBoxCreated ? <MessageAlert message={t('A new Component Packing Box is created')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
			{!!isComponentPackingBoxEdited ? <MessageAlert message={t('Component Packing Box is edited')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

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

					<Card className="mt-3">
						<Card.Body className={"pt-3"}>
							<Row>
								<Col lg={selectedView === 'description' ? 8 : 12} md={selectedView === 'description' ? 8 : 12} sm={12} className="pr-5">
									<TabMenu onChange={onSetSelectedView} selectedView={selectedView} />
									{
										selectedView === 'description' && (
											<>
												<div className="d-flex justify-content-between align-items-center">
													<h2>{t('Component Detail')}</h2>
													{component.status &&
														<span className="active-label">
															{t(component.status.name)}
														</span>
													}
												</div>
												{map(component.products, (product, index) =>
													<React.Fragment key={index}>
														{((!showMore && index === 0) || (!!showMore)) &&
															<Card className={"mt-3"} key={product.id}>
																<Card.Body className="p-0">
																	<Row>
																		<Col lg={2} sm={6} style={{ maxWidth: "14% !important" }}>
																			<img className={"product-image"}
																				src={product.images.length > 0 ? (
																					find(product.images, img => !!img.main_image) ?
																						find(product.images, img => !!img.main_image).image :
																						product.images[0].image) :
																					(component.products && component.products.length > 1 ? dummyImage :
																						(size(component.images) > 0 ? (
																							find(component.images, img => !!img.main_image) ?
																								find(component.images, img => !!img.main_image).image :
																								get(component, "images[0].image")) :
																							dummyImage))
																				}
																				alt={product.title} />
																		</Col>

																		<Col lg={10} sm={6} className="py-3">
																			<div className="d-flex justify-content-between px-3">
																				<h6>{t('Model Number')}: {get(product, "model_number")}</h6>
																				<Link className="py-1"
																					to={`/product-management/${companyId}/components/${component.id}/variation/edit/${product.id}`}>
																					<Icon name="edit" className="mx-2 svg-outline-primary cursor-pointer" />
																				</Link>
																			</div>
																			<p className="text-muted px-3">
																				{t('Manufacturer Part Number')}: {get(product, "manufacturer_part_number")}
																			</p>
																			{get(product, "weight.value") &&
																				<p className="mt-2 text-muted px-3">
																					{t('Weight')}: {get(product, "weight.value")} {get(product, "weight.unit")}
																				</p>
																			}
																		</Col>
																	</Row>
																</Card.Body>
															</Card>
														}
													</React.Fragment>
												)}
												{component.products && component.products.length > 1 &&
													<div className="cursor-pointer d-flex align-items-center justify-content-end mt-2"
														onClick={() => setShowMore(!showMore)}>
														<Icon name={"eye"} className={"icon icon-xs mr-2"} />
														<h6 className="text-primary mb-0">
															{showMore ?
																`${t('Less child products')} (${component.products.length - 1})` :
																`${t('More child products')} (${component.products.length - 1})`
															}
														</h6>
													</div>
												}
											</>
										)
									}

									{selectedView === packing_boxes_tab && renderPackingBoxes()}
									{selectedView === products_tag && renderProducts()}
									{selectedView === me_tag && renderMe()}

								</Col>
								{selectedView === 'description' &&
									<Col lg={4} md={4} sm={12}>
										<img className={"component-main-image"}
											src={size(component.images) > 0 ? (
												find(component.images, img => !!img.main_image) ?
													find(component.images, img => !!img.main_image).image :
													get(component, "images[0].image")) :
												dummyImage
											}
											alt={component.title} />
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
										<h2 className="mt-4">{t('Description')}</h2>
										<p className="mt-2 mb-4 text-muted">{component.description}</p>
										{component.tags && component.tags.length > 0 && map(component.tags.split(","), (tag, i) => (
											<span key={i} className={"component-tags"}>{tag}</span>
										))}
									</Col>
								}
							</Row>
						</Card.Body>
					</Card>
				</div>
			}
		</>
	);
};

export default withRouter(ComponentDetails);
