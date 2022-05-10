from email.policy import default
from sqlalchemy import Column, ForeignKey, Integer, VARCHAR, Text
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    nickname = Column(Text, default='default_nickname')


class Movie(Base):
    __tablename__ = 'movie'
    id = Column(Integer, primary_key=True)
    title = Column(Text, nullable=False)


class Rating(Base):
    __tablename__ = 'rating'
    user_id = Column(Integer, ForeignKey('user.id'), primary_key=True)
    movie_id = Column(Integer, ForeignKey('movie.id'), primary_key=True)
    rating = Column(Integer, nullable=False)
