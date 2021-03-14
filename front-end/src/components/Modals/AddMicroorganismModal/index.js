import React, { forwardRef, useState, useImperativeHandle } from "react";
import CustomModal from "..";

const AddMicroorganismModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleConfirm = () => {
    setShow(false);
    props.confirm();
  };

  useImperativeHandle(ref, () => {
    return {
      show: () => handleShow(),
    };
  });
  return (
    <CustomModal
      show={show}
      title={props.title}
      close={handleClose}
      save={handleConfirm}
      saveText="Save"
    >
      {props.children}
    </CustomModal>
  );
});

export default AddMicroorganismModal;
