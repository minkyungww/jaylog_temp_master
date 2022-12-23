import React from "react";
import {
  Anchor,
  Button,
  Container,
  Dropdown,
  Form,
  Image,
  InputGroup,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "stores/RootStore";
import LogoImg from "assets/img/jaylog.png";
import SearchImg from "assets/img/search.png";
import UserImg from "assets/img/user.png";

const MyNavbar = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  return (
    <div
      className="sticky-top shadow"
      style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
    >
      <Navbar>
        <Container>
          <Link to={"/"} className="navbar-brand fs-3 text-dark">
            <Image src={LogoImg} style={{ height: "50px" }} />
          </Link>
          <Form className="d-none d-sm-none d-md-flex">
            <Form.Control type="text" placeholder="미구현" />
            <button className="btn" type="button">
              <Image src={SearchImg} width="20" />
            </button>
          </Form>
          <div>
            <InputGroup>
              <div>
                {authStore.loginUser ? (
                  <Button
                    className="rounded-pill btn-dark px-3"
                    type="button"
                    onClick={() => navigate("insert-post")}
                  >
                    새 글 작성
                  </Button>
                ) : (
                  <Button
                    className="rounded-pill btn-dark px-3"
                    type="button"
                    onClick={() => navigate("/login")}
                  >
                    로그인
                  </Button>
                )}
              </div>
              <Row className="align-content-center ms-3">
                {authStore.loginUser ? (
                  <NavDropdown title={<Image src={UserImg} width="25" />}>
                    <div className="dropdown-item d-md-none">
                      <Form className="d-flex">
                        <Form.Control type="text" placeholder="미구현" />
                        <button className="btn" type="button">
                          <Image src={SearchImg} width="20" />
                        </button>
                      </Form>
                    </div>
                    <Dropdown.Divider className="d-md-none" />
                    <Link to={"/my"} className="dropdown-item">
                      내 제이로그
                    </Link>
                    <Dropdown.Divider />
                    <Anchor
                      href="#"
                      className="dropdown-item"
                      onClick={() => {
                        authStore.setLoginUser(null);
                        navigate("/", { replace: true });
                      }}
                    >
                        로그아웃
                    </Anchor>
                  </NavDropdown>
                ) : null}
              </Row>
            </InputGroup>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
