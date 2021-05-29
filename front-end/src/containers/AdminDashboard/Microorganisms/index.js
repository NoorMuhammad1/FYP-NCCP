import React, { useState } from "react";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import DropDown from "../../../components/DropDown";
import SideBar from "../../../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "components/SearchBar";
import CustomTable from "components/CustomTable";
import { useEffect } from "react";
import { getDeposits, getMicroorganisms } from "actions";
import { Link } from "react-router-dom";

const AdminDashboardMicroorganisms = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  // const [sortBy, setSortBy] = useState("");
  const [filter, setFilter] = useState("");

  const catalogue = useSelector((state) => state.catalogue);

  useEffect(() => {
    dispatch(getMicroorganisms());
  }, []);

  useEffect(() => {
    setData(catalogue.getMicroorganisms.microorganisms || []);
  }, [catalogue]);

  const search = (data) => {
    return (
      data &&
      data.filter((row) => {
        const applyFilter =
          filter === "" || row.status.toLowerCase() === filter.toLowerCase();
        return (
          applyFilter &&
          (row.microorganism_id
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) > -1 ||
            row.genus.toString().toLowerCase().indexOf(query.toLowerCase()) >
              -1 ||
            row.species_epithet
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1)
        );
      })
    );
  };

  const requestSent = () => {
    return (
      <div className="fetch__data__div">
        <h3 className="fetch__data__title">Microorganisms are being fetched</h3>
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

  if (catalogue.getMicroorganisms.fetching) {
    return (
      <SideBar active="Users">
        <div className="users__content__div">{requestSent()}</div>
      </SideBar>
    );
  }

  if (catalogue.getMicroorganisms.error.found) {
    return (
      <SideBar active="Users">
        <div className="users__content__div">
          {ErrorMessage(catalogue.getMicroorganisms.error.message)}
        </div>
      </SideBar>
    );
  }

  const catalogue_table_head = [
    {
      id: "microorganism_id",
      align: "left",
      disablePadding: true,
      alignData: "left",
      label: "Microorganism ID",
    },
    {
      id: "genus",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Genus",
    },
    {
      id: "species_epithet",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Species Epithet",
    },
    {
      id: "organism_type",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Organism Type",
    },
    {
      id: "status",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Type/Non-Type",
    },
    {
      id: "bio_hazard_level",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Bio Hazard Level",
    },
  ];
  const onRowsDelete = (values) => {
    alert(`These values were requested to be deleted ${values}`);
  };

  return (
    <SideBar active="Catalogue">
      <div style={{ minHeight: "87.3vh" }}>
        <Grid container spacing={2} style={{ margin: "1rem 0" }}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <DropDown
              title="Status"
              value={filter}
              setValue={setFilter}
              variant="outlined"
              labelWidth={60}
              width="100%"
              // margin="dense"
              data={[
                {
                  title: "Bacteria",
                  value: "Bacteria",
                },
                {
                  title: "Fungi",
                  value: "Fungi",
                },
                {
                  title: "Antibody",
                  value: "Antibody",
                },
                {
                  title: "Archaea",
                  value: "Archaea",
                },
                {
                  title: "Microalgae",
                  value: "Microalgae",
                },
                {
                  title: "Phage",
                  value: "Phage",
                },
                {
                  title: "Virus",
                  value: "Virus",
                },
                {
                  title: "Yeast",
                  value: "Yeast",
                },
              ]}
            />
          </Grid>
          <Grid
            item
            lg={9}
            md={9}
            sm={12}
            xs={12}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SearchBar
              width="100%"
              // margin="dense"
              query={query}
              setQuery={setQuery}
            />
          </Grid>
        </Grid>
        {/* <Grid container lg sm md xs spacing={3}>
        <Grid
          item
          lg={2}
          md={2}
          sm={12}
          xs={12}
          style={{
            padding: "0",
            display: "flex",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <DropDown
            title="Status"
            value={filter}
            setValue={setFilter}
            variant="outlined"
            labelWidth={60}
            width="100%"
            margin="dense"
            data={[
              {
                title: "Bacteria",
                value: "Bacteria",
              },
              {
                title: "Fungi",
                value: "Fungi",
              },
              {
                title: "Antibody",
                value: "Antibody",
              },
              {
                title: "Archaea",
                value: "Archaea",
              },
              {
                title: "Microalgae",
                value: "Microalgae",
              },
              {
                title: "Phage",
                value: "Phage",
              },
              {
                title: "Virus",
                value: "Virus",
              },
              {
                title: "Yeast",
                value: "Yeast",
              },
            ]}
          />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          sm={12}
          xs={12}
          // style={{ display: "flex", alignItems: "center" }}
        >
          <SearchBar query={query} setQuery={setQuery} />
        </Grid>
        <Grid item lg={2} md={2} sm={12} xs={12}>
          <Button
            color="primary"
            variant="contained"
            style={{ width: "100%", height: "100%" }}
          >
            + Add Microorganism
          </Button>
        </Grid>
      </Grid> */}
        {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "3rem",
        }}
      >
        <SearchBar query={query} setQuery={setQuery} />
        <div>
          <DropDown
            title="Status"
            value={filter}
            setValue={setFilter}
            variant="outlined"
            labelWidth={60}
            width="150px"
            data={[
              {
                title: "Bacteria",
                value: "Bacteria",
              },
              {
                title: "Fungi",
                value: "Fungi",
              },
              {
                title: "Antibody",
                value: "Antibody",
              },
              {
                title: "Archaea",
                value: "Archaea",
              },
              {
                title: "Microalgae",
                value: "Microalgae",
              },
              {
                title: "Phage",
                value: "Phage",
              },
              {
                title: "Virus",
                value: "Virus",
              },
              {
                title: "Yeast",
                value: "Yeast",
              },
            ]}
          />
        </div>
      </div> */}
        <div style={{ marginTop: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              margin: "0.5rem 0",
            }}
          >
            <Button color="primary" variant="contained">
              <Link
                to="/adminDashboard/addMicroorganism"
                style={{ color: "white", textDecoration: "none" }}
              >
                + Add Microorganism
              </Link>
            </Button>
          </div>
          <CustomTable
            head={catalogue_table_head}
            rows={search(data)}
            type="Microorganisms"
            onDelete={onRowsDelete}
            showDetails={"/adminDashboard/MicroorganismDetails"}
          />
        </div>
      </div>
    </SideBar>
  );
};

export default AdminDashboardMicroorganisms;
