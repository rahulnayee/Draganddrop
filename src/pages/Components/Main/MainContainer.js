import React, { useEffect, useState } from "react";
import Main from "./Main";
import { angleType, monitorType, resolutionType } from "@/Assets/comman/common";
import { v4 as uuidv4 } from "uuid";
import { toXML } from "jstoxml";

const MainContainer = () => {
  const [manageDetails, setManageDetails] = useState({
    resolution: "",
    resolutionType: {},
    resolutionTypePopup: false,
    nameResolution: "",
    widthResolution: 0,
    heightResolution: 0,
    monitor: {
      id: 0,
      title: "",
      totalScreen: 0,
    },
    monitorType: [],
    monitorTypePopup: false,
    monitorSize1: 0,
    monitorSize2: 0,
    screenMonitor1: 0,
    screenMonitor2: 0,
    angle: "",
    angleType: {},
    mainScreenDetails: [],
    topPanel: {
      name: "topPanel",
      items: [
        { id: 1, content: "Image", fileObj: null, fileDetails: null },
        { id: 2, content: "Video", fileObj: null, fileDetails: null },
        { id: 3, content: "PDF", fileObj: null, fileDetails: null },
      ],
    },
    centareScreen: {
      name: "centareScreen",
      items: [],
    },
    rowScreen: 0,
    columnScreen: 0,
  });

  const [columns, setColumns] = useState({
    leftPanel: {
      name: "leftPanel",
      items: [
        { id: "1", content: "Image" },
        { id: "2", content: "Video" },
        { id: "3", content: "PDF" },
      ],
    },
    centareScreen: {
      name: "centareScreen",
      items: [],
    },
  });

  const handleOnChange = (key, value) => {
    setManageDetails({
      ...manageDetails,
      [key]: value,
    });
  };

  const handleManagePopup = (popupKey, popupValue) => {
    if (popupKey === "resolutionTypePopup") {
      setManageDetails({
        ...manageDetails,
        [popupKey]: popupValue,
        nameResolution: "",
        widthResolution: "",
        heightResolution: "",
      });
    } else {
      setManageDetails({
        ...manageDetails,
        [popupKey]: popupValue,
        screenMonitor1: "",
        screenMonitor2: "",
      });
    }
  };

  const handleCreateResolution = () => {
    let resolutionInfo = { ...manageDetails.resolutionType };
    resolutionInfo[
      `${manageDetails.widthResolution}_${manageDetails.heightResolution}`
    ] = `${manageDetails.nameResolution} (${manageDetails.widthResolution} * ${manageDetails.heightResolution})`;

    setManageDetails({
      ...manageDetails,
      resolutionType: resolutionInfo,
      resolutionTypePopup: false,
      nameResolution: "",
      widthResolution: "",
      heightResolution: "",
    });
  };

  const handleCreateMonitor = () => {
    let monitorInfo = [...manageDetails.monitorType];
    monitorInfo.push({
      id: monitorInfo.length + 1,
      title: `${manageDetails.screenMonitor1} * ${manageDetails.screenMonitor2}`,
      totalScreen: manageDetails.screenMonitor1 * manageDetails.screenMonitor2,
    });

    setManageDetails({
      ...manageDetails,
      monitorType: monitorInfo,
      monitorTypePopup: false,
      screenMonitor1: "",
      screenMonitor2: "",
    });
  };

  const handleOnChangeFile = (fileObj, index, action) => {
    let mainScreenDetails = [...manageDetails.mainScreenDetails];
    if (action === "upload") {
      mainScreenDetails[index].fileObj = URL.createObjectURL(fileObj[0]);
      mainScreenDetails[index].fileDetails = fileObj[0];
    } else {
      mainScreenDetails[index].fileObj = null;
      mainScreenDetails[index].fileDetails = null;
    }
    setManageDetails({
      ...manageDetails,
      fileDetails: fileObj[0],
      mainScreenDetails: mainScreenDetails,
    });
  };

  const handleCreateRegions = () => {
    if (
      manageDetails.monitor.title &&
      manageDetails.resolution &&
      manageDetails.angle
    ) {
      let mainScreenDetails = []; // [...manageDetails.mainScreenDetails];
      let count = manageDetails.monitorType.filter(
        (item) => item.title === manageDetails.monitor.title
      );
      let noOfRow = 0;
      let noOfColumn = 0;
      if (count.length > 0) {
        let rowAndColInfo = count[0].title.split(" ");
        noOfRow = parseInt(rowAndColInfo[0]);
        noOfColumn = parseInt(rowAndColInfo[2]);
        for (let index = 0; index < count[0].totalScreen; index++) {
          mainScreenDetails.push({
            id: index,
            fileObj: null,
            drop: false,
            // totalDay: 0,
            // hours: 0,
            // minutes: 0,
            // second: 0,
          });
        }
      } else {
        mainScreenDetails.push({
          id: 1,
          fileObj: null,
          drop: false,
          // totalDay: 0,
          // hours: 0,
          // minutes: 0,
          // second: 0,
        });
      }

      setManageDetails({
        ...manageDetails,
        mainScreenDetails: mainScreenDetails,
        rowScreen: noOfRow,
        columnScreen: noOfColumn,
      });
    } else {
      alert("please select Region info....");
    }
  };

  const handleOnChangeMainScreen = (key, val, index) => {
    let mainScreenDetails = [...manageDetails.mainScreenDetails];
    if (key === "hours" && parseInt(val) >= 25) {
      mainScreenDetails[index].hours = 24;
    } else if (key === "minutes" && parseInt(val) >= 61) {
      mainScreenDetails[index].minutes = 60;
    } else if (key === "second" && parseInt(val) >= 61) {
      mainScreenDetails[index].second = 60;
    } else {
      mainScreenDetails[index][key] = val;
    }

    setManageDetails({
      ...manageDetails,
      mainScreenDetails: mainScreenDetails,
    });
  };

  const handleCreateXML = () => {
    let projectId = uuidv4();
    let resolutionId = uuidv4();
    let resolutionWidth = manageDetails.resolution.split("_")[0];
    let resolutionHeight = manageDetails.resolution.split("_")[1];
    let monitorId = uuidv4();
    let regionId = uuidv4();
    let slideId = uuidv4();
    let layerId = uuidv4();

    let mainJSON = {
      Project: {
        Id: projectId,
        Information: {
          Name: "Project_" + projectId.substring(0, 6),
          Creator: "",
          MainContact: "",
          Owner: "",
          Phone: "___ - __________",
          Interval: 60,
        },
        Resolution: {
          Id: resolutionId,
          Name: manageDetails.resolutionType[manageDetails.resolution],
          Width: resolutionWidth,
          Height: resolutionHeight,
          IsInitial: "True",
        },
        Monitor: {
          Id: monitorId,
          Name: manageDetails.monitor.title,
          Horizontal: 1,
          Vertical: 1,
          IsInitial: "True",
        },
        Orientation: manageDetails.angle,
        Regions: {
          Region: {
            Id: regionId,
            Name: "Region_" + resolutionId,
            Width: resolutionWidth,
            Height: resolutionHeight,
            X: 0,
            Y: 0,
            Slides: {
              Slide: [
                {
                  Id: slideId,
                  Name: "Slide_" + slideId.substring(0, 6),
                  Duration: 10,
                  Forever: "False",
                  Layers: {
                    Layer: {
                      Id: layerId,
                      Name: "Layer_" + layerId.substring(0, 6),
                      ZIndex: 1,
                      IsVisible: "True",
                      IsLocked: "False",
                      Controls: {
                        _name: "Control",
                        _attrs: {
                          Type: "Image",
                        },
                        _content: [],
                      },
                    },
                  },
                },
              ],
            },
          },
        },
        Alerts: "",
      },
    };

    //data mapping
    let objDetails = [];
    for (
      let index = 0;
      index < manageDetails.mainScreenDetails.length;
      index++
    ) {
      let imgId = uuidv4();
      let playListId = uuidv4();
      let fileName = manageDetails.mainScreenDetails[index].fileDetails?.name;
      let fileSize = manageDetails.mainScreenDetails[index].fileDetails?.size;

      let details = {
        Id: imgId,
        Name: "Image_" + imgId.substring(0, 6),
        Width: 725.714285714286,
        Height: 762.857142857143,
        X: 0,
        Y: 0,
        Margion: "0,0,640.285714285714,5.14285714285711",
        Opacity: 1,
        Background: "",
        BorderBrush: "",
        BorderThickness: "0,0,0,0",
        CornerRadius: "0,0,0,0",
        HorizontalAlignment: "Left",
        VerticalAlignment: "Top",
        Stretch: "Fill",
        HorizontalFlip: "False",
        VerticalFlip: "False",
        Rotate: 0,
        FontSize: 0,
        FontWeight: "Normal",
        FontStyle: "Normal",
        TextDecorationText: "Normal",
        InvertDirection: "False",
        Duration: 0,
        Type: "Image",
        MediaAccountId: "",
        MediaPageName: "",
        FlowDirection: "False",
        DateTimeFormat: 0,
        CustomDateTimeFormat: "",
        ItemCount: 0,
        ZIndex: 1,
        IsVisible: "True",
        IsLocked: "False",
        Playlists: {
          Playlist: {
            Id: playListId,
            Name: "Set Content",
            StartTime: 0,
            Duration: 0,
            Forever: "False",
            Type: "SetContent",
            Content: fileName,
            ContentSize: fileSize,
          },
        },
      };
      objDetails?.push(details);
    }

    mainJSON?.Project?.Regions?.Region?.Slides?.Slide[0]?.Layers?.Layer?.Controls?._content?.push(
      objDetails
    );
    //JSON to XML output
    let XMLFile = toXML(mainJSON, { header: true, indent: "    " });
    //download XML file
    handleFileDownloader(XMLFile, "application/xml", "output.xml");
  };

  const handleFileDownloader = (data, type, name) => {
    let blob = new Blob([data], { type });
    let url = window.URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleZoomPanChange = (e) => {
    console.log(e);
  };

  const onDragEndNew = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      let allItem = [...manageDetails.mainScreenDetails];
      let type = "";
      if (draggableId === "1") {
        type = "Image";
      } else if (draggableId === "2") {
        type = "Video";
      } else if (draggableId === "3") {
        type = "PDF";
      } else {
      }
      let id = 1;
      if (allItem.length >= 1) id = allItem.length + 1;
      let dragItem = {
        id: id,
        content: type,
        fileDetails: null,
        fileObj: null,
        drop: true,
      };

      allItem.push({ ...dragItem });

      setManageDetails({
        ...manageDetails,
        mainScreenDetails: allItem,
      });
    }
  };

  useEffect(() => {
    setManageDetails({
      ...manageDetails,
      resolutionType: resolutionType,
      monitorType: monitorType,
      angleType: angleType,
    });
  }, []);

  return (
    <Main
      manageDetails={manageDetails}
      handleOnChange={handleOnChange}
      handleCreateResolution={handleCreateResolution}
      handleCreateMonitor={handleCreateMonitor}
      handleOnChangeFile={handleOnChangeFile}
      handleCreateRegions={handleCreateRegions}
      handleCreateXML={handleCreateXML}
      handleOnChangeMainScreen={handleOnChangeMainScreen}
      handleManagePopup={handleManagePopup}
      handleZoomPanChange={handleZoomPanChange}
      columns={columns}
      setColumns={setColumns}
      onDragEndNew={onDragEndNew}
    />
  );
};

export default MainContainer;
