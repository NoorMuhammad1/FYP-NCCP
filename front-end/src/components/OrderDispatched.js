import React from 'react';

const OrderDispatched = (props) => {

  return (
    <div style={styles.container}>
      <div><span style={styles.header}>Status Alert: </span><span style={styles.text}>{props.datastatus.status}</span>
      </div>
      <div><span style={styles.header}>Description: </span><span
        style={styles.text}>{props.datastatus.description}</span></div>

    </div>

  );
};

export default OrderDispatched;

const styles = {

  container: {

    marginTop: 35,
    border   : '1px solid red',

  },
  header   : {
    color   : 'Black',
    padding : '10px',
    fontSize: 22,

  },
  text     : {
    color     : 'Black',
    fontFamily: 'Arial',
    padding   : 25,

  },

};
