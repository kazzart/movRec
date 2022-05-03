from sklearn.model_selection import train_test_split
from math import sqrt
from sklearn.metrics import mean_squared_error
from pandas.api.types import CategoricalDtype
from scipy.sparse import csr_matrix
import numpy as np
import pandas as pd
import matplotlib
import matplotlib.pyplot as plt
import seaborn as sns
sns.set_style('dark')


def get_movie_data_from_csv(movie_data_path="../Data/movie_data.csv", movie_ids_path="../Data/movie_ids.csv", n_ratings=None, min_movie_ratings=50, min_user_ratings=50):
    movie_data = pd.read_csv(movie_data_path)
    movie_ids = pd.read_csv(movie_ids_path)
    movie_data = movie_data.groupby("userId").filter(
        lambda x: len(x) > min_movie_ratings)
    movie_data = movie_data.groupby("movieId").filter(
        lambda x: len(x) > min_user_ratings)
    if n_ratings is None:
        return movie_data, movie_ids
    return movie_data[:n_ratings], movie_ids


def get_sparse_pivot(movie_data):
    person_c = CategoricalDtype(
        sorted(movie_data['userId'].unique()), ordered=True)
    movie_c = CategoricalDtype(
        sorted(movie_data['movieId'].unique()), ordered=True)

    row = movie_data['userId'].astype(person_c).cat.codes
    col = movie_data['movieId'].astype(movie_c).cat.codes
    user_item_sparse_matrix = csr_matrix((movie_data["rating"], (row, col)),
                                         shape=(person_c.categories.size, movie_c.categories.size))
    n_users, n_items = user_item_sparse_matrix.shape
    return user_item_sparse_matrix, n_users, n_items


def get_pivot(movie_data):
    user_item = movie_data.pivot_table(
        index='userId', columns='title', values='rating')
    n_users, n_items = user_item.shape
    return user_item, n_users, n_items


def rescale_movie_id(movie_data):
    movie_ids = movie_data['movieId'].unique()

    def scale_movie_id(movie_id):
        scaled = np.where(movie_ids == movie_id)[0][0] + 1
        return scaled

    movie_data['movieId'] = movie_data['movieId'].apply(scale_movie_id)
    return movie_data


def rmse(prediction, ground_truth):
    prediction = np.nan_to_num(prediction)
    ground_truth = np.nan_to_num(ground_truth)
    prediction = prediction[ground_truth.nonzero()]
    ground_truth = ground_truth[ground_truth.nonzero()]
    ground_truth = ground_truth[prediction.nonzero()].flatten()
    prediction = prediction[prediction.nonzero()].flatten()
    print(len(prediction), len(ground_truth))
    mse = mean_squared_error(prediction, ground_truth)
    print(mse)
    return sqrt(mse)


def data_preparation_pipeline(movie_data_path="../Data/movie_data.csv", movie_ids_path="../Data/movie_ids.csv", n_ratings=100000, test_size=0.2, csr=False):
    movie_data, movie_ids = get_movie_data_from_csv(
        movie_data_path=movie_data_path, movie_ids_path=movie_ids_path, n_ratings=n_ratings)
    train_data, test_data = train_test_split(movie_data, test_size=test_size)
    if csr:
        user_item_train, n_users_train, n_items_train = get_sparse_pivot(
            train_data)
        user_item_test, n_users_test, n_items_test = get_sparse_pivot(
            test_data)
    else:
        user_item_train, n_users_train, n_items_train = get_pivot(train_data)
        user_item_test, n_users_test, n_items_test = get_pivot(test_data)
    return ((user_item_train, n_users_train, n_items_train), (user_item_test, n_users_test, n_items_test), movie_data)
