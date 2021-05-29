import { CircularProgress, Grid } from "@material-ui/core";
import CustomReportTable from "components/CustomReportTable";
import CustomTable from "components/CustomTable";
import SearchBar from "components/SearchBar";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReport } from "../../../actions";

const PaymentReport = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");

  const report = useSelector((state) => state.report.fetchReport);
  useEffect(() => dispatch(getReport("payment")), []);
  useEffect(() => setData(report.data || []), [report.data]);
  //   useEffect(() => {
  //     dispatch(getMicroorganisms());
  //   }, []);

  //   useEffect(() => {
  //     setData(report.microorganisms || []);
  //   }, [catalogue]);

  const search = (data) => {
    return (
      data &&
      data.filter((row) => {
        const applyFilter =
          filter === "" || row.status.toLowerCase() === filter.toLowerCase();
        return (
          applyFilter &&
          row.username &&
          row.username.toString().toLowerCase().indexOf(query.toLowerCase()) >
            -1
          // ||
          // row.email.toString().toLowerCase().indexOf(query.toLowerCase()) >
          //   -1
        );
        //   ||
        // row.species_epithet
        //   .toString()
        //   .toLowerCase()
        //   .indexOf(query.toLowerCase()) > -1)
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

  const payment_report_table_head = [
    {
      id: "username",
      align: "center",
      disablePadding: true,
      alignData: "center",
      label: "Username",
    },
    {
      id: "email",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Email",
    },
    {
      id: "amount",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Amount",
    },
    {
      id: "date",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Date",
    },
    {
      id: "card",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Card",
    },

    {
      id: "status",
      align: "left",
      disablePadding: false,
      alignData: "left",
      label: "Status",
    },
  ];
  const onRowsDelete = (values) => {
    alert(`These values were requested to be deleted ${values}`);
  };
  return (
    <Grid container direction="column">
      <Grid item xs lg md sm>
        <h4 style={{ margin: "2.3rem 1rem 1rem 2rem" }}>Payment Report</h4>
        <p style={{ color: "grey", fontSize: "14px", margin: "0 2rem" }}>
          Check the history of payment in a comprehensive way in these reports
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
        {data && (
          <CustomReportTable
            head={payment_report_table_head}
            rows={search(data)}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default PaymentReport;
