// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import iiitbImage from './Assets/iiitb-image.jpeg';
// import { loginUser } from './Utils/httputils';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   CircularProgress,
//   Alert,
// } from '@mui/material';
// import './App.css';
//
// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//
//   const handleLogin = async (event) => {
//     event.preventDefault();
//     setError('');
//
//     const response  = await loginUser(email,password);
//     navigate("/dashboard");
//   };
//
//   return (
//     <Box
//   sx={{
//     minHeight: '100vh',
//     position: 'relative',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden'
//   }}
// >
//   <Box
//     sx={{
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       backgroundImage: `url(${iiitbImage})`,
//       backgroundSize: 'cover',
//       backgroundPosition: 'center',
//       filter: 'blur(5px)',
//       zIndex: -1,
//     }}
//   />
//       <Paper
//         elevation={3}
//         sx={{
//           padding: 4,
//           borderRadius: 2,
//           maxWidth: 400,
//           width: '100%',
//           backgroundColor: 'rgba(255, 255, 255, 0.9)',
//         }}
//       >
//         <Typography variant="h4" align="center" gutterBottom>
//           Employee Login
//         </Typography>
//         <form onSubmit={handleLogin}>
//           <Box mb={2}>
//             <TextField
//               label="Email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               fullWidth
//               required
//             />
//           </Box>
//           <Box mb={2}>
//             <TextField
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               fullWidth
//               required
//             />
//           </Box>
//           {error && (
//             <Box mb={2}>
//               <Alert severity="error">{error}</Alert>
//             </Box>
//           )}
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//             sx={{ marginBottom: 2 }}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// };
//
// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './Utils/httputils';
import iiitbImage from './Assets/iiitB.png';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    Alert, Link,
} from '@mui/material';
import './App.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await loginUser(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        }
    };



    return (
        <Box
            sx={{
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Background Image */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${iiitbImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(5px)',
                    zIndex: -1,
                }}
            />

            {/* Login Form */}
            <Paper
                elevation={5}
                sx={{
                    padding: 4,
                    borderRadius: 3,
                    maxWidth: 420,
                    width: '90%',
                    backgroundImage: 'linear-gradient(to bottom right, #bfbcd4, #b2e6f6)',
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
                    Employee Login
                </Typography>

                <form onSubmit={handleLogin}>
                    {/* Email Field */}
                    <Box mb={3}>
                        <Typography
                            variant="body1"
                            sx={{ marginBottom: 1, fontWeight: 'bold', color: "#8e44ad",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)" }}
                        >
                            Email
                        </Typography>
                        <TextField
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

                    {/* Password Field */}
                    <Box mb={3}>
                        <Typography
                            variant="body1"
                            sx={{ marginBottom: 1, fontWeight: 'bold', color: "#8e44ad",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)" }}
                        >
                            Password
                        </Typography>
                        <TextField
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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

                    {/* Error Message */}
                    {error && (
                        <Box mb={2}>
                            <Alert severity="error">{error}</Alert>
                        </Box>
                    )}
                    <Typography align="center" sx={{ marginTop: 2 }}>
                        New Employee?{" "}
                        <link href="/register" style={{ color: "#8e44ad", fontWeight: "bold" }}>
                            Register
                        </link>
                    </Typography>
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
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default Login;
