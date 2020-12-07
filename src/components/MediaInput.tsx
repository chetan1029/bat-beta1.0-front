import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { map } from 'lodash';

interface MediaInputProps {
}

const MediaInput = (props: MediaInputProps) => {
    const [files, setFiles] = useState<any>([]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                )
            );
        }
    });

    return (
        <div className={"react-dropzone col-12"}>
            {map(files, (file, index) => (
                <div key={file.name}>
                    <div>
                        <img className={"image"} src={file.preview} alt="" />
                    </div>
                </div>
            ))}
            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        </div>
    );
};

export default MediaInput;