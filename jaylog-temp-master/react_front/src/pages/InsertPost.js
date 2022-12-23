import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import ExitImg from "assets/img/exit.svg";
import WriteLayout from "components/layouts/WriteLayout";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const InsertPost = () => {
  // // 정규표현식을 이용한 태그 제거
  // const markdownImageRegex = /\[.*\]\((.*)\)/gi;
  // const markdownRegex = /(\*|_|#|`|~|>|!|\[|\]|\(|\)|\{|\}|\||\\)/gi;

  const refs = useRef({
    title: null,
    /** @type {Editor} editor */
    editor: null,
  });

  const [editorHeight, setEditorHeight] = useState(0);

  useEffect(() => {
    refs.current.editor.getInstance().setMarkdown("");
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
          <Link to={-1} className="text-decoration-none text-dark">
            <Image src={ExitImg} />
            <span className="m-2">나가기</span>
          </Link>
        </Col>
        <Col className="col-auto">
          <Button className="btn-light fw-bold" type="button">
            임시저장
          </Button>
        </Col>
        <Col className="col-auto">
          <Button
            className="btn-light fw-bold text-white"
            type="button"
            style={{ backgroundColor: "#20c997" }}
          >
            게시하기
          </Button>
        </Col>
      </Row>
    </WriteLayout>
  );
};

export default InsertPost;
