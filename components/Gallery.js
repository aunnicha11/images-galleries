import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard';
import HashtagFilter from './HashtagFilter';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const imagesPerPage = 10;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/images?page=${page}&per_page=${imagesPerPage}`);
        const data = response.data;

        setImages(prev => [...prev, ...data]);
        const newHashtags = [...new Set(data.flatMap(img => img.tags.split(', ')))];
        setHashtags(prev => [...new Set([...prev, ...newHashtags])]);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page]);

  const handleHashtagClick = (hashtag) => {
    // Reset the page to 1 and filter images based on the clicked hashtag
    //setPage(1); // Reset page to 1
    const filtered = images.filter(image => image.tags.split(', ').includes(hashtag));
    setFilteredImages(filtered);
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const handleRefresh = () => {
    // Reset filtered images and page to show all images
    setFilteredImages([]);
    //setPage(1); // Reset page to 1 to fetch the first set of images
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  return (
    <div>
      {/* <HashtagFilter hashtags={hashtags} onHashtagClick={handleHashtagClick} /> */}
      <button 
        onClick={handleRefresh} 
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Refresh
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {(filteredImages.length > 0 ? filteredImages : images).map(image => (
          <ImageCard 
            key={image.id} 
            image={{ url: image.webformatURL, hashtags: image.tags.split(', ') }} 
            onHashtagClick={handleHashtagClick}
          />
        ))}
      </div>
      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
};

export default Gallery;