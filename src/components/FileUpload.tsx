'use client';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { useState } from 'react';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    multiple: false,
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/read-pdf', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        console.log('File uploaded successfully!');
      } else {
        console.error('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <div {...getRootProps({ className: 'dropzone bg-red-700 p-12' })}>
        <input {...getInputProps()} />
        <p>Drag &apos; drop a file here, or click to select a file</p>
      </div>
      {file && (
        <div>
          <h4>Selected File:</h4>
          <p>{file.name}</p>
          <button onClick={uploadFile}>Upload File</button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
