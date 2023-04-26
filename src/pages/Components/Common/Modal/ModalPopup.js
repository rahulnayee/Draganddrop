import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const ModalPopup = ({
  modelKey,
  modalOpen,
  modalClose,
  modalTitle,
  modalContent,
  modalFirstBtnTitle,
  modalFirstMethod,
  modalSecondBtnTitle,
  modalSecondMethod,
}) => {
  return (
    <Dialog
      key={modelKey}
      open={modalOpen}
      onClose={modalClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {modalContent}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={modalFirstMethod} autoFocus>
          {modalFirstBtnTitle}
        </Button>
        <Button onClick={modalSecondMethod}>{modalSecondBtnTitle}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalPopup;
