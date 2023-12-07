/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      id="enter"
      style={{
        height: '70vh',
        padding: '400px',
      }}
    >
      <div id="msg">
        welcome to...
      </div>
      <img src="/migraine2.png" alt="logo" className="nav-logo" width="500" height="170" /><br /><br />
      <Button type="button" id="signin" size="lg" className="copy-btn" onClick={signIn}>
        Sign In
      </Button>
      <br /><br /><br />
      <footer style={{ fontSize: '12px' }}>© 2023 migraine manager by dylankmoore</footer>
    </div>
  );
}

export default Signin;
