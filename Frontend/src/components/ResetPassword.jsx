import React, { useState } from 'react';
import api from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Alert, Row, Col } from 'react-bootstrap';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            return setError("Passwords do not match");
        }

        setLoading(true);
        setMessage('');
        setError('');
        try {
            const res = await api.post('/api/auth/reset-password', { token, newPassword: password });
            setMessage(res.data.message);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                    <Card className="border-0 shadow-lg">
                        <Card.Body className="auth-form-container">
                            <div className="text-center mb-4">
                                <div className="display-4 text-primary mb-3">
                                    <i className="bi bi-key-fill"></i>
                                </div>
                                <h2 className="fw-bold mb-1">Set New Password</h2>
                                <p className="text-muted">Secure your account with a new password</p>
                            </div>

                            {message && (
                                <Alert variant="success" className="d-flex align-items-center mb-4 text-start">
                                    <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                                    <div>{message}. Redirecting to login...</div>
                                </Alert>
                            )}
                            {error && (
                                <Alert variant="danger" className="d-flex align-items-center mb-4 text-start">
                                    <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                                    <div>{error}</div>
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="password" title="New Password" className="mb-3">
                                    <Form.Label className="small fw-bold text-uppercase text-muted">New Password</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <i className="bi bi-lock text-muted"></i>
                                        </span>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Min. 6 characters"
                                            required 
                                            className="border-start-0 bg-light"
                                            onChange={(e) => setPassword(e.target.value)} 
                                        />
                                    </div>
                                </Form.Group>

                                <Form.Group id="confirmPassword" title="Confirm Password" className="mb-4">
                                    <Form.Label className="small fw-bold text-uppercase text-muted">Confirm Password</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <i className="bi bi-shield-lock text-muted"></i>
                                        </span>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Repeat your new password"
                                            required 
                                            className="border-start-0 bg-light"
                                            onChange={(e) => setConfirmPassword(e.target.value)} 
                                        />
                                    </div>
                                </Form.Group>

                                <Button className="w-100 py-3 btn-primary shadow-sm" type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Updating security...
                                        </>
                                    ) : 'Update Password'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPassword;
