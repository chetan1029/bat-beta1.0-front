import React from 'react';
import { Col, Form, Row, Table, Media } from "react-bootstrap";
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
			<Table hover>
				<thead>
					<tr>
						<th className="index">
							<Form.Check
								type="switch"
								id={"checkbox"}
								label=""
								onChange={(e: any) => onSelectAllComponents(e)}
							/>
						</th>
						<th>{t("Component")}</th>
						<th>{t("Type")}</th>
						<th>{t("Status")}</th>
						<th>{t("Model Number")}</th>
					</tr>
				</thead>
				<tbody>
			{map(components.results, (component, i) => (
				<tr key={i}>
					<td>
						<Form.Check
							type="switch"
							key={component.id}
							id={`checkbox${component.id}`}
							label=""
							checked={!!find(selectedComponents, _component => _component.id === component.id)}
							onChange={(e: any) => onSelectComponent(e, component)}
						/>
					</td>
					<td>
						<Media>
								<img className="mr-3 img-sm" src={size(component.images) > 0 ? (
										find(component.images, img => !!img.main_image) ?
											find(component.images, img => !!img.main_image).image :
											get(component, "images[0].image")) :
									dummyImage}
									 alt={component.title} />
								<Media.Body>
										<p className="my-0 font-weight-semibold">
										<Link
											  to={`/product-management/${companyId}/components/${component.id}`}>
												{component.title}
										</Link>
										</p>
										<p className="my-0 text-muted">{component.model_number}</p>
								</Media.Body>
						</Media>
					</td>
					<td>{component.type}</td>
					<td>
						<Link to={"#"} className="active-label btn btn-outline-primary">
							{component.status && t(component.status.name)}
						</Link>
					</td>
					<td>{component.model_number}</td>
				</tr>
			))}
			</tbody>
		</Table>
		</div>
	);
};


export default ListView;
