import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

const ErrorPage = () => {
  const router = useRouter();
  const errorCode = router.query.errorCode || 'Unknown Error';
  const errorMessage = router.query.message || 'Oops! Something went wrong.';

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Alert variant="danger" className="text-center">
            <h4>{errorCode}</h4>
            <p>{errorMessage}</p>
            <Button variant="primary" onClick={() => router.push('/')}>
              Go Back to Home
            </Button>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
