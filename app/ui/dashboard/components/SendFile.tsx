import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SendFile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };
  return (
    <div className="send-file">
      <label htmlFor="file">
        {/* Ajoutez ici votre icône, par exemple une icône de la bibliothèque Font Awesome */}
        <FontAwesomeIcon icon={faFolderPlus} />
      </label>
      <input type="file" id="file" style={{ display: "none" }} />
    </div>
  );
};

export default SendFile;
