import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTraining from "./AddTraining";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [msg, setMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const fetchCustomers = () => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content));
  };

  const addCustomer = (customer) => {
    fetch("https://traineeapp.azurewebsites.net/api/customers", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(customer),
    }).then((response) => {
      if (response.ok) {
        fetchCustomers();
      }
    });
  };

 
 
 
 
 
 
 
 
 
 
 
 
 
 
  const updateCustomer = (updateCustomer, link) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updateCustomer),
    })
      .then((response) => {
        if (response.ok) {
          setMsg("Customer edited successfully");
          setOpen(true);
          fetchCustomers();
        } else {
          alert("Something went wrong while editing the customer.");
        }
      })
      .catch((err) => console.error(err));
  };

  const deleteCustomer = (link) => {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("Customer deleted");
            setOpen(true);
            fetchCustomers();
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.log("err"));
    }
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

    
    
    
   
    
    
    
    {
      headerName: "",
      width: 100,
      field: "links.0.href",
      cellRenderer: (params) => (
        <EditCustomer updateCustomer={updateCustomer}  params={params} />

      ),
    },
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    {
      headerName: "",
      width: 100,
      field: "links.0.href",
      cellRenderer: (params) => (
        <IconButton color="error" onClick={() => deleteCustomer(params.value)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ]);

  return (
    <div>
      <div style={{ height: "100%", boxSizing: "border-box" }}>
        <div
          style={{ height: 600, width: "99%" }}
          className="ag-theme-material"
        >
          <AgGridReact
            rowData={customers}
            columnDefs={columnDefs}
            paginationPageSize={10}
            pagination={true}
          />
        </div>
      </div>

      <AddCustomer addCustomer={addCustomer} />
    </div>
  );
}

export default CustomerList;
