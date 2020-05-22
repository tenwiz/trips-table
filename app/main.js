import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import matchSorter from "match-sorter";
import moment from "moment";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/trips")
      .then((res) => res.json())
      .then((data) => {
        setData(data.trips);
      });
  }, []);

  return (
    <ReactTable
      data={data}
      filterable
      defaultFilterMethod={(filter, row) =>
        String(row[filter.id]) === filter.value
      }
      columns={[
        {
          Header: "Confirmation Number",
          accessor: "confirmationNumber",
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["confirmationNumber"] }),
          filterAll: true,
        },
        {
          Header: "Travelers",
          id: "travelers",
          accessor: (d) => d.travelers,
          Cell: (rows) => (
            <div>
              {rows.value.map((row) => (
                <img
                  style={{ width: 25 }}
                  key={row.name}
                  title={row.name}
                  alt={row.name}
                  src={row.avatar}
                ></img>
              ))}
            </div>
          ),
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, {
              keys: [(item) => item.travelers.map((i) => i.name)],
            }),
          filterAll: true,
        },
        {
          Header: "From",
          id: "fromDateTime",
          accessor: (d) =>
            moment(d.fromDateTime).local().format("DD/MM/YYYY hh:mm:ss A"),
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["fromDateTime"] }),
          filterAll: true,
        },
        {
          Header: "To",
          id: "toDateTime",
          accessor: (d) =>
            moment(d.toDateTime).local().format("DD/MM/YYYY hh:mm:ss A"),
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["toDateTime"] }),
          filterAll: true,
        },
        {
          Header: "Location From",
          id: "fromLocation",
          accessor: (d) => d.fromLocation,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["fromLocation"] }),
          filterAll: true,
        },
        {
          Header: "Location To",
          id: "toLocation",
          accessor: (d) => d.toLocation,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["toLocation"] }),
          filterAll: true,
        },
        {
          Header: "Price",
          id: "price",
          accessor: (d) => d.price,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["price"] }),
          filterAll: true,
        },
        {
          Header: "Type",
          id: "tripType",
          accessor: (d) => d.tripType,
          filterMethod: (filter, rows) =>
            filter.value === "ALL"
              ? rows
              : matchSorter(rows, filter.value, { keys: ["tripType"] }),
          Filter: ({ filter, onChange }) => (
            <select
              onChange={(event) => onChange(event.target.value)}
              style={{ width: "100%" }}
              value={filter ? filter.value : "ALL"}
            >
              <option value="ALL">ALL</option>
              <option value="AIR">AIR</option>
              <option value="CAR">CAR</option>
              <option value="HOTEL">HOTEL</option>
              <option value="RAIL">RAIL</option>
            </select>
          ),
          filterAll: true,
        },
        {
          Header: "Vendor",
          id: "vendorName",
          accessor: (d) => d.vendorName,
          filterMethod: (filter, rows) =>
            matchSorter(rows, filter.value, { keys: ["vendorName"] }),
          filterAll: true,
        },
      ]}
      defaultPageSize={10}
      className="-striped -highlight"
    />
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
