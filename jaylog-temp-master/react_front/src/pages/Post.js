import { Viewer } from "@toast-ui/react-editor";
import LikeRedImg from "assets/img/like-red.svg";
import LikeImg from "assets/img/like.svg";
import CommonLayout from "components/layouts/CommonLayout";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

const Post = () => {
  // useMemo useCallback 최적화 관련글
  // https://haragoo30.medium.com/usememo-usecallback%EC%9D%84-%EC%96%B8%EC%A0%9C-%EC%8D%A8%EC%95%BC%EB%90%98%EB%82%98-6a5e6f30f759
  // https://velog.io/@hyunjine/React-Rendering-Optimization

  return (
    <CommonLayout>
      <Container className="p-5">
        <h1>제목</h1>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span>
              <Image
                src={null}
                className="ratio ratio-1x1 rounded-circle me-2"
                style={{ width: "20px", height: "20px" }}
                alt="profile"
              />
              <strong>{"아이디"}</strong>
            </span>
            <span className="text-black-50 fw-light ms-3">{"날짜"}</span>
          </div>
          <button id="likeButton" className="btn">
            <Image src={true ? LikeRedImg : LikeImg} width="15" alt="좋아요" />
            <span id="likeCount" className="mx-2 fs-6 text-black-50 fw-light">
              {0}
            </span>
          </button>
          {true ? (
            <div>
              <Button variant="outline-success" type="button">
                수정
              </Button>
              <Button variant="outline-danger" className="ms-2" type="button">
                삭제
              </Button>
            </div>
          ) : null}
        </div>
        <div style={{ marginTop: "100px" }}></div>
        <Viewer initialValue={"post.content"} />
        <Row className="mt-5">
          <Col className="d-flex justify-content-center">
            <Button variant="outline-dark" type="button">
              목록으로
            </Button>
          </Col>
        </Row>
      </Container>
    </CommonLayout>
  );
};

export default Post;
