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
			<Card key={i} className="payment-terms-card mb-2">
				<Card.Body>
					<Row>
						<Col lg={3}>
							<div className={"image"}>
								<img src={size(component.images) > 0 ? (
										find(component.images, img => !!img.main_image) ?
											find(component.images, img => !!img.main_image).image :
											get(component, "images[0].image")) :
									dummyImage}
									 alt={component.title}/>
							</div>
						</Col>
						<Col lg={9}>
							<Link to={"#"} className="active-label btn btn-outline-primary">
								{component.status && t(component.status.name)}
							</Link>
							<Form.Check
								className="ml-2 float-right"
								type="switch"
								key={component.id}
								id={`checkbox${component.id}`}
								label=""
								checked={!!find(selectedComponents, _component => _component.id === component.id)}
								onChange={(e: any) => onSelectComponent(e, component)}
							/>

							<div className="description text-muted mt-1">{t('Model Number')}
							</div>
							<div className="d-flex">
								{component.model_number}
							</div>
						</Col>
					</Row>
					<Row className="mt-3">
						<Col className="col-12">
							<Link className="h5"
									to={`/product-management/${companyId}/components/${component.id}`}>
								{component.title}
							</Link>
							<div className="description text-muted mt-1">{t('Type')}
							</div>
							<div className="d-flex">
								{component.type}
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
				</Card.Body>
				<Card.Footer className="payment-card-footer">
						<div className="p-2 float-right">
								<div className="d-flex align-items-center">
									<Link to={"#"} onClick={() => archiveComponent(component)}>
										<Icon name="archive" className="mx-1 svg-outline-primary cursor-pointer"/>
									</Link>
									<Link to={"#"} onClick={() => archiveComponent(component)}>
										<Icon name="delete" className="mx-1 svg-outline-danger cursor-pointer"/>
									</Link>
								</div>
						</div>
				</Card.Footer>
			</Card>
			))}
		</Row>
	);
};

export default GridView;
