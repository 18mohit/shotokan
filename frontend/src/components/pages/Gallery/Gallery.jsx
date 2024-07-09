import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from '../../../store/gallerySlice';

function Gallery() {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.gallery.images);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  return (
    <>
      <div className="bg-slate-500 flex flex-wrap justify-around p-4">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index} className="p-2 border m-2">
              <img 
              src={`data:image/jpeg;base64,${image.image}`} 
              alt={image.description} 
              className="sm:w-[20vw] sm:h-[18vw] w-[35vw] h-[30vw] " />
              <p className="text-white font-serif">{image.description}</p>
            </div>
          ))
        ) : (
          <p className="text-white font-serif">No images available</p>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <NavLink
          className="h-10 rounded-xl bg-gray-900 hover:bg-gray-950 border text-white font-bold px-8 py-2 transition duration-500"
          to="/addimage"
        >
          Add Image
        </NavLink>
      </div>
    </>
  );
}

export default Gallery;
