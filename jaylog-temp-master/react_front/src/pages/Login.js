import JaylogImg from "assets/img/jaylog.png";
import UserInfoLayout from "components/layouts/UserInfoLayout";
import { useEffect, useRef } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "stores/RootStore";
import { customAxios } from "util/CustomAxios";

const Login = () => {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const refs = useRef({
    idElement: null,
    pwElement: null,
    rememberMeElement: null,
  });

  // 비밀번호 입력창에서 엔터키를 치면 로그인 요청하는 함수
  const enterKeyLogin = (event) => {
    if (event.keyCode === 13) {
      requestLogin();
    }
  };

  // 로그인 요청하는 함수
  // 로그인 버튼을 누르면 실행됨
  const requestLogin = () => {
    // 서버와 통신하기 전에 입력값 검증
    if (!validateFields()) {
      return;
    }

    const { idElement, pwElement, rememberMeElement } = refs.current;

    const loginUser = {
      id: idElement.value,
      password: pwElement.value,
    };

    customAxios
      .publicAxios({
        method: `post`,
        url: `/api/v1/sign/in`,
        data: loginUser,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // rememberMe 세팅
          if (rememberMeElement.checked) {
            localStorage.setItem("rememberId", JSON.stringify(idElement.value));
          } else {
            localStorage.removeItem("rememberId");
          }
          // 액세스토큰 리프레시토큰 저장
          const content = response.data.content;
          localStorage.setItem("accessToken", content.accessToken);
          localStorage.setItem("refreshToken", content.refreshToken);
          // authStore에 유저 객체 저장
          authStore.setLoginUserByToken(content.accessToken);
          // 메인으로 이동
          navigate("/");
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

  // 아이디와 비밀번호 입력창이 비어있는지 검사하는 함수
  const validateFields = () => {
    const { idElement, pwElement } = refs.current;

    if (idElement.value === "") {
      alert("아이디를 입력해주세요.");
      idElement.focus();
      return false;
    }

    if (pwElement.value === "") {
      alert("비밀번호를 입력해주세요.");
      pwElement.focus();
      return false;
    }

    return true;
  };

  // 페이지가 로드되면 실행되는 함수
  const setLoginPage = () => {
    // 창이 켜지면 아이디 입력창에 포커스가 가도록 설정
    refs.current.idElement.focus();
    // 아이디 기억하기 체크박스가 체크되어있으면 아이디 입력창에 아이디를 넣어줌
    const rememberId = JSON.parse(localStorage.getItem("rememberId"));
    if (rememberId !== null) {
      refs.current.idElement.value = rememberId;
      refs.current.rememberMeElement.checked = true;
    }
  };

  useEffect(() => {
    // 로그인페이지 세팅
    setLoginPage();
  }, []);

  return (
    <UserInfoLayout isNavbar={false}>
      <Card className="shadow-2-strong" style={{ borderRadius: "1rem" }}>
        <Card.Body className="p-5 text-center">
          <h3 className="mb-3">
            <img src={JaylogImg} style={{ height: "100px" }} alt="jaylog"></img>
          </h3>
          <InputGroup className="mb-3">
            <InputGroup.Text id="idAddOn">아이디</InputGroup.Text>
            <Form.Control
              ref={(el) => (refs.current.idElement = el)}
              type="text"
              aria-describedby="idAddOn"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="pwAddOn">비밀번호</InputGroup.Text>
            <Form.Control
              ref={(el) => (refs.current.pwElement = el)}
              type="password"
              aria-describedby="pwAddOn"
              onKeyUp={enterKeyLogin}
            />
          </InputGroup>
          <Form.Group className="d-flex justify-content-start mb-4">
            <Form.Check
              type="checkbox"
              ref={(el) => (refs.current.rememberMeElement = el)}
              label="아이디 기억하기"
            />
          </Form.Group>
          <Button
            type="button"
            className="btn-primary"
            style={{ width: "100%" }}
            onClick={requestLogin}
          >
            로그인
          </Button>
          <hr className="my-4" />
          <Link to="/join">아이디가 없으신가요? 회원가입</Link>
        </Card.Body>
      </Card>
    </UserInfoLayout>
  );
};

export default Login;
