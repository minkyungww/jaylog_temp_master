
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship

from database.database import DBase


class LikeEntity(DBase):
    __tablename__ = "Like"

    idx = Column(Integer, primary_key=True, index=True)
    user_idx = Column(Integer, ForeignKey("User.idx"))
    post_idx = Column(Integer, ForeignKey("Post.idx"))
    create_date = Column(DateTime, default=datetime.now)
    update_date = Column(DateTime)
    delete_date = Column(DateTime)

    user_entity = relationship("UserEntity")

    post_entity = relationship("PostEntity", back_populates="like_entity_list")
