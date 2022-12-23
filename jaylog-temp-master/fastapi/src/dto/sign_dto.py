from pydantic import BaseModel

# TODO 클래스 명명법 등 DTO 설계 고민


class ReqSignUp(BaseModel):
    id: str
    password: str
    simpleDesc: str


class ResSignUp(BaseModel):
    idx: int

    class Config:
        orm_mode = True


class ReqSignIn(BaseModel):
    id: str
    password: str


class ResSignIn(BaseModel):
    accessToken: str
    refreshToken: str


class ReqRefresh(BaseModel):
    refreshToken: str


class ResRefresh(BaseModel):
    accessToken: str
    refreshToken: str


class AccessJwt(BaseModel):
    idx: int
    id: str
    simpleDesc: str
    profileImage: str
    role: str
    exp: int

    @staticmethod
    def toDTO(jwt_dict: dict):
        return AccessJwt(
            idx=jwt_dict["idx"],
            id=jwt_dict["id"],
            simpleDesc=jwt_dict["simpleDesc"],
            profileImage=jwt_dict["profileImage"],
            role=jwt_dict["role"],
            exp=jwt_dict["exp"]
        )

    class Config:
        orm_mode = True


class RefreshJwt(BaseModel):
    idx: int
    exp: int

    @staticmethod
    def toDTO(jwt_dict: dict):
        return RefreshJwt(
            idx=jwt_dict["idx"],
            exp=jwt_dict["exp"]
        )

    class Config:
        orm_mode = True
