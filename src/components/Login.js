import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
    const [user, setUser] = useState({username: '', password: ''});
    const [isAuthenticated, setAuth] = useState(false);
    const [userRole, setRole] = useState("");
    const history = useHistory();

    const onChange = (event) => {
        setUser({...user, [event.target.name] : event.target.value});
    }

    const login = () => {
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => { 
            const jwtToken = res.headers.get('Authorization');
            if (jwtToken !== null) {
                sessionStorage.setItem("jwt", jwtToken);
                setAuth(true);
            }
            return res.json();
        })
        .then((data) => {
            setRole(data);
            if(data === 'STUDENT') {
                history.push('/student');
            } else if(data === 'ADMIN') {
                history.push('/admin');
            }
        })
        .catch(err => {
            console.log(err);
            alert('Error logging in. Please try again.');
        });
    }

    const renderLoginForm = () => (
      <div className="App">
          <h2>Registration Service</h2>
          <table className="Center">
              <tbody>
                  <tr><td>
                  <label htmlFor="username">UserName</label>
                  </td><td>
                  <input type="text" name="username" value={user.username} onChange={onChange} />
                  </td></tr>
                  <tr><td>
                  <label htmlFor="password">Password</label>
                  </td><td>
                  <input type="password" name="password" value={user.password} onChange={onChange} />
                  </td></tr>
              </tbody>
          </table>
          <br/>
          <button id="submit" onClick={login}>Login</button>
      </div>
    );

    return renderLoginForm();
}

export default Login;
