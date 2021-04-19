import React, { useState } from 'react';

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    // Send request to server
    props.onLoggedIn(username);
  }

  return (
    <form>
      <label>
        Username:
        <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)}/>
      </label>
      <label>
        Email Address:
        <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
      </label>
      <label>
        Birthday:
        <input type="birthday" name="birthday" id="birthday" value={birthday} onChange={e => setBirthday(e.target.value)}/>
      </label>
      <label>
        Password:
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
}
