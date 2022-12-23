import React, { useMemo } from "react";
import { Card, Col, Image, InputGroup, Row } from "react-bootstrap";
import NoimageImg from "assets/img/no-image.png";
import LikeImg from "assets/img/like.svg";

const MyCard = ({ post }) => {
  /** @type {React.CSSProperties} cardContainer */
  const cardContainer = useMemo(() => {
    return {
      height: "150px",
      overflow: "hidden",
    };
  }, []);

  /** @type {React.CSSProperties} cardImg */
  const cardImg = useMemo(() => {
    return {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    };
  }, []);

  /** @type {React.CSSProperties} cardText */
  const cardText = useMemo(() => {
    return {
      display: "-webkit-box",
      wordWrap: "break-word",
      WebkitLineClamp: 4,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      height: "100px",
    };
  }, []);

  /** @type {React.CSSProperties} cardTitle */
  const cardTitle = useMemo(() => {
    return {
      cursor: "pointer",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    };
  }, []);

  return (
    <Col>
      <Card className="m-3">
        <div style={cardContainer}>
          <Card.Img
            variant="top"
            src={post.thumbnail ? post.thumbnail : NoimageImg}
            style={cardImg}
          />
        </div>
        <Card.Body>
          <Card.Title style={cardTitle}>{post.title}</Card.Title>
          <Card.Text style={cardText}>{post.summary}</Card.Text>
          <small className="text-muted">{post.createDate}</small>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>
              <InputGroup>
                <Image
                  className="ratio ratio-1x1 rounded-circle me-2"
                  src={post.writer.profileImage}
                  style={{ width: "24px", height: "24px" }}
                  alt="profileImage"
                />
                <strong>{post.writer.id}</strong>
              </InputGroup>
            </Col>
            <Col className="col-auto">
              <InputGroup>
                <Image src={LikeImg} width="15" />
                <span className="mx-2 fs-6 text-black-50 fw-light">
                  {post.likeCount}
                </span>
              </InputGroup>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default MyCard;
