import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

/**
 * A simple loading spinner component using React Bootstrap Spinner.
 * @returns {JSX.Element} The Spinner component displaying a loading spinner animation.
 */
const BootstrapSpinner = () => {
  return (
    <div className='container'>
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    </div>
  );
};

export default BootstrapSpinner;
