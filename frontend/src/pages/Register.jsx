import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Alert, Spinner } from 'react-bootstrap';
import { FiUserPlus } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', { email, password });
      setMessage(data.message);
      setTimeout(() => {
          navigate('/login');
      }, 1500);
    } catch (err) {
       setError(err.response?.data?.message || 'Something went wrong, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <Container className="d-flex justify-content-center">
        <div className="glass-card" style={{ maxWidth: '450px', width: '100%' }}>
          <div className="text-center">
            <div className="icon-wrapper">
              <FiUserPlus size={32} />
            </div>
            <h2 className="mb-2 fw-bold">Create Account</h2>
            <p className="text-muted-custom mb-4">
              Join us to securely handle your data.
            </p>
          </div>

          {message && <Alert className="alert-custom">{message}</Alert>}
          {error && <Alert className="alert-error">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="fw-medium">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
              />
            </Form.Group>
            
            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control"
              />
            </Form.Group>

            <button type="submit" className="btn-primary-custom mb-3" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Registering...
                </>
              ) : (
                'Sign Up'
              )}
            </button>
          </Form>

          <div className="text-center mt-3 text-muted-custom">
            Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Log in</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
