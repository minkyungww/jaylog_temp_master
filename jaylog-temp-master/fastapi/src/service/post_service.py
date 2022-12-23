import time
from datetime import datetime

import bcrypt
import jwt
from config import constants
from dto import sign_dto, post_dto
from entity.user_entity import UserEntity
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from entity.post_entity import PostEntity
from util import functions


def get_posts(db: Session):
    post_entity_list: list[PostEntity] = db.query(
        PostEntity).filter(PostEntity.delete_date == None).order_by(
            PostEntity.create_date.desc()).all()

    res_main_post_list = list(
        map(post_dto.ResMainPost.toDTO, post_entity_list))

    return functions.res_generator(content=res_main_post_list)
