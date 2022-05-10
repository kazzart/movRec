import io
import pandas as pd
from fastapi import Depends, UploadFile
from sqlalchemy.orm import Session
import tables
from database import get_session
from models.data_load import User, Rating, Movies


class DataLoad():
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    async def load_movies(self, file: UploadFile):
        data = await file.read()
        data = str(data, 'utf-8')
        data = io.StringIO(data)
        data = pd.read_csv(data)
        movies = list()
        for _, movie in data.iterrows():
            movies.append(tables.Movie(
                id=movie['movieId'], title=movie['title']))
        self.session.add_all(movies)
        self.session.commit()
        return

    async def load_ratings(self, file: UploadFile):
        print('lkafd')
        data = await file.read()
        print('as;dfa')
        data = str(data, 'utf-8')
        data = io.StringIO(data)
        data = pd.read_csv(data)
        ratings = list()
        users = list()
        added_users = set()
        size = data.shape[0]
        print(size)
        for index, rating in data.iterrows():
            user_id = rating['userId']
            if user_id not in added_users:
                users.append(tables.User(id=user_id))
                added_users.add(user_id)
            ratings.append(tables.Rating(
                user_id=rating['userId'], movie_id=rating['movieId'], rating=rating['rating']))
            if index % 10_000 == 0:
                self.session.add_all(users)
                self.session.commit()
                self.session.add_all(ratings)
                self.session.commit()
                users = list()
                ratings = list()
                print(f'{index} / {size}')
        if len(users) > 0:
            self.session.add_all(users)
        if len(ratings) > 0:
            self.session.add_all(ratings)
        self.session.commit()
        return

    def add_user(self, nickname: str) -> User:
        user = tables.User(nickname=nickname)
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)
        return user

    def add_rating(self, rating: Rating):
        rating = tables.Rating(user_id=rating.user_id,
                               movie_id=rating.movie_id, rating=rating.rating)
        self.session.add(rating)
        self.session.commit()
        return

    def get_movies(self, movie_substring: str) -> Movies:
        movies = self.session.query(tables.Movie).filter(
            tables.Movie.title.ilike(f'%{movie_substring}%')).limit(20).all()
        return Movies(movies=movies)
# userId,movieId,rating,timestamp,title,genres
