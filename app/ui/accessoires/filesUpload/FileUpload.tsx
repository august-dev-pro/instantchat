/* import { uploadFile } from "@/firebaseStorage";
import {
  faClose,
  faFolderPlus,
  faPaperPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useRef, useState } from "react";
import "./css/style.css";

interface FileUploadProps {
  onFileUpload: (url: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
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

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="parent">
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
                  <Image
                    src={previewURL}
                    alt="Preview"
                    width={50}
                    height={50}
                  />
                )}
              </div>
              <FontAwesomeIcon icon={faClose} onClick={handleCancel} />
            </div>
            <div className="file-show">
              {file && file.type.startsWith("image/") && (
                <Image
                  src={previewURL}
                  alt="Preview"
                  width={500}
                  height={500}
                />
              )}
              {file && file.type.startsWith("video/") && (
                <video width="100%" controls src={previewURL} />
              )}
            </div>
          </div>
        )}
        {previewURL && (
          <textarea
            ref={textAreaRef}
            value={message}
            onChange={(e) => handleMessageChange(e)}
            className="input"
            name="message"
            id="message"
            placeholder="message . . . ( facultatif )"
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
    </div>
  );
};

export default FileUpload; */
import { uploadFile } from "@/firebaseStorage";
import {
  faClose,
  faFolderPlus,
  faPaperPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import "./css/style.css";
import { sendMessage } from "@/firebaseDatabase";

interface FileUploadProps {
  onFileUpload: (url: string) => void;
  setIsFileSelected: (isSelected: boolean) => void;
  discussId: string;
  userId: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  setIsFileSelected,
  discussId,
  userId,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        if (
          window.confirm("Voulez-vous vraiment annuler l'envoi du fichier ?")
        ) {
          handleCancel();
        }
      }
    };

    if (previewURL) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [previewURL]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewURL(URL.createObjectURL(selectedFile));
      setIsFileSelected(true);
    }
  };
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const fileURL = await uploadFile(file);
      const lastModifiedDate = new Date(file.lastModified).toLocaleString();
      const fileWithUrl = {
        name: file.name,
        type: file.type,
        url: fileURL,
        lastModified: lastModifiedDate,
        size: file.size,
      };
      await sendMessage(userId, message, discussId, fileWithUrl);
      onFileUpload(fileURL);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setFile(null);
      setPreviewURL(null);
      setUploading(false);
      setIsFileSelected(false);
    }
  };

  console.log("file: ", file);

  const handleCancel = () => {
    setFile(null);
    setPreviewURL(null);
    setIsFileSelected(false);
  };

  return (
    <div className="parent">
      <div
        className="file_upload"
        ref={modalRef}
        /*   style={
          previewURL ? { borderBottom: "1px solid #fff", width: "100%" } : {}
        } */
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
                  <div className="image">
                    <Image
                      src={previewURL}
                      alt="Preview"
                      width={50}
                      height={50}
                    />
                  </div>
                )}
              </div>
              <FontAwesomeIcon icon={faClose} onClick={handleCancel} />
            </div>
            <div className="file-show">
              {file && file.type.startsWith("image/") && (
                <Image
                  src={previewURL}
                  alt="Preview"
                  width={500}
                  height={500}
                />
              )}
              {file && file.type.startsWith("video/") && (
                <video width="100%" controls src={previewURL} />
              )}
            </div>
          </div>
        )}
        {previewURL && (
          <textarea
            ref={textAreaRef}
            value={message}
            onChange={(e) => handleMessageChange(e)}
            className="input"
            name="message"
            id="message"
            placeholder="message . . . ( facultatif )"
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
    </div>
  );
};

export default FileUpload;
