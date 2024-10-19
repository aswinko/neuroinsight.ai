"use client";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { useState } from "react";

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  // Handle file drop
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    multiple: false, // Accept only one file at a time
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

  // Upload file to server
  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("uploaded_file", file);

    try {
      const response = await fetch("http://localhost:8000/api/save-file", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully!");

        const data = await response.json();
        console.log("Parsed Text: ", data.text);
      } else {
        console.error("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form encType="multipart/form-data">
        <div
          {...getRootProps({
            className:
              "dropzone bg-gray-900 p-6 text-sm border-dashed border-2 border-primary text-center",
          })}
        >
          <input {...getInputProps()} />
          <p>Drag & drop a file here, or click to select a file</p>
        </div>

        {file && (
          <div className="mt-4">
            <h4>Selected File:</h4>
            <p className="my-2">{file.name}</p>
            <button
              type="button"
              className="bg-primary text-white py-2 px-4 rounded"
              onClick={uploadFile}
            >
              Upload File
            </button>
          </div>
        )}
      </form>

      <div className="">
      </div>
    </div>
  );
};

export default FileUpload;
