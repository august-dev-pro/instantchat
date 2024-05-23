import { uploadFile } from "@/firebaseStorage";
import {
  faClose,
  faFolderPlus,
  faPaperPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import "./css/style.css";

interface FileUploadProps {
  onFileUpload: (url: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const fileURL = await uploadFile(file);
      onFileUpload(fileURL);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setFile(null);
      setPreviewURL(null);
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setFile(null);
    setPreviewURL(null);
  };

  return (
    <div
      className="file_upload"
      style={previewURL ? { borderBottom: "1px solid #fff" } : {}}
    >
      <input
        type="file"
        id="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {previewURL && (
        <div className="file-preview">
          <div className="files-annuler">
            <div className="files">
              {file && file.type.startsWith("image/") && (
                <Image src={previewURL} alt="Preview" width={50} height={50} />
              )}
            </div>
            <FontAwesomeIcon icon={faClose} onClick={handleCancel} />
          </div>
          <div className="file-show">
            {file && file.type.startsWith("image/") && (
              <Image src={previewURL} alt="Preview" width={500} height={500} />
            )}
            {file && file.type.startsWith("video/") && (
              <video width="100%" controls src={previewURL} />
            )}
          </div>
        </div>
      )}
      {previewURL && (
        <textarea
          name="message"
          id="message"
          placeholder="message..."
        ></textarea>
      )}
      <div className="actions">
        <label htmlFor="file" className="add-icon">
          {previewURL ? (
            <FontAwesomeIcon icon={faPlus} className="plus" />
          ) : (
            <FontAwesomeIcon icon={faFolderPlus} />
          )}
        </label>
        {previewURL && (
          <div className="send" onClick={handleUpload}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
