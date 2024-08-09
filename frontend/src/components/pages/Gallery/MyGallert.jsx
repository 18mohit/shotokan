import React, { useState, useEffect } from 'react';
import Masonry from "react-responsive-masonry";
import AddImage from './AddImage';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'sonner';
import { LucideArrowLeft, LucideArrowRight } from 'lucide-react';

function MyGallery() {
    const [images, setImages] = useState([]);
    const [data, setData] = useState({ img: "", i: 0 });
    const [openAddImage, setOpenAddImage] = useState(false);
    const { user } = useSelector((store) => store.auth);

    // Fetch images from the database when the component mounts
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/images/gallery/allimages', {
                    withCredentials: true,
                });

                if (response.data?.success) {
                    setImages(response.data.images || []);
                }
            } catch (error) {
                console.error("Error fetching images:", error.response?.data || error.message);
                toast.error("Failed to load images.");
            }
        };
        fetchImages();
    }, []);

    const viewImage = (img, i) => {
        setData({ img, i });
    };

    const imageAction = (action) => {
        let i = data.i;
        if (action === 'next-img') {
            if (i <= 0) {
                setData({ img: images[images.length - 1].image, i: images.length - 1 });
            } else {
                setData({ img: images[i - 1].image, i: i - 1 });
            }
        }
        if (action === 'previous-img') {
            if (i >= images.length - 1) {
                setData({ img: images[0].image, i: 0 });
            } else {
                setData({ img: images[i + 1].image, i: i + 1 });
            }
        }
        if (!action) {
            setData({ img: "", i: 0 });
        }
    };
    

    const addNewImage = (newImage) => {
        setImages([newImage, ...images]); // Add the new image to the list
    };

    return (
        <>
            {data.img && 
                <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50'>
                    <button
                        onClick={() => imageAction()}
                        className='absolute top-5 right-5 p-2 h-10 w-10 border border-white text-white'>X</button>
                    <button
                        onClick={() => imageAction("previous-img")}
                        className='absolute left-5 top-1/2 transform -translate-y-1/2 p-2 border border-white '> <LucideArrowLeft/> </button>
                    <img
                        className='max-w-[90%] max-h-[90%]'
                        src={data.img} alt="" />
                    <button
                        onClick={() => imageAction("next-img")}
                        className='absolute right-5 top-1/2 transform -translate-y-1/2 p-2 border border-white '> <LucideArrowRight/> </button>
                </div>
            }

            <div className={`p-2 ${data.img ? 'filter blur-md' : ''}`}>
                <Masonry columnsCount={4} gutter="10px">
                {
                    images.length <= 0 ? (
                        <p className="font-serif">No images available</p>
                    ) : (
                        images.map((image, i) => (
                            <img
                                key={i}
                                src={image.image} // Use the correct path to the image URL
                                className='w-full cursor-pointer'
                                onClick={() => viewImage(image.image, i)}
                            />
                        )).reverse()
                    )
                }
                </Masonry>
            </div>

            {/* Conditionally render the Add Image button based on user existence and role */}
            {user && user.role === "Owner" && (
                <div className="flex justify-center mt-4">
                    <button
                        className="h-10 rounded-xl bg-gray-900 hover:bg-gray-950 border text-white font-bold px-8 py-2 transition duration-500"
                        onClick={() => setOpenAddImage(true)}
                    >
                        Add Image
                    </button>
                </div>
            )}

            <div>
                <AddImage openAddImage={openAddImage} setOpenAddImage={setOpenAddImage} addNewImage={addNewImage} />
            </div>
        </>
    );
}

export default MyGallery;
