import { Button } from "@mui/material";
import React, { useState, useEffect }  from "react";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from "@mui/material/TextField/TextField";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import AddIcon from '@mui/icons-material/Add';





function AddCustomer (props) {
const {addCustomer} = props;

const [open, setOpen] = React.useState(false);
  const [customer, setCustomer] = React.useState({
    
    firstname:"",
    lastname:"",
    streetaddress:"",
    postcode: "",
    city:"",
    email:"",
    phone:"",
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
    addCustomer(customer);
    handleClose();
    setCustomer({
        
        firstname:"",
        lastname:"",
        streetaddress:"",
        postcode: "",
        city:"",
        email:"",
        phone:"",
    });
  };



  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };




  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new customer</DialogTitle>
        <div style={{ margin: 10 }}>
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            label="Firstname"
            fullWidth
            value={customer.firstname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="lastname"
            label="Lastname"
            fullWidth
            value={customer.lastname}
            onChange={handleChange}
          />
          
          
          
          <TextField
            margin="dense"
            name="streetaddress"
            label="Streetaddress"
            fullWidth
            value={customer.streetaddress}
            onChange={handleChange}
          />
          
          
          
          
          
          <TextField
            margin="dense"
            name="postcode"
            label="Postcode"
            fullWidth
            value={customer.postcode}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            fullWidth
            value={customer.city}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            fullWidth
            value={customer.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            fullWidth
            value={customer.phone}
            onChange={handleChange}
          />
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Dialog>
    </div>
  );


}

export default AddCustomer;















