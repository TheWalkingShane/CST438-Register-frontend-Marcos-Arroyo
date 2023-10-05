import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SERVER_URL } from '../constants';

function AddStudent(props) { 
  const [open, setOpen] = useState(false);
  const [student, setStudent] = useState({ name: '', email: '' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleAdd = () => {
    addStudent();
    handleClose();
  }

  const addStudent = () => {
    fetch(`${SERVER_URL}/student`, { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    })
    .then(res => {
        if (!res.ok) {
            console.log('Error adding student:', res.status);
        }
    })
    .catch(err => {
        console.error("Exception adding student:", err);
    })
  }

  return (
      <div>
        <Button id="addStudent" variant="outlined" color="primary" style={{ margin: 10 }} onClick={handleClickOpen}>
          Add Student
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Student</DialogTitle>
            <DialogContent style={{ paddingTop: 20 }}>
              <TextField 
                  id="name" 
                  fullWidth 
                  label="Student Name" 
                  name="name" 
                  onChange={handleChange}  
              /> 
              <TextField 
                  id="email" 
                  autoFocus 
                  fullWidth 
                  label="Student Email" 
                  name="email" 
                  onChange={handleChange}  
              /> 
            </DialogContent>
            <DialogActions>
              <Button color="secondary" onClick={handleClose}>Cancel</Button>
              <Button id="add" color="primary" onClick={handleAdd}>Add</Button>
            </DialogActions>
          </Dialog>      
      </div>
  ); 
}

export default AddStudent;
