import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SERVER_URL } from '../constants';

const EditStudent = (props) => {
    const [open, setOpen] = useState(false);
    const [student, setStudent] = useState({
        student_id: '',
        name: '',
        email: ''
    });
    const [feedbackMessage, setFeedbackMessage] = useState('');

    useEffect(() => {
        setStudent({
            student_id: props.student.studentId,
            name: props.student.name,
            email: props.student.email
        });
    }, [props.student]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = () => {
        editStudent();
        if (props.onUpdate) {
            props.onUpdate();
        }
        handleClose();
    };

    const editStudent = () => {
        const token = sessionStorage.getItem("jwt");
        fetch(`${SERVER_URL}/student/${student.student_id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token 
            },
            body: JSON.stringify(student)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            setFeedbackMessage(data.message);
        })
        .catch(err => {
            console.error("Exception editing student:", err);
            setFeedbackMessage("Error editing student.");
        });
    };

    return (
        <div>
            <Button id="editStudent" variant="outlined" color="primary" style={{ margin: 10 }} onClick={handleClickOpen}>
                Edit Student
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Student</DialogTitle>
                  <DialogContent style={{ paddingTop: 20 }}>
                      <TextField 
                          id="name" 
                          value={student.name} 
                          autoFocus 
                          fullWidth 
                          label="Student Name" 
                          name="name" 
                          onChange={handleChange} 
                      />
                      <TextField 
                          id="email" 
                          value={student.email} 
                          fullWidth 
                          label="Student Email" 
                          name="email" 
                          onChange={handleChange} 
                      />
                      {feedbackMessage && <p>{feedbackMessage}</p>}
                  </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button id="edit" color="primary" onClick={handleEdit}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default EditStudent;
