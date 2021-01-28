import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Form, Button, Media, Table } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

//components
import Icon from "../../components/Icon";
import AddEditAssets from "./AddEditAssets";
import TransferAsset from "./TransferAsset";
//actions
import {
  getAssets,
  deleteAsset,
  archiveAsset,
  restoreAsset,
  resetAsset,
  getLocations,
  getAssetType,
} from "../../redux/actions";

import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import ConfirmMessage from "../../components/ConfirmMessage";
import DisplayDate from "../../components/DisplayDate";
interface AssetsCardItemProps {
  asset: any;
  onArchiveDeleteAction: any;
  onEditAsset: any;
  onTransferAsset: any;
  companyId: any;
}

const EmptyState = ({ showArchived }) => {
  const { t } = useTranslation();
  return (
    <tr>
      <td colSpan={7}>
          {showArchived ? (
            <p className="font-weight-normal my-0">
              {t("There are no archived assets available")}
            </p>
          ) : (
            <p className="font-weight-normal my-0">
              {t("There are no asset available")}
            </p>
          )}
      </td>
    </tr>
  );
};

const AssetsCardItem = ({
  asset,
  onArchiveDeleteAction,
  onEditAsset,
  onTransferAsset,
  companyId,
}: AssetsCardItemProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [selectedTermForDelete, setselectedTermForDelete] = useState<any>(null);

  /*
    delete asset
    */
  const ondeleteAsset = (id: any) => {
    onArchiveDeleteAction(asset);
    setselectedTermForDelete(asset);
  };

  const onClickArchiveUnArchive = (action: boolean) => {
    if (action) {
      dispatch(restoreAsset(companyId, asset.id));
    } else {
      dispatch(archiveAsset(companyId, asset.id));
    }
    onArchiveDeleteAction(asset);
  };

  return (
    <>
    <tr>
      <td>{asset.title}</td>
      <td>{asset.type}</td>
      <td>{asset.price ? asset.price['amount'] + ' ' + asset.price['currency']: ''}</td>
      <td>{asset.current_location.name}
      <Link to="#" onClick={() => onTransferAsset(asset)}>
        <Icon name="transfer" className="svg-outline-primary pl-2" />
      </Link>
      </td>
      <td><a href={asset.receipt} target='_blank' className='text-primary' rel="noreferrer">{t('View Receipt File')}</a></td>
      <td><DisplayDate dateStr={asset.date} timeClass={"ml-1"} /></td>
      <td>
        <Link to="#" onClick={() => onEditAsset(asset)}>
          <Icon name="edit" className="svg-outline-primary pr-2" />
        </Link>
        {!asset.is_active ? (
          <Link to="#" onClick={() => onClickArchiveUnArchive(true)}>
            <Icon
              name="un-archive"
              className="svg-outline-primary pr-2"
            />
          </Link>
        ) : (
          <Link to="#" onClick={() => onClickArchiveUnArchive(false)}>
            <Icon
              name="archive"
              className="svg-outline-warning pr-2"
            />
          </Link>
        )}
        <Link to="#" onClick={() => ondeleteAsset(asset.id)}>
          <Icon name="delete" className="svg-outline-danger" />
        </Link>
      </td>
    </tr>
      {selectedTermForDelete ? (
        <ConfirmMessage
          message={`Are you sure you want to delete ${selectedTermForDelete.title}?`}
          onConfirm={() => {
            dispatch(deleteAsset(companyId, selectedTermForDelete.id));
          }}
          onClose={() => setselectedTermForDelete(null)}
          confirmBtnVariant="primary"
          confirmBtnLabel={t("Delete")}
        ></ConfirmMessage>
      ) : null}
    </>
  );
};

interface AssetsProps {
  match: any;
}
const Assets = (props: AssetsProps) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const {
    assets,
    locations,
    assettypes,
    isAssetsFetched,
    isAssetCreated,
    isAssetUpdated,
    isAssetDeleted,
    isAssetArchived,
    isAssetRestored,
    isLocationFetched,
    isAssettypeFetched,
  } = useSelector((state: any) => ({
    assets: state.Company.AssetsState.assets,
    locations: state.Company.AssetsState.locations,
    assettypes: state.Company.AssetsState.assettypes,
    //flags
    isAssetsFetched: state.Company.AssetsState.isAssetsFetched,
    isAssetCreated: state.Company.AssetsState.isAssetCreated,
    isAssetUpdated: state.Company.AssetsState.isAssetUpdated,
    isAssetDeleted: state.Company.AssetsState.isAssetDeleted,
    isAssetArchived: state.Company.AssetsState.isAssetArchived,
    isAssetRestored: state.Company.AssetsState.isAssetRestored,
    isLocationFetched: state.Company.AssetsState.isLocationFetched,
    isAssettypeFetched: state.Company.AssetsState.isAssettypeFetched,
  }));
  const companyId = props.match.params.companyId;
  /*
    asset
    */
  useEffect(() => {
    const companyId = props.match.params.companyId;
    if (companyId) {
      dispatch(getAssets(companyId, { is_active: true }));
      dispatch(getLocations(companyId, { is_active: true }));
      dispatch(getAssetType(companyId, { is_active: true }));
    }
  }, [props.match.params.companyId]);

  /*
    archive switch
    */
  const [showArchived, setshowArchived] = useState(false);

  const onChangeShowArchive = (checked: boolean) => {
    setshowArchived(checked);
    dispatch(getAssets(companyId, { is_active: !checked }));
  };

  /*
    alert
    */
  const [archiveUnarchiveItem, setarchiveUnarchiveItem] = useState<any>(null);

  /*
    to display alert and set title
    */
  const onArchiveDeleteAction = (asset: any) => {
    setarchiveUnarchiveItem(asset);
  };

  /*
    add asset
    */
  const [isOpen, setisopen] = useState(false);
  const openModal = () => {
    setisopen(true);
  };
  const closeModal = () => {
    setisopen(false);
    dispatch(resetAsset());
  };

  /*
    Transfer Assets
    */
  const [isTransferOpen, setistransferopen] = useState(false);
  const openTransferModal = () => {
    setistransferopen(true);
  };
  const closeTransferModal = () => {
    setistransferopen(false);
    dispatch(resetAsset());
  };

  /*
        asset
    */
  const [selectedAsset, setSelectedAsset] = useState<any>();

  const setAsset = (asset: any) => {
    setSelectedAsset(asset);
    setisopen(true);
  };

  /*
    close modal for after creating asset
    */
  useEffect(() => {
    if (isAssetCreated || isAssetUpdated) {
      setisopen(false);
      dispatch(getAssets(props.match.params.companyId, { is_active: true }));
      setTimeout(() => {
        dispatch(resetAsset());
      }, 10000);
    }
  }, [isAssetCreated, isAssetUpdated, props.match.params.companyId]);

  /*
    re-fetch items when item deleted, archived, restored
    */
  useEffect(() => {
    if (isAssetDeleted || isAssetArchived || isAssetRestored) {
      dispatch(
        getAssets(props.match.params.companyId, {
          is_active: !showArchived,
        })
      );

      setTimeout(() => {
        dispatch(resetAsset());
      }, 10000);
    }
  }, [
    isAssetDeleted,
    isAssetArchived,
    isAssetRestored,
    dispatch,
    props.match.params.companyId,
  ]);

  return (
    <>
      <div className="py-4 px-3">
        <Row>
          <Col>
            <div className="d-flex align-items-center">
              <Link to={`/settings/${companyId}`}>
                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
              </Link>
              <h1 className="m-0">{t("Assets")}</h1>
              <div className="d-flex align-items-center pl-3">
                <span className="m-0 font-16 mr-2">{t("Show archived")}</span>
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
            <Button
              variant="primary"
              onClick={() => {
                openModal();
                setSelectedAsset(null);
              }}
            >
              {t("Add Asset")}
            </Button>
          </Col>
        </Row>
      </div>

      {!isAssetsFetched ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <Card.Body className="">
              <div className="p-2">
                <Row>
                  <Col xs={12}>
                    <Table >
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Type</th>
                          <th>Price</th>
                          <th>Current Location</th>
                          <th>Receipt</th>
                          <th>Purchase Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assets.results.length > 0 ? (
                          assets.results.map((asset, key) => (
                            <AssetsCardItem
                              asset={asset}
                              key={key}
                              companyId={companyId}
                              onArchiveDeleteAction={onArchiveDeleteAction}
                              onEditAsset={setAsset}
                              onTransferAsset={setAsset}
                            />
                          ))
                        ) : (
                          <EmptyState showArchived={showArchived} />
                        )}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      {isAssetCreated && !isAssetDeleted && !isAssetRestored ? (
        <MessageAlert
          message={t("A new Asset is created")}
          icon={"check"}
          iconWrapperClass="bg-success text-white p-2 rounded-circle"
          iconClass="icon-sm"
        />
      ) : null}

      {isAssetDeleted && !isAssetCreated && !isAssetRestored ? (
        <MessageAlert
          message={t("Selected Asset is deleted")}
          icon={"check"}
          iconWrapperClass="bg-success text-white p-2 rounded-circle"
          iconClass="icon-sm"
        />
      ) : null}

      {isAssetArchived ? (
        <MessageAlert
          message={`${t("Asset")} ${archiveUnarchiveItem.title} ${t(
            "is archived. You can undo this action."
          )}`}
          iconWrapperClass="bg-warning text-white p-2 rounded-circle"
          iconClass="svg-outline-white"
          icon="archive"
          undo={true}
          onUndo={() => {
            dispatch(restoreAsset(companyId, archiveUnarchiveItem.id));
          }}
        />
      ) : null}

      {isAssetRestored ? (
        <MessageAlert
          message={`${t("Asset")} ${archiveUnarchiveItem.title} ${t(
            "is restored. You can undo this action."
          )}`}
          iconWrapperClass="bg-primary text-white p-2 rounded-circle"
          iconClass="svg-outline-white"
          icon="un-archive"
          undo={true}
          onUndo={() => {
            dispatch(archiveAsset(companyId, archiveUnarchiveItem.id));
          }}
        />
      ) : null}

      {isOpen ? (
        <AddEditAssets
          isOpen={isOpen}
          onClose={closeModal}
          companyId={companyId}
          asset={selectedAsset}
          locations={locations}
          assettypes={assettypes}
        />
      ) : null}

      {isTransferOpen ? (
        <TransferAsset
          isOpen={isOpen}
          onClose={closeModal}
          companyId={companyId}
          asset={selectedAsset}
          locations={locations}
          assettypes={assettypes}
        />
      ) : null}
    </>
  );
};

export default withRouter(Assets);
