import React, { useState } from "react";
// import { loginUser } from "../../api/employerApi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/user/userSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  // const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
