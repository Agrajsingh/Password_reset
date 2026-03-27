import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Alert, Spinner } from 'react-bootstrap';
import { FiLock } from 'react-icons/fi';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/reset-password', {
        token,
        newPassword
      });
      setMessage(data.message);
      setTimeout(() => {
        // Typically you'd navigate to login page, but we'll go to forgot-password for this demo flow
        navigate('/forgot-password');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Link might be expired.');
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
              <FiLock size={32} />
            </div>
            <h2 className="mb-2 fw-bold">Reset Password</h2>
            <p className="text-muted-custom mb-4">
              Enter your new password below.
            </p>
          </div>

          {message && <Alert className="alert-custom">{message}</Alert>}
          {error && <Alert className="alert-error">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label className="fw-medium">New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="form-control"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formConfirmPassword">
              <Form.Label className="fw-medium">Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-control"
              />
            </Form.Group>

            <button type="submit" className="btn-primary-custom" disabled={loading}>
              {loading ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Updating...
                </>
              ) : (
                'Confirm Reset'
              )}
            </button>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default ResetPassword;
