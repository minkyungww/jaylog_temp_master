from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from dependencies import get_db
from dto import sign_dto
from fastapi import APIRouter, Depends
from service import post_service

router = APIRouter(
    prefix="/api/v1/posts",
    tags=["post"]
)


@router.get("/")
async def get_posts(db: Session = Depends(get_db)) -> JSONResponse:
    return post_service.get_posts(db)
