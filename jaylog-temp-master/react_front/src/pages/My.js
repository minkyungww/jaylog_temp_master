import MyCard from "components/commons/MyCard";
import CommonLayout from "components/layouts/CommonLayout";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const My = () => {
  return (
    <CommonLayout>
      <div>
        <Container>
          <Row className="row-cols-2 justify-content-center my-5">
            <Col>
              <div className="d-flex justify-content-center">
                <img
                  src={null}
                  className="ratio ratio-1x1 rounded-circle"
                  style={{ width: "100px", height: "100px" }}
                  alt="profile"
                />
              </div>
            </Col>
            <Col>
              <h2>{"아이디"}</h2>
              <p>{"한 줄 소개"}</p>
              <Link to="/change-info" style={{ color: "#20c997" }}>
                내 정보 수정
              </Link>
            </Col>
          </Row>
          <hr className="border-3 border-top" />
        </Container>
        <Container className="mt-5">
          <Row className="row-cols-1 row-cols-md-2">
            <Col>
              <h5 className="text-center">내 글</h5>
              <Row className="row-cols-1 card-group my-5">
                {[].map((post, index) => (
                  <MyCard key={index} post={post} />
                ))}
              </Row>
            </Col>
            <Col>
              <h5 className="text-center">내가 좋아요 한 글</h5>
              <Row className="row-cols-1 card-group my-5">
                {[].map((post, index) => (
                  <MyCard key={index} post={post} />
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </CommonLayout>
  );
};

export default My;
