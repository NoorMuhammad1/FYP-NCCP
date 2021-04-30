import React         from 'react';
import { Container } from 'react-bootstrap';
import { Link }      from 'react-router-dom';

const DepositHomepageDetails = (props) => {

  return (
    <div style={styles.container}>
      <div style={styles.pageHeading}>
        <Container style={styles.pageHeadingContent}>
          <h1>Deposit</h1>
        </Container>
      </div>


      <div><span style={styles.header}>FAQs About Deposit: </span></div>

      <div style={styles.TextBoxes}>
        <div><span style={styles.text}>Q. What is Deposit? </span></div>
        <div><span style={styles.text}>A. Deposits basically..</span></div>
      </div>


      <div style={styles.TextBoxes}>
        <div><span style={styles.text}>Q. How many types of deposit a user can do? </span></div>
        <div><span style={styles.text}>A. Types of Deposits..</span></div>
      </div>

      <div style={styles.TextBoxes}>
        <div><span style={styles.text}>Q. How can you deposit?</span></div>
        <div><span style={styles.text}>A. How to do deposit, click on the button </span>

        </div>
      </div>

      <Link
        to="/adminDashboard/DepositRequestForm">
        <h1>Deposit Request Form</h1>
      </Link>

    </div>
  );
};

export default DepositHomepageDetails;

const styles = {
  container  : {

    marginTop: 35,
    //    border: '1px solid red',
    textAlign: 'left',

  },
  header     : {
    color   : 'Black',
    padding : '10px',
    fontSize: 32,
    margin  : 5,

  },
  text       : {
    color     : 'Black',
    fontFamily: 'Arial',
    padding   : 25,
    fontSize  : 20

  },
  pageHeading: {
    background: ' rgb(51, 104, 198)',
    height    : 100,
    textAlign : 'center',
    display   : 'flex',
    margin    : 5

  },

  pageHeadingContent: {
    display       : 'flex',
    height        : 100,
    color         : 'white',
    textAlign     : 'center',
    justifyContent: 'center',
    alignItems    : 'center'

  },
  TextBoxes         : {
    border     : '1px solid 	rgb(211,211,211)',
    marginTop  : 10,
    margin     : 15,
    borderwidth: 50,
    width      : 800
  },
  buttoncontainer   : {
    borderRadius  : '2px',
    fontSize      : '6',
    display       : 'flex',
    justifyContent: 'flex-start',
    alignItems    : 'center',
    marginRight   : 10
  },
  button            : {
    color     : 'white',
    background: 'red',

  },
};


