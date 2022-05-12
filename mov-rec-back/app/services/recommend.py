import pandas as pd
from fastapi import Depends
from sqlalchemy.orm import Session
import tables
from database import get_session
from models.recommend import Recommendations
from surprise import dump, Reader, Dataset, SVD


class Recommend():
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def get_recommendations(self, user_id: int) -> Recommendations:
        rated_movies = self.session.query(
            tables.Rating.movie_id).filter_by(user_id=user_id).all()
        rated_movies = [id for id, in rated_movies]
        movie_ids = self.session.query(tables.Movie.id).filter(
            tables.Movie.id.notin_(rated_movies)).all()
        movie_ids = [id for id, in movie_ids]
        _, model = dump.load('./model.pickle')
        ratings = [(model.predict(str(user_id), str(movie_id)).est, movie_id)
                   for movie_id in movie_ids]
        ratings.sort(key=lambda x: x[0], reverse=True)
        ratings = ratings[:10]
        print(ratings)
        recommended_movie_ids = [id for _, id in ratings]
        movies = self.session.query(tables.Movie).filter(
            tables.Movie.id.in_(recommended_movie_ids)).all()
        return Recommendations(movies=movies)

    def train_model(self):
        data = self.session.query(
            tables.Rating.user_id, tables.Rating.movie_id, tables.Rating.rating).all()
        data = pd.DataFrame(data, columns=['userId', 'movieId', 'rating'])
        print(data.head())

        reader = Reader()
        data = Dataset.load_from_df(data, reader=reader)
        data = data.build_full_trainset()

        svd = SVD(n_factors=200, n_epochs=50, lr_all=1e-2, reg_all=1e-1)
        svd.fit(data)
        # dump.dump('./model2.pickle', algo=svd)
