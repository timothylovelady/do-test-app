import React, { useRef, useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import './SignInForm.css';

const SignInForm = ({ show, onHide }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef();

  // Close the form when clicked outside
  const handleOutsideClick = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      onHide();
    }
  };
  const handleSignIn = async () => {
    // Perform sign-in logic here
    // For demonstration purposes, let's just display an error if email or password is empty
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
    } else {            
      setErrorMessage('');
    }
  };
  // Attach event listener on mount and remove on unmount
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <Modal show={show} onHide={onHide} backdrop="static" keyboard={false}>
      <div ref={formRef}>
        <Modal.Header closeButton >
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group> 
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Button variant="primary" onClick={handleSignIn}>
              Sign In
            </Button>
          </Form>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default SignInForm;