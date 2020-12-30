import React from 'react';
import { Col, Form, Row } from "react-bootstrap";
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
	onSelectComponent: any;
	onSelectAllComponents: (any) => void;
}

const ListView = (props: ListViewProps) => {
	const { components, companyId, selectedComponents, archiveComponent, onSelectComponent, onSelectAllComponents } = props;
	const { t } = useTranslation();
	return (
		<div className={"list-view"}>
			<Row className={"header-row"}>
				<div>
					<Form.Check
						type="switch"
						id={"checkbox"}
						label=""
						onChange={(e: any) => onSelectAllComponents(e)}
					/>
				</div>
				<Col lg={1} className="px-4">
					<b>{t("Image")}</b>
				</Col>
				<Col lg={4} className="p-0">
					<b>{t("Title")}</b>
				</Col>
				<Col lg={2} className="p-0">
					<b>{t("Type")}</b>
				</Col>
				<Col lg={2} className="p-0">
					<b>{t("Status")}</b>
				</Col>
				<Col lg={2} className="p-0">
					<b>{t("Model Number")}</b>
				</Col>
			</Row>
			{map(components.results, (component, i) => (
				<div className={"body-row"} key={i}>
					<Row className={"m-0 pb-4"}>
						<div>
							<Form.Check
								type="switch"
								key={component.id}
								id={`checkbox${component.id}`}
								label=""
								checked={!!find(selectedComponents, _component => _component.id === component.id)}
								onChange={(e: any) => onSelectComponent(e, component)}
							/>
						</div>
						<Col lg={1} className="px-4">
							<div className={"image"}>
								<img src={size(component.images) > 0 ? (
										find(component.images, img => !!img.main_image) ?
											find(component.images, img => !!img.main_image).image :
											get(component, "images[0].image")) :
									dummyImage}
									 alt={component.title}/>
							</div>
						</Col>
						<Col lg={4} className="p-0">
							<Link className="h5"
								  to={`/product-management/${companyId}/components/${component.id}`}>
								{component.title}
							</Link>
						</Col>
						<Col lg={2} className="p-0">
							{component.type}
						</Col>
						<Col lg={2} className="p-0">
							<Link to={"#"} className="active-label btn btn-outline-primary">
								{component.status && t(component.status.name)}
							</Link>
						</Col>
						<Col lg={2} className="p-0">
							{component.model_number}
						</Col>
					</Row>
					<Row className={"extra-info"}>
						<div className="p-0">
							{component.tags.length > 0 && map(component.tags.split(","), (tag, i) => (
								<span key={i} className={"tags"}>{tag}</span>
							))}
						</div>
						<div className="d-flex align-items-center">
							<Link to={"#"} onClick={() => archiveComponent(component)}>
								<Icon name="archive" className="mx-1 svg-outline-primary cursor-pointer"/>
							</Link>
							<Link to={"#"} onClick={() => archiveComponent(component)}>
								<Icon name="delete" className="mx-1 svg-outline-danger cursor-pointer"/>
							</Link>
						</div>
					</Row>
				</div>
			))}
		</div>
	);
};


export default ListView;
