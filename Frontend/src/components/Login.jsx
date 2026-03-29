import React, { useState } from 'react';
import api from '../api';
import { Form, Button, Card, Container, Alert, Row, Col } from 'react-bootstrap';
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
            const res = await api.post('/api/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setMessage('Login successful! Redirecting...');
            setTimeout(() => {
                navigate('/register'); // Redirect somewhere after login
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Row className="w-100 justify-content-center">
                <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                    <Card className="border-0 shadow-lg" style={{ animation: 'slideUp 0.6s ease-out' }}>
                        <Card.Body className="auth-form-container">
                            <div className="text-center mb-4">
                                <div className="display-4 text-primary mb-3">
                                    <i className="bi bi-person-check-fill"></i>
                                </div>
                                <h2 className="fw-bold mb-1">Welcome Back</h2>
                                <p className="text-muted">Securely access your account</p>
                            </div>

                            {message && (
                                <Alert variant="success" className="d-flex align-items-center mb-4">
                                    <i className="bi bi-check-circle-fill me-2 fs-5"></i>
                                    <div>{message}</div>
                                </Alert>
                            )}
                            {error && (
                                <Alert variant="danger" className="d-flex align-items-center mb-4">
                                    <i className="bi bi-exclamation-triangle-fill me-2 fs-5"></i>
                                    <div>{error}</div>
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email" className="mb-3">
                                    <Form.Label className="small fw-bold text-uppercase text-muted">Email Address</Form.Label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0">
                                            <i className="bi bi-envelope text-muted"></i>
                                        </span>
                                        <Form.Control 
                                            type="email" 
                                            placeholder="name@example.com"
                                            required 
                                            value={email}
                                            className="border-start-0 bg-light"
                                            onChange={(e) => setEmail(e.target.value)} 
                                        />
                                    </div>
                                </Form.Group>
                                
                                <Form.Group id="password" title="Password" className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Form.Label className="small fw-bold text-uppercase text-muted mb-0">Password</Form.Label>
                                        <Link to="/forgot-password" size="sm" className="text-decoration-none small fw-bold">Forgot?</Link>
                                    </div>
                                    <div className="input-group mt-1">
                                        <span className="input-group-text bg-light border-end-0">
                                            <i className="bi bi-shield-lock text-muted"></i>
                                        </span>
                                        <Form.Control 
                                            type="password" 
                                            placeholder="Enter your password"
                                            required 
                                            value={password}
                                            className="border-start-0 bg-light"
                                            onChange={(e) => setPassword(e.target.value)} 
                                        />
                                    </div>
                                </Form.Group>

                                <Button className="w-100 py-3 btn-primary shadow-sm" type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            Signing in...
                                        </>
                                    ) : 'Login Now'}
                                </Button>
                            </Form>

                            <div className="text-center mt-4 pt-2">
                                <p className="small text-muted mb-0">
                                    Don't have an account? <Link to="/register" className="fw-bold text-decoration-none">Create Account</Link>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
