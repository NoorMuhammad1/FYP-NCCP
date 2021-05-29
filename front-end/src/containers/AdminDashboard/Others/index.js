import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";
import {
  addDocument,
  getPricesAndDocuments,
  removeDocuments,
  updatePrices,
  share,
} from "actions";
import SideBar from "components/SideBar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const PriceSection = (props) => {
  const dispatch = useDispatch();
  const price = useSelector((state) => state.other.prices);

  const [data, setData] = useState({
    order: 0,
    general_deposit: 0,
    safe_deposit: 0,
    patent_deposit: 0,
  });

  const [errors, setErrors] = useState({
    order: undefined,
    general_deposit: undefined,
    safe_deposit: undefined,
    patent_deposit: undefined,
  });

  const handleSubmit = () => {
    let error_check = {};
    if (!data.order) {
      error_check.order = "Order Price cannot be empty";
    }
    if (!data.general_deposit) {
      error_check.general_deposit = "General Deposit Price cannot be empty";
    }
    if (!data.safe_deposit) {
      error_check.safe_deposit = "Safe Deposit Price cannot be empty";
    }
    if (!data.patent_deposit) {
      error_check.patent_deposit = "Patent Deposit Price cannot be empty";
    }
    if (Object.keys(error_check).length == 0) {
      dispatch(updatePrices(data));
    } else {
      setErrors(error_check);
    }
  };
  const handleUpdate = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    price && setData(price.data);
  }, [price]);
  return (
    <Grid
      container
      direction="column"
      component={Paper}
      spacing={4}
      style={{ width: "100%", margin: "0 0.1rem" }}
    >
      <Grid item>
        <h5>Prices</h5>
        <p style={{ color: "#99A1AE" }}>
          Set the prices of the services that are provided by NCCP
        </p>
      </Grid>

      <Grid item style={{ width: "100%" }}>
        <TextField
          variant="outlined"
          label="Order Price"
          type="number"
          name="order"
          value={data.order}
          onChange={handleUpdate}
          inputProps={{ min: 0 }}
          error={errors.order}
          helperText={errors.order ? errors.order : ""}
          style={{ backgroundColor: "white", minWidth: "22rem" }}
        />
      </Grid>
      <Grid item>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              variant="outlined"
              label="General Deposit Price"
              type="number"
              name="general_deposit"
              value={data.general_deposit}
              onChange={handleUpdate}
              fullWidth
              inputProps={{ min: 0 }}
              error={errors.general_deposit}
              helperText={errors.general_deposit ? errors.general_deposit : ""}
              style={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              variant="outlined"
              label="Safe Deposit Price"
              type="number"
              name="safe_deposit"
              value={data.safe_deposit}
              onChange={handleUpdate}
              fullWidth
              inputProps={{ min: 0 }}
              error={errors.safe_deposit}
              helperText={errors.safe_deposit ? errors.safe_deposit : ""}
              style={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <TextField
              variant="outlined"
              label="Patent Deposit Price"
              type="number"
              name="patent_deposit"
              value={data.patent_deposit}
              onChange={handleUpdate}
              fullWidth
              inputProps={{ min: 0 }}
              error={errors.patent_deposit}
              helperText={errors.patent_deposit ? errors.patent_deposit : ""}
              style={{ backgroundColor: "white" }}
            />
          </Grid>
          <Grid
            item
            xs
            lg
            md
            sm
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Button
              style={{
                // backgroundColor: "#0621D4",
                padding: "0.6rem 2rem",
                // color: "white",
              }}
              color="primary"
              variant="contained"
              onClick={handleSubmit}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const DocumentSection = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const documents = useSelector((state) => state.other.documents);
  const [documentData, setDocumentData] = useState({
    title: "",
    document: "",
    type: "",
  });

  const [errors, setError] = useState({
    title: "",
    document: "",
    type: "",
  });
  useEffect(() => setData(documents.data), [documents.data]);

  const handleChange = (e) => {
    let value = "";
    if (e.target.type == "file") {
      value = e.target.files[0];
    }
    if (e.target.type == "select-one") {
      value = e.target.value;
    }
    if (e.target.type == "text") {
      value = e.target.value;
    }
    setDocumentData({
      ...documentData,
      [e.target.name]: value,
    });
  };
  const handleDocumentAdd = () => {
    let error_check = {};
    if (!documentData.title) {
      error_check.title = "Document Title cannot be empty";
    }
    if (!documentData.document) {
      error_check.document = "A document must be uploaded";
    }
    if (!documentData.type) {
      error_check.type = "Document Type must be selected";
    }
    if (Object.keys(error_check).length == 0) {
      const form = new FormData();
      form.append("title", documentData.title);
      form.append("documentFor", documentData.type);
      form.append("file", documentData.document);
      dispatch(addDocument(form));
    } else {
      alert(documentData.type);
      setError(error_check);
    }
  };
  const handleDocumentRemove = (doc) => {
    dispatch(removeDocuments({ document_id: doc._id }));
  };

  return (
    <Grid
      container
      direction="column"
      spacing={4}
      style={{ width: "100%", margin: "0 0.1rem" }}
      component={Paper}
    >
      <Grid item xs lg md sm>
        <h5>Documents</h5>
        <p style={{ color: "#99A1AE" }}>
          View and change the documents for order and deposit services
        </p>
      </Grid>
      <Grid item xs lg md sm>
        <p style={{ color: "#99A1AE" }}>
          Add a new document by filling in this form
        </p>{" "}
        <Grid container direction="column" xs lg md sm spacing={2}>
          <Grid item xs lg md sm>
            <TextField
              variant="outlined"
              label="Title"
              inputProps={{ name: "title" }}
              value={documentData.title}
              onChange={handleChange}
              error={errors.title}
              helperText={errors.title ? errors.title : ""}
            />
            <FormControl style={{ margin: "0 1rem" }} variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
              <Select
                native
                value={data.type}
                onChange={handleChange}
                label="Type"
                inputProps={{
                  name: "type",
                }}
                error={errors.type}
              >
                <option value="" />
                <option value={"order"}>Order</option>
                <option value={"general_deposit"}>General deposit</option>
                <option value={"safe_deposit"}>Safe Deposit</option>
                <option value={"patent_deposit"}>Patent Deposit</option>
              </Select>
              <FormHelperText>{errors.type ? errors.type : ""}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs sm md lg>
            <Grid container>
              <Grid item sm lg md xs>
                <TextField
                  variant="outlined"
                  // margin="dense"
                  value={documentData.document.name || ""}
                  fullWidth
                  disabled
                  error={errors.document}
                  helperText={errors.document ? errors.document : ""}
                />
              </Grid>
              <Grid item style={{ display: "flex", alignItems: "center" }}>
                <Button variant="text" color="primary" component="label">
                  Browse
                  <input
                    name="document"
                    hidden
                    type="file"
                    onChange={handleChange}
                  />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs lg md sm>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDocumentAdd}
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          direction="column"
          spacing={4}
          style={{ margin: "2rem 0" }}
        >
          <Grid item xs lg md sm>
            <p style={{ color: "#99A1AE" }}>
              Following are the documents for orders{" "}
            </p>{" "}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Name</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Remove</TableCell>
                </TableHead>
                <TableBody>
                  {data.order &&
                    data.order.map((doc, index) => (
                      <TableRow key={index}>
                        <TableCell>{doc.title}</TableCell>
                        <TableCell>
                          <a href={doc.document} target="_blank">
                            Here
                          </a>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="default"
                            component="label"
                            onClick={(e) => handleDocumentRemove(doc)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                        {/* <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        component="label"
                      >
                        Submit
                        <input type="file" hidden />
                      </Button>
                    </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs lg md sm>
            <p style={{ color: "#99A1AE" }}>
              Following are the documents for general deposit{" "}
            </p>{" "}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Name</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Remove</TableCell>
                </TableHead>
                <TableBody>
                  {data.general_deposit &&
                    data.general_deposit.map((doc, index) => (
                      <TableRow key={index}>
                        <TableCell>{doc.title}</TableCell>
                        <TableCell>
                          <a href={doc.document} target="_blank">
                            Here
                          </a>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="default"
                            component="label"
                            onClick={(e) => handleDocumentRemove(doc)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                        {/* <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        component="label"
                      >
                        Submit
                        <input type="file" hidden />
                      </Button>
                    </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs lg md sm>
            <p style={{ color: "#99A1AE" }}>
              Following are the documents for safe deposit{" "}
            </p>{" "}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Name</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Remove</TableCell>
                </TableHead>
                <TableBody>
                  {data.safe_deposit &&
                    data.safe_deposit.map((doc, index) => (
                      <TableRow key={index}>
                        <TableCell>{doc.title}</TableCell>
                        <TableCell>
                          <a href={doc.document} target="_blank">
                            Here
                          </a>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="default"
                            component="label"
                            onClick={(e) => handleDocumentRemove(doc)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                        {/* <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        component="label"
                      >
                        Submit
                        <input type="file" hidden />
                      </Button>
                    </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs lg md sm>
            <p style={{ color: "#99A1AE" }}>
              Following are the documents for patent deposit{" "}
            </p>{" "}
            <TableContainer>
              <Table>
                <TableHead>
                  <TableCell>Name</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Remove</TableCell>
                </TableHead>
                <TableBody>
                  {data.patent_deposit &&
                    data.patent_deposit.map((doc, index) => (
                      <TableRow key={index}>
                        <TableCell>{doc.title}</TableCell>
                        <TableCell>
                          <a href={doc.document} target="_blank">
                            Here
                          </a>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="default"
                            component="label"
                            onClick={(e) => handleDocumentRemove(doc)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                        {/* <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        component="label"
                      >
                        Submit
                        <input type="file" hidden />
                      </Button>
                    </TableCell> */}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const ShareDataSection = (props) => {
  const dispatch = useDispatch();
  const shareData = useSelector((state) => state.other.shareData);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    // username:'',
    // password:"",
  });

  const handleUpdate = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    let error_check = {};
    if (!data.username) {
      error_check.username = "username cannot be empty";
    }
    if (!data.password) {
      error_check.password = "passwod cannot by empty";
    }
    if (Object.keys(error_check).length === 0) {
      dispatch(share(data));
    } else {
      setErrors(error_check);
    }
  };
  return (
    <Grid
      container
      direction="column"
      component={Paper}
      spacing={4}
      style={{ width: "100%", margin: "0 0.1rem" }}
    >
      <Grid item xs lg md sm>
        <h5>Share</h5>
        <p style={{ color: "#99A1AE" }}>
          You can upload your catalogue to WDCM using the following form
        </p>{" "}
      </Grid>
      <Grid item xs lg md sm>
        {shareData.fetching && (
          <div>
            <p>Sharing data please wait</p>
            <CircularProgress />
          </div>
        )}
        {/* {alert(shareData.fetched && shareData.error.found)} */}
        {shareData.fetched && !shareData.error.found && (
          <div>
            <p>Data has been shared successfully</p>
          </div>
        )}
        {shareData.error.found && (
          <div>
            <h5>Error</h5>
            <p>{shareData.error.message}</p>
          </div>
        )}
        {!shareData.fetching && !shareData.fetching && !shareData.error.found && (
          <Grid container spacing={3}>
            <Grid item xs lg={6} md={6} sm={6}>
              <TextField
                variant="outlined"
                value={data.username}
                fullWidth
                name="username"
                label="Username"
                error={errors.username}
                onChange={handleUpdate}
                helperText={errors.username ? errors.username : ""}
              />
            </Grid>
            <Grid item xs lg={6} md={6} sm={6}>
              <TextField
                variant="outlined"
                value={data.password}
                fullWidth
                name="password"
                label="Password"
                error={errors.password}
                onChange={handleUpdate}
                helperText={errors.password ? errors.password : ""}
              />
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Share
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

const Others = (props) => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getPricesAndDocuments()), []);
  return (
    <SideBar active="Others">
      <div style={{ minHeight: "90vh", minWidth: "100%" }}>
        <h3 style={{ fontWeight: "bold", marginBottom: "1.5rem" }}>Others</h3>

        <Grid contianer direction="column" spacing={6}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <PriceSection />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ marginTop: "3rem" }}
          >
            <DocumentSection />
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ marginTop: "3rem" }}
          >
            <ShareDataSection />
          </Grid>
        </Grid>
      </div>
    </SideBar>
  );
};

export default Others;
