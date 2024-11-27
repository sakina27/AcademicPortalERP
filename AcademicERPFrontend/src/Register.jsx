import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerEmployee } from "./Utils/httputils";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    Alert,
} from '@mui/material';
import './App.css';

const Register = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        title: '',
        department:'',
        salary: '',
        photograph_path: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Replace this API call with the correct endpoint for user registration
            const response = await registerEmployee(formData);
            console.log(response)

            if (response.status===200) {
                navigate('/');
            } else {
                const data = await response.json();
                setError(data.message || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while registering. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '60vh',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Background */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'linear-gradient(to bottom right, #fbc2eb, #a6c1ee)',
                    zIndex: -1,
                }}
            />

            {/* Registration Form */}
            <Paper
                elevation={5}
                sx={{
                    padding: 4,
                    borderRadius: 3,
                    maxWidth: 500,
                    width: '90%',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: "#8e44ad",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)"
                    }}
                >
                    Register
                </Typography>

                <form onSubmit={handleRegister}>
                    {/* Form Fields */}
                    {[
                        { label: 'First Name', name: 'first_name', type: 'text' },
                        { label: 'Last Name', name: 'last_name', type: 'text' },
                        { label: 'Email', name: 'email', type: 'email' },
                        { label: 'Title', name: 'title', type: 'text' },
                        { label: 'Department', name: 'department', type: 'text' },
                        { label: 'Salary', name: 'salary', type: 'number' },
                        { label: 'Photograph Path', name: 'photograph_path', type: 'text' },
                        { label: 'Password', name: 'password', type: 'password' },
                    ].map((field, index) => (
                        <Box mb={3} key={index}>
                            <Typography
                                variant="body1"
                                sx={{ marginBottom: 1, fontWeight: 'bold', color: "#8e44ad",
                                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)" }}
                            >
                                {field.label}
                            </Typography>
                            <TextField
                                name={field.name}
                                type={field.type}
                                value={formData[field.name]}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        '& fieldset': {
                                            borderColor: '#1976d2',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#115293',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#0d47a1',
                                        },
                                    },
                                }}
                            />
                        </Box>
                    ))}

                    {/* Error Message */}
                    {error && (
                        <Box mb={2}>
                            <Alert severity="error">{error}</Alert>
                        </Box>
                    )}

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={loading}
                        sx={{
                            marginBottom: 2,
                            padding: '10px 0',
                            fontSize: '1rem',
                            background: "linear-gradient(to right, #8e44ad, #3498db)",
                            '&:hover': {
                                background: "linear-gradient(to right, #0072ff, #00c6ff)",
                            },
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Register;
