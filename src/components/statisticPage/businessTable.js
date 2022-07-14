import React from "react";
import BootstrapTable from "react-bootstrap-table-next";

export default function BusinessTable({ data }) {
  data.forEach((element, index) => {
    element.id = index;
  });

  const columns = [
    {
      dataField: "most_popular_service",
      text: "Most Popular Service",
    },
    {
      dataField: "least_popular_service",
      text: "Least Popular Service",
    },
    {
      dataField: "active",
      text: "Active",
    },
    {
      dataField: "completed",
      text: "Completed",
    },
    {
      dataField: "approved",
      text: "Approved",
    },
    {
      dataField: "declined",
      text: "Declined",
    },
    {
      dataField: "business_orders_count",
      text: "Total Amount of Orders",
    },
    {
      dataField: "business_profit",
      text: "Profit",
    },
    {
      dataField: "business_average_order",
      text: "Avarage Order Price",
    },
  ];

  return (
    <BootstrapTable
      keyField="id"
      data={data}
      columns={columns}
      hover
      condensed
      striped
    />
  );
}
