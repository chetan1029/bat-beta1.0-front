import React, { useEffect, useState } from "react";
import { Card, Col, Form, Nav, Row, Table } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";

//components
import Icon from "../../../components/Icon";
import { getComponents, resetComponents } from "../../../redux/actions";
import MessageAlert from "../../../components/MessageAlert";

const TabMenu = ({ onChange, selectedView }) => {
    const { t } = useTranslation();

    return <div className="px-2 pb-2 mb-4">
        <Nav variant="tabs" className="nav-bordered m-0" activeKey={selectedView} onSelect={onChange} as='ul'>
            <Nav.Item as="li">
                <Nav.Link className="pt-1" eventKey="all">{t('All')}</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link className="pt-1" eventKey="draft">{t('Draft')}</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link className="pt-1" eventKey="archived">{t('Archived')}</Nav.Link>
            </Nav.Item>
        </Nav>
    </div>
}


interface ComponentsProps {
    match: any;
}

const Components = (props: ComponentsProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const companyId = props.match.params.companyId;
    const [showActive, setShowActive] = useState<boolean>(false);
    const [selectedView, setSelectedView] = useState<any>("all");

    useEffect(() => {
        dispatch(getComponents(companyId, { is_component: true }));
        dispatch(resetComponents());
    }, [dispatch, companyId]);

    const {
        components,
        isComponentCreated,
    } = useSelector(({ ProductManagement: { Components } }: any) => ({
        components: Components.components,
        isComponentCreated: Components.isComponentCreated,
    }));

    const onChangeShowActive = (checked: boolean) => {
        setShowActive(checked);

        if (checked) {
            let filters = {
                is_component: true,
                is_active: true,
            }
            dispatch(getComponents(companyId, filters));
        } else {
            dispatch(getComponents(companyId, { is_component: true }));
        }
    }

    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Icon name="components" className="icon icon-xs  mr-2"/>
                            <h1 className="m-0">{t('Components')}</h1>
                            <div className="d-flex align-items-center pl-3">
                                <span className="m-0 font-16 mr-2">
                                    {t('Show active only')}
                                </span>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                    checked={showActive}
                                    onChange={(e: any) => onChangeShowActive(e.target.checked)}
                                />
                            </div>
                        </div>
                    </Col>
                    <Col className="text-right">
                        <Link to={`/product-management/${companyId}/components/add`}
                              className="btn btn-primary">{t('Add Component')}</Link>
                    </Col>
                </Row>
            </div>

            <Card>
                <Card.Body className="">

                    <TabMenu onChange={setSelectedView} selectedView={selectedView}/>

                    <Table bordered hover>
                        <thead>
                        <tr>
                            <th>
                                <Form.Check
                                    type="checkbox"
                                    id={"checkbox"}
                                    label=""
                                    onChange={(e: any) => null}
                                />
                            </th>
                            <th>{t("Image")}</th>
                            <th>{t("Title")}</th>
                            <th>{t("Status")}</th>
                            <th>{t("SKU")}</th>
                            <th>{t("Action")}</th>

                        </tr>
                        </thead>
                        <tbody>
                        {map(components.results, (component, i) => (
                            <tr key={i}>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        id={`checkbox${i}`}
                                        label=""
                                        onChange={(e: any) => null}
                                    />
                                </td>
                                <td>
                                    <div className={"variation-image"}>
                                        <img src={component.images[0]} alt={component.title}/>
                                    </div>
                                </td>
                                <td>{component.title}</td>
                                <td>
                                    <button className="btn btn-outline-primary cursor-pointer"
                                            onClick={() => null}>
                                        {component.is_active && t("Active")}
                                    </button>
                                </td>
                                <td>{component.sku}</td>
                                <td></td>
                            </tr>

                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            {isComponentCreated ? <MessageAlert message={t('A new component is created')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
        </>
    );
}

export default withRouter(Components);