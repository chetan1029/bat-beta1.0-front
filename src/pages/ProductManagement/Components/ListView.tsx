import React from 'react';
import { Form, Table, Badge } from "react-bootstrap";
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
			<Table responsive className='table-component-list'>
				<thead>
					<tr>
						<th style={{ width: '5%' }}>
							<Form.Check
								type="checkbox"
								id={"checkbox"}
								label=""
								onChange={(e: any) => onSelectAllComponents(e)}
							/>
						</th>
						<th className='font-weight-normal text-dark' style={{ width: '10%' }}>{t("Image")}</th>
						<th className='font-weight-normal text-dark' style={{ width: '30%' }}>{t("Title")}</th>
						<th className='font-weight-normal text-dark' style={{ width: '20%' }}>{t("Status")}</th>
						<th className='font-weight-normal text-dark' style={{ width: '15%' }}>{t("SKU")}</th>
						<th className='font-weight-normal text-dark' style={{ width: '10%' }}>{t("Action")}</th>
					</tr>
				</thead>
				<tbody>
					{map(components.results, (component, i) => (
						<React.Fragment key={i}>
							<tr className="component-row">
								<td colSpan={6} className="main-table-cell">
									<div className="component-body">
										<Table className="inner-table mt-3 mb-0 shadow">
											<tbody>
												<tr className="component-top">
													<td style={{ width: '5%' }}>
														<Form.Check
															type="checkbox"
															key={component.id}
															id={`checkbox${component.id}`}
															label=""
															checked={!!find(selectedComponents, _component => _component.id === component.id)}
															onChange={(e: any) => onSelectComponent(e, component)}
														/>
													</td>
													<td style={{ width: '10%' }}>
														<div className={"image"}>
															<img src={size(component.images) > 0 ? (
																find(component.images, img => !!img.main_image) ?
																	find(component.images, img => !!img.main_image).image :
																	get(component, "images[0].image")) :
																dummyImage}
																alt={component.title} />
														</div>
													</td>
													<td style={{ width: '30%' }}>
														<b>{component.title}</b>
														<p className="description text-muted">{component.description ? component.description.substring(0, 100) + "..." : ''}</p>
													</td>
													<td style={{ width: '20%' }}>
														<Badge variant='outline-primary' pill className='capitalize font-12'>
															{component.status && t(component.status.name)}
														</Badge>
													</td>
													<td style={{ width: '15%' }}>
														{component.sku}
													</td>
													<td className='text-right' style={{ width: '10%' }}>
														<Link to={"#"} onClick={() => archiveComponent(component)}>
															<Icon name="archive" className="mx-1 svg-outline-primary cursor-pointer" />
														</Link>
													</td>
												</tr>

												<tr className="extra-info">
													<td colSpan={3}>
														<div className="p-0">
															{component.tags.length > 0 && map(component.tags.split(","), (tag, i) => (
																<span key={i} className={"tags"}>{tag}</span>
															))}
														</div>
													</td>
													<td colSpan={3} className="text-right">
														<Link className="product-detail btn btn-outline-primary btn-sm"
															to={`/product-management/${companyId}/components/${component.id}`}>
															{t("Component Details")}
														</Link>
													</td>
												</tr>
											</tbody>
										</Table>
									</div>
								</td>
							</tr>
						</React.Fragment>
					))}
				</tbody>
			</Table>
		</div>
	);
};


export default ListView;