import JaylogImg from "assets/img/jaylog.png";
import UserInfoLayout from "components/layouts/UserInfoLayout";
import { useEffect, useRef } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { customAxios } from "util/CustomAxios";

const Join = () => {
  const refs = useRef({
    idElement: null,
    pwElement: null,
    pw2Element: null,
    simpleDescElement: null,
  });

  const navigate = useNavigate();

  const requestJoin = () => {
    if (!validateFields()) {
      return;
    }

    const user = {
      id: refs.current.idElement.value,
      password: refs.current.pwElement.value,
      simpleDesc: refs.current.simpleDescElement.value,
    };

    customAxios
      .publicAxios({
        method: `post`,
        url: `/api/v1/sign/up`,
        data: user,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          alert("회원가입이 완료되었습니다.");

          navigate("/login");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.detail != null) {
          alert(JSON.stringify(error?.response?.data?.detail));
        } else if (error?.response?.data?.message != null) {
          alert(error.response.data.message);
        } else {
          alert("오류가 발생했습니다. 관리자에게 문의하세요.");
        }
      })
      .finally(() => {});
  };

  const validateFields = () => {
    const { idElement, pwElement, pw2Element } = refs.current;

    if (idElement.value === "") {
      alert("아이디를 입력하세요.");
      idElement.focus();
      return false;
    }

    if (pwElement.value === "") {
      alert("비밀번호를 입력하세요.");
      pwElement.focus();
      return false;
    }

    if (pw2Element.value === "") {
      alert("비밀번호 확인을 입력하세요.");
      pw2Element.focus();
      return false;
    }

    if (pwElement.value !== pw2Element.value) {
      alert("비밀번호가 일치하지 않습니다.");
      pw2Element.focus();
      return false;
    }

    return true;
  };

  // strict모드에서는 두번실행됨
  useEffect(() => {
    refs.current.idElement.focus();
  }, []);

  return (
    <UserInfoLayout isNavbar={false}>
      <Card className="shadow-2-strong" style={{ borderRadius: "1rem" }}>
        <Card.Body className="p-5 text-center">
          <h3 className="mb-3">
            <img src={JaylogImg} style={{ height: "100px" }} alt="jaylog"></img>
          </h3>
          <InputGroup className="mb-3">
            <InputGroup.Text id="idAddOn">*아이디</InputGroup.Text>
            <Form.Control
              ref={(el) => (refs.current.idElement = el)}
              type="text"
              aria-describedby="idAddOn"
            />
          </InputGroup>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="pwAddOn">*비밀번호</InputGroup.Text>
                <Form.Control
                  ref={(el) => (refs.current.pwElement = el)}
                  type="password"
                  aria-describedby="pwAddOn"
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="pw2AddOn">*비번확인</InputGroup.Text>
                <Form.Control
                  ref={(el) => (refs.current.pw2Element = el)}
                  type="password"
                  aria-describedby="pw2AddOn"
                />
              </InputGroup>
            </Col>
          </Row>
          <InputGroup className="mb-3">
            <InputGroup.Text id="simpleDescAddOn">한 줄 소개</InputGroup.Text>
            <Form.Control
              ref={(el) => (refs.current.simpleDescElement = el)}
              type="text"
              aria-describedby="simpleDescAddOn"
            />
          </InputGroup>
          <Button
            type="button"
            className="btn-primary"
            style={{ width: "100%" }}
            onClick={requestJoin}
          >
            회원가입
          </Button>
        </Card.Body>
      </Card>
    </UserInfoLayout>
  );
};

export default Join;
