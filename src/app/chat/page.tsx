import FileUpload from "@/src/components/FileUpload";
import React from "react";

const page = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-96 ">
        <FileUpload />
      </div>
    </main>
  );
};

export default page;

