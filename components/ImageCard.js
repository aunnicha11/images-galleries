import React from 'react';

const ImageCard = ({ image, onHashtagClick }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md">
      <img 
        src={image.url} 
        alt={image.hashtags.join(', ')} 
        className="object-cover w-full h-full max-h-48 md:max-h-64 lg:max-h-80" 
      />
      <div className="flex flex-wrap mt-2">
        {image.hashtags.map((tag, index) => (
          <a 
            key={index} 
            href="#" 
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              onHashtagClick(tag); // Call the function passed as a prop
            }} 
            className="bg-blue-500 text-white text-sm rounded-full px-2 py-1 mr-2 mb-2 hover:bg-blue-600"
          >
            #{tag}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;