import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addImage } from '../../../store/gallerySlice';
import axios from 'axios';

function AddImage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageData, setImagesData] = useState({
    photo: null,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setImagesData({ ...imageData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImagesData({ ...imageData, photo: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('photo', imageData.photo);
    formData.append('description', imageData.description);

    try {
      const response = await axios.post('http://localhost:4000/api/images/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      dispatch(addImage(response.data));
      navigate('/gallery');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="font-serif bg-fuchsia-400 p-4">
          <input
            className="cursor-pointer mb-2"
            name="photo"
            id="photo"
            type="file"
            onChange={handleFileChange}
            required
          />
          <div className="flex mb-2">
            <input
              type="text"
              name="description"
              id="description"
              placeholder="description"
              value={imageData.description}
              onChange={handleChange}
              className="mt-1 p-2 block w-[20vw] border outline-none border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-[20vw] bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Image
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddImage;
