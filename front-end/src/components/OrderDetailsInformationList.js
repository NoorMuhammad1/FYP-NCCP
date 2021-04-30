import React      from 'react';
import { Button } from 'react-bootstrap';

const CancelButtonHandler = () => {
  alert('Thanks for clicking me');
};

const OrderDetailsInformationList = (props) => {

  return (
    <div style={styles.container}>

      <div style={styles.buttoncontainer}>
        <Button onClick={CancelButtonHandler}

                style={styles.button}
                name="cancel">
          Cancel
        </Button>
      </div>
      <div><span style={styles.header}>Order ID: </span><span style={styles.text}>{props.data.order_id}</span></div>
      <div><span style={styles.header}>Date: </span><span style={styles.text}>{props.data.created}</span></div>
      <div><span style={styles.header}>User ID: </span><span style={styles.text}>{props.data.user_id}</span></div>
      <div><span style={styles.header}>Status: </span><span style={styles.text}>{props.data.status}</span></div>
    </div>
  );
};

export default OrderDetailsInformationList;

const styles = {
  container      : {

    marginTop: 5,
    //    border: '1px solid red',
    textAlign: 'left',

  },
  header         : {
    color   : 'Black',
    padding : '10px',
    fontSize: 15,

  },
  text           : {
    color     : 'Black',
    fontFamily: 'Arial',
    padding   : 15,

  },
  buttoncontainer: {
    borderradius  : '1px',
    fontSize      : '6',
    borderradius  : 5,
    display       : 'flex',
    justifyContent: 'flex-end',
    alignItems    : 'center',
    marginRight   : 10,

  },
  button         : {
    fontSize  : 14,
    color     : 'white',
    background: 'sky-blue',
    width     : 95,
    height    : 45
  },

};
