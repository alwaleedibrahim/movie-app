import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axiosInstance from "../../api/userApi";
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/user.context";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import stringManager from "../../utils/stringManager";
import LanguageContext from "../../contexts/language.context";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  
  const { register, handleSubmit } = useForm();
  const navigator = useNavigate()
  function login(data) {
    axiosInstance
      .post("users/login", data)
      .then((res) => {
        setUser({ token: res.data });
        localStorage.setItem('token', res.data)
        toast.success("Logged in successfully")
        navigator('/')
      })
      .catch((e) => {
        if (e.status == 401) {
          toast.error("Incorrect username or password")
        } else if (e.status == 400) {
          toast.error("Bad request")
        }
      });
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <Container>
      <Row>
        <Col className="col-12 col-md-6 col-lg-4">
          <Form onSubmit={handleSubmit(login)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                {...register("email")}
                type="email"
                placeholder="Enter email"
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
              {stringManager.login[language]}
            </Button>
            <Link to='/signup' className="mx-3">{stringManager.signup[language]}</Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
