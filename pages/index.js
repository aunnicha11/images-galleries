import React from 'react';
import Gallery from '../components/Gallery';

const Home = () => {
  return (
    <div className="container mx-auto p-4" data-theme="synthwave">
      <h1 className="text-3xl font-bold text-center mb-6">Image Gallery</h1>
      <Gallery />
    </div>
  );
};

export default Home;