import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
    return (
        <div style={{
            background: "linear-gradient(to right, #6ba7f1, #2575fc)",
            minHeight: "100vh",
            padding: "50px",
            color: "white"
        }}>
            <Container>
                <Row className="text-center">
                    <Col>
                        <h1 className="display-4">Welcome to Scheduler</h1>
                        <p className="lead">Effortlessly manage your appointments and schedules</p>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col md={4}>
                        <Card className="shadow-sm" style={{ backgroundColor: "#ffffff22" }}>
                            <Card.Body>
                                <Card.Title>Easy Scheduling</Card.Title>
                                <Card.Text>
                                    Create and manage your appointments with just a few clicks. Never miss an important meeting again.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm" style={{ backgroundColor: "#ffffff22" }}>
                            <Card.Body>
                                <Card.Title>Multi-User Support</Card.Title>
                                <Card.Text>
                                    Share your schedule with colleagues or manage appointments for multiple users seamlessly.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm" style={{ backgroundColor: "#ffffff22" }}>
                            <Card.Body>
                                <Card.Title>Customizable Interface</Card.Title>
                                <Card.Text>
                                    Personalize your calendar with multiple view types.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-5 text-center">
                    <Col>
                        <p className="text-muted">Start organizing your time efficiently with Scheduler today!</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;
