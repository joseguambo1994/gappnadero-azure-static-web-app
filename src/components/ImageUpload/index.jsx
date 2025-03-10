import { useState, useEffect } from "react";

const ImageUpload = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  if (!user) {
    return <p className="text-red-500">You must be logged in to upload images.</p>;
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadSuccess(false);
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    setUploading(true);

    const sasUrl = "https://yourstorageaccount.blob.core.windows.net/yourcontainer?yourSAS"; // Replace with actual SAS URL
    const blobUrl = `${sasUrl}/${selectedFile.name}`;

    try {
      const response = await fetch(blobUrl, {
        method: "PUT",
        body: selectedFile,
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": selectedFile.type,
        },
      });

      if (response.ok) {
        setUploadSuccess(true);
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button
        onClick={uploadImage}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      {uploadSuccess && <p className="text-green-500 mt-2">Upload successful!</p>}
    </div>
  );
};

export default ImageUpload;
