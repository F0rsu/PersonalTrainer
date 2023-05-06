import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = () => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content));
  };

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  useEffect(() => {
    fetchCustomers();
  }, []);

  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "firstname",
      field: "firstname",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "lastname",
      field: "lastname",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "streetaddress",
      field: "streetaddress",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "postcode",
      field: "postcode",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "city",
      field: "city",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "email",
      field: "email",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "phone",
      field: "phone",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
  ]);

  return (
    <div>
      <div style={{ height: "100%", boxSizing: "border-box" }}>
        <div style={{ height: 600, width: "90%" }} className="ag-theme-material">
          <AgGridReact
            rowData={customers}
            columnDefs={columnDefs}
            paginationPageSize={10}
            pagination={true}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomerList;