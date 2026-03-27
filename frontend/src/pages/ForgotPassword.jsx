import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Alert, Spinner } from 'react-bootstrap';
import { FiMail } from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(data.message);
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
              <FiMail size={32} />
            </div>
            <h2 className="mb-2 fw-bold">Forgot Password?</h2>
            <p className="text-muted-custom mb-4">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          {message && <Alert className="alert-custom">{message}</Alert>}
          {error && <Alert className="alert-error">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="formEmail">
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

            <button type="submit" className="btn-primary-custom" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Sending...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ForgotPassword;
