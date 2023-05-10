import React, { useEffect, useState } from "react";
import Main from "./Main";
import {
  angleType,
  monitorType,
  resolutionTypeNew,
} from "@/Assets/comman/common";
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
    screenMonitor1: 0,
    screenMonitor2: 0,
    angle: "",
    angleType: {},
    createRegions: false,
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
    ticker: {
      mainContain: "",
      width: "",
      height: "",
      direction: "",
      behavior: "",
      scrollDelay: "",
      scrollAmount: "",
      loop: "",
      backgroundColor: "",
      hspace: "",
      vspace: "",
      fontSize: "",
      id: "",
    },
    tickerPropertiesPopup: false,
    tickerPopupId: null,
  });

  const defaultHeight = 350;
  const defaultWidth = 350;

  const handleOnChange = (key, value) => {
    setManageDetails({
      ...manageDetails,
      [key]: value,
    });
  };
  const handleTickerOnChange = (key, value) => {
    setManageDetails({
      ...manageDetails,
      ticker: {
        ...manageDetails.ticker,
        [key]: value,
      },
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
    let resolutionInfo = [...manageDetails.resolutionType];

    resolutionInfo.push({
      key: `${manageDetails.widthResolution}_${manageDetails.heightResolution}`,
      value: `${manageDetails.nameResolution} (${manageDetails.widthResolution} * ${manageDetails.heightResolution})`,
      width: manageDetails.widthResolution,
      height: manageDetails.heightResolution,
    });

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
  const handleOnChangeFile = (fileObj, index, action, uploadType) => {
    let mainScreenDetails = [...manageDetails.mainScreenDetails];
    if (action === "upload") {
      mainScreenDetails[index].fileObj = URL.createObjectURL(fileObj);
      mainScreenDetails[index].fileDetails = fileObj; //[0];
      mainScreenDetails[index].content = uploadType;
    } else {
      mainScreenDetails[index].fileObj = null;
      mainScreenDetails[index].fileDetails = null;
      mainScreenDetails[index].content = uploadType;
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
      // let mainScreenDetails = []; // [...manageDetails.mainScreenDetails];
      // let count = manageDetails.monitorType.filter(
      //   (item) => item.title === manageDetails.monitor.title
      // );
      // if (count.length > 0) {
      //   for (let index = 0; index < count[0].totalScreen; index++) {
      //     mainScreenDetails.push({
      //       id: index,
      //       fileObj: null,
      //       drop: false,
      //     });
      //   }
      // } else {
      //   mainScreenDetails.push({
      //     id: 1,
      //     fileObj: null,
      //     drop: false,
      //   });
      // }

      setManageDetails({
        ...manageDetails,
        // mainScreenDetails: mainScreenDetails,
        createRegions: true,
      });
    } else {
      alert("please select Region info....");
    }
  };
  const handleCreateXML = () => {
    let projectId = uuidv4();
    let resolutionId = uuidv4();
    let resolutionWidth = manageDetails.resolution.width;
    let resolutionHeight = manageDetails.resolution.height;
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
          Name: manageDetails.resolution.value,
          Width: resolutionWidth,
          Height: resolutionHeight,
          IsInitial: "True",
        },
        Monitor: {
          Id: monitorId,
          Name: manageDetails.monitor.title,
          Horizontal: manageDetails.monitor.title.split(" ")[0],
          Vertical: manageDetails.monitor.title.split(" ")[2],
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
                      Controls: [],
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
        Width: manageDetails.mainScreenDetails[index].width,
        Height: manageDetails.mainScreenDetails[index].height,
        X: manageDetails.mainScreenDetails[index].distance[0],
        Y: manageDetails.mainScreenDetails[index].distance[1],
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
      objDetails?.push({
        _name: "Control",
        _attrs: {
          Type: "Image",
        },
        _content: [details],
      });
      // objDetails?.push({ Control: details });
    }

    mainJSON?.Project?.Regions?.Region?.Slides?.Slide[0]?.Layers?.Layer?.Controls?.push(
      objDetails
    );

    // mainJSON?.Project?.Regions?.Region?.Slides?.Slide[0]?.Layers?.Layer?.Controls?._content?.push(
    //   objDetails
    // );
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
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      let allItem = [...manageDetails.mainScreenDetails];
      let type = "";
      switch (draggableId) {
        case "1":
          type = "Image";
          break;
        case "2":
          type = "Video";
          break;
        case "3":
          type = "PDF";
          break;
        case "4":
          type = "Youtube";
          break;
        case "5":
          type = "Gif";
          break;
        case "6":
          type = "Ticker";
          break;
        case "7":
          type = "";
          break;
        default:
          type = "Image";
          break;
      }

      let id = 1;
      if (allItem.length >= 1) id = allItem.length + 1;

      let dragItem = {
        id: id,
        content: type,
        fileDetails: null,
        fileObj: null,
        drop: true,
        distance: [0, 0],
        height: defaultHeight,
        width: defaultWidth,
      };

      if (type === "Ticker") {
        dragItem.tickerDetails = false;
        dragItem.mainContain = "Change Text";
        dragItem.width = "100%";
        dragItem.height = "100%";
        dragItem.direction = "left";
        dragItem.behavior = "slide";
        dragItem.scrollDelay = "1000";
        dragItem.scrollAmount = "1000";
        dragItem.loop = "infinite";
        dragItem.backgroundColor = "#000";
        dragItem.hspace = "";
        dragItem.vspace = "";
        dragItem.fontSize = "10";
      }
      allItem.push({ ...dragItem });

      setManageDetails({
        ...manageDetails,
        mainScreenDetails: allItem,
      });
    }
  };
  const handleSaveXAndYAxis = (
    index,
    data = { distance: [], width: 0, height: 0 }
  ) => {
    let dragScreen = [...manageDetails.mainScreenDetails];
    dragScreen[index] = { ...dragScreen[index], ...data };
    setManageDetails({
      ...manageDetails,
      mainScreenDetails: dragScreen,
    });
  };
  const handleAddTickerPropertiesPopup = () => {
    let items = [...manageDetails.mainScreenDetails];
    let id = manageDetails.tickerPopupId;
    items[id].tickerDetails = true;
    items[id].mainContain = manageDetails.ticker.mainContain;
    items[id].width = manageDetails.ticker.width;
    items[id].height = manageDetails.ticker.height;
    items[id].direction = manageDetails.ticker.direction;
    items[id].behavior = manageDetails.ticker.behavior;
    items[id].scrollDelay = manageDetails.ticker.scrollDelay;
    items[id].scrollAmount = manageDetails.ticker.scrollAmount;
    items[id].loop = manageDetails.ticker.loop;
    items[id].backgroundColor = manageDetails.ticker.backgroundColor;
    items[id].hspace = manageDetails.ticker.hspace;
    items[id].vspace = manageDetails.ticker.vspace;
    items[id].fontSize = manageDetails.ticker.fontSize;

    setManageDetails({
      ...manageDetails,
      tickerPropertiesPopup: false,
      mainScreenDetails: items,
    });
  };
  const handleTickerPopupManage = (index, key, value) => {
    setManageDetails({
      ...manageDetails,
      [key]: value,
      tickerPopupId: index,
    });
  };
  const handleRemoveComponent = (componentId) => {
    let details = [...manageDetails.mainScreenDetails];
    let modifyDetail = details.filter((item) => item.id != componentId);
    setManageDetails({
      ...manageDetails,
      mainScreenDetails: modifyDetail,
    });
  };
  useEffect(() => {
    setManageDetails({
      ...manageDetails,
      resolutionType: resolutionTypeNew,
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
      handleManagePopup={handleManagePopup}
      onDragEnd={onDragEnd}
      handleSaveXAndYAxis={handleSaveXAndYAxis}
      handleTickerOnChange={handleTickerOnChange}
      handleAddTickerPropertiesPopup={handleAddTickerPropertiesPopup}
      handleTickerPopupManage={handleTickerPopupManage}
      handleRemoveComponent={handleRemoveComponent}
    />
  );
};

export default MainContainer;
