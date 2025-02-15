import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();

const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const UserContextProvider = ({ children }) => {
  const [employeesData, setEmployeesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userRole, loginAs } = useContext(AuthContext);
  const navigate = useNavigate();

  // Navigation logic based on user role
  useEffect(() => {
    if (userRole) {
      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'employee') {
        navigate('/employee');
      } else if (userRole === 'thirdParty') {
        navigate('/third-party');
      } else {
        navigate('*');
      }
    }
  }, [userRole, navigate]);

  // Fetch Employees
  const getEmployees = async () => {
    try {
      setLoading(true);
      const response = await client.get('/users');
      setEmployeesData(response.data);
      setError(null);
      return response.data;
    } catch (error) {
      setError('Error fetching users');
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // Validate Email
  const validateEmail = async (email) => {
    try {
      const response = await client.post('/validate-email', { email });
      return response.data.exists;
    } catch (error) {
      console.error('Error validating email:', error);
      throw new Error('Failed to validate email');
    }
  };

  // User Login
  const Login = async (email, password) => {
    try {
      const request = await client.post(
        '/login',
        { email, password },
        { withCredentials: true }
      );

      if (request.status === 200) {
        const role = request.data.user.role;
        console.log('-->', role);
        loginAs(role);
        localStorage.setItem('token', request.data.token);
        localStorage.setItem('user', JSON.stringify({ email }));
      }
    } catch (e) {
      console.error('Login failed:', e);
    }
  };

  // Search Employees by Designation
  const searchEmployees = async (designation) => {
    try {
      const response = await client.get(`/users/search?designation=${designation}`);
      setEmployeesData(response.data);
      setError(null);
    } catch (error) {
      setError('Error searching users');
    }
  };

  // Delete Employee
  const deleteEmployee = async (userId) => {
    try {
      await client.delete(`/users/${userId}`);
      await getEmployees(); // Refresh after deletion
      setError(null);
    } catch (error) {
      setError('Error deleting user');
    }
  };

  // Add or Edit Employee
  const saveEmployee = async (userData, editingUser) => {
    try {
      if (editingUser) {
        await client.put(`/users/${editingUser._id}`, userData);
      } else {
        await client.post('/users', userData);
      }
      await getEmployees(); // Refresh after save
      setError(null);
    } catch (error) {
      setError('Error saving user');
    }
  };

  const data = {
    employeesData,
    loading,
    error,
    getEmployees,
    validateEmail,
    Login,
    searchEmployees,
    deleteEmployee,
    saveEmployee,
  };

  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
};
