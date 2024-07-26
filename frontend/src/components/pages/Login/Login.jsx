// src/components/Login.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/store/authSlice";
import { LayoutDashboardIcon } from "lucide-react";
import {USER_API_END_POINT} from "../../../context/contex";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(store => store.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:'',
  });

  const handleInputChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    dispatch(setLoading(true));
    const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
      headers:{
        'Content-Type': 'application/json'
      },
      withCredentials: true,
    });
    if(res.data.success) {
      navigate("/");
      toast.success(res.data.message)
    } else {
      throw new Error('Unexpected response structure');
    }
  } catch (error) {
    console.error('Error during login:', error);
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : 'An error occurred. Please try again.';
    toast.error(errorMessage);
  } finally {
    dispatch(setLoading(false));
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
            <div>
            <RadioGroup defaultValue="comfortable">
              <div className="flex items-center space-x-2">
                <input 
                type="radio"
                name="role"
                checked= {formData.role === 'Student'}
                onChange={handleInputChange}
                value="Student"
                className="cursor-pointer w-[1.6vw] h-[1.6vw]" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <input 
                type="radio"
                name="role"
                checked= {formData.role === 'Sensei'}
                onChange={handleInputChange}
                value="Sensei"
                className="cursor-pointer w-[1.6vw] h-[1.6vw]" />
                <Label htmlFor="r2">Sensei</Label>
              </div>
              <div className="flex items-center space-x-2">
              <input 
                type="radio"
                name="role"
                checked= {formData.role === 'Owner'}
                onChange={handleInputChange}
                value="Owner"
                className="cursor-pointer w-[1.6vw] h-[1.6vw] " />
                <Label htmlFor="r3">Owner</Label>
              </div>
            </RadioGroup>
            </div>
{
  loading ?   <button
  type="submit"
  className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
  Log In
  </button>
  : 
  <button className="w-full my-10 py-2"> <LayoutDashboardIcon className="mr-2 h-50 w-500 animate-spin"/> please wait </button> 
  
}

          
        </form>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <NavLink
          to="/signup" >
          <button
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
          >
            Sign Up
          </button>
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
