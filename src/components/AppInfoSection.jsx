import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

const AppInfoSection = () => {
  return (
    <Container className="my-60">
      <Row className="align-items-center">
        {/* Text Section */}
        <Col md={6}>
          <h4 className="text-dark fw-bold mb-20">The Kissan Growth Mobile App</h4>
          <p className="text-muted">
            The Kissan Growth Mobile App is designed to close the gap between farmers and consumers.
            Through the app, you can easily search for fresh farm products, discover local agriculture,
            and purchase farm fresh food at affordable prices — all without middlemen.
            Whether you’re looking for dairy products, vegetables, fruits, or crops,
            the app makes it simple to buy directly from farmers.
          </p>

          <h4 className="mt-40 text-dark fw-semibold">Become a Member of the Kissan Growth Community</h4>
          <p className="text-muted">
            Join the Kissan Growth movement today. If you're a farmer looking to expand your business or a consumer
            eager to enjoy fresh produce from the farm, this is your one-stop-shop. With direct access to farm shops,
            fair pricing, and no middlemen, you can experience the future of agriculture in India.
          </p>

          <p className="fw-semibold text-dark">
            Download the Kissan Growth Mobile App now to buy fresh, organic food online directly from local farmers,
            and support sustainable farming in India.
          </p>

          <Button variant="success" size="lg" className="mt-30">
            Download Now
          </Button>
        </Col>

        {/* Image Section */}
        <Col md={6} className="text-center mt-4 mt-md-0">
          <Image
            src="https://via.placeholder.com/400x500.png?text=App+Screenshot"
            alt="Kissan Growth App"
            fluid
            rounded
            className="shadow"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AppInfoSection;
