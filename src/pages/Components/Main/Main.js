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
import React from "react";
import FooterContainer from "../Footer/FooterContainer";
import HeaderContainer from "../Header/HeaderContainer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ModalContainer from "../Common/Modal/ModalPopupContainer";
import { FileUploader } from "react-drag-drop-files";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
// import styles from "./Main.module.scss";
// import "./main.scss";

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
            item
            xs={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              boxShadow: "inset 0px 0px 4px 0px #888888",
              overflow: "hidden",
              backgroundColor: "#00000030",
            }}
          >
            <Grid
              style={{
                padding:
                  manageDetails.mainScreenDetails.length > 0 ? "25px" : "0px",
                width:
                  manageDetails.resolution === "1920_1080"
                    ? "55%"
                    : manageDetails.resolution === "800_600"
                    ? "50%"
                    : manageDetails.resolution === "640_480"
                    ? "40%"
                    : "30%",
                display: "inline-flex",
                flexWrap: "wrap",
                backgroundColor: "#fff",
              }}
            >
              {manageDetails.mainScreenDetails.length > 0 &&
                manageDetails.mainScreenDetails.map((info, index) => {
                  return (
                    <Grid
                      key={index}
                      item
                      xs={6}
                      // container
                      spacing={0}
                      gap={0}
                      style={{
                        padding: "0px",
                        margin: "0px",
                      }}
                    >
                      {info?.fileObj ? (
                        <div
                          className={`file-uploaded`}
                          style={{
                            textAlign: index % 2 == 0 ? "end" : "start",
                          }}
                        >
                          <img src={info?.fileObj} className="img-view" />
                          <HighlightOffIcon
                            className={`iconInfo ${
                              index % 2 == 0 ? "right-align" : "left-align"
                            }`}
                            onClick={() =>
                              handleOnChangeFile("", index, "clear")
                            }
                          />
                        </div>
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
          </Grid>
          <Grid
            item
            xs={2}
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
          handleManagePopup("monitorTypePopup", !manageDetails.monitorTypePopup)
        }
        modalTitle={"Create Monitor"}
        modalContent={handleMonitorPopupContent()}
        modalFirstBtnTitle={"Create"}
        modalFirstMethod={() => handleCreateMonitor()}
        modalSecondBtnTitle={"Cancel"}
        modalSecondMethod={() =>
          handleManagePopup("monitorTypePopup", !manageDetails.monitorTypePopup)
        }
      />
    </Grid>
  );
};

export default Main;
