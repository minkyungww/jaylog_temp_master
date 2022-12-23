from database.database import SessionLocal


# 데이터베이스 디펜던시
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
