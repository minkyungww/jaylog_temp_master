import jwt
from config import constants
from dto import sign_dto
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response


class JwtMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        # Authorization 헤더가 없는 경우 -> 비인증 유저 / 로그인 하지 않은 상태
        # Authorization 헤더가 있는 경우
        # 토큰이 유효하지 않은 경우 // 유효한 경우
        # 유효한 경우만 토큰을 객체로 만들고, 유효하지 않은 경우에는 None으로 리턴
        if 'authorization' in request.headers.keys():
            access_token = request.headers.get(
                'authorization').replace('Bearer ', '')
            try:
                decoded_jwt = jwt.decode(
                    access_token, constants.JWT_SALT, algorithms=['HS256'])
                request.state.user = sign_dto.AccessJwt.toDTO(decoded_jwt)
            except:
                request.state.user = None
        else:
            request.state.user = None

        return await call_next(request)
