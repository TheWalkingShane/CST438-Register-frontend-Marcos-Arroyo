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
  const [feedbackMessage, setFeedbackMessage] = useState(''); // Feedback for the user

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
    // Extract the JWT token from the session storage
    const token = sessionStorage.getItem("jwt");

    fetch(`${SERVER_URL}/student`, { 
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token // Add the JWT token to the request header
        },
        body: JSON.stringify(student)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        return res.json(); // Assuming server responds with a json message
    })
    .then(data => {
        // Show feedback message based on the response from the server
        setFeedbackMessage(data.message);
    })
    .catch(error => {
        console.error("Exception adding student:", error);
        setFeedbackMessage("Error adding student.");
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
              {feedbackMessage && <p>{feedbackMessage}</p>} {/* Display feedback message if it exists */}
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
