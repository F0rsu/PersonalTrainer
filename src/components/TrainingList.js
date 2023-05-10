import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddTraining from "./AddTraining";
import dayjs from "dayjs";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";



export default function TrainingList(){
    const [trainings, setTrainings] = useState([]);
    const [msg, setMsg] = React.useState("");
  const [open, setOpen] = React.useState(false);
    
    
    const fetchTrainings = () => {
      console.log("haetaan treenejä");
      fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data));
    }
    
   
   
   
    
    const addTraining = (training) => {
      console.log(training);
      fetch("https://traineeapp.azurewebsites.net/api/trainings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(training),
      }).then((response) => {
        if (response.ok) {
          fetchTrainings();
        }
      });
    };
   
   
  const deleteTraining = (link) => {
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("Customer deleted");
            setOpen(true);
            fetchTrainings();
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.log("err"));
    }
  };








    
    useEffect(()=>{
        fetchTrainings();
    }, [])
   
    
   
   
   
    const [columnDefs, setColumnDefs] = useState([
        
        { 
            headerName: "date", 
            field: "date", 
            sortable: true, 
            filter: true, 
            floatingFilter: true,
            cellRenderer: (params) => {
              const date = dayjs(params.value); // Convert the date value to a dayjs object
              const formattedDate = date.format('DD.MM.YYYY HH:mm'); // Use the format method to convert the date to the desired format
              return <div>{formattedDate}</div>; // Return the formatted date as the content of the cell
            }
          },
        { headerName: "duration", field: "duration", sortable: true, filter: true, floatingFilter:true },
        { headerName: "activity", field: "activity", sortable: true, filter: true, floatingFilter:true },
        { headerName: "customer",
            field: "customer",
            sortable: true,
            filter: true,
            floatingFilter: true,
            cellRenderer: (params) => (
              <div>
                {params.value ? `${params.value.firstname} ${params.value.lastname}` : ''}
              </div>
            )
            
          },
          {
            headerName: "",
            width: 100,
            field: "links.0.href",
            cellRenderer: (params) => (
              <IconButton color="error" onClick={() => deleteTraining(params.value)}>
                <DeleteIcon />
              </IconButton>
            ),
          },
    
    
    
        ])
        




    return(
      
      
        <div>
          
            <div
          style={{ height: 600, width: "90%" }}
          className="ag-theme-material"
        >
          <AgGridReact
            rowData={trainings}
            columnDefs={columnDefs}
            paginationPageSize={10}
            pagination={true}
          />
        </div>
        
        <AddTraining addTraining={addTraining} trainings={trainings} type="training" />
        
        
        </div>
        
    )
}