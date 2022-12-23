import UserInfoLayout from "components/layouts/UserInfoLayout";
import { useRef } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";

const ChangeInfo = () => {
  const refs = useRef({
    profileImageElement: null,
    fileElement: null,
    pwElement: null,
    pw2Element: null,
    simpleDescElement: null,
  });

  return (
    <UserInfoLayout isNavbar={true}>
      <Card className="shadow-2-strong" style={{ borderRadius: "1rem" }}>
        <Card.Body className="p-5 text-center">
          <h3 className="mb-3">내 정보 수정</h3>
          <div className="d-flex justify-content-center">
            <span>
              <Image
                ref={(el) => (refs.current.profileImageElement = el)}
                src={null}
                className="ratio ratio-1x1 rounded-circle"
                style={{ width: "100px", height: "100px" }}
                alt="profile"
              />
              <Form.Control
                ref={(el) => (refs.current.fileElement = el)}
                type="file"
                accept="image/*"
                className="mt-3 mb-3"
                style={{ width: "100%" }}
              />
            </span>
          </div>
          <InputGroup className="mb-3">
            <InputGroup.Text id="idAddOn">아이디</InputGroup.Text>
            <Form.Control type="text" aria-describedby="idAddOn" disabled />
          </InputGroup>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="pwAddOn">새 비밀번호</InputGroup.Text>
                <Form.Control
                  ref={(el) => (refs.current.pwElement = el)}
                  type="password"
                  aria-describedby="pwAddOn"
                />
              </InputGroup>
            </Col>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="pw2AddOn">비번확인</InputGroup.Text>
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
          <Row>
            <Col>
              <Button
                variant="outline-primary"
                type="button"
                style={{ width: "100%" }}
              >
                취소
              </Button>
            </Col>
            <Col className="col-8">
              <Button
                className="btn-primary"
                type="button"
                style={{ width: "100%" }}
              >
                수정하기
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </UserInfoLayout>
  );
};

export default ChangeInfo;
