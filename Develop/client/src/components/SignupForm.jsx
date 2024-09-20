import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations'; // Import the addUser mutation
import Auth from '../utils/auth'; // Import AuthService

const SignupForm = () => {
  const [formState, setFormState] = useState({ email: '', password: '', username: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      // Save the token and log the user in
      Auth.login(data.addUser.token); // Save the token using AuthService
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          value={formState.username}
          onChange={handleInputChange}
        />
      </Form.Group>

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

      {error && <Alert variant="danger">Sign-up failed!</Alert>}

      <Button variant="primary" type="submit">
        Sign Up
      </Button>
    </Form>
  );
};

export default SignupForm;
