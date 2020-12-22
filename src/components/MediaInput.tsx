import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { map, size, isEmpty } from 'lodash';
import { Button, Form, Modal } from "react-bootstrap";
import Icon from "./Icon";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import classNames from "classnames";

const getImageFormUrl = (url, callback) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload =  (a: any) => {
        const canvas = document.createElement("canvas") as HTMLCanvasElement;
        if (canvas) {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx && ctx.drawImage(img, 0, 0);

            const dataURI = canvas.toDataURL("image/jpg");

            // convert base64/URLEncoded data component to raw binary data held in a string
            let byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);

            // separate out the mime component
            const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

            // write the bytes of the string to a typed array
            const ia = new Uint8Array(byteString.length);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            return callback(new Blob([ia], { type: mimeString }), null);
        }
    }
    img.src = url;
    img.onerror = (error) => {
        return callback(null, error);
    }
}

interface AddFileFromUrlProps {
    isOpen: boolean;
    onClose: any;
    onGetFile: (any) => void;
}

const AddFileFromUrl = ({ isOpen, onClose, onGetFile }: AddFileFromUrlProps) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState<any>(false)
    const [error, setError] = useState<any>(false)

    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            url: '',
        },
        onSubmit: values => {
            setLoading(true)
            getImageFormUrl(values.url, (blob: any, error) => {
                if (blob && blob.type.includes("image")) {
                    setLoading(false);
                    validator.errors.url = "";
                    const file = new File([blob],`image-${Math.random().toString(36).substring(7)}.${blob.type.split('/')[1]}`, { type: blob.type } );
                    Object.assign(file, { preview: URL.createObjectURL(file) });
                    onGetFile(file);
                    onCancel();
                }

                if (error) {
                    setError("Image invalid");
                    setTimeout(() => {
                        setError( "");
                    }, 2000);
                }
            });
        },
    });

    const onCancel = () => {
        validator.resetForm();
        setLoading(false);
        onClose();
    }

    const onHandleSubmit = (e: any) => {
        e.preventDefault();
        if (isEmpty(validator.values.url)) {
            setError("URL required");
            setTimeout(() => {
                setError( "");
            }, 2000);
        } else {
            validator.handleSubmit(e);
        }
    }

    return (
        <Modal show={isOpen} onHide={onCancel} size="lg" centered>
            <Modal.Header closeButton className="add-payment-modal-header"/>
            <Modal.Body className="p-0">
                <div className="position-relative">
                    <div className="px-5 pb-5">
                        <h1 className="mb-2 mt-0">{t("Add File from URL")}</h1>
                        <Form id="image-form" className="mt-3" noValidate>

                            <Form.Group className="mb-4">
                                <Form.Label htmlFor="url">{t('File URL')}</Form.Label>
                                <Form.Control type="text" className={classNames("form-control", error && "border-danger")}
                                              id="url"
                                              name="url"
                                              placeholder="Paste file from URL"
                                              onBlur={validator.handleBlur}
                                              value={validator.values.url}
                                              onChange={validator.handleChange}
                                              isInvalid={validator.touched.url && validator.errors && !!validator.errors.url} />
                                {error ? (
                                    <span className="text-danger font-10">
                                        {error}
                                    </span>
                                ) : null}
                            </Form.Group>

                            <Form.Group>
                                <Button type="button" onClick={() => onCancel()} variant="outline-primary" className="mr-3" >{t('Cancel')}</Button>
                                <Button type="button" variant="primary" disabled={loading} onClick={onHandleSubmit}>{t("Add Media")}</Button>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}

interface MediaInputProps {
    label?: string;
    defaultImages?: [any];
    inputRef?: any;
    onSetFiles: (any) => void;
}

const MediaInput = (props: MediaInputProps) => {
    const { t } = useTranslation();
    const { label, defaultImages, onSetFiles, inputRef } = props
    const [files, setFiles] = useState<any>([]);
    const [images, setImages] = useState<any>([]);
    const [selectedFiles, setSelectedFiles] = useState<any>([]);
    const [selectedImages, setSelectedImages] = useState<any>([]);
    const [deletedImagesIds, setDeletedImagesIds] = useState<any>([]);
    const [addFileFromUrlModal, setAddFileFromUrlModal] = useState<any>(false);

    useEffect(() => {
        if (defaultImages && defaultImages.length > 0) {
            setImages(defaultImages);
        }
    },[defaultImages]);

    useEffect(() => {
        onSetFiles(files);
    },[size(files)]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (inputRef) {
            inputRef.current = { deletedImagesIds };
        }
    },[deletedImagesIds]); // eslint-disable-line react-hooks/exhaustive-deps

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

    const onSelectImage = (e: any, image: any) => {
        if (e.target.checked) {
            setSelectedImages([...selectedImages, image]);
        } else {
            setSelectedImages(selectedImages.filter(img => img.id !== image.id))
        }
    }

    const onSelectFile = (e: any, file: any) => {
        if (e.target.checked) {
            setSelectedFiles([...selectedFiles, file]);
        } else {
            setSelectedFiles(selectedFiles.filter(sf => sf.name !== file.name))
        }
    }

    const handleDeleteFile = () => {
        const selectedFileNames: Set<any> = new Set(selectedFiles.map(({ name }) => name));
        const selectedImageIds: Set<any> = new Set(selectedImages.map(({ id }) => id));
        setDeletedImagesIds(selectedImages.map(({ id }) => id));
        const newFiles: Array<any> = files.filter(({ name }) => !selectedFileNames.has(name));
        const newImages: Array<any> = images.filter(({ id }) => !selectedImageIds.has(id));
        setFiles(newFiles);
        setImages(newImages);
        setSelectedFiles([]);
        setSelectedImages([]);
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
                    {(size(selectedFiles) > 0 || size(selectedImages) > 0) &&
                        <h6 
                          className="link text-danger mr-3 d-flex justify-content-between align-items-center"
                          onClick={handleDeleteFile}
                        >
                            <Icon name="delete" className="mx-1 svg-outline-danger" />
                            {`${t('Delete file')} (${size(selectedFiles) + size(selectedImages)})`}
                        </h6>
                    }
                    <h6 className="text-blue link" onClick={() => setAddFileFromUrlModal(true)}>
                        + {t('Add from URL')}
                    </h6>
                </div>
            </div>
            <div className={"react-dropzone row"}>
                {map(images, (image: any, index: number) => (
                    <div className={"files"} key={index}>
                        <Form.Check
                            type='checkbox'
                            id={`${image.id}${index}`}
                            className={"pl-0"}
                            label={<img src={image.image} alt={image.id}/>}
                            onChange={(e: any) => onSelectImage(e, image)}
                        />
                    </div>
                ))}
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
                    <p>{t('Drag files here or')} <span className={"link"}>{t('click to browse')}</span></p>
                </div>
            </div>
        </>
    );
};

MediaInput.defaultProps = {
    label: "Media Library"
}

export default MediaInput;