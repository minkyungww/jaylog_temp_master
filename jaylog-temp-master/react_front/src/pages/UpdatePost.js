import { Editor } from "@toast-ui/react-editor";
import ExitImg from "assets/img/exit.svg";
import WriteLayout from "components/layouts/WriteLayout";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const UpdatePost = () => {
  const refs = useRef({
    title: null,
    /** @type {Editor} editor */
    editor: null,
  });

  const [editorHeight, setEditorHeight] = useState(0);

  useEffect(() => {
    setEditorHeight(`${window.innerHeight - 190}px`);
    window.onresize = () => setEditorHeight(`${window.innerHeight - 190}px`);
  }, []);

  return (
    <WriteLayout>
      <Row>
        <Col>
          <Form.Control
            ref={(el) => (refs.current.title = el)}
            className="border-0 w-100 fs-1 mt-3 mb-3"
            type="text"
            placeholder="제목을 입력하세요"
          />
        </Col>
      </Row>
      <Editor
        ref={(el) => (refs.current.editor = el)}
        previewStyle="vertical"
        initialEditType="markdown"
        height={editorHeight}
      />
      <Row className="row fixed-bottom p-3 bg-white shadow-lg">
        <Col className="me-auto">
          <Link replace={true} className="text-decoration-none text-dark">
            <Image src={ExitImg} />
            <span className="m-2">나가기</span>
          </Link>
        </Col>
        <Col className="col-auto">
          <Button
            className="btn-light fw-bold text-white"
            type="button"
            style={{ backgroundColor: "#20c997" }}
          >
            수정하기
          </Button>
        </Col>
      </Row>
    </WriteLayout>
  );
};

export default UpdatePost;
