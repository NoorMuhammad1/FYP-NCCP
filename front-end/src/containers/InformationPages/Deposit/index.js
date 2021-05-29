import { Button, Grid } from "@material-ui/core";
import PageHeader from "components/PageHeader";
import React from "react";
import { Link } from "react-router-dom";

const DepositInfo = () => {
  return (
    <>
      <PageHeader />
      <div style={styles.main}>
        <Grid
          container
          xs={11}
          sm={10}
          md={10}
          lg={10}
          style={styles.content}
          direction="column"
        >
          <Grid item>
            <div>information about out deposit plan</div>
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained" style={styles.button}>
              <Link style={styles.link} to={"/createDeposit"}>
                Let's create a Deposit
              </Link>
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

const styles = {
  main: {
    backgroundColor: "#EEEEEE",
    minHeight: "76.1vh",
  },
  content: {
    margin: "auto",
    padding: "3rem 0",
  },
  button: {
    padding: "0.8rem 3rem",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
};

export default DepositInfo;
