import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Nav, Row } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { get, map, find } from 'lodash';

//components
import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader";
import dummyImage from "../../../assets/images/dummy_image.svg";

//actions
import { archiveComponent, getComponentDetails, resetComponents } from "../../../redux/actions";

const TabMenu = ({ onChange, selectedView }) => {
	const { t } = useTranslation();

	return <div className="px-2 pb-2 mb-4">
		<Nav variant="tabs" className="nav-bordered m-0" activeKey={selectedView} onSelect={onChange} as='ul'>
			<Nav.Item as="li">
				<Nav.Link className="pt-1" eventKey="description">{t('Description')}</Nav.Link>
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
	} = useSelector(({ ProductManagement: { Components } }: any) => ({
		loading: Components.loading,
		component: Components.component,
		isComponentArchived: Components.isComponentArchived,
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
			{isComponentArchived ? <Redirect to={`/product-management/${companyId}/components`}/> : null}
			{loading ? <Loader/> : null}
			{component &&
            <div className="py-4 px-3">
              <Row>
                <Col>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <Link to={`/product-management/${companyId}/components`}>
                        <Icon name="arrow_left_2" className="icon icon-xs mr-2"/>
                      </Link>
                      <h1 className="m-0">{component && component.title}</h1>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link to={"#"}
                        	onClick={() => dispatch(archiveComponent(companyId, component.id, component))}>
                      	<Icon name="archive" className="mx-2 svg-outline-primary cursor-pointer"/>
					  </Link>
                    </div>
                  </div>
                </Col>
              </Row>

              <Card className="mt-3">
                <Card.Body className={"pt-3"}>
                  <Row>
                    <Col lg={8} md={8} sm={12} className="pr-5">
                      <TabMenu onChange={setSelectedView} selectedView={selectedView}/>
                      <div className="d-flex justify-content-between align-items-center">
                        <h2>{t('Component Detail')}</h2>
						  {component.status &&
                          <span className="active-label">
								{t(component.status.name)}
							</span>
						  }
                      </div>
						{map(component.products, (product, index) =>
							<>
								{((!showMore && index === 0) || (!!showMore)) &&
                                <Card className={"mt-3"} key={product.id}>
                                  <Card.Body className="p-0">
                                    <Row>
                                      <Col lg={2} sm={6} style={{ maxWidth: "14% !important" }}>
                                        <img className={"product-image"}
											 src={product.images.length > 0 ? find(product.images, img => !!img.mainImage) : dummyImage}
                                             alt={product.title}/>
                                      </Col>
                                      <Col lg={10} sm={6} className="pt-3">
										<div className="d-flex justify-content-between">
                                        	<h6>{t('Model Number')}: {get(product, "model_number")}</h6>
                                          <Link className="py-1 edit-variation mr-3"
                                                to={`/product-management/${companyId}/components/${component.id}/variation/edit/${product.id}`}>
                                            <Icon name="edit" className="mx-2 svg-outline-primary cursor-pointer"/>
                                          </Link>
                                        </div>
                                        <p className="text-muted">
											{t('Manufacturer Part Number')}: {get(product, "manufacturer_part_number")}
                                        </p>
										  {get(product, "weight.value") &&
                                          <p className="mt-2 text-muted">
											  {t('Weight')}: {get(product, "weight.value")} {get(product, "weight.unit")}
                                          </p>
										  }
                                      </Col>
                                    </Row>
                                  </Card.Body>
                                </Card>
								}
							</>
						)}
						{component.products && component.products.length > 1 &&
							<div className="cursor-pointer d-flex align-items-center justify-content-end mt-2"
								 onClick={() => setShowMore(!showMore)}>
							  <Icon name={"eye"} className={"icon icon-xs mr-2"}/>
							  <h6 className="text-primary mb-0">
								  {showMore ?
									  `${t('Less child products')} (${component.products.length - 1})` :
									  `${t('More child products')} (${component.products.length - 1})`
								  }
							  </h6>
							</div>
						}
                    </Col>
                    <Col lg={4} md={4} sm={12}>
                      <img className={"component-main-image"} src={get(component, "images[0].image")}
                           alt={component.title}/>
						{component.images && component.images.length > 0 &&
                        <div>
							{map(component.images, (image, i) =>
								<>
									{i > 0 &&
                                    <img key={i} className={"component-image mt-4 mr-4"} src={image.image}
                                         alt={component.title}/>
									}
								</>
							)}
                        </div>
						}
                      <h2 className="mt-4">{t('Description')}</h2>
                      <p className="mt-2 mb-4 text-muted">{component.description}</p>
						{component.tags && component.tags.length > 0 && map(component.tags.split(","), (tag, i) => (
							<span key={i} className={"component-tags"}>{tag}</span>
						))}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
			}
		</>
	);
};

export default withRouter(ComponentDetails);