import { Button } from "@mui/material";
import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { FileUploader } from "react-drag-drop-files";

const Controller = (props) => {
  const {
    index,
    fileData,
    controllerType,
    acceptFiles,
    fileClass,
    handleControllerChange,
    handleControllerClear,
  } = props;

  const handleUploadedContent = (TypesOfContent, handleClear) => {
    return (
      <div
        className={`file-uploaded ${TypesOfContent === "PDF" && "file-pdf"}`}
      >
        {TypesOfContent}
        <HighlightOffIcon
          className={`iconInfo right-align`}
          onClick={handleClear}
        />
      </div>
    );
  };
  const handleFileUploadContent = (type, onChange, classDetails) => {
    return (
      <div className="file-info">
        <FileUploader
          handleChange={onChange}
          classes={classDetails}
          types={type}
          name="file"
          style={{
            padding: "0px",
            margin: "0px",
            border: "1px solid #000",
            width: "100%",
          }}
        />
      </div>
    );
  };

  return (
    <div style={{ width: "100%", height: "100%" }} key={index}>
      {controllerType.toLowerCase() === "image" && (
        <div className="file-image">
          {fileData
            ? handleUploadedContent(
                <img src={fileData} className="img-view" />,
                handleControllerClear
              )
            : handleFileUploadContent(
                acceptFiles,
                handleControllerChange,
                fileClass
              )}
        </div>
      )}
      {controllerType.toLowerCase() === "video" && (
        <div className="file-image">
          {fileData
            ? handleUploadedContent(
                <video
                  src={fileData}
                  className="video-content"
                  width="auto"
                  height="auto"
                  controls
                />,
                handleControllerClear
              )
            : handleFileUploadContent(
                acceptFiles,
                handleControllerChange,
                fileClass
              )}
        </div>
      )}
      {controllerType.toLowerCase() === "pdf" && (
        <div className="file-image">
          {fileData
            ? handleUploadedContent("PDF", handleControllerClear)
            : handleFileUploadContent(
                acceptFiles,
                handleControllerChange,
                fileClass
              )}
        </div>
      )}
      
    </div>
  );
};

export default Controller;
