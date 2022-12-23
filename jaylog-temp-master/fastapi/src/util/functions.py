from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from dto import res_dto


def res_generator(status_code: int = 200, error_dict: dict | None = None, content: object | None = None):
    resDTO = res_dto.ResDTO(
        code=error_dict["code"] if error_dict != None else 0,
        message=error_dict["message"] if error_dict != None else "성공",
        content=content
    )
    encodedResDTO = jsonable_encoder(resDTO)
    return JSONResponse(status_code=status_code, content=encodedResDTO)
