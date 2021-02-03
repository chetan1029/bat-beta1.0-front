import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Nav, Row, Form, Button } from "react-bootstrap";
import { Link, Redirect, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { get, map, find, size } from 'lodash';

//components
import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader";
import dummyImage from "../../../assets/images/dummy_image.svg";
import ConfirmMessage from "../../../components/ConfirmMessage";
import MessageAlert from "../../../components/MessageAlert";

//actions
import {
	getComponentsME,
	resetComponents,
	archiveComponentME,
	restoreComponentME,
	deleteComponentME,
} from "../../../redux/actions";
import { me_tag } from "./ComponentDetails";

import AddEditME from './AddEditME';

const EmptyState = ({ showArchived }) => {
	const { t } = useTranslation();
	return (
		<Col lg={12}>
			<Card>
				<Card.Body>
					<div className="p-2">
						{showArchived ? <p className="font-weight-normal my-0">{t('There are no archived manufacturing expectations available')}</p> : <p className="font-weight-normal my-0">{t('There are no manufacturing expectations available')}</p>}
					</div>
				</Card.Body>
			</Card>
		</Col>
	)
}

const CardItem = ({ data, onArchiveDeleteAction, onEditPackingBox, companyId, componentId, filters }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const [selectedTermForDelete, setselectedTermForDelete] = useState<any>(null);

	/*
	delete payment term
	*/
	const onDelete = (id: any) => {
		onArchiveDeleteAction(data);
		setselectedTermForDelete(data);
	}

	const onClickArchiveUnArchive = (action: boolean) => {
		if (action) {
			dispatch(restoreComponentME(companyId, componentId, data.id, data, filters));
		} else {
			dispatch(archiveComponentME(companyId, componentId, data.id, data, filters));
		}
		onArchiveDeleteAction(data);
	}

	return (<>
		<Col lg={12}>
			<Card className="mb-2">
					<Card.Header onClick={() => onEditPackingBox(data)} role="button" className="card-link">
						<h6 className="m-0">{t('Version')} {get(data, 'version')}</h6>
						<p className="m-0 text-muted">{get(data, 'revision_history')}</p>
					</Card.Header>
					<Card.Body>
						<Row className="m-0">
							{
								data.files.map((v, k) => (
									<Col xs={6} lg={4} key={k} className="ME-items">
										<div className="ME-item">
											<div className="ME-item__left">
												<Icon name={"document"} className="svg-outline-white"/>
												<div>
													<h6 className="m-0 title">{get(v, 'title')}</h6>
													<div className="text-muted">{get(v, 'version')}</div>
												</div>
											</div>
											<div  className="ME-item__right">
												<a role="button" href={get(v, 'file')} target="_blank" download><Icon name={"upload"} /></a>
											</div>
										</div>
									</Col>
								))
							}
						</Row>
					</Card.Body>
				<Card.Footer>
					<div className="float-right">
						<div className="d-flex align-items-center">
							{
								!data.is_active ?
									<Link to="#" onClick={() => onClickArchiveUnArchive(true)}><Icon name="un-archive" className="svg-outline-warning mr-2" /></Link> :
									<Link to="#" onClick={() => onClickArchiveUnArchive(false)}><Icon name="archive" className="svg-outline-primary mr-2" /></Link>
							}
							<Link to="#" onClick={() => onDelete(data.id)}><Icon name="delete" className="ml-2 svg-outline-danger" /></Link>

						</div>
					</div>
				</Card.Footer>
			</Card>
		</Col>
		{
			selectedTermForDelete ?
				<ConfirmMessage message={`Are you sure you want to delete version ${get(selectedTermForDelete, 'version')}?`}
					onConfirm={() => {
						setselectedTermForDelete(null);
						let files = selectedTermForDelete.files.map(v => v.id) || [];
						dispatch(deleteComponentME(companyId, componentId, selectedTermForDelete.id, files, filters));
					}}
					onClose={() => setselectedTermForDelete(null)} confirmBtnVariant="primary" confirmBtnLabel={t('Delete')} />
				: null
		}
	</>
	)
}

interface ComponentDetailsProps {
	match: any;
}

const ComponentDetailsME = (props: ComponentDetailsProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [selectedView, setSelectedView] = useState<any>("description");
	const [showMore, setShowMore] = useState<any>(false);

	const {
		loading,
		component,
		isComponentArchived,
		isComponentDiscontinued,
		componentsME,
		isComponentMECreated,
		isComponentMEEdited
	} = useSelector(({ ProductManagement: { Components } }: any) => ({
		loading: Components.loading,
		component: Components.component,
		isComponentArchived: Components.isComponentArchived,
		isComponentDiscontinued: Components.isComponentDiscontinued,

		componentsME: Components.componentsME,
		isComponentMECreated: Components.isComponentMECreated,
		isComponentMEEdited: Components.isComponentMEEdited,
	}));

	const companyId = props.match.params.companyId;
	const componentId = props.match.params.componentId;
	const tabName = props.match.params.tabName;
	/*
		close modal for after creating payment term
		*/
	useEffect(() => {
		if (isComponentMECreated || isComponentMEEdited) {
			setTimeout(() => {
				setOpenAddME(false);
				getLists();
			}, 1000);
		}
	}, [isComponentMECreated, isComponentMEEdited, dispatch, companyId, componentId, tabName]);

	useEffect(() => {
		if (tabName === me_tag) {
			getLists(); // initial loading
		}
	}, [dispatch, companyId, componentId, tabName]);

	const [showArchived, setshowArchived] = useState(false);
	const [openAddME, setOpenAddME] = useState(false);

	const onChangeShowArchive = (checked: boolean) => {
		setshowArchived(checked);
		getLists({ is_active: !checked })
	}

	const onArchiveDeleteAction = () => {

	}

	const [selectedME, setselectedME] = useState<any>();

	const setData = (data: any) => {
		setselectedME(data);
		setOpenAddME(true);
	}

	const getLists = (filters = { is_active: true }) => {
		dispatch(getComponentsME(companyId, componentId, filters));
	}

	const renderLists = () => {
		return (
			<>
				<div className="px-2 pb-2">
					<Row>
						<Col>
							<div className="d-flex align-items-center">
								<h1 className="m-0">{t('Manufacturing Expectations')}</h1>
								<div className="d-flex align-items-center pl-3">
									<span className="m-0 font-16 mr-2">
										{t('Show archived')}
									</span>
									<Form.Check
										type="switch"
										id="custom-switch"
										label=""
										checked={showArchived}
										onChange={(e: any) => onChangeShowArchive(e.target.checked)}
									/>
								</div>
							</div>
						</Col>
						<Col className="text-right">
							<Button variant="primary" onClick={() => { setOpenAddME(true); setselectedME(null) }}>{t('Add ME')}</Button>
						</Col>
					</Row>
				</div>

				<div className="p-2">
					<Row>
						{
							componentsME && componentsME['results'].length > 0 ?
								componentsME['results'].map((data, key) =>
									<CardItem data={data}
										key={key} companyId={companyId} componentId={componentId}
										onArchiveDeleteAction={onArchiveDeleteAction}
										onEditPackingBox={setData}
										filters={{ is_active: !showArchived }}
									/>
								) : <EmptyState showArchived={showArchived} />
						}
					</Row>
				</div>
			</>
		)
	}

	return (
		<>
			{!!isComponentMECreated ? <MessageAlert message={t('A new Component ME is created')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
			{!!isComponentMEEdited ? <MessageAlert message={t('Component ME is edited')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

			{
				openAddME ? <AddEditME
					isOpen={openAddME}
					onClose={() => setOpenAddME(false)}
					companyId={companyId}
					componentId={componentId}
					productId={get(component, 'products[0].id')}
					defaultData={selectedME}
				/> : renderLists()
			}
		</>
	);
};

export default withRouter(ComponentDetailsME);
