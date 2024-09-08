import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axiosInstance from "../../api/userApi";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import stringManager from "../../utils/stringManager";
import LanguageContext from "../../contexts/language.context";

export default function Signup() {
  const { language } = useContext(LanguageContext);

  const { register, handleSubmit } = useForm();
  const navigator = useNavigate();
  function signup(data) {
    data.age = parseInt(data.age);

    axiosInstance
      .post("users", data)
      .then((res) => {
        if (res.status == 201) {
          toast.success("Signed up successfully");
          navigator("/login");
        }
      })
      .catch((e) => {
        if (e.status >= 400) {
          toast.error("Invalid data");
        }
      });
  }

  return (
    <Container>
      <Row>
        <Col className="col-12 col-md-6 col-lg-4">
          <Form onSubmit={handleSubmit(signup)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                {...register("email")}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                {...register("age")}
                type="number"
                placeholder="Enter you age"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password")}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="info" type="submit">
              {stringManager.signup[language]}
            </Button>
            <Link to="/login" className="mx-3">
              {stringManager.login[language]}
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
