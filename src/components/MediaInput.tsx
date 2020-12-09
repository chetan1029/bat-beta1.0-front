import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { map, size } from 'lodash';
import { Button, Form, Modal } from "react-bootstrap";
import Icon from "./Icon";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";

const urlToFile = (image: any) => {
    const xhr = new XMLHttpRequest();
    return new Promise(function(resolve, reject) {
        xhr.open('GET', `https://cors-anywhere.herokuapp.com/${image}`, true);
        xhr.onload = function(e) {
            if (this.status == 200) {
                const reader = new FileReader();
                reader.onloadend = function() {
                    resolve(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            } else if (this.status >= 300) {
                reject("Error status code =" + this.status)
            }
        };
        xhr.responseType = 'blob';
        xhr.send();
    });
}

interface AddFileFromUrlProps {
    isOpen: boolean;
    onClose: any;
    onGetFile: (any) => void;
}

const AddFileFromUrl = ({ isOpen, onClose, onGetFile }: AddFileFromUrlProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<any>(false)

    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            url: '',
        },
        validationSchema: Yup.object({
            url: Yup.string().required(t('URL is required')),
        }),
        onSubmit: values => {
            setLoading(true)
            urlToFile(values.url).then((blob: any) => {
                setLoading(false)
                const file = new File([blob],`img${Math.random().toString(36).substring(7)}`);
                onGetFile(file);
                onCancel();
                }).catch((err: any) => err)
        },
    });

    const onCancel = () => {
        validator.resetForm();
        onClose();
    }

    return (
        <Modal show={isOpen} onHide={onClose} size="lg" centered>
            <Modal.Header closeButton className="add-payment-modal-header"/>
            <Modal.Body className="p-0">
                <div className="position-relative">
                    <div className="px-5 pb-5">
                        <h1 className="mb-2 mt-0">{t("Add File from URL")}</h1>
                        <Form className="mt-3" noValidate onSubmit={validator.handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="url">{t('File URL')}</Form.Label>
                                <Form.Control type="text" className="form-control" id="url" name="url" placeholder="Paste file from URL"
                                              onBlur={validator.handleBlur}
                                              value={validator.values.url}
                                              onChange={validator.handleChange}
                                              isInvalid={validator.touched.url && validator.errors && !!validator.errors.url} />

                                {validator.touched.url && validator.errors.url ? (
                                    <Form.Control.Feedback type="invalid">{validator.errors.url}</Form.Control.Feedback>
                                ) : null}
                            </Form.Group>

                            <div>
                                <Button type="button" onClick={() => onCancel()} variant="outline-primary" className="mr-3" >{t('Cancel')}</Button>
                                <Button type="submit" variant="primary" disabled={loading}>{t("Add Media")}</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

interface MediaInputProps {
    label?: string;
    onSetFiles: (any) => void;
}

const MediaInput = (props: MediaInputProps) => {
    const { t } = useTranslation();
    const { label, onSetFiles } = props
    const [files, setFiles] = useState<any>([]);
    const [selectedFiles, setSelectedFiles] = useState<any>([]);
    const [addFileFromUrlModal, setAddFileFromUrlModal] = useState<any>(false);

    useEffect(() => {
        onSetFiles(files)
    },[size(files)])

    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            )
            setFiles([...files, ...newFiles]);
        }
    });

    const onSelectFile = (e: any, file: any) => {
        if (e.target.checked) {
            setSelectedFiles([...selectedFiles, file]);
        } else {
            setSelectedFiles(selectedFiles.filter(sf => sf.name !== file.name))
        }
    }
    
    const handleDeleteFile = () => {
        const selectedFileNames: Set<any> = new Set(selectedFiles.map(({ name }) => name));
        const newFiles: Array<any> = files.filter(({ name }) => !selectedFileNames.has(name));
        setFiles(newFiles);
        setSelectedFiles([]);
    }

    return (
        <>
            <AddFileFromUrl
                isOpen={addFileFromUrlModal}
                onClose={() => setAddFileFromUrlModal(false)}
                onGetFile={(file) => setFiles([...files, file])}
            />
            <div className="d-flex justify-content-between align-items-center mt-3">
                <h4>{label}</h4>
                <div className="d-flex justify-content-between align-items-center">
                    {size(selectedFiles) > 0 &&
                        <h6 
                          className="text-danger mr-3 d-flex justify-content-between align-items-center"
                          onClick={handleDeleteFile}
                        >
                            <Icon name="delete" className="mx-1 svg-outline-danger" />
                            {`${t('Delete file')} (${size(selectedFiles)})`}
                        </h6>
                    }
                    <h6 className="text-blue" onClick={() => setAddFileFromUrlModal(true)}>
                        + {t('Add from URL')}
                    </h6>
                </div>
            </div>
            <div className={"react-dropzone row"}>
                {map(files, (file: any, index: number) => (
                    <div className={"files"} key={index}>
                        <Form.Check
                            type='checkbox'
                            id={`${file.name}${index}`}
                            className={"pl-0"}
                            label={<img src={file.preview} alt={file.name}/>}
                            onChange={(e: any) => onSelectFile(e, file)}
                        />
                    </div>
                ))}
                <div className="dropzone" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon name={"upload"}/>
                    <p>Drag files here or <span className={"link"}>click to browse</span></p>
                </div>
            </div>
        </>
    );
};

MediaInput.defaultProps = {
    label: "Media Library"
}

export default MediaInput;