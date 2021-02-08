import React, { useEffect, useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";

import Icon from "../../../components/Icon";
import Loader from "../../../components/Loader";
import AlertMessage from "../../../components/AlertMessage";

import { importComponent } from "../../../redux/actions";

interface ImportProps {
    onClose?: any;
    companyId: any;
}

const Import = (props: ImportProps) => {
    const { onClose, companyId } = props;

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [show, setShow] = useState(true);

    const {
        importLoading,
        importComponentError,
        isImported
    } = useSelector(({ ProductManagement: { Components } }: any) => ({
        importComponentError: Components.importComponentError,
        isImported: Components.isImported,
        importLoading: Components.importLoading
    }));

    const onModalClose = () => {
        setShow(false);
        onClose();
    }

    const [file, setFile] = useState<any>();

    const importFile = () => {
        dispatch(importComponent(companyId, file));
    }

    useEffect(() => {
        if (isImported) {
            setShow(false);
            onClose();
        }
    }, [isImported, onClose]);

    return <>
        <Modal show={show} onHide={onModalClose}>
            <Modal.Header closeButton className="add-payment-modal-header">
                <Modal.Title>{t("Import")}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                <div className='position-relative'>
                    {importLoading ? <Loader /> : null}

                    {!isImported &&
                        importComponentError ? (
                            <AlertMessage error={importComponentError} />
                        ) : null}

                    <div className="my-2">
                        <div className="react-dropzone">
                            <Dropzone accept='text/*, application/vnd.ms-excel'
                                onDropAccepted={(files) => { setFile(files && files.length > 0 ? files[0] : null) }}
                                maxFiles={1}>
                                {({ getRootProps, getInputProps }) => (
                                    <div className="medium-dropzone" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <Icon name={"upload"} className="icon-sm" />
                                        <span className="font-10">Upload</span>
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                    </div>
                    <Button variant={"primary"} onClick={importFile} disabled={!file}>{t('Import')}</Button>
                </div>
            </Modal.Body>
        </Modal>
    </>
}

export default Import;