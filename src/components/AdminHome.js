import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import Button from '@mui/material/Button';

const AdminHome = () => {
    const [students, setStudents] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        fetch(`${SERVER_URL}/student`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setStudents(data);
        })
        .catch(err => {
            console.error(err);
            setFeedbackMessage("Error fetching students.");
        });
    }

    const dropStudent = (studentId) => {
        if (window.confirm('Are you sure you want to drop the student?')) {
            fetch(`${SERVER_URL}/student/${studentId}?force=yes`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    fetchStudents();
                } else {
                    console.log("Error dropping student with status:", res.status);
                    setFeedbackMessage("Error dropping student.");
                }
            })
            .catch(err => {
                console.error("Exception dropping student:", err);
                setFeedbackMessage("Exception dropping student.");
            });
        }
    };

    const headers = ['ID', 'Name', 'Email', 'Status', 'Status Code', '', ''];

    return (
        <div> 
            <div margin="auto">
                <h3>Student List</h3>
                {feedbackMessage && <p>{feedbackMessage}</p>}
                <table className="Center">
                    <thead>
                        <tr>
                            {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr>
                                <td colSpan={7}>No Students</td>
                            </tr>
                        ) : (
                            students.map(({ studentId, name, email, statusCode, status }, idx) => (
                                <tr key={idx}>
                                    <td>{studentId}</td>
                                    <td>{name}</td>
                                    <td>{email}</td>
                                    <td>{statusCode}</td>
                                    <td>{status}</td>
                                    <td>
                                        <Button 
                                            variant="outlined" 
                                            color="primary" 
                                            onClick={() => dropStudent(studentId)}
                                        >
                                            Drop
                                        </Button>
                                    </td>
                                    <td><EditStudent student={{ studentId, name, email, statusCode, status }} onUpdate={fetchStudents} /></td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <AddStudent onClose={fetchStudents} />
            </div>
        </div>
    );
}

export default AdminHome;
