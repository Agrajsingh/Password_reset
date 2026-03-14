import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

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
            const res = await axios.post('http://localhost:5000/api/auth/reset-password', { token, newPassword: password });
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
            <div className="w-100" style={{ maxWidth: "450px" }}>
                <Card shadow="lg">
                    <Card.Body className="auth-form-container">
                        <div className="text-center mb-4">
                            <div className="display-4 text-primary mb-2">
                                <i className="bi bi-key"></i>
                            </div>
                            <h2 className="fw-bold">Set New Password</h2>
                            <p className="text-muted">Enter and confirm your new password below.</p>
                        </div>

                        {message && (
                            <Alert variant="success" className="d-flex align-items-center">
                                <i className="bi bi-check-circle-fill me-2"></i>
                                {message}. Redirecting to login...
                            </Alert>
                        )}
                        {error && (
                            <Alert variant="danger" className="d-flex align-items-center">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                {error}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="password" title="New Password" readonly={false} className="mb-3">
                                <Form.Label className="small fw-semibold text-uppercase">New Password</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-transparent border-end-0">
                                        <i className="bi bi-lock text-muted"></i>
                                    </span>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Min. 6 characters"
                                        required 
                                        className="border-start-0"
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                </div>
                            </Form.Group>

                            <Form.Group id="confirmPassword" title="Confirm Password" readonly={false} className="mb-4">
                                <Form.Label className="small fw-semibold text-uppercase">Confirm Password</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-transparent border-end-0">
                                        <i className="bi bi-lock-fill text-muted"></i>
                                    </span>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Repeat your password"
                                        required 
                                        className="border-start-0"
                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                    />
                                </div>
                            </Form.Group>

                            <Button className="w-100 btn-primary" type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Updating...
                                    </>
                                ) : 'Update Password'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};

export default ResetPassword;
