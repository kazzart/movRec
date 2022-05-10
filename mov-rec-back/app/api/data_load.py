from fastapi import APIRouter, Depends, status, UploadFile, File, Response
from services.data_load import DataLoad
from models.data_load import User, Rating, Movies

router = APIRouter(prefix='/data')


@router.post('/movies', status_code=status.HTTP_204_NO_CONTENT)
async def load_movies_from_csv(file: UploadFile = File(...), service: DataLoad = Depends()):
    await service.load_movies(file)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post('/ratings', status_code=status.HTTP_204_NO_CONTENT)
async def load_ratings_from_csv(file: UploadFile = File(...), service: DataLoad = Depends()):
    await service.load_ratings(file)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post('/user', response_model=User, status_code=status.HTTP_201_CREATED)
def add_user(nickname: str, service: DataLoad = Depends()):
    return service.add_user(nickname=nickname)


@router.post('/rating', status_code=status.HTTP_204_NO_CONTENT)
def add_rating(rating: Rating, service: DataLoad = Depends()):
    service.add_rating(rating)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.get('/movies', response_model=Movies, status_code=status.HTTP_200_OK)
def get_movies(movie_substr: str, service: DataLoad = Depends()):
    return service.get_movies(movie_substr)
