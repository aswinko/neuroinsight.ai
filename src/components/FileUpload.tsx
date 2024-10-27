"use client";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { useState } from "react";
import { uploadToS3 } from "../lib/s3";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";

const FileUpload: React.FC = () => {
  const session = useSession();
  // console.log(session);
  const [uploading, setuploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await fetch("/api/create-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file_key, file_name }),
      });
      // return response.data;
      return response.json();
    },
  });

  // Handle file drop
  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size should be less than 10MB");
        return;
      }

      try {
        setuploading(true);
        const data = await uploadToS3(file);
        if (!data?.file_key || !data?.file_name) {
          toast.error("Something wrong with the file upload!");
          return;
        }
        mutate(data, {
          onSuccess({ chat_id }) {


            console.log(chat_id);
            toast.success("Chat created successfully!");
          },
          onError(error) {
            console.error(error);
            toast.error("Error creating chat!");
          },
        });
        console.log("data : ", data);
      } catch (error) {
        console.error("Error uploading file to S3:", error);
      } finally {
        setuploading(false);
      }
    }
  };

  const dropzoneOptions: DropzoneOptions = {
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop,
    multiple: false, // Accept only one file at a time
  };

  const { getRootProps, getInputProps } = useDropzone(dropzoneOptions);

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
        {uploading || isPending ? (
          <>
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-slate-400">
              Spilling Tea to GPT...
            </p>
          </>
        ) : (
          file && (
            <div className="mt-4">
              <div className="flex items-center gap-4">
                <h4>Selected File:</h4>
                <p className="my-2">{file.name}</p>
              </div>
              {/* <button
                type="button"
                className="bg-primary text-white py-2 px-4 rounded"
              >
                Upload File
              </button> */}
            </div>
          )
        )}
      </form>

      <div className=""></div>
    </div>
  );
};

export default FileUpload;
