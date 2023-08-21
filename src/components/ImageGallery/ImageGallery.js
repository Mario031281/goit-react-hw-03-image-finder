import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImgGallery } from './ImageGallery.styled';
export const ImageGallery = ({ images }) => {
  if (!Array.isArray(images)) {
    return <div>Error: Images data is not an array</div>;
  }

  return (
    <ImgGallery>
      {images.map(image => (
        <li key={image.id}>
          <ImageGalleryItem image={image} />
        </li>
      ))}
    </ImgGallery>
  );
};
