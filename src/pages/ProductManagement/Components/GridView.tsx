import React from 'react';
import { Col, Form, Row, Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { find, get, map, size } from "lodash";
import { Link } from "react-router-dom";

import dummyImage from "../../../assets/images/dummy_image.svg";
import Icon from "../../../components/Icon";

interface GridViewProps {
	components: any;
	companyId: any;
	selectedComponents: any;
	archiveComponent: (any) => void;
	restoreComponent: (any) => void;
	onSelectComponent: any;
}

const GridView = (props: GridViewProps) => {
	const { t } = useTranslation();
	const { components, companyId, selectedComponents, archiveComponent, onSelectComponent, restoreComponent } = props;

	return (
		<Row className={"grid-view"}>
			{map(components.results, (component, i) => (
				<Col key={i} md={3}>
					<Card className='mb-3'>
						<Card.Body className='px-4 pt-4'>
							<Row>
								<Col lg={3} xs={6}>
									<div className={"image"}>
										<img src={size(component.images) > 0 ? (
											find(component.images, img => !!img.main_image) ?
												find(component.images, img => !!img.main_image).image :
												get(component, "images[0].image")) :
											dummyImage}
											alt={component.title} />
									</div>
								</Col>
								<Col lg={9} xs={6}>
									<div className="description text-muted">{t('SKU')}</div>
									<div className="d-flex">
										{component.sku}
										<Form.Check
											className="ml-2"
											type="checkbox"
											key={component.id}
											id={`checkbox${component.id}`}
											label=""
											checked={!!find(selectedComponents, _component => _component.id === component.id)}
											onChange={(e: any) => onSelectComponent(e, component)}
										/>
									</div>
								</Col>
							</Row>
							<Row className="mt-3">
								<Col className="col-12">
									<div className="font-weight-bold">{component.title}</div>
								</Col>
								<Col className="col-12 mt-3">
									<div className="description text-muted">
										<p>{component.description ? component.description.substring(0, 100) + "...": ''}</p>
									</div>
								</Col>
							</Row>
							<Row className="mt-3">
								<Col>
									<div className="p-0">
										{component.tags.length > 0 && map(component.tags.split(","), (tag, i) => (
											<span key={i} className={"tags"}>{tag}</span>
										))}
									</div>
								</Col>
							</Row>
							<Row className="mt-4 align-items-center">
								<Col lg={'auto'} xs={8}>
									<Link className="product-detail btn btn-outline-primary product-detail"
										to={`/product-management/${companyId}/components/${component.id}`}>
										{t("Component Details")}
									</Link>
								</Col>
								<Col lg={2} xs={4}>
									{component['is_active'] ? <Link to={"#"} onClick={() => archiveComponent(component)} className='archive product-detail ml-1'>
										<Icon name="archive" className="mx-1 svg-outline-primary cursor-pointer" />
									</Link> : <Link to={"#"} onClick={() => restoreComponent(component)} className='archive product-detail ml-1'>
										<Icon name="un-archive" className="mx-1 svg-outline-primary cursor-pointer" />
									</Link>}
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default GridView;