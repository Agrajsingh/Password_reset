import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { email, password });
            setMessage(res.data.message);
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "450px" }}>
                <Card>
                    <Card.Body className="auth-form-container">
                        <div className="text-center mb-4">
                            <div className="display-4 text-primary mb-2">
                                <i className="bi bi-person-plus"></i>
                            </div>
                            <h2 className="fw-bold">Create Account</h2>
                            <p className="text-muted">Register to get started.</p>
                        </div>

                        {message && (
                            <Alert variant="success" className="d-flex align-items-center">
                                <i className="bi bi-check-circle-fill me-2"></i>
                                {message}
                            </Alert>
                        )}
                        {error && (
                            <Alert variant="danger" className="d-flex align-items-center">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                {error}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email" className="mb-3">
                                <Form.Label className="small fw-semibold text-uppercase">Email Address</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-transparent border-end-0">
                                        <i className="bi bi-envelope text-muted"></i>
                                    </span>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Enter your email"
                                        required 
                                        value={email}
                                        className="border-start-0"
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />
                                </div>
                            </Form.Group>
                            
                            <Form.Group id="password" className="mb-4">
                                <Form.Label className="small fw-semibold text-uppercase">Password</Form.Label>
                                <div className="input-group">
                                    <span className="input-group-text bg-transparent border-end-0">
                                        <i className="bi bi-lock text-muted"></i>
                                    </span>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Create a password"
                                        required 
                                        value={password}
                                        className="border-start-0"
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                </div>
                            </Form.Group>

                            <Button className="w-100 mt-2 btn-primary" type="submit" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Registering...
                                    </>
                                ) : 'Register'}
                            </Button>
                        </Form>

                        <div className="text-center mt-4">
                            <a href="/forgot-password" className="text-decoration-none small fw-bold">
                                Already have an account? Login / Reset Password
                            </a>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};

export default Register;
