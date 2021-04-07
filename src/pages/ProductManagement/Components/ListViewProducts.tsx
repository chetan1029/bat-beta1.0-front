import React from 'react';
import { Form, Table, Media } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { find, get, map, size } from "lodash";
import { Link } from "react-router-dom";

import dummyImage from "../../../assets/images/dummy_image.svg";
import Icon from "../../../components/Icon";

interface ListViewProductsProps {
	components: any;
	companyId: any;
	selectedComponents: any;
	archiveComponent:any;
	deleteComponent:any;
	onSelectComponent: any;
	onSelectAllComponents: (any) => void;
}

const ListViewProducts = (props: ListViewProductsProps) => {
	const { components, companyId, selectedComponents, archiveComponent, deleteComponent, onSelectComponent, onSelectAllComponents } = props;
	const { t } = useTranslation();

	const renderContent = (component, i) => {
		const product = component.product;
		return (
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
						<img className="mr-3 img-sm" src={size(product.images) > 0 ? (
							find(product.images, img => !!img.main_image) ?
								find(product.images, img => !!img.main_image).image :
								get(product, "images[0].image")) :
							dummyImage}
							alt={product.title} />
						<Media.Body>
							<p className="my-0 font-weight-semibold">
								{/* <Link to={`/product-management/${companyId}/components/${product.id}`}> */}
									{product.title}
								{/* </Link> */}
							</p>
							<p className="my-0 text-muted">{product.model_number}</p>
						</Media.Body>
					</Media>
				</td>
				<td>{product.type}</td>
				<td>
					<Link to={"#"} className="active-label btn btn-outline-primary">
						{product.status && t(product.status.name)}
					</Link>
				</td>
				<td>{product.ean}</td>
				<td>{component.quantity}</td>
				<td>
					{
						component.is_active ?
						<Link to={"#"} onClick={() => archiveComponent(component, true)}>
							<Icon name="archive" className="mx-1 svg-outline-primary cursor-pointer" />
						</Link> :
						<Link to={"#"} onClick={() => archiveComponent(component, false)}>
							<Icon name="un-archive" className="svg-outline-warning mx-1 cursor-pointer" />
						</Link>
					}
					<Link to={"#"} onClick={() => deleteComponent(component)}>
						<Icon name="delete" className="mx-1 svg-outline-danger cursor-pointer" />
					</Link>
				</td>
			</tr>
		)
	}

	return (
		<div className={"list-view"}>
			<Table>
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
						<th>{t("EAN")}</th>
						<th>{t("Quantity")}</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{map(components.results, renderContent)}
				</tbody>
			</Table>
		</div>
	);
};


export default ListViewProducts;
