import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerEmployee } from '../Utils/httputils';

const useRegisterEmployee = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        title: '',
        department: '',
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
            const response = await registerEmployee(formData);
            if (response.status === 200) {
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

    return {
        formData,
        error,
        loading,
        handleChange,
        handleRegister,
    };
};

export default useRegisterEmployee;
