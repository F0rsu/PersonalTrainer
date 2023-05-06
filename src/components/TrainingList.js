import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import dayjs from "dayjs";





export default function TrainingList(){
    const [trainings, setTrainings] = useState([]);
    
    useEffect(()=>{
        fetchTrainings();
    }, [])
    

    const fetchTrainings = () => {
        console.log("haetaan treenejä");
        fetch("https://traineeapp.azurewebsites.net/gettrainings")
        .then((response) => response.json())
        .then((data) => setTrainings(data));
    }
    
   
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
                {params.value.firstname} {params.value.lastname}
              </div>
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
        </div>
        
    )
}