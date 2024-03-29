import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef } from "react";
import FooterContainer from "../Footer/FooterContainer";
import HeaderContainer from "../Header/HeaderContainer";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import GifIcon from "@mui/icons-material/Gif";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ModalContainer from "../Common/Modal/ModalPopupContainer";
import { ZoomPan } from "react-zoom-pan/lib.cjs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Moveable from "react-moveable-fork";
import ControllerContainer from "../Controller/ControllerContainer";
import TickerContainer from "../Ticker/TickerContainer";
import CloseIcon from "@mui/icons-material/Close";

const Main = (props) => {
  const {
    manageDetails,
    handleOnChange,
    handleCreateResolution,
    handleCreateMonitor,
    handleOnChangeFile,
    handleCreateRegions,
    handleCreateXML,
    handleManagePopup,
    onDragEnd,
    handleSaveXAndYAxis,
    handleTickerOnChange,
    handleAddTickerPropertiesPopup,
    handleTickerPopupManage,
    handleRemoveComponent,
  } = props;

  const imageTypes = ["JPEG", "PNG", "GIF", "JPG"];
  const videoTypes = ["MP4", "MOV", "MKV"];
  const pdfTypes = ["PDF"];
  const gifType = ["GIF"];
  const zoomingContent = useRef();
  const moveableRef = useRef();

  const handleResolutionPopupContent = () => {
    return (
      <>
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="nameResolution"
            label="Name Resolution Ex: FullHD"
            value={manageDetails.nameResolution}
            onChange={(e) => handleOnChange("nameResolution", e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="widthResolution"
            label="Width Ex: 1920"
            value={manageDetails.widthResolution}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="heightResolution"
            label="Height Resolution Ex: 1020"
            value={manageDetails.heightResolution}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </FormControl>
      </>
    );
  };

  const handleMonitorPopupContent = () => {
    return (
      <>
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="screenMonitor1"
            label="screen Ex: 4"
            value={manageDetails.screenMonitor1}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="screenMonitor2"
            label="screen Ex: 4"
            value={manageDetails.screenMonitor2}
            onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          />
        </FormControl>
      </>
    );
  };

  const handleTickerPropertiesPopupContent = () => {
    return (
      <>
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            name="mainContain"
            label="please enter ticker text"
            value={manageDetails.ticker.mainContain}
            onChange={(e) =>
              handleTickerOnChange(e.target.name, e.target.value)
            }
          />
          <TextField
            type="color"
            id="outlined-basic"
            variant="outlined"
            name="backgroundColor"
            label="please select ticker background color"
            value={manageDetails.ticker.backgroundColor}
            onChange={(e) =>
              handleTickerOnChange(e.target.name, e.target.value)
            }
          />
          <FormControl fullWidth>
            <InputLabel id="direction-label">Direction</InputLabel>
            <Select
              labelId="direction-label"
              id="direction-id"
              value={manageDetails.ticker.direction}
              onChange={(e) =>
                handleTickerOnChange(e.target.name, e.target.value)
              }
              name={"direction"}
            >
              <MenuItem value={"left"}>Left</MenuItem>
              <MenuItem value={"right"}>Right</MenuItem>
              <MenuItem value={"up"}>Up</MenuItem>
              <MenuItem value={"down"}>Down</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="behavior-label">Behavior</InputLabel>
            <Select
              labelId="behavior-label"
              id="behavior-id"
              value={manageDetails.ticker.behavior}
              onChange={(e) =>
                handleTickerOnChange(e.target.name, e.target.value)
              }
              name={"behavior"}
            >
              <MenuItem value={"scroll"}>Scroll</MenuItem>
              <MenuItem value={"slide"}>Slide</MenuItem>
              <MenuItem value={"alternate"}>Alternate</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="fontSize-label">Font Size</InputLabel>
            <Select
              labelId="fontSize-label"
              id="fontSize-id"
              value={manageDetails.ticker.fontSize}
              onChange={(e) =>
                handleTickerOnChange(e.target.name, e.target.value)
              }
              name={"fontSize"}
            >
              {[...Array(100)].map((_, index) => {
                let id = index + 1;
                return (
                  <MenuItem key={id} value={id}>
                    {id}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </FormControl>
      </>
    );
  };

  useEffect(() => {
    const div = document.getElementById("band");
    if (div) {
      const secondDiv = div.getElementsByTagName("div")[0];
      if (secondDiv) {
        secondDiv.onwheel = (e) => {
          e.stopPropagation();
          div.dispatchEvent(new WheelEvent("wheel", e));
        };
      }
    }
  }, []);

  useEffect(() => {
    const viewPanId = document.getElementById("viewport");
    const firstDiv = viewPanId?.getElementsByTagName("div")[0];
    if (firstDiv) {
      let totalResolution =
        manageDetails.resolution.height + manageDetails.resolution.width;
      var matrix = "";
      if (totalResolution >= 3000) {
        matrix = "matrix(0.5, 0, 0, 0.5, 120, 120)";
      } else if (manageDetails.resolution) {
        matrix = "matrix(0.25, 0, 0, 0.25, 100, 150)";
      } else {
      }
      firstDiv.style.transform = matrix;
    }
  }, [manageDetails.createRegions]);

  return (
    <Grid
      container
      spacing={0}
      gap={0}
      sx={{
        backgroundColor: "#ebf5ff",
      }}
    >
      <Grid item xs={12}>
        <HeaderContainer />
      </Grid>
      <Grid item xs={12}>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            height: "950px",
          }}
        >
          <Grid
            item
            xs={2}
            style={{
              padding: "10px 10px 10px 10px",
              boxShadow: "inset 0px 0px 4px 0px #888888",
            }}
          >
            <Box>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <InputLabel
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "2px",
                    }}
                  >
                    Please Select Resolution{" "}
                    <AddCircleIcon
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleManagePopup(
                          "resolutionTypePopup",
                          !manageDetails.resolutionTypePopup
                        )
                      }
                    />
                  </InputLabel>
                  <FormControl fullWidth>
                    <Select
                      labelId="resolution-label"
                      id="resolution-id"
                      value={manageDetails.resolution}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                      name={"resolution"}
                    >
                      {manageDetails.resolutionType.length > 0 &&
                        manageDetails.resolutionType.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {manageDetails.resolutionType[index].value}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "2px",
                    }}
                  >
                    Please Select Monitor
                    <AddCircleIcon
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleManagePopup(
                          "monitorTypePopup",
                          !manageDetails.monitorTypePopup
                        )
                      }
                    />
                  </InputLabel>
                  <FormControl fullWidth>
                    {/* <InputLabel id="monitor-label">Monitor</InputLabel> */}
                    <Select
                      labelId="monitor-label"
                      id="monitor-id"
                      // label="Monitor"
                      value={manageDetails.monitor}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                      name={"monitor"}
                    >
                      {manageDetails.monitorType.length > 0 &&
                        manageDetails.monitorType.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item}>
                              {item.title}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      margin: "2px",
                    }}
                  >
                    Please Select Angle
                  </InputLabel>
                  <FormControl fullWidth>
                    {/* <InputLabel id="angle-label">Angle</InputLabel> */}
                    <Select
                      id="angle-id"
                      // label="angle"
                      name="angle"
                      labelId="angle-label"
                      value={manageDetails.angle}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                    >
                      {Object.keys(manageDetails.angleType).length > 0 &&
                        Object.keys(manageDetails.angleType).map(
                          (item, index) => {
                            return (
                              <MenuItem key={index} value={item}>
                                {manageDetails.angleType[item]}
                              </MenuItem>
                            );
                          }
                        )}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Button
                variant="outlined"
                style={{
                  marginTop: "20px",
                  width: "100%",
                }}
                onClick={() => handleCreateRegions()}
              >
                Create Region
              </Button>
            </Box>
            <Box>
              <Button
                variant="outlined"
                style={{
                  marginTop: "20px",
                  width: "100%",
                }}
                onClick={() => handleCreateXML()}
              >
                Save Info
              </Button>
            </Box>
          </Grid>
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Grid
              item
              xs={8}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Grid
                item
                style={{
                  minHeight: "60px",
                  maxHeight: "60px",
                  boxShadow: "0px 2px 8px 0px #888889",
                }}
              >
                <Droppable
                  droppableId={"topPanel"}
                  className={"droppable-top-penal"}
                >
                  {(provided, snapshot) => {
                    return (
                      <Box {...provided.droppableProps} ref={provided.innerRef}>
                        <Box className={"top-penal"}>
                          <Draggable key={1} draggableId={"1"} index={1}>
                            {(provided, snapshot) => {
                              return (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  // style={{
                                  //   // userSelect: "none",
                                  //   ...provided.draggableProps.style,
                                  // }}
                                >
                                  <Box
                                    dragging={snapshot.isDragging}
                                    className="file-info"
                                  >
                                    <AddPhotoAlternateIcon />
                                    Image
                                  </Box>
                                </Box>
                              );
                            }}
                          </Draggable>
                          <Draggable key={2} draggableId={"2"} index={2}>
                            {(provided, snapshot) => {
                              return (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Box
                                    dragging={snapshot.isDragging}
                                    className="file-info"
                                  >
                                    <VideoCallIcon />
                                    Video
                                  </Box>
                                </Box>
                              );
                            }}
                          </Draggable>
                          <Draggable key={3} draggableId={"3"} index={3}>
                            {(provided, snapshot) => {
                              return (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Box
                                    dragging={snapshot.isDragging}
                                    className="file-info"
                                  >
                                    <PictureAsPdfIcon />
                                    PDF
                                  </Box>
                                </Box>
                              );
                            }}
                          </Draggable>
                          <Draggable key={4} draggableId={"4"} index={4}>
                            {(provided, snapshot) => {
                              return (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Box
                                    dragging={snapshot.isDragging}
                                    className="file-info"
                                  >
                                    <YouTubeIcon />
                                    YouTube
                                  </Box>
                                </Box>
                              );
                            }}
                          </Draggable>
                          <Draggable key={5} draggableId={"5"} index={5}>
                            {(provided, snapshot) => {
                              return (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Box
                                    dragging={snapshot.isDragging}
                                    className="file-info"
                                  >
                                    <GifIcon />
                                    Gif
                                  </Box>
                                </Box>
                              );
                            }}
                          </Draggable>
                          <Draggable key={6} draggableId={"6"} index={6}>
                            {(provided, snapshot) => {
                              return (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Box
                                    dragging={snapshot.isDragging}
                                    className="file-info"
                                  >
                                    <NewspaperIcon />
                                    Ticker
                                  </Box>
                                </Box>
                              );
                            }}
                          </Draggable>
                        </Box>
                        {provided.placeholder}
                      </Box>
                    );
                  }}
                </Droppable>
              </Grid>
              <Box className="zooming-content">
                {/* *******************************  EDITOR SECTION START HERE  ********************************* */}
                <div
                  ref={zoomingContent}
                  style={{
                    backgroundColor: "#c4c4c4e3",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {manageDetails.createRegions && (
                    <ZoomPan>
                      <div x={0} y={0} h={0} w={0} className="chickenyu"></div>
                      <div
                        className="testing"
                        x={0}
                        y={0}
                        w={manageDetails.resolution?.width}
                        h={manageDetails.resolution?.height}
                        id="band"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Droppable droppableId={"centareScreen"}>
                          {(provided) => {
                            return (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  backgroundColor: "#d9f7ff",
                                  width: manageDetails.resolution?.width + "px",
                                  height:
                                    manageDetails.resolution?.height + "px",
                                }}
                              >
                                {/**************************** ACTUAL DROP CONTENT WILL BE GOES HERE ***********************************/}
                                {manageDetails.mainScreenDetails.length > 0 &&
                                  manageDetails.mainScreenDetails.map(
                                    (info, index) => {
                                      if (info.drop) {
                                        return (
                                          <React.Fragment key={index}>
                                            <Moveable
                                              ref={moveableRef}
                                              target={`.target-${index}`}
                                              draggable={true}
                                              throttleDrag={1}
                                              edgeDraggable={false}
                                              startDragRotate={0}
                                              throttleDragRotate={0}
                                              resizable={true}
                                              keepRatio={false}
                                              snappable={true}
                                              bounds={{
                                                left: 0,
                                                top: 0,
                                                right: 0,
                                                bottom: 0,
                                                position: "css",
                                              }}
                                              edge={[]}
                                              onDrag={(e) => {
                                                e.target.style.transform =
                                                  e.transform;
                                                handleSaveXAndYAxis(index, {
                                                  distance: [
                                                    e.translate[0],
                                                    e.translate[1],
                                                  ],
                                                });
                                              }}
                                              onResize={(e) => {
                                                e.target.style.width = `${e.width}px`;
                                                e.target.style.height = `${e.height}px`;
                                                e.target.style.transform =
                                                  e.drag.transform;
                                                handleSaveXAndYAxis(index, {
                                                  distance: [
                                                    e.drag.translate[0],
                                                    e.drag.translate[1],
                                                  ],
                                                  height: e.height,
                                                  width: e.width,
                                                });
                                              }}
                                            />
                                            <div
                                              className={`file-uploaded-grid target-${index}`}
                                              style={{ position: "absolute" }}
                                            >
                                              {info.content.toLowerCase() ===
                                                "image" && (
                                                <ControllerContainer
                                                  index={index}
                                                  fileData={
                                                    manageDetails
                                                      .mainScreenDetails[index]
                                                      ?.fileObj
                                                  }
                                                  controllerType={"image"}
                                                  acceptFiles={imageTypes}
                                                  fileClass={
                                                    "fileUp image-upload" +
                                                    index
                                                  }
                                                  label="Image Upload"
                                                  handleControllerChange={(e) =>
                                                    handleOnChangeFile(
                                                      e,
                                                      index,
                                                      "upload",
                                                      "Image"
                                                    )
                                                  }
                                                  handleControllerClear={() =>
                                                    handleOnChangeFile(
                                                      "",
                                                      index,
                                                      "clear",
                                                      "Image"
                                                    )
                                                  }
                                                  handleRemoveComponent={() =>
                                                    handleRemoveComponent(
                                                      info.id
                                                    )
                                                  }
                                                />
                                              )}
                                              {info.content.toLowerCase() ===
                                                "video" && (
                                                <ControllerContainer
                                                  index={index}
                                                  fileData={
                                                    manageDetails
                                                      .mainScreenDetails[index]
                                                      ?.fileObj
                                                  }
                                                  controllerType={"video"}
                                                  acceptFiles={videoTypes}
                                                  fileClass={
                                                    "fileUp video-upload" +
                                                    index
                                                  }
                                                  label="Video Upload"
                                                  handleControllerChange={(e) =>
                                                    handleOnChangeFile(
                                                      e,
                                                      index,
                                                      "upload",
                                                      "Video"
                                                    )
                                                  }
                                                  handleControllerClear={() =>
                                                    handleOnChangeFile(
                                                      "",
                                                      index,
                                                      "clear",
                                                      "Video"
                                                    )
                                                  }
                                                  handleRemoveComponent={() =>
                                                    handleRemoveComponent(
                                                      info.id
                                                    )
                                                  }
                                                />
                                              )}
                                              {info.content.toLowerCase() ===
                                                "pdf" && (
                                                <ControllerContainer
                                                  index={index}
                                                  fileData={
                                                    manageDetails
                                                      .mainScreenDetails[index]
                                                      ?.fileObj
                                                  }
                                                  controllerType={"pdf"}
                                                  acceptFiles={pdfTypes}
                                                  fileClass={
                                                    "fileUp pdf-upload" + index
                                                  }
                                                  label="PDF Upload"
                                                  handleControllerChange={(e) =>
                                                    handleOnChangeFile(
                                                      e,
                                                      index,
                                                      "upload",
                                                      "PDF"
                                                    )
                                                  }
                                                  handleControllerClear={() =>
                                                    handleOnChangeFile(
                                                      "",
                                                      index,
                                                      "clear",
                                                      "PDF"
                                                    )
                                                  }
                                                  handleRemoveComponent={() =>
                                                    handleRemoveComponent(
                                                      info.id
                                                    )
                                                  }
                                                />
                                              )}
                                              {info.content.toLowerCase() ===
                                                "gif" && (
                                                <ControllerContainer
                                                  index={index}
                                                  fileData={
                                                    manageDetails
                                                      .mainScreenDetails[index]
                                                      ?.fileObj
                                                  }
                                                  controllerType={"gif"}
                                                  acceptFiles={gifType}
                                                  fileClass={
                                                    "fileUp gif-upload" + index
                                                  }
                                                  label="gif Upload"
                                                  handleControllerChange={(e) =>
                                                    handleOnChangeFile(
                                                      e,
                                                      index,
                                                      "upload",
                                                      "Gif"
                                                    )
                                                  }
                                                  handleControllerClear={() =>
                                                    handleOnChangeFile(
                                                      "",
                                                      index,
                                                      "clear",
                                                      "Gif"
                                                    )
                                                  }
                                                  handleRemoveComponent={() =>
                                                    handleRemoveComponent(
                                                      info.id
                                                    )
                                                  }
                                                />
                                              )}
                                              {info.content.toLowerCase() ===
                                                "ticker" && (
                                                <>
                                                  {info.tickerDetails ? (
                                                    <TickerContainer
                                                      mainContain={
                                                        info.mainContain
                                                      }
                                                      width={info.width}
                                                      height={info.height}
                                                      direction={info.direction}
                                                      behavior={info.behavior}
                                                      scrollDelay={
                                                        info.scrollDelay
                                                      }
                                                      scrollAmount={
                                                        info.scrollAmount
                                                      }
                                                      loop={info.loop}
                                                      backgroundColor={
                                                        "transparent"
                                                      }
                                                      hspace={info.hspace}
                                                      vspace={info.vspace}
                                                      closeOnClick={() =>
                                                        handleRemoveComponent(
                                                          info.id
                                                        )
                                                      }
                                                      editOnClick={() =>
                                                        handleTickerPopupManage(
                                                          index,
                                                          "tickerPropertiesPopup",
                                                          !manageDetails.tickerPropertiesPopup
                                                        )
                                                      }
                                                      style={{
                                                        fontSize: info.fontSize,
                                                        color:
                                                          info.backgroundColor,
                                                      }}
                                                      classInfo={"marquee-text"}
                                                    />
                                                  ) : (
                                                    <div className="marquee-uploader-main">
                                                      <div
                                                        className="marquee-content-info"
                                                        onClick={() =>
                                                          handleTickerPopupManage(
                                                            index,
                                                            "tickerPropertiesPopup",
                                                            !manageDetails.tickerPropertiesPopup
                                                          )
                                                        }
                                                      >
                                                        <ModeEditOutlineIcon />
                                                        Ticker
                                                      </div>
                                                      <CloseIcon
                                                        className="marquee-close-icon"
                                                        onClick={() =>
                                                          handleRemoveComponent(
                                                            info.id
                                                          )
                                                        }
                                                      />
                                                    </div>
                                                  )}
                                                </>
                                              )}
                                            </div>
                                          </React.Fragment>
                                        );
                                      }
                                    }
                                  )}
                                {provided.placeholder}
                                {/************************************************ TO HERE *********************************/}

                                {/* Red horizontal and vertical line start */}
                                <>
                                  {manageDetails.monitorType.filter}
                                  {manageDetails.monitor?.totalScreen === 4 && (
                                    <div
                                      style={{
                                        height: "1px",
                                        width: "100%",
                                        backgroundColor: "red",
                                        top: "50%",
                                        left: 0,
                                        position: "absolute",
                                      }}
                                    ></div>
                                  )}
                                  {[2, 4].includes(
                                    manageDetails.monitor?.totalScreen
                                  ) && (
                                    <div
                                      style={{
                                        height: "100%",
                                        width: "1px",
                                        backgroundColor: "red",
                                        left: "50%",
                                        top: 0,
                                        position: "absolute",
                                      }}
                                    ></div>
                                  )}
                                </>
                                {/* Red horizontal and vertical line end */}
                              </div>
                            );
                          }}
                        </Droppable>
                      </div>
                    </ZoomPan>
                  )}
                </div>
              </Box>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                backgroundColor: "#ebf5ff",
                padding: "10px",
                boxShadow: "inset 0px 0px 4px 0px #888888",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={4}>
                      <h3>Basic Information</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Resolution</TableCell>
                    <TableCell colSpan={3}>
                      {manageDetails.resolution.value}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Monitor</TableCell>
                    <TableCell colSpan={3}>
                      {manageDetails.monitor?.title}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Angle</TableCell>
                    <TableCell colSpan={3}>{manageDetails.angle}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>View</TableCell>
                    <TableCell>[X,Y] </TableCell>
                    <TableCell>Width</TableCell>
                    <TableCell>Height</TableCell>
                  </TableRow>
                  {manageDetails.mainScreenDetails.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Components not available...{" "}
                      </TableCell>
                    </TableRow>
                  )}
                  {manageDetails.mainScreenDetails.length > 0 &&
                    manageDetails.mainScreenDetails.map((info, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            {info.fileObj ? (
                              <img
                                src={info.fileObj}
                                style={{ width: "15px", height: "15px" }}
                              />
                            ) : (
                              "Component"
                            )}
                          </TableCell>
                          <TableCell>
                            {info.distance?.[0]}, {info.distance?.[1]}
                          </TableCell>
                          <TableCell>{info.width}</TableCell>
                          <TableCell>{info.height}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </Grid>
          </DragDropContext>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          backgroundColor: "#ebf5ff",
          padding: "10px",
          boxShadow: "inset 0px 0px 4px 0px #888888",
        }}
      >
        <FooterContainer />
      </Grid>

      <>
        <ModalContainer
          modelKey={"resolutionTypePopup"}
          modalOpen={manageDetails.resolutionTypePopup}
          modalClose={() =>
            handleManagePopup(
              "resolutionTypePopup",
              !manageDetails.resolutionTypePopup
            )
          }
          modalTitle={"Create Resolution"}
          modalContent={handleResolutionPopupContent()}
          modalFirstBtnTitle={"Create"}
          modalFirstMethod={() => handleCreateResolution()}
          modalSecondBtnTitle={"Cancel"}
          modalSecondMethod={() =>
            handleManagePopup(
              "resolutionTypePopup",
              !manageDetails.resolutionTypePopup
            )
          }
        />
        <ModalContainer
          modelKey={"monitorTypePopup"}
          modalOpen={manageDetails.monitorTypePopup}
          modalClose={() =>
            handleManagePopup(
              "monitorTypePopup",
              !manageDetails.monitorTypePopup
            )
          }
          modalTitle={"Create Monitor"}
          modalContent={handleMonitorPopupContent()}
          modalFirstBtnTitle={"Create"}
          modalFirstMethod={() => handleCreateMonitor()}
          modalSecondBtnTitle={"Cancel"}
          modalSecondMethod={() =>
            handleManagePopup(
              "monitorTypePopup",
              !manageDetails.monitorTypePopup
            )
          }
        />
        <ModalContainer
          modelKey={"tickerPropertiesPopup"}
          modalOpen={manageDetails.tickerPropertiesPopup}
          modalClose={() =>
            handleManagePopup(
              "tickerPropertiesPopup",
              !manageDetails.tickerPropertiesPopup
            )
          }
          modalTitle={"Manage ticker properties"}
          modalContent={handleTickerPropertiesPopupContent()}
          modalFirstBtnTitle={"Add Properties"}
          modalFirstMethod={() => handleAddTickerPropertiesPopup()}
          modalSecondBtnTitle={"Cancel"}
          modalSecondMethod={() =>
            handleManagePopup(
              "tickerPropertiesPopup",
              !manageDetails.tickerPropertiesPopup
            )
          }
        />
      </>
    </Grid>
  );
};

export default Main;
