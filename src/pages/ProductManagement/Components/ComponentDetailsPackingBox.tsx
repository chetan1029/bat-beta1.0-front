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
	archivePackingBox,
	restorePackingBox,
	getComponentsPackingBox,
	archiveComponent,
	discontinueComponent,
	getComponentDetails,
	resetComponents,
	deletePackingBox,
	archiveComponentPackingBox,
	restoreComponentPackingBox,
	deleteComponentPackingBox,
} from "../../../redux/actions";
import { packing_boxes_tab } from "./ComponentDetails";

import AddEditPackingBox from './AddEditPackingBox';

const EmptyState = ({ showArchived }) => {
	const { t } = useTranslation();
	return (
		<Col>
			<Card>
				<Card.Body>
					<div className="p-2">
						{showArchived ? <p className="font-weight-normal my-0">{t('There are no archived packing box available')}</p> : <p className="font-weight-normal my-0">{t('There are no packing box available')}</p>}
					</div>
				</Card.Body>
			</Card>
		</Col>
	)
}

const PaymentCardItem = ({ packingbox, onArchiveDeleteAction, onEditPackingBox, companyId, componentId, filters }) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const [selectedTermForDelete, setselectedTermForDelete] = useState<any>(null);

	/*
	delete payment term
	*/
	const onDeletePackingBox = (id: any) => {
		onArchiveDeleteAction(packingbox);
		setselectedTermForDelete(packingbox);
	}

	const onClickArchiveUnArchive = (action: boolean) => {
		if (action) {
			dispatch(restoreComponentPackingBox(companyId, componentId, packingbox.id, packingbox, filters));
		} else {
			dispatch(archiveComponentPackingBox(companyId, componentId, packingbox.id, packingbox, filters));
		}
		onArchiveDeleteAction(packingbox);
	}

	return (<>
		<Col lg={6}>
			<Card className="mb-2">
				<Link to="#" onClick={() => onEditPackingBox(packingbox)} className="card-link">
					<Card.Header>
						<p className="m-0 text-muted">{t('Name')}</p>
						<h6 className="m-0">{get(packingbox, 'packingbox.name')}</h6>
					</Card.Header>
					<Card.Body>
						<Row>
							<Col xs={6} lg={3}>
								<p className="m-0 text-muted">{t('Size')}</p>
								<p className="m-0">{get(packingbox, 'packingbox.length')}x{get(packingbox, 'packingbox.width')}x{get(packingbox, 'packingbox.depth')} {get(packingbox, 'packingbox.length_unit')}</p>
							</Col>
							<Col xs={6} lg={3}>
								<p className="m-0 text-muted">{t('Package Weight')}</p>
								<p className="m-0">{get(packingbox, 'packingbox.weight.value')} {get(packingbox, 'packingbox.weight.unit')}</p>
							</Col>
							<Col xs={6} lg={3}>
								<p className="m-0 text-muted">{t('Total Weight')}</p>
								<p className="m-0">{get(packingbox, 'weight.value')} {get(packingbox, 'weight.unit')}</p>
							</Col>
							<Col xs={6} lg={3}>
								<p className="m-0 text-muted">{t('Number of Unit')}</p>
								<p className="m-0">{get(packingbox, 'units')}</p>
							</Col>
						</Row>
					</Card.Body>
				</Link>
				<Card.Footer>
					<div className="float-right">
						<div className="d-flex align-items-center">
							{
								!packingbox.is_active ?
									<Link to="#" onClick={() => onClickArchiveUnArchive(true)}><Icon name="un-archive" className="svg-outline-warning mr-2" /></Link> :
									<Link to="#" onClick={() => onClickArchiveUnArchive(false)}><Icon name="archive" className="svg-outline-primary mr-2" /></Link>
							}
							<Link to="#" onClick={() => onDeletePackingBox(packingbox.id)}><Icon name="delete" className="ml-2 svg-outline-danger" /></Link>

						</div>
					</div>
				</Card.Footer>
			</Card>
		</Col>
		{
			selectedTermForDelete ?
				<ConfirmMessage message={`Are you sure you want to delete ${get(selectedTermForDelete, 'packingbox.name')}?`}
					onConfirm={() => {
						setselectedTermForDelete(null);
						dispatch(deleteComponentPackingBox(companyId, componentId, selectedTermForDelete.id, filters));
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

const ComponentDetailsPackingBox = (props: ComponentDetailsProps) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [selectedView, setSelectedView] = useState<any>("description");
	const [showMore, setShowMore] = useState<any>(false);

	const {
		loading,
		component,
		isComponentArchived,
		isComponentDiscontinued,
		componentsPackingBox,
		isComponentPackingBoxCreated,
		isComponentPackingBoxEdited
	} = useSelector(({ ProductManagement: { Components } }: any) => ({
		loading: Components.loading,
		component: Components.component,
		isComponentArchived: Components.isComponentArchived,
		isComponentDiscontinued: Components.isComponentDiscontinued,

		componentsPackingBox: Components.componentsPackingBox,
		isComponentPackingBoxCreated: Components.isComponentPackingBoxCreated,
		isComponentPackingBoxEdited: Components.isComponentPackingBoxEdited,
	}));

	const companyId = props.match.params.companyId;
	const componentId = props.match.params.componentId;
	const tabName = props.match.params.tabName;
	/*
		close modal for after creating payment term
		*/
	useEffect(() => {
		if (isComponentPackingBoxCreated || isComponentPackingBoxEdited) {
			setisOpenAddPackingBox(false);
			setTimeout(() => {
				getPackingbox();
			}, 1000);
		}
	}, [isComponentPackingBoxCreated, isComponentPackingBoxEdited, dispatch, companyId, componentId, tabName]);

	useEffect(() => {
		if (tabName === packing_boxes_tab) {
			getPackingbox(); // initial loading
		}
	}, [dispatch, companyId, componentId, tabName]);

	const [isOpenAddPackingBox, setisOpenAddPackingBox] = useState(false);
	const [showArchived, setshowArchived] = useState(false);

	const onChangeShowArchive = (checked: boolean) => {
		setshowArchived(checked);
		getPackingbox({ is_active: !checked })
	}

	const onArchiveDeleteAction = () => {

	}

	const [selectedPackingBox, setselectedPackingBox] = useState<any>();

	const setPackingBox = (data: any) => {
		setselectedPackingBox(data);
		setisOpenAddPackingBox(true);
	}

	const getPackingbox = (filters = { is_active: true }) => {
		dispatch(getComponentsPackingBox(companyId, componentId, filters));
	}

	const renderPackingBoxes = () => {
		return (
			<>
				<div className="px-2 pb-2">
					<Row>
						<Col>
							<div className="d-flex align-items-center">
								<h1 className="m-0">{t('Packing Box')}</h1>
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
							<Button variant="primary" onClick={() => { setisOpenAddPackingBox(true); setselectedPackingBox(null) }}>{t('Add Packing Box')}</Button>
						</Col>
					</Row>
					{isOpenAddPackingBox ? <AddEditPackingBox isOpen={isOpenAddPackingBox} onClose={() => setisOpenAddPackingBox(false)} companyId={companyId} componentId={componentId} defaultPackingBox={selectedPackingBox} /> : null}
				</div>

				<div className="p-2">
					<Row>
						{
							componentsPackingBox && componentsPackingBox['results'].length > 0 ?
								componentsPackingBox['results'].map((packing, key) =>
									<PaymentCardItem packingbox={packing}
										key={key} companyId={companyId} componentId={componentId}
										onArchiveDeleteAction={onArchiveDeleteAction}
										onEditPackingBox={setPackingBox}
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
			{!!isComponentPackingBoxCreated ? <MessageAlert message={t('A new Component Packing Box is created')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
			{!!isComponentPackingBoxEdited ? <MessageAlert message={t('Component Packing Box is edited')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}

			{renderPackingBoxes()}
		</>
	);
};

export default withRouter(ComponentDetailsPackingBox);
