import React, { useRef, useState } from "react";
import Controller from "./Controller";

const ControllerContainer = ({ props }) => {
    
  const [manageFiles, setManageFiles] = useState({
    image: null,
    video: null,
  });

  const videoRef = useRef();

  const handleFileChange = (event, controllerName) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setManageFiles({
      ...manageFiles,
      [controllerName]: url,
    });
  };

  return (
    <Controller
      {...props}
      fileRef={videoRef}
      manageFiles={manageFiles}
      handleControllerChange={handleFileChange}
    />
  );
};

export default ControllerContainer;
