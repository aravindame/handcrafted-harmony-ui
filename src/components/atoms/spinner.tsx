import Spinner from 'react-bootstrap/Spinner';

/**
 * A simple loading spinner component using React Bootstrap Spinner.
 * @returns {JSX.Element} The LoadingSpinner component displaying a loading spinner animation.
 */

export default () => {
  return (
    <div className="container">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};