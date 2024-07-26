import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '../../../context/contex'

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    role:'',
    photo: null,
    certificate: null,
  });
  const [error, setError] = useState(null);
  const handleInputChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
   };

  const onFilechangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files?.[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', e.target.fullname.value);
    formData.append('email', e.target.email.value);
    formData.append('password', e.target.password.value);
    formData.append('role', e.target.role.value);
    formData.append('photo', e.target.photo.files?.[0]);
    formData.append('certificate', e.target.certificate.files?.[0]);
  
    try {
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
      });
  
      if (res.data && res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">
          Sign Up
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="fullname">
              Name
            </label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
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
            <label className="block text-sm font-medium text-gray-700" htmlFor="password">
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
              <div className='flex justify-around'>
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
                className="cursor-pointer w-[1.6vw] h-[1.6vw]" />
                <Label htmlFor="r3">Owner</Label>
              </div>
              </div>
            </RadioGroup>
          </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="photo">
                  Photo
                </label>
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={onFilechangeHandler}
                  className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="certificate">
                  Certificate
                </label>
                <input
                  type="file"
                  name="certificate"
                  // accept="application/pdf"
                  onChange={onFilechangeHandler}
                  className="w-full px-3 py-2 mt-1 border rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div> 
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <NavLink
          to="/login"
          >
          <button
            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">
            Sign in
          </button>
          </NavLink>
        </p>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default SignUp;
