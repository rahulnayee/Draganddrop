import { Button } from "@mui/material";
import React from "react";

const Controller = (props) => {
  const {
    fileRef,
    manageFiles,
    fileType = "file",
    controllerType = "video",
    acceptFiles = ".mov,.mp4",
    fileClass = "VideoInput_input",
    buttonLabel = "Upload...",
    handleControllerChange,
  } = props;
  return (
    <div>
      {controllerType === "video" && (
        <div className="video-container">
          {manageFiles.video === null && (
            <Button
              variant="contained"
              component="label"
              onClick={() => {
                fileRef.current.click();
              }}
            >
              {buttonLabel}
              <input
                ref={fileRef}
                type={fileType}
                accept={acceptFiles}
                className={fileClass}
                onChange={(event) => handleControllerChange(event, "video")}
                hidden
              />
            </Button>
          )}
          {manageFiles.video !== null && (
            <video
              className="VideoInput_video"
              width="100%"
              height="50%"
              controls
              src={manageFiles.video}
            />
          )}
        </div>
      )}
      {controllerType === "pdf" && (
        <div className="pdf-container">pdf contain</div>
      )}
    </div>
  );
};

export default Controller;
