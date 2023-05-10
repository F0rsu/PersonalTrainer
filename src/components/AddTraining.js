import { Button } from "@mui/material";
import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField/TextField";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import AddIcon from "@mui/icons-material/Add";

import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { parseISO } from "date-fns";
import { format } from "date-fns";
import { MobileDatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";




function AddTraining(props) {
  const { addTraining, type, } = props;

  const [open, setOpen] = React.useState(false);
  const [training, setTraining] = React.useState({
    date: "",
    duration: "",
    activity: "",
    customer: "",
  });

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    const parsedDate = new Date(training.date);
    const isoDate = moment(parsedDate).toISOString();
  
    addTraining({ ...training, date: isoDate });
    handleClose();
    setTraining({
      date: "",
      duration: "",
      activity: "",
      customer: "",
    });
  };

  
 
 
 
 
 
  const handleChange = (event) => {
    let value = event.target.value;
    if (event.target.name === "duration") {
      value = parseInt(value);
    }
    
    
    
    
    
    
    
    setTraining({ ...training, [event.target.name]: value });
  };

 ;

  return (
    
    <div>
      {console.log(props.trainings)}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new training</DialogTitle>
          <div style={{ margin: 10 }}>
            
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date"
              inputFormat="dd.MM.yyyy HH:mm"
              value={training.date ? parseISO(training.date) : null}
              onChange={(date) => setTraining({ ...training, date: date })}
              
            />
           </LocalizationProvider>
          
          
          
          
            <TextField
              
              margin="dense"
              name="duration"
              label="Duration"
              type="number"
              fullWidth
              value={training.duration}
              onChange={handleChange}
              inputProps={{ min: 0 }}
            />

            <TextField
              autoFocus
              margin="dense"
              name="activity"
              label="Activity"
              fullWidth
              value={training.activity}
              onChange={handleChange}
            />

          
         

            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </Dialog>
      </div>
    
  );
}

export default AddTraining;
