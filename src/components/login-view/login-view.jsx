import React, { useState } from 'react';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send request to server for auth
    props.onLoggedIn(username);
  }

  return (
    <form>
      <label>
        Username:
        <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
      </label>
      <label>
        Password:
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}