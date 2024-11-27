import React from 'react';
import useRegisterEmployee from './Hooks/useRegistrationEmployee';
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
    const { formData, error, loading, handleChange, handleRegister } = useRegisterEmployee();

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
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    Register
                </Typography>

                <form onSubmit={handleRegister}>
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
                                sx={{
                                    marginBottom: 1,
                                    fontWeight: 'bold',
                                    color: "#8e44ad",
                                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                                }}
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

                    {error && (
                        <Box mb={2}>
                            <Alert severity="error">{error}</Alert>
                        </Box>
                    )}

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
