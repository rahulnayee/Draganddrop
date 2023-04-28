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
import React, { Component, useState } from "react";
import FooterContainer from "../Footer/FooterContainer";
import HeaderContainer from "../Header/HeaderContainer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModalContainer from "../Common/Modal/ModalPopupContainer";
import { FileUploader } from "react-drag-drop-files";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ZoomPan } from "react-zoom-pan/lib.cjs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  onDragEnd,
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
      >
        <Box className="file-info" dragging={snapshot.isDragging}>
          {type}
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

          <Grid
            xs={8}
            style={{
              display: "flex",
              boxShadow: "inset 0px 0px 4px 0px #888888",
              overflow: "hidden",
              backgroundColor: "#00000030",
            }}
            className="middle-screen"
          >
            <ZoomPan onChange={(e) => handleZoomPanChange(e)}>
              {/* onSelectItem onChange onAddItem */}
              <div x={0} y={0} h={0} w={0}></div>
              <Grid
                className={`main-screen ${
                  manageDetails.mainScreenDetails.length > 0 && "bgColorMain"
                }`}
                x={225}
                y={100}
                h={750}
                w={750}
                style={{
                  padding:
                    manageDetails.mainScreenDetails.length > 0 ? "25px" : "0px",
                  height: "100%",
                  width: "100%",
                  // manageDetails.resolution === "1920_1080"
                  //   ? "55%"
                  //   : manageDetails.resolution === "800_600"
                  //   ? "50%"
                  //   : manageDetails.resolution === "640_480"
                  //   ? "40%"
                  //   : "30%",
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                }}
              >
                {manageDetails.mainScreenDetails.length > 0 &&
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
                            {/* <FormControl
                            fullWidth
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              padding: "5px",
                            }}
                          >
                            <TextField
                              style={{ width: "120px" }}
                              id="outlined-basic"
                              label="Total no of day"
                              variant="outlined"
                              type="number"
                              required
                              name="totalDay"
                              value={
                                manageDetails.mainScreenDetails[index]?.totalDay
                              }
                              onChange={(e) =>
                                handleOnChangeMainScreen(
                                  e.target.name,
                                  e.target.value,
                                  index
                                )
                              }
                            />
                            <TextField
                              style={{ width: "120px" }}
                              id="outlined-basic"
                              label="Hours"
                              variant="outlined"
                              type="number"
                              required
                              name="hours"
                              value={
                                manageDetails.mainScreenDetails[index].hours
                              }
                              onChange={(e) =>
                                handleOnChangeMainScreen(
                                  e.target.name,
                                  e.target.value,
                                  index
                                )
                              }
                            />
                            <TextField
                              style={{ width: "120px" }}
                              id="outlined-basic"
                              label="Minutes"
                              variant="outlined"
                              type="number"
                              required
                              name="minutes"
                              value={
                                manageDetails.mainScreenDetails[index].minutes
                              }
                              onChange={(e) =>
                                handleOnChangeMainScreen(
                                  e.target.name,
                                  e.target.value,
                                  index
                                )
                              }
                            />
                            <TextField
                              style={{ width: "120px" }}
                              id="outlined-basic"
                              label="Second"
                              variant="outlined"
                              type="number"
                              required
                              name="second"
                              value={
                                manageDetails.mainScreenDetails[index].second
                              }
                              onChange={(e) =>
                                handleOnChangeMainScreen(
                                  e.target.name,
                                  e.target.value,
                                  index
                                )
                              }
                            />
                          </FormControl> */}
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
                  })}
              </Grid>
            </ZoomPan>
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
                {manageDetails.mainScreenDetails.length > 0 &&
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
                  })}
              </TableBody>
            </Table>
            <DragDropContext
              onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
            >
              <Box key={"leftPanel"} style={{ border: "1px solid #000" }}>
                Top Section
                <Box style={{ margin: 2 }}>
                  <Droppable droppableId={"leftPanel"} key={"leftPanel"}>
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
                          {columns.leftPanel.items.filter(
                            (item) => item.content === "Image"
                          ).length > 0 && (
                            <>
                              <Draggable key={"1"} draggableId={"1"}>
                                {(provided, snapshot) => {
                                  return handleImageComponents(
                                    "Image",
                                    provided,
                                    snapshot
                                  );
                                }}
                              </Draggable>
                            </>
                          )}
                          {columns.leftPanel.items.filter(
                            (item) => item.content === "Video"
                          ).length > 0 && (
                            <>
                              <Draggable key={"2"} draggableId={"2"}>
                                {(provided, snapshot) => {
                                  return handleImageComponents(
                                    "Video",
                                    provided,
                                    snapshot
                                  );
                                }}
                              </Draggable>
                            </>
                          )}
                          {columns.leftPanel.items.filter(
                            (item) => item.content === "PDF"
                          ).length > 0 && (
                            <>
                              <Draggable key={"3"} draggableId={"3"}>
                                {(provided, snapshot) => {
                                  return handleImageComponents(
                                    "PDF",
                                    provided,
                                    snapshot
                                  );
                                }}
                              </Draggable>
                            </>
                          )}
                          {provided.placeholder}
                        </Box>
                      );
                    }}
                  </Droppable>
                </Box>
              </Box>
              <Box key={"centareScreen"} style={{ border: "1px solid #000" }}>
                Drop Section
                <Box style={{ margin: 2 }}>
                  <Droppable droppableId={"centareScreen"}>
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
                          {columns.centareScreen.items.filter(
                            (item) => item.content === "Image"
                          ).length > 0 && (
                            <>
                              <Draggable key={"1"} draggableId={"1"}>
                                {(provided, snapshot) => {
                                  return handleImageComponents(
                                    "Image",
                                    provided,
                                    snapshot
                                  );
                                }}
                              </Draggable>
                            </>
                          )}
                          {columns.centareScreen.items.filter(
                            (item) => item.content === "Video"
                          ).length > 0 && (
                            <>
                              <Draggable key={"2"} draggableId={"2"}>
                                {(provided, snapshot) => {
                                  return handleImageComponents(
                                    "Video",
                                    provided,
                                    snapshot
                                  );
                                }}
                              </Draggable>
                            </>
                          )}
                          {columns.centareScreen.items.filter(
                            (item) => item.content === "PDF"
                          ).length > 0 && (
                            <>
                              <Draggable key={"3"} draggableId={"3"}>
                                {(provided, snapshot) => {
                                  return handleImageComponents(
                                    "PDF",
                                    provided,
                                    snapshot
                                  );
                                }}
                              </Draggable>
                            </>
                          )}
                          {provided.placeholder}
                        </Box>
                      );
                    }}
                  </Droppable>
                </Box>
              </Box>
            </DragDropContext>
          </Grid>
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
