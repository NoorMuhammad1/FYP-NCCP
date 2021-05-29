import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Autocomplete } from "@material-ui/lab";
import { fetchMicroorganismData, updateMicroorganismData } from "actions";
// import { TabPanel } from "@material-ui/lab";
import SideBar from "components/SideBar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialFormData } from "./initialFormData";
import { LabelNameData } from "./LabelNameData";
import MicroorganismDetailsValidator from "./MicroorganismDetailsValidator";
import useFormMicroorganismDetails from "./useFormMicroorganismDetails";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Card style={{ padding: "1rem 3rem" }} p={3}>
          <CardContent>{children}</CardContent>
        </Card>
      )}
    </div>
  );
};

const MicroorganismDetails = (props) => {
  const { id } = props.location.state;
  const dispatch = useDispatch();
  const micro = useSelector((state) => state.catalogue.fetchMicroorganism.data);
  const fetchMicroorganism = useSelector(
    (state) => state.catalogue.fetchMicroorganism
  );

  // Edit
  const [edit, setEdit] = useState(false);
  const handleEditChange = (e) => {
    if (edit) {
      handleSubmit(e);
    } else {
      setEdit(true);
    }
  };
  // Select tab
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, value) => {
    setSelectedTab(value);
  };

  //   Fetching Data

  useEffect(() => {
    dispatch(fetchMicroorganismData({ id }));
  }, []);

  useEffect(() => {
    setData(micro);
  }, [micro]);

  // Handlers
  const handleFormSubmission = () => {
    setEdit(false);
    dispatch(updateMicroorganismData({ data: value, id }));
  };

  //  Data and Validators
  const { handleSubmit, value, updateValue, errors, setData } =
    useFormMicroorganismDetails(
      initialFormData,
      handleFormSubmission,
      MicroorganismDetailsValidator
    );

  // Spinner Function
  const requestSent = () => {
    return (
      <div className="fetch__data__div">
        <h3 className="fetch__data__title">
          Microorganism Data is being fetched
        </h3>
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

  if (fetchMicroorganism.fetching) {
    return (
      <SideBar active="Catalogue">
        <div className="users__content__div">{requestSent()}</div>
      </SideBar>
    );
  }

  if (fetchMicroorganism.error.found) {
    return (
      <SideBar active="Catalogue">
        <div className="users__content__div">
          {ErrorMessage(fetchMicroorganism.error.message)}
        </div>
      </SideBar>
    );
  }
  return (
    <SideBar active="Catalogue">
      <div style={{ minHeight: "90vh" }}>
        {value.CoreDataSets && (
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h5>
              {" "}
              {`${value.CoreDataSets.Genus} ${value.CoreDataSets.SpeciesEpithet}`}
            </h5>
            <Button color="primary" onClick={handleEditChange}>
              {edit ? "Save" : "Edit"}
            </Button>
          </div>
        )}
        <AppBar position="static" color="white">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {Object.keys(value).map((val, index) => (
              <Tab label={LabelNameData[val]} key={index} />
            ))}
          </Tabs>
        </AppBar>

        {Object.keys(value).map((val, index) => (
          <TabPanel value={selectedTab} index={index} key={index}>
            <Grid container xs lg md sm direction="column" spacing={2}>
              {Object.keys(value[val]).map((data, i) => (
                <Grid item xs lg md sm>
                  {/* {data === "OtherCollectionNumbers" ? (
                    <Autocomplete
                      multiple
                      //   value={value[val][data]}
                      //   onChange={(e) => updateValue(e, val)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="standard"
                          label="Multiple values"
                          placeholder="Favorites"
                          //   error={errors[data]}
                          //   helperText={errors[data] ? errors[data] : ""}
                        />
                      )}
                    />
                  ) : ( */}
                  <TextField
                    label={LabelNameData[data]}
                    fullWidth
                    variant="outlined"
                    name={data}
                    disabled={!edit}
                    value={value[val][data]}
                    onChange={(e) => updateValue(e, val)}
                    error={errors[data]}
                    helperText={errors[data] ? errors[data] : ""}
                  />
                  {/* )} */}
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        ))}
        {/* <TabPanel value={selectedTab} index={0}>
          <Grid container lg sm md xs direction="column" spacing={2}>
            <Grid item lg sm md xs>
              <TextField
                label="Genus"
                fullWidth
                variant="outlined"
                helperText="Genus cannot be empty"
              />
            </Grid>
            <Grid item lg sm md xs>
              <TextField label="Species" fullWidth variant="outlined" />
            </Grid>
            <Grid item lg sm md xs>
              <TextField label="AccessionNumber" fullWidth variant="outlined" />
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          THis is the second tab
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          THis is the third tab
        </TabPanel>
        <TabPanel value={selectedTab} index={3}>
          THis is the fourth tab
        </TabPanel>
        <TabPanel value={selectedTab} index={4}>
          THis is the fifth tab
        </TabPanel>
        <TabPanel value={selectedTab} index={5}>
          THis is the sixth tab
        </TabPanel> */}
      </div>
    </SideBar>
  );
};

export default MicroorganismDetails;

{
  /* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div style={{ flexBasis: "33.3%" }}>Heading</div>
            <div style={{ color: "silver" }}>Description</div>
          </AccordionSummary>
          <AccordionDetails style={{ alignItems: "center" }}>
            <div style={{ flexBasis: "33.3%" }}>FieldNamedfgdfgfd</div>
            <div style={{ flexBasis: "67.7%" }}>
              <TextField
                variant="outlined"
                fullWidth
                
                style={{ margin: "0", padding: "0" }}
              />
            </div>
          </AccordionDetails>
        </Accordion> */
}
