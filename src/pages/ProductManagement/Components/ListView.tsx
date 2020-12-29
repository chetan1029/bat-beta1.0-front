import React from 'react';
import { Form, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { find, get, map, size } from "lodash";
import { Link } from "react-router-dom";

import dummyImage from "../../../assets/images/dummy_image.svg";
import Icon from "../../../components/Icon";

interface ListViewProps {
	components: any;
	companyId: any;
	selectedComponents: any;
	archiveComponent: (any) => void;
	restoreComponent: (any) => void;
	onSelectComponent: any;
	onSelectAllComponents: (any) => void;
}

const ListView = (props: ListViewProps) => {
	const { components, companyId, selectedComponents, archiveComponent,
		onSelectComponent, onSelectAllComponents, restoreComponent } = props;
	const { t } = useTranslation();
	return (
		<div className={"list-view"}>
			<Row className={"header-row"}>
				<Col lg={1}>
					<Form.Check
						type="checkbox"
						id={"checkbox"}
						label=""
						onChange={(e: any) => onSelectAllComponents(e)}
					/>
				</Col>
				<Col lg={2}>
					{t("Image")}
				</Col>
				<Col lg={4}>
					{t("Title")}
				</Col>
				<Col lg={2}>
					{t("Status")}
				</Col>
				<Col lg={2}>
					{t("SKU")}
				</Col>
				<Col lg={1}>
					{t("Action")}
				</Col>
			</Row>

			{map(components.results, (component, i) => (
				<div className={"body-row"} key={i}>
					<Row className={"m-0 pb-4"}>
						<Col lg={1}>
							<Form.Check
								type="checkbox"
								key={component.id}
								id={`checkbox${component.id}`}
								label=""
								checked={!!find(selectedComponents, _component => _component.id === component.id)}
								onChange={(e: any) => onSelectComponent(e, component)}
							/>
						</Col>
						<Col lg={2} className="px-4">
							<div className={"image"}>
								<img src={size(component.images) > 0 ? (
									find(component.images, img => !!img.main_image) ?
										find(component.images, img => !!img.main_image).image :
										get(component, "images[0].image")) :
									dummyImage}
									alt={component.title} />
							</div>
						</Col>
						<Col lg={4} className="p-0">
							<b>{component.title}</b><br />
							<p className="description text-muted">{component.description}</p>
						</Col>
						<Col lg={2} className="p-0">
							<Link to={"#"} className="active-label btn btn-outline-primary">
								{component.status && t(component.status.name)}
							</Link>
						</Col>
						<Col lg={2} className="p-0">
							{component.sku}
						</Col>
						<Col lg={1} className="p-0">
							{component['is_active'] ?
								<Link to={"#"} onClick={() => archiveComponent(component)}>
									<Icon name="archive" className="mx-1 svg-outline-primary cursor-pointer" />
								</Link> : <Link to={"#"} onClick={() => restoreComponent(component)}>
									<Icon name="un-archive" className="mx-1 svg-outline-primary cursor-pointer" />
								</Link>}
						</Col>
					</Row>
					<Row className={"extra-info"}>
						<div className="p-0">
							{component.tags.length > 0 && map(component.tags.split(","), (tag, i) => (
								<span key={i} className={"tags"}>{tag}</span>
							))}
						</div>
						<Link className="product-detail btn btn-outline-primary"
							to={`/product-management/${companyId}/components/${component.id}`}>
							{t("Component Details")}
						</Link>
					</Row>
				</div>
			))}
		</div>
	);
};


export default ListView;