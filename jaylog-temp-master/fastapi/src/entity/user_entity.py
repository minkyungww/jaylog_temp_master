
from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String
from sqlalchemy.orm import relationship

from database.database import DBase


class UserEntity(DBase):
    __tablename__ = "User"

    idx = Column(Integer, primary_key=True, index=True)
    id = Column(String, unique=True, index=True)
    password = Column(String)
    simple_desc = Column(String)
    profile_image = Column(String)
    role = Column(String)
    create_date = Column(DateTime, default=datetime.now)
    update_date = Column(DateTime)
    delete_date = Column(DateTime)

    post_entity_list = relationship("PostEntity", back_populates="user_entity")
