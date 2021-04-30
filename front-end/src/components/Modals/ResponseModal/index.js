import React, { forwardRef, useImperativeHandle, useState } from 'react';
import CustomModal                                          from '..';

const ResponseModal = forwardRef((props, ref) => {
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
      title={'Server Response'}
      close={handleClose}
      save={handleConfirm}
      saveText="OK"
    >
      {props.message}
    </CustomModal>
  );
});

export default ResponseModal;
