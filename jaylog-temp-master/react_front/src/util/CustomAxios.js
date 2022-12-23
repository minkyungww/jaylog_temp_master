import axios from "axios";
import jwtDecode from "jwt-decode";
import { BASE_URL } from "config/Constants";

class CustomAxios {
  static _instance = new CustomAxios();
  static instance = () => {
    return CustomAxios._instance;
  };

  constructor() {
    this.publicAxios = axios.create({ baseURL: BASE_URL });
    this.privateAxios = axios.create({
      // 토큰을 안붙임, 인증을 위한 건 privateAxios를 씀
      baseURL: BASE_URL,
      withCredentials: true,
    });
    this.privateAxios.interceptors.request.use(this._requestPrivateInterceptor);
  }

  _requestPrivateInterceptor = async (config) => {
    // access_token이 정상일 경우 -> 토근 전송
    // access_token이 비정상일 경우 -> refresh_token이 정상 / 비정상
    // refresh_token이 (만료일 기준) 비정상이면 로그아웃 처리
    //refresh_token이 정상이면 통신해서 access_token 재발급 후 토큰 전송

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    // 토큰이 없을 경우
    if (accessToken == null || refreshToken == null) {
      throw new axios.Canel("토큰이 없습니다.");
    }

    // accessToken 확인
    if (accessToken == null || jwtDecode(accessToken.exp < Date.now() / 1000)) {
      // || 앞 부분이 true이면 뒤에 코드로 안넘어감. 그래서 순서를 잘 지켜줘야 함;
      // 지난 날들은 현재시간보다 숫자가 작음. 나누기 1000은 시간 단위 계산
      // accessToken 무효
      // refreshToken 확인
      if (
        refreshToken == null ||
        jwtDecode(refreshToken.exp < Date.now() / 1000)
      ) {
        // refreshToken 무효
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // throw를 해도 되고
        alert("모든 토큰이 만료되었습니다.");
        location.replace("/login");
        // location만 쓸 때 안되면 window.location.replace를 쓰면 됨; 아예 화면 자체를 새로고침 함, 서버사이드 렌더링에는 쓰면 안됨; navigate는 주석만 새로고침 됨
      } else {
        // refreshToken 유효
        const { response, error } = await customAxios.publicAxios({
          // 앞에 async를 사용해서 await 메서드를 쓸 수 있음; axios는 비동기 통신이라 시간이 걸려서 await를 사용해서 시간을 지체시켜줌
          method: `post`,
          url: `/api/v1/sign/refresh`,
          data: { refreshToken },
        });

        if (error || response.status !== 200) {
          // window.location.replace("/login")를 써도 됨
          throw new axios.Canel("리프레시 토큰이 만료되었습니다.");
        } else {
          // 토큰 재발급
          const tokens = response.data.content;
          localStorage.setItem("accessToken", tokens.accessToken);
          localStorage.setItem("refreshToken", tokens.refreshToken);
          config.headers["Authorization"] = `Bearer ${tokens.accessToken}`;
        }
      }
    } else {
      // accessToken 유효
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  };
}

export const customAxios = CustomAxios.instance();
