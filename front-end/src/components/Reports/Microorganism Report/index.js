import { CircularProgress, Grid } from "@material-ui/core";
import CustomReportTable from "components/CustomReportTable";
import CustomTable from "components/CustomTable";
import SearchBar from "components/SearchBar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReport } from "../../../actions";

const MicroorganismReport = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  const report = useSelector((state) => state.report.fetchReport);
  useEffect(() => dispatch(getReport("microorganism")), []);
  useEffect(() => setData(report.data), [report.data]);

  const search = (data) => {
    return (
      data &&
      data.filter((row) => {
        const applyFilter =
          filter === "" || row.status.toLowerCase() === filter.toLowerCase();
        return applyFilter;
        //   applyFilter && row.accession_number
        //   &&
        //   row.accession_number
        //     .toString()
        //     .toLowerCase()
        //     .indexOf(query.toLowerCase()) > -1
        //     &&
        //   row.name &&
        //   row.name.toString().toLowerCase().indexOf(query.toLowerCase()) > -1
      })
    );
  };

  const requestSent = () => {
    return (
      <div className="fetch__data__div">
        <h3 className="fetch__data__title">Report is being fetched</h3>
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

  if (report.fetching) {
    return <div className="users__content__div">{requestSent()}</div>;
  }

  if (report.error.found) {
    return (
      <div className="users__content__div">
        {ErrorMessage(report.error.message)}
      </div>
    );
  }

  const microorganism_report_table_head = [
    {
      id: "accesion_number",
      align: "center",
      disablePadding: true,
      alignData: "center",
      label: "Accession Number",
    },
    {
      id: "name",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Name",
    },
    {
      id: "bio_hazard_level",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Bio Hazard Level",
    },

    {
      id: "organismType",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Organism Type",
    },
    {
      id: "other_collection_numbers",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Other Collection Numbers",
    },

    {
      id: "date_of_isolation",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Date of Isolation",
    },
    {
      id: "order_count",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Order Count",
    },
    {
      id: "deposit_count",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Deposit Count",
    },
  ];

  return (
    <Grid container direction="column">
      <Grid item xs lg md sm>
        <h4 style={{ margin: "2.3rem 1rem 1rem 2rem" }}>User Report</h4>
        <p style={{ color: "grey", fontSize: "14px", margin: "0 2rem" }}>
          Check the history of user in a comprehensive way in these reports
        </p>
      </Grid>
      <Grid item xs lg md sm style={{ margin: "1rem 0rem 0.7rem 2rem" }}>
        <SearchBar
          query={query}
          setQuery={setQuery}
          width="60%"
          margin="dense"
        />
      </Grid>
      <Grid item xs lg md sm style={{ margin: "0rem 0rem 1rem 2rem" }}>
        {console.log(search(data))}
        {data && (
          <CustomReportTable
            head={microorganism_report_table_head}
            rows={search(data)}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default MicroorganismReport;
