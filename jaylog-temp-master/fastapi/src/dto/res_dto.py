
from pydantic import BaseModel


class ResDTO(BaseModel):
    code: int
    message: str
    content: object | None = None
