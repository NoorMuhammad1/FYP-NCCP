import React, { forwardRef, useImperativeHandle, useState } from 'react';
import CustomModal                                          from '..';

const DeleteUserModal = forwardRef((props, ref) => {
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
      saveText="Confirm"
    >
      {props.children}
    </CustomModal>
  );
});

export default DeleteUserModal;
