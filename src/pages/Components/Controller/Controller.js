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
    buttonLabel,
    handleControllerChange,
  } = props;
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {controllerType === "video" && (
        <div className="video-container">
          {manageFiles.video === null && (
            <div style={{ width: "100%", height: "100%" }}>
              <Button
                variant="contained"
                onClick={() => {
                  fileRef.current.click();
                }}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  width: "100%",
                  height: "100%",
                }}
              >
                {buttonLabel}
              </Button>
              <input
                ref={fileRef}
                type={fileType}
                accept={acceptFiles}
                className={fileClass}
                onChange={(event) => handleControllerChange(event, "video")}
                hidden
              />
            </div>
          )}
          {manageFiles.video !== null && (
            <video
              className="video-content"
              width="auto"
              height="auto"
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
