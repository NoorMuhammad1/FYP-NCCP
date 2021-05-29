import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { confirmOrderDelivery, createDeposit } from "actions";
import DeleteIcon from "@material-ui/icons/Delete";

import PageHeader from "components/PageHeader";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { resetWarningCache } from "prop-types";

const DepositInformationForm = (props) => {
  const { data, setData, errors, setErrors, onAdd } = props;

  const handleDataChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const [open, setOpen] = useState(false);

  const handleAdd = () => {
    const heads = Object.keys(data);
    let found_error = false;
    let e = errors;
    for (let head in heads) {
      const name = heads[head];
      if (data[heads[head]] === "" && head != "quantity") {
        e[name] = true;
        found_error = true;
      } else {
        e[name] = false;
      }
    }
    if (!found_error) {
      onAdd();
    }
    console.log(e);
    setErrors({ ...e });
  };

  const styles = {
    informationContainer: {
      margin: "0.4rem",
    },
    button: {
      padding: "0.4rem 2rem",
      margin: "1rem 0",
    },
  };
  return (
    <Grid container spacing={3} lg md sm xs style={styles.informationContainer}>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextField
          name="genus"
          label="Genus"
          required
          fullWidth
          variant="outlined"
          value={data.genus}
          onChange={handleDataChange}
          error={errors.genus}
          helperText={errors.genus ? "Genus cannot be empty" : ""}
        />
      </Grid>
      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextField
          name="species"
          label="Species"
          required
          fullWidth
          variant="outlined"
          value={data.species}
          onChange={handleDataChange}
          error={errors.species}
          helperText={errors.species ? "Species cannot be empty" : ""}
        />
      </Grid>
      <Grid item item lg={6} md={6} sm={12} xs={12}>
        <FormControl variant="outlined" fullWidth error={errors.type}>
          <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
          <Select
            native
            value={data.type}
            onChange={handleDataChange}
            label="Type"
            inputProps={{
              name: "type",
            }}
            error={errors.type}
          >
            <option value="" />
            <option value={"Bactera"}>Bacteria</option>
            <option value={"Fungi"}>Fungi</option>
            <option value={"Yeast"}>Yeast</option>
            <option value={"Algaea"}>Algaea</option>
            <option value={"Microalgaea"}>Microalgaea</option>
            <option value={"Virus"}>Virus</option>
            <option value={"Phage"}>Virus</option>
          </Select>
          <FormHelperText error={errors.type}>
            A type must be selected
          </FormHelperText>
        </FormControl>
      </Grid>

      <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextField
          name="quantity"
          label="Quantity"
          required
          fullWidth
          type="number"
          variant="outlined"
          value={data.quantity}
          inputProps={{ min: 1 }}
          onChange={handleDataChange}
        />
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <TextField
          name="description"
          label="Description"
          required
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          value={data.description}
          inputProps={{ min: 1 }}
          onChange={handleDataChange}
          error={errors.description}
          helperText={errors.description ? "Description cannot be empty" : ""}
        />
        <Button
          variant="contained"
          style={styles.button}
          onClick={handleAdd}
          color="primary"
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

const DepositItemsTable = (props) => {
  const { items, onDelete } = props;
  const styles = {
    informationContainer: {
      margin: "0.4rem",
    },
    cart: {
      margin: "4rem 8rem",
      heading: {},
      subHeading: {
        color: "grey",
        fontSize: "14px",
      },
    },
    subHeading: {
      color: "grey",
      fontSize: "14px",
      marginRight: "0.5rem",
    },

    card: {
      padding: "1rem",
      // minHeight: "300px",
    },
    typeValue: {
      fontSize: "14px",
    },
    nameField: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      //   borderBottom: "1px solid #EEEEEE",
      padding: "1rem 0",
    },
    quantityField: {
      display: "flex",
      alignItems: "center",
      //   borderBottom: "1px solid #EEEEEE",
    },

    actionsField: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      //   borderBottom: "1px solid #EEEEEE",
    },
    quantityTextField: {
      width: "5rem",
      marginLeft: "0.6rem",
      fontSize: "14px",
    },
    actions: {
      justifyContent: "flex-end",
    },
    button: {
      padding: "0.8rem 2rem",
    },
    emptyCart: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "200px",
    },
    emptyCartMessage: {
      fontSize: "18px",
      // color: "#EEEEEE",
    },
  };
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      lg
      md
      sm
      xs
      style={styles.informationContainer}
    >
      {items.map((item, index) => (
        <Grid
          item
          lg
          sm
          xs
          md
          key={index}
          style={{ margin: "0.4rem", borderBottom: "1px solid #eeeeee" }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} style={styles.nameField}>
              <div>{`${item.genus} ${item.species}`}</div>
              <div>
                <span style={styles.subHeading}>Type:</span>
                <span style={styles.typeValue}>{item.type}</span>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={styles.quantityField}
            >
              <span style={styles.subHeading}>Quantity: </span>
              <span>{item.quantity}</span>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={2}
              lg={2}
              style={styles.actionsField}
            >
              <IconButton>
                <DeleteIcon onClick={(e) => onDelete(item)} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

const DepositType = (props) => {
  const { type, setType, error, setError } = props;
  const handleChangeType = (e) => {
    setType(e.target.value);
  };
  return (
    <>
      <Grid container lg sm md xs style={{ margin: "1rem" }}>
        <Grid
          item
          lg={4}
          md={4}
          sm={12}
          xs={12}
          style={{
            display: "flex",
            alignItems: "center",
          }}
          justify="flex-start"
        >
          Select a type of deposit*
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          sm={12}
          xs={12}
          style={{
            display: "flex",
          }}
        >
          <FormControl variant="outlined" error={error}>
            <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
            <Select
              native
              value={type}
              onChange={handleChangeType}
              label="Type"
              inputProps={{
                name: "type",
              }}
              error={error}
            >
              <option value="" />
              <option value={"Bactera"}>General</option>
              <option value={"Fungi"}>Patent</option>
              <option value={"Yeast"}>Safe</option>
            </Select>
            <FormHelperText error={error}>
              {error ? "A type must be selected" : ""}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

const CreateDeposit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const deposit = useSelector((state) => state.deposit);
  const auth = useSelector((state) => state.auth);
  const [data, setData] = useState({
    genus: "",
    species: "",
    quantity: 1,
    type: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    genus: false,
    species: false,
    quantity: false,
    type: false,
    description: false,
  });
  const [depositType, setDepositType] = useState("");
  const [depositTypeerror, setDepositTypeError] = useState(false);

  const [items, setItems] = useState([]);
  //   const deposit = useSelector((state) => deposit);

  const requestSent = () => {
    return (
      <div className="fetch__data__div">
        <h3 className="fetch__data__title">Your order is being confirmed</h3>
        <CircularProgress className="fetch__data__spinner" />
      </div>
    );
  };

  const ErrorMessage = (message) => {
    return (
      <div className="error__div">
        <h3 className="error__title">{message}</h3>
      </div>
    );
  };
  if (deposit.fetching) {
    return <div className="users__content__div">{requestSent()}</div>;
  }

  if (deposit.error.found) {
    return (
      <div className="users__content__div">
        {ErrorMessage(deposit.error.message)}
      </div>
    );
  }

  const reset = () => {
    setData({
      genus: "",
      species: "",
      quantity: 1,
      description: "",
      type: "",
    });
    setErrors({
      genus: false,
      species: false,
      quantity: false,
      description: false,
      type: false,
    });
    setItems([]);
    setDepositType("");
    setDepositTypeError(false);
  };

  const handleAddMicro = () => {
    setItems([...items, data]);
    setData({
      genus: "",
      species: "",
      quantity: 1,
      description: "",
      type: "",
    });
    setErrors({
      genus: false,
      species: false,
      quantity: false,
      description: false,
      type: false,
    });
  };

  const handleRemoveRow = (item) => {
    const new_data = items.filter(
      (d) => !(d.genus == item.genus && d.species != item.genus)
    );
    setItems([...new_data]);
  };

  const handleCreateDeposit = () => {
    if (items.length === 0) {
      const heads = Object.keys(data);
      let e = errors;
      for (let i in heads) {
        errors[heads[i]] = true;
      }
      console.log(e);
      setErrors({ ...e });
      return;
    }
    if (depositType === "") {
      setDepositTypeError(true);
      return;
    }
    if (!auth.authenticate) {
      history.push("/signin");
    } else {
      dispatch(createDeposit({ items, organismType: depositType }));
      reset();
    }
  };
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
          <Grid item xs sm md lg>
            <h4>Create Deposit</h4>
            <p style={styles.subHeading}>
              Fill in the following form to create a deposit request{" "}
            </p>
          </Grid>
          <Grid item>
            <Card>
              <CardContent>
                <DepositInformationForm
                  data={data}
                  setData={setData}
                  errors={errors}
                  setErrors={setErrors}
                  onAdd={handleAddMicro}
                />
                <DepositItemsTable items={items} onDelete={handleRemoveRow} />
                <DepositType
                  type={depositType}
                  setType={setDepositType}
                  error={depositTypeerror}
                  setError={setDepositTypeError}
                />
              </CardContent>
              <CardActions style={styles.CardActions}>
                <Button
                  color="primary"
                  variant="contained"
                  style={styles.button}
                  autoCapitalize
                  onClick={handleCreateDeposit}
                >
                  Send Request
                </Button>
              </CardActions>
            </Card>
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
  subHeading: {
    color: "grey",
    fontSize: "14px",
    marginRight: "0.5rem",
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

  CardActions: {
    margin: "0.8rem",
    justifyContent: "flex-end",
  },
};

export default CreateDeposit;
