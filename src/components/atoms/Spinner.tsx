import React from 'react';
import BootstrapSpinner from 'react-bootstrap/Spinner';

/**
 * A simple loading spinner component using React Bootstrap Spinner.
 * @returns {JSX.Element} The Spinner component displaying a loading spinner animation.
 */
const Spinner = () => {
  return (
    <div className='container'>
      <BootstrapSpinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </BootstrapSpinner>
    </div>
  );
};

export default Spinner;
