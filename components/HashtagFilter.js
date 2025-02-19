import React from 'react';

const HashtagFilter = ({ hashtags, onHashtagClick }) => {
  return (
    <div className="mb-4 flex flex-wrap">
      {hashtags.map((tag, index) => (
        <button 
          key={index} 
          onClick={() => onHashtagClick(tag)} 
          className="bg-blue-500 text-white text-sm rounded-full px-3 py-1 mr-2 mb-2 hover:bg-blue-600"
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default HashtagFilter;