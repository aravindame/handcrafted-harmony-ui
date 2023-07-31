import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

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

export default BootstrapSpinner;
