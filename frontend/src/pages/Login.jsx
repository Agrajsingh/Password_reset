import React, { useState } from 'react';
import api from '../utils/api';
import { Container, Form, Alert, Spinner } from 'react-bootstrap';
import { FiLogOut } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
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
      const { data } = await api.post('/auth/login', { email, password });
      setMessage(data.message);
      // Save token in localStorage
      localStorage.setItem('token', data.token);
      setTimeout(() => {
          navigate('/dashboard'); // Or ideally navigated to a dashboard route!
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.');
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
              <FiLogOut size={32} />
            </div>
            <h2 className="mb-2 fw-bold">Welcome Back</h2>
            <p className="text-muted-custom mb-4">
              Please enter your details to sign in.
            </p>
          </div>

          {message && <Alert className="alert-custom">{message}</Alert>}
          {error && <Alert className="alert-error">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label className="fw-medium">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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
                  Logging in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </Form>

          <div className="text-center mt-3">
             <Link to="/forgot-password" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Forgot Password?</Link>
          </div>
          <div className="text-center mt-3 text-muted-custom">
            Don't have an account? <Link to="/register" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Sign up</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
