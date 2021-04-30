import React                                           from 'react';
import { Button, Container, Dropdown, DropdownButton } from 'react-bootstrap';

const DepositRequestForm = (props) => {

  return (

    <div style={styles.container}>

      <div style={styles.pageHeading}>
        <Container style={styles.pageHeadingContent}>
          <h1>Deposit Request Form</h1>
        </Container>
      </div>

      <div>

        <DropdownButton style={styles.dropdownstyling}
                        title="Deposit Type">
          <Dropdown.Item href="#/action-1">Patent Deposit</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Safe Deposit</Dropdown.Item>
          <Dropdown.Item href="#/action-3">General Deposit</Dropdown.Item>
        </DropdownButton>
      </div>

      <div style={styles.formstyling}>
        <form style={styles.formstylinginner}>
          <label style={styles.text}>
            Microorganism Name
            <input style={styles.textinputstyling} type="text" name="name" />

          </label>

          <label style={styles.text}>
            Description
            <input style={styles.textinputstyling1} type="text" name="description" />

          </label>

          <Button>
            Submit
          </Button>
        </form>
      </div>

      {/* <div style={styles.DepositBoxes}>
      <h1>
          Microorganism Name
      </h1>


      <h1>
          Description
      </h1>

      <Button>
          Submit
      </Button>

      </div> */}


    </div>

  );
};

export default DepositRequestForm;

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
  pageHeading: {
    background: ' rgb(51, 104, 198)',
    height    : 100,
    textAlign : 'center',
    display   : 'flex',
    margin    : 5,
    border    : '1px solid black',

  },

  pageHeadingContent: {
    display       : 'flex',
    height        : 100,
    color         : 'white',
    textAlign     : 'center',
    justifyContent: 'center',
    alignItems    : 'center'

  },
  dropdownstyling   : {
    margin    : 5,
    marginTop : 15,
    background: 'white',

  },
  DepositBoxes      : {
    marginTop: 20,
    border   : '1px solid black',

  },
  formstyling       : {
    alignItems    : 'center',
    textAlign     : 'left',
    display       : 'flex',
    justifyContent: 'flex-start',
    marginTop     : 20,
    border        : '1px solid black',
    width         : 900,
    margin        : 20

  },
  text              : {
    color     : 'Black',
    fontFamily: 'Arial',
    fontSize  : 26,
    margin    : 5,
    marginTop : 5

  },

  formstylinginner : {
    textAlign     : 'left',
    display       : 'flex',
    justifyContent: 'flex-start',
    height        : 350,
    marginTop     : 5

  },
  textinputstyling : {
    margin    : 5,
    border    : '1px solid #d3d3d3',
    fontFamily: 'Arial',
    fontSize  : 23,
    width     : 350,
    marginTop : 5

  },
  textinputstyling1: {
    margin    : 5,
    border    : '1px solid #d3d3d3',
    fontFamily: 'Arial',
    fontSize  : 23,
    height    : 100,
    width     : 350

  },

  root: {
    width      : 500,
    '& > * + *': {
      // marginTop: theme.spacing(3),
    },

  }
};

