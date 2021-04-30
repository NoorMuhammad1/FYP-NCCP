import Backdrop                       from '@material-ui/core/Backdrop';
import Fade                           from '@material-ui/core/Fade';
import Modal                          from '@material-ui/core/Modal';
import CheckCircleIcon                from '@material-ui/icons/CheckCircle';
import ErrorIcon                      from '@material-ui/icons/Error';
import React, { useEffect, useState } from 'react';
import { Link }                       from 'react-router-dom';
import axios                          from '../../helpers/axios';
import './style.css';

const EmailVerified = (props) => {
  const token = window.location.href.split('/')[
  window.location.href.split('/').length - 1
    ];
  const [modalOpen, setModalOpen] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [message, setMessage] = useState('initial message');

  useEffect(async () => {
    await axios
      .post('/verifyEmail', { token })
      .then((response) => {
        setEmailVerified(true);
        setMessage(response.data.message);
      })
      .catch(({ response }) => {
        setEmailVerified(false);
        setMessage(response.data.message);
      });
    setModalOpen(true);
  }, []);
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className="signup-response-modal"
      open={modalOpen}
      onClose={(e) => {
        setModalOpen(false);
        // props.history.push("/signin");
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={modalOpen}>
        <div className="email-verify-modal-content-div">
          {emailVerified ? (
            <CheckCircleIcon
              className="email-verify-modal-icon"
              style={{ fontSize: '5.5rem' }}
            />
          ) : (
            <ErrorIcon
              className="email-verify-modal-icon"
              style={{ fontSize: '5.5rem' }}
            />
          )}
          <h2 id="transition-modal-title">
            {emailVerified ? 'Success' : 'Error'}
          </h2>
          <p id="transition-modal-description">{message}</p>
          <Link to="/signin">
            Go to {emailVerified ? 'Sign In' : 'Sign Up'}
          </Link>
        </div>
      </Fade>
    </Modal>
  );
};

export default EmailVerified;
