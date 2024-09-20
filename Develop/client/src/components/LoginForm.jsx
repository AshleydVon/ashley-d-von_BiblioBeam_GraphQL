import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations'; // Import the login mutation
import Auth from '../utils/auth'; // Import AuthService

const LoginForm = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      // Save the token and log the user in
      Auth.login(data.login.token); // This will save the token and redirect the user
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
        />
      </Form.Group>

      {error && <Alert variant="danger">Login failed!</Alert>}

      <Button variant="primary" type="submit">
        Log In
      </Button>
    </Form>
  );
};

export default LoginForm;
