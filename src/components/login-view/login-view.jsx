import React, { useState } from 'react';

// Styling
import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send request to server for auth
    props.onLoggedIn(username);
  }
  const handleRegister = (e) => {
    e.preventDefault();
    console.log('Going to Register!');
    props.onGoRegister();
  
  }

  return (
    <form>
      <label className="form-label">
        Username:
        <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
      </label>
      <label className="form-label">
        Password:
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <button type="button" onClick={handleRegister}>Register</button>
    </form>
  );
}