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
  // containerRef?.current?.style.setProperty("width", "100%");

  const onUpdate = useCallback(({ x = 1, y = 1, scale = 1 }) => {
    const { current: img } = imgRef;
    if (img) {
      const value = make3dTransformValue({ x, y, scale });
      img.style.setProperty("transform", value);
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
                    <InputLabel id="resolution-label">Resolution</InputLabel>
                    <Select
                      labelId="resolution-label"
                      id="resolution-id"
                      label="Resolution"
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
                    <InputLabel id="monitor-label">Monitor</InputLabel>
                    <Select
                      labelId="monitor-label"
                      id="monitor-id"
                      label="Monitor"
                      value={manageDetails.monitor}
                      onChange={(e) =>
                        handleOnChange(e.target.name, e.target.value)
                      }
                      name={"monitor"}
                    >
                      {manageDetails.monitorType.length > 0 &&
                        manageDetails.monitorType.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item.title}>
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
                    <InputLabel id="angle-label">Angle</InputLabel>
                    <Select
                      id="angle-id"
                      label="angle"
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
              xs={8}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Grid item style={{ minHeight: "60px", maxHeight: "60px" }}>
                <Droppable
                  droppableId={"topPanel"}
                  key={"topPanel"}
                  style={{ minHeight: "60px", maxHeight: "60px" }}
                >
                  {(provided, snapshot) => {
                    return (
                      <Box {...provided.droppableProps} ref={provided.innerRef}>
                        <Box
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                            minHeight: "60px",
                            maxHeight: "60px",
                          }}
                        >
                          <Draggable key={"1"} draggableId={"1"}>
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
                          <Draggable key={"2"} draggableId={"2"}>
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
                          <Draggable key={"3"} draggableId={"3"}>
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
                          <Draggable key={"4"} draggableId={"4"}>
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
                          <Draggable key={"5"} draggableId={"5"}>
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
              <Grid
                item
                xs={12}
                style={{
                  // display: "flex",
                  // boxShadow: "inset 0px 0px 4px 0px #888888",
                  // overflow: "hidden",
                  // backgroundColor: "#00000030",

                  position: "relative",
                  flexGrow: 1,
                  alignSelf: "center",
                  height: 0,
                  width: "80%",
                  cursor: "grab",
                  border: "2px solid red",
                }}
                className="middle-screen"
              >
                {manageDetails.mainScreenDetails.length > 0 && (
                  // <ZoomPan onChange={(e) => handleZoomPanChange(e)}>
                  // onSelectItem onChange onAddItem
                  // <div x={0} y={0} h={0} w={0}></div>

                  <QuickPinchZoom
                    ref={containerRef}
                    onUpdate={onUpdate}
                    inertia={false}
                    animationDuration={1000}
                    maxZoom={20}
                    minZoom={0.1}
                    wheelScaleFactor={1000}
                  >
                    {/* <Box style={{ width: "100%", height: "100%" }}> */}
                    <Box style={{ height: "1080px", width: "1920px" }}>
                      <Grid
                        ref={imgRef}
                        style={{
                          height: "100%",
                          width: "100%",
                          // display: "flex",
                          // flexWrap: "wrap",
                          // flexDirection: "row",
                          padding:
                            manageDetails.mainScreenDetails.length > 0
                              ? "25px"
                              : "0px",
                        }}
                        className={`main-screen ${
                          manageDetails.mainScreenDetails.length > 0 &&
                          "bgColorMain"
                        }`}
                        // x={190}
                        // y={80}
                        // h={
                        //   manageDetails.resolution === "1920_1080"
                        //     ? 800
                        //     : manageDetails.resolution === "800_600"
                        //     ? 650
                        //     : manageDetails.resolution === "640_480"
                        //     ? 550
                        //     : 750
                        // }
                        // w={
                        //   manageDetails.resolution === "1920_1080"
                        //     ? 800
                        //     : manageDetails.resolution === "800_600"
                        //     ? 650
                        //     : manageDetails.resolution === "640_480"
                        //     ? 550
                        //     : 750
                        // }
                      >
                        {/* {manageDetails.mainScreenDetails.length > 0 &&
                  manageDetails.mainScreenDetails.map((info, index) => {
                    return (
                      <Grid key={index} xs={6} className={`file-uploaded-grid`}>
                        {info?.fileObj ? (
                          <Box
                            className={`file-uploaded`}
                            style={{
                              textAlign: index % 2 == 0 ? "end" : "start",
                            }}
                          >
                            <img src={info?.fileObj} className="img-view" />
                            <HighlightOffIcon
                              className={`iconInfo right-align`}
                              onClick={() =>
                                handleOnChangeFile("", index, "clear")
                              }
                            />
                          </Box>
                        ) : (
                          <Box className="file-info">
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
                        )}
                      </Grid>
                    );
                  })} */}
                        <Droppable droppableId={"centareScreen"}>
                          {(provided, snapshot) => {
                            return (
                              <Box
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  padding: 0,
                                  backgroundColor: "pink",
                                  width: "100%",
                                  height: "100%",
                                }}
                                className="main-screen"
                              >
                                {manageDetails.mainScreenDetails.length > 0 &&
                                  manageDetails.mainScreenDetails.map(
                                    (info, index) => {
                                      if (info.drop) {
                                        return (
                                          <Grid
                                            key={index}
                                            xs={6}
                                            className={`file-uploaded-grid`}
                                          >
                                            <Resizable
                                              style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                border: "solid 1px #ddd",
                                                background: "#f0f0f0",
                                              }}
                                              defaultSize={{
                                                width: "100%",
                                                height: "100%",
                                              }}
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
                                                      border: "1px solid #000",
                                                      width: "100%",
                                                    }}
                                                  />
                                                </Box>
                                              )}
                                            </Resizable>
                                          </Grid>
                                        );
                                      }
                                    }
                                  )}
                                {provided.placeholder}
                              </Box>
                            );
                          }}
                        </Droppable>
                      </Grid>
                    </Box>
                  </QuickPinchZoom>
                  // </ZoomPan>
                )}
              </Grid>
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
                    <TableCell colSpan={2}>{manageDetails.monitor}</TableCell>
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
