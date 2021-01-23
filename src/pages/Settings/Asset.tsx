import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Form, Button, Media } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

//components
import Icon from "../../components/Icon";
import AddEditAssets from "./AddEditAssets";

//actions
import {
  getAssets,
  deleteAsset,
  archiveAsset,
  restoreAsset,
  resetAsset,
  getLocations
} from "../../redux/actions";

import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import ConfirmMessage from "../../components/ConfirmMessage";

interface AssetsCardItemProps {
  asset: any;
  onArchiveDeleteAction: any;
  onEditAsset: any;
  companyId: any;
}

const EmptyState = ({ showArchived }) => {
  const { t } = useTranslation();
  return (
    <Card className="payment-terms-card mb-2">
      <Card.Body>
        <div className="p-2">
          {showArchived ? (
            <h5 className="font-weight-normal my-0">
              {t("There are no archived assets available")}
            </h5>
          ) : (
            <h5 className="font-weight-normal my-0">
              {t("There are no asset available")}
            </h5>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

const AssetsCardItem = ({
  asset,
  onArchiveDeleteAction,
  onEditAsset,
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
      <Row>
        <Col lg={12}>
          <Card className="payment-terms-card mb-2">
            <Link
              to="#"
              onClick={() => onEditAsset(asset)}
              className="payment-terms-link"
            >
              <Card.Header className="payment-card-title">
                <div className="p-2">
                  <h6 className="m-0 text-muted font-weight-bold">
                    {t("Title")}
                  </h6>
                  <h6 className="m-0 font-weight-bold">{asset.title}</h6>
                </div>
              </Card.Header>
              <Card.Body>
                <div className="p-2">
                  <Row>
                    <Col xs={6} lg={6}>
                      <h6 className="m-0 text-muted font-weight-bold">
                        {t("Detail")}
                      </h6>
                      <h6 className="m-0 font-weight-bold">{asset.detail}</h6>
                    </Col>
                    <Col xs={6} lg={6}>
                      <h6 className="m-0 text-muted font-weight-bold">
                        {t("Type")}
                      </h6>
                      <h6 className="m-0 font-weight-bold">{asset.type}</h6>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col xs={6} lg={3}>
                      <h6 className="m-0 text-muted font-weight-bold">
                        {t("Price")}
                      </h6>
                      <h6 className="m-0 font-weight-bold">{asset.price}</h6>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Link>
            <Card.Footer className="payment-card-footer">
              <div className="p-2 float-right">
                <div className="d-flex align-items-center">
                  {!asset.is_active ? (
                    <Link to="#" onClick={() => onClickArchiveUnArchive(true)}>
                      <Icon
                        name="un-archive"
                        className="svg-outline-warning mr-2"
                      />
                    </Link>
                  ) : (
                    <Link to="#" onClick={() => onClickArchiveUnArchive(false)}>
                      <Icon
                        name="archive"
                        className="svg-outline-primary mr-2"
                      />
                    </Link>
                  )}
                  <Link to="#" onClick={() => ondeleteAsset(asset.id)}>
                    <Icon name="delete" className="ml-2 svg-outline-danger" />
                  </Link>
                </div>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
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
    isAssetsFetched,
    isAssetCreated,
    isAssetUpdated,
    isAssetDeleted,
    isAssetArchived,
    isAssetRestored,
    isLocationFetched
  } = useSelector((state: any) => ({
    assets: state.Company.AssetsState.assets,
    locations: state.Company.AssetsState.locations,
    //flags
    isAssetsFetched: state.Company.AssetsState.isAssetsFetched,
    isAssetCreated: state.Company.AssetsState.isAssetCreated,
    isAssetUpdated: state.Company.AssetsState.isAssetUpdated,
    isAssetDeleted: state.Company.AssetsState.isAssetDeleted,
    isAssetArchived: state.Company.AssetsState.isAssetArchived,
    isAssetRestored: state.Company.AssetsState.isAssetRestored,
    isLocationFetched: state.Company.AssetsState.isLocationFetched,
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

      if (isAssetRestored) {
        setshowArchived(false);
      }

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
                  <Col lg={6} xs={12}>
                    {assets.results.length > 0 ? (
                      assets.results.map((asset, key) => (
                        <AssetsCardItem
                          asset={asset}
                          key={key}
                          companyId={companyId}
                          onArchiveDeleteAction={onArchiveDeleteAction}
                          onEditAsset={setAsset}
                        />
                      ))
                    ) : (
                      <EmptyState showArchived={showArchived} />
                    )}
                  </Col>
                  <Col lg={6} xs={12}>
                    <div>
                      <Media>
                        <div className="pt-1">
                          <Icon
                            name="info"
                            className="icon icon-sm svg-outline-secondary"
                          />
                        </div>
                        <Media.Body>
                          <div className="px-3">
                            <h2 className="m-0 mb-2">
                              Luctus sed ut elit nibh
                            </h2>
                            <p className="text-wrap pb-0 text-muted">
                              Some quick example text to build on the card title
                              and make up the bulk of the card's content.Some
                              quick example text to build on the card title and
                              make up the bulk of the card's content.
                            </p>
                          </div>
                        </Media.Body>
                      </Media>
                    </div>
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
          iconWrapperClass="bg-primary text-white p-2 rounded-circle"
          iconClass="text-white"
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
          iconClass="text-white"
          icon="archive"
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
        />
      ) : null}
    </>
  );
};

export default withRouter(Assets);
