import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import FooterContainer from "../Footer/FooterContainer";
import HeaderContainer from "../Header/HeaderContainer";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import GifIcon from "@mui/icons-material/Gif";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModalContainer from "../Common/Modal/ModalPopupContainer";
import { FileUploader } from "react-drag-drop-files";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ZoomPan } from "react-zoom-pan/lib.cjs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Resizable } from "re-resizable";
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";

const Main = ({
  manageDetails,
  handleOnChange,
  handleCreateResolution,
  handleCreateMonitor,
  handleOnChangeFile,
  handleCreateRegions,
  handleCreateXML,
  handleOnChangeMainScreen,
  handleManagePopup,
  handleZoomPanChange,
  columns,
  setColumns,
  onDragEndNew,
}) => {
  const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

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
  const handleImageComponents = (type, provided, snapshot) => {
    return (
      <Box
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          userSelect: "none",
          padding: 4,
          margin: "0 0 8px 0",
          minHeight: "50px",
          ...provided.draggableProps.style,
        }}
        key={type.id}
      >
        <Box className="file-info" dragging={snapshot.isDragging}>
          <p>
            {type.id}
            {type.content}
          </p>
          <FileUploader
            multiple={true}
            handleChange={(e) => handleOnChangeFile(e, index, "upload")}
            name="file"
            classes="fileUp"
            types={fileTypes}
            style={{
              padding: "0px",
              margin: "0px",
              border: "1px solid #000",
              width: "100%",
            }}
          />
        </Box>
      </Box>
    );
  };
  const imgUrl =
    "https://user-images.githubusercontent.com/4661784/" +
    "56037265-88219f00-5d37-11e9-95ef-9cb24be0190e.png";
  const imgRef = useRef();
  const containerRef = useRef();

  const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef;
    if (img) {
      const value = make3dTransformValue({ x, y, scale });
      img.style.setProperty("transform", value);
    }
  }, []);

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
                    {/* <InputLabel id="resolution-label">Resolution</InputLabel> */}
                    <Select
                      labelId="resolution-label"
                      id="resolution-id"
                      // label="Resolution"
                      value={manageDetails.resolution}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                      name={"resolution"}
                    >
                      {Object.keys(manageDetails.resolutionType).length > 0 &&
                        Object.keys(manageDetails.resolutionType).map(
                          (item, index) => {
                            return (
                              <MenuItem key={index} value={item}>
                                {manageDetails.resolutionType[item]}
                              </MenuItem>
                            );
                          }
                        )}
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
          <DragDropContext onDragEnd={(result) => onDragEndNew(result)}>
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
                        </Box>
                        {provided.placeholder}
                      </Box>
                    );
                  }}
                </Droppable>
              </Grid>
              <Box className="zooming-content">
                {manageDetails.mainScreenDetails.length > 0 && (
                  <ZoomPan>
                    <div x={0} y={0} h={0}></div>
                    <Box
                      className="testing"
                      style={{
                        // backgroundColor: "blue",
                        width: "100%",
                        height: "100%",
                      }}
                      id="band"
                      onMouseDown={(e) => {
                        console.log("=============================");
                        e.stopPropagation();
                      }}
                      onMouseMove={(e) => {
                        const rubberband =
                          document.getElementById("Rubberband");
                        const div0 = document.querySelector(
                          "#band #viewport div:first-child"
                        );
                        if (div0) {
                          div0.style.transform = "matrix(1, 0, 0, 1, 0, 0)";
                        }
                        if (rubberband) {
                          rubberband.setAttribute(
                            "transform",
                            "matrix(1, 0, 0, 1, 0, 0)"
                          );
                        }
                      }}
                      // className="movable-table"
                      // style={{
                      //   width: "50%",
                      //   height: "50%",
                      // }}
                      ref={imgRef}
                    >
                      <Grid
                        ref={imgRef}
                        style={{
                          position: "relative",
                          width: "fit-content",
                          height: "fit-content",
                          backgroundColor: "#add8e6",
                        }}
                        // className={`main-screen bgColorMain ${
                        //   manageDetails.angle === "0"
                        //     ? "horizontal-angle"
                        //     : manageDetails.angle === "180"
                        //     ? "horizontal-angle"
                        //     : manageDetails.angle === "90"
                        //     ? "vertical-angle"
                        //     : manageDetails.angle === "270"
                        //     ? "vertical-angle"
                        //     : ""
                        // }`}
                      >
                        <Droppable droppableId={"centareScreen"}>
                          {(provided, snapshot) => {
                            return (
                              <Box
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  // padding: 0,
                                  backgroundColor: "#d9f7ff",
                                  width: "1920px",
                                  height: "1080px",
                                  // display: "flex",
                                  // flexWrap: "wrap",
                                  // alignContent: "space-around",
                                  // justifyContent: "center",
                                  // alignItems: "stretch",
                                }}
                                className={
                                  "11111111111111111111111111111111111111111111111111111111111"
                                }
                              >
                                <ZoomPan>
                                  <div x={0} y={0} h={0}></div>
                                  <div x={0} y={0} h={1080} w={1920}>
                                    {manageDetails.mainScreenDetails.length >
                                      0 &&
                                      manageDetails.mainScreenDetails.map(
                                        (info, index) => {
                                          if (info.drop) {
                                            return (
                                              <Grid
                                                key={index}
                                                xs={6}
                                                className={`file-uploaded-grid`}
                                              >
                                                {info?.fileObj ? (
                                                  <Box
                                                    className={`file-uploaded`}
                                                    style={{
                                                      textAlign:
                                                        index % 2 == 0
                                                          ? "end"
                                                          : "start",
                                                    }}
                                                  >
                                                    <img
                                                      src={info?.fileObj}
                                                      className="img-view"
                                                    />
                                                    <HighlightOffIcon
                                                      className={`iconInfo right-align`}
                                                      onClick={() =>
                                                        handleOnChangeFile(
                                                          "",
                                                          index,
                                                          "clear"
                                                        )
                                                      }
                                                    />
                                                  </Box>
                                                ) : (
                                                  <Box className="file-info">
                                                    <FileUploader
                                                      multiple={true}
                                                      handleChange={(e) =>
                                                        handleOnChangeFile(
                                                          e,
                                                          index,
                                                          "upload"
                                                        )
                                                      }
                                                      name="file"
                                                      classes="fileUp"
                                                      types={fileTypes}
                                                      style={{
                                                        padding: "0px",
                                                        margin: "0px",
                                                        border:
                                                          "1px solid #000",
                                                        width: "100%",
                                                      }}
                                                    />
                                                  </Box>
                                                )}
                                              </Grid>
                                            );
                                          }
                                        }
                                      )}
                                  </div>
                                </ZoomPan>
                                {provided.placeholder}
                              </Box>
                            );
                          }}
                        </Droppable>
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
                      </Grid>
                    </Box>
                  </ZoomPan>
                )}
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
              {/* <Box key={"topPanel"} style={{ border: "1px solid #000" }}>
                Top Section
                <Box style={{ margin: 2 }}>
                  <Droppable droppableId={"topPanel"} key={"topPanel"}>
                    {(provided, snapshot) => {
                      return (
                        <Box
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            padding: 0,
                            minHeight: "100px",
                          }}
                        >
                          <Box>
                            <Draggable key={"1"} draggableId={"1"}>
                              {(provided, snapshot) => {
                                return (
                                  <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 4,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <Box
                                      dragging={snapshot.isDragging}
                                      className="file-info"
                                    >
                                      Image
                                      <FileUploader
                                        multiple={true}
                                        handleChange={(e) =>
                                          handleOnChangeFile(e, index, "upload")
                                        }
                                        name="file"
                                        classes="fileUp"
                                        types={fileTypes}
                                        style={{
                                          padding: "0px",
                                          margin: "0px",
                                          border: "1px solid #000",
                                          width: "100%",
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                );
                              }}
                            </Draggable>
                            <Draggable key={"2"} draggableId={"2"}>
                              {(provided, snapshot) => {
                                return (
                                  <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 4,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <Box
                                      dragging={snapshot.isDragging}
                                      className="file-info"
                                    >
                                      Video
                                      <FileUploader
                                        multiple={true}
                                        handleChange={(e) =>
                                          handleOnChangeFile(e, index, "upload")
                                        }
                                        name="file"
                                        classes="fileUp"
                                        types={["mp4"]}
                                        style={{
                                          padding: "0px",
                                          margin: "0px",
                                          border: "1px solid #000",
                                          width: "100%",
                                        }}
                                      />
                                    </Box>
                                  </Box>
                                );
                              }}
                            </Draggable>
                            <Draggable key={"3"} draggableId={"3"}>
                              {(provided, snapshot) => {
                                return (
                                  <Box
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 4,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <Box
                                      dragging={snapshot.isDragging}
                                      className="file-info"
                                    >
                                      PDF
                                      <FileUploader
                                        multiple={true}
                                        handleChange={(e) =>
                                          handleOnChangeFile(e, index, "upload")
                                        }
                                        name="file"
                                        classes="fileUp"
                                        types={["PDF"]}
                                        style={{
                                          padding: "0px",
                                          margin: "0px",
                                          border: "1px solid #000",
                                          width: "100%",
                                        }}
                                      />
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
                </Box>
              </Box> */}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell component="th" scope="row" colSpan={3}>
                      <h3>Basic Information</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Resolution</TableCell>
                    <TableCell colSpan={2}>
                      {manageDetails.resolutionType[manageDetails.resolution]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Monitor</TableCell>
                    <TableCell colSpan={2}>
                      {manageDetails.monitor?.title}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Angle</TableCell>
                    <TableCell colSpan={2}>{manageDetails.angle}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Day </TableCell>
                    <TableCell>Time(HH:MM:SS)</TableCell>
                    <TableCell>File</TableCell>
                  </TableRow>
                  {/* {manageDetails.mainScreenDetails.length > 0 &&
                    manageDetails.mainScreenDetails.map((info, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>{info.totalDay}</TableCell>
                          <TableCell>
                            {`${info.hours}:${info.minutes}:${info.second}`}
                          </TableCell>
                          <TableCell>
                            {info.fileObj && (
                              <img
                                src={info.fileObj}
                                style={{ width: "15px", height: "15px" }}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })} */}
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
      </>
    </Grid>
  );
};

export default Main;
