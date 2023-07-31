import React from 'react';
import { Alert } from 'react-bootstrap';
import Image from 'next/image';

/**
 *
 * Renders an image preview based on the validity of the provided image URL.
 * If the URL is valid, it will display the image; otherwise, it will show an error message.
 *
 * @param {ImageComponentProps} props - Component props.
 * @param {string} props.imagePreviewUrl - The URL of the image to be previewed.
 * @returns {JSX.Element} JSX Element representing the ImageFrame.
 */

interface ImageFrameProps {
  imagePreviewUrl: string;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ imagePreviewUrl }) => {
  const isImageUrlValid = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  if (isImageUrlValid(imagePreviewUrl)) {
    return (
      <Image
        src={imagePreviewUrl}
        alt='Product Preview'
        style={{
          maxWidth: '400px',
          maxHeight: '600px',
          marginBottom: '10px',
        }}
        width={400}
        height={600}
      />
    );
  } else {
    return (
      <Alert variant='danger'>
        Invalid image URL. Please provide a valid URL.
      </Alert>
    );
  }
};

export default ImageFrame;
