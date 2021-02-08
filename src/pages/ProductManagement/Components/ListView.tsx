import React, { useCallback, useEffect, useState } from 'react';
import { Form, Table, Media, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { find, get, map, size, uniqBy } from "lodash";
import { Link, withRouter } from "react-router-dom";

import dummyImage from "../../../assets/images/dummy_image.svg";

interface ListViewProps {
	components: any;
	companyId: any;
	selectedComponents: any;
	archiveComponent: (any) => void;
	onSelectComponent: any;
	onSelectAllComponents: (any) => void;
	onChangePage?: any;
	history?: any;
}

const ListView = (props: ListViewProps) => {
	const { components, companyId, selectedComponents,
		onSelectComponent, onSelectAllComponents, onChangePage, history } = props;
	const { t } = useTranslation();

	const [records, setRecords] = useState<Array<any>>([]);
	const [nextUrl, setNextUrl] = useState<string>(components ? components.next : '');

	useEffect(() => {
		if (components) {
			setRecords(prevArray => [...prevArray, ...components.results]);
			setNextUrl(components.next);
		}
	}, [components]);

	const uniq = uniqBy(records, (e) => {
		return e.id;
	});

	const loadNext = useCallback(() => {
		if (nextUrl) {
			const urlParams = new URLSearchParams(new URL(nextUrl).search);
			onChangePage(urlParams.get('offset'));
		}
	}, [nextUrl]);

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
					{map(uniq, (component, i) => (
						<tr key={i} onClick={(e: any) => { if (!e.target.classList.contains('custom-control-label') && !e.target.classList.contains('custom-control-input')) { history.push(`/product-management/${companyId}/components/${component.id}`) } }}>
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

			{nextUrl ? <div className="text-center">
				<Button variant="outline-primary" onClick={loadNext}>{t('Load More')}</Button>
			</div> : null}
		</div>
	);
};


export default withRouter(ListView);
