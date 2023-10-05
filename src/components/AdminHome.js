import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import Button from '@mui/material/Button';  // <-- Added for button styling

const AdminHome = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        fetch(`${SERVER_URL}/student`)
        .then(response => response.json())
        .then(data => {
            setStudents(data);
        })
        .catch(err => console.log(err));
    }

    const dropStudent = (event) => {
        const row_id = event.target.parentNode.parentNode.rowIndex - 1;
        const s_id = students[row_id].studentId;
  
        if (window.confirm('Are you sure you want to drop the student?')) {
            fetch(`${SERVER_URL}/student/${s_id}?force=yes`, { method: 'DELETE' })
            .then(res => {
                if (res.ok) {
                    fetchStudents();
                } else {
                    console.log("Error dropping student with status:", res.status);
                }
            })
            .catch(err => console.log("Exception dropping student:", err));
        }
    };

    const headers = ['ID', 'Name', 'Email', 'Status', 'Status Code', '', ''];

    if (students.length === 0) {
        return (
            <div>
                <h3>No Students</h3>
                <AddStudent />
            </div>
        );
    } else { 
        return (
            <div> 
                <div margin="auto">
                    <h3>Student List</h3>
                    <table className="Center">
                        <thead>
                            <tr>
                                {headers.map((s, idx) => (<th key={idx}>{s}</th>))}
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((row,idx) => (
                                <tr key={idx}>
                                    <td>{row.studentId}</td>
                                    <td>{row.name}</td>
                                    <td>{row.email}</td>
                                    <td>{row.statusCode}</td>
                                    <td>{row.status}</td>
                                    <td>
                                        <Button 
                                            variant="outlined" 
                                            color="primary" 
                                            onClick={dropStudent}
                                        >
                                            Drop
                                        </Button>
                                    </td>
                                    <td><EditStudent student={row} onUpdate={fetchStudents} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <AddStudent onClose={fetchStudents} />
                </div>
            </div>
        );
    }
}

export default AdminHome;
