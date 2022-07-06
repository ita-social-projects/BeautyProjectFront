import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit";

export default function SpecialistsTable({ data }) {
  const { SearchBar } = Search;

  data.forEach((element, index) => {
    element.id = index;
  });

  const columns = [
    {
      dataField: "specialist_name",
      text: "Specialist Name",
      sort: true,
    },
    {
      dataField: "most_pop_service",
      text: "Most Popular Service",
      sort: true,
    },
    {
      dataField: "least_pop_service",
      text: "Least Popular Service",
      sort: true,
    },
    {
      dataField: "active",
      text: "Active",
      sort: true,
    },
    {
      dataField: "completed",
      text: "Completed",
      sort: true,
    },
    {
      dataField: "approved",
      text: "Approved",
      sort: true,
    },
    {
      dataField: "declined",
      text: "Declined",
      sort: true,
    },
    {
      dataField: "specialist_orders_count",
      text: "Total Amount of Orders",
      sort: true,
    },
    {
      dataField: "specialist_orders_profit",
      text: "Profit",
      sort: true,
    },
  ];

  return (
    <ToolkitProvider
      className="mb-5"
      keyField="id"
      data={data}
      columns={columns}
      search
    >
      {(props) => (
        <div>
          <SearchBar {...props.searchProps} srText={null} />
          <br />
          <BootstrapTable
            {...props.baseProps}
            hover
            condensed
            striped
            bootstrap4
          />
        </div>
      )}
    </ToolkitProvider>
  );
}
