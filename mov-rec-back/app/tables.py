from sqlalchemy import Column, Integer, VARCHAR, Text
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    email = Column(VARCHAR(50), nullable=False, unique=True)
    password = Column(Text, nullable=False)
