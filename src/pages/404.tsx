import Link from 'next/link';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFoundPage = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          <h1 className="mb-4">404 - Page Not Found</h1>
          <p>The page you are looking for doesn&apos;t exist.</p>
          <Link href="/" passHref>
            <Button variant="primary">Go Back to Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
