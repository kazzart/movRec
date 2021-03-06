from fastapi import APIRouter, Depends, status, UploadFile, File, Response
from services.data_load import DataLoad
from models.recommend import Recommendations
from services.recommend import Recommend

router = APIRouter(prefix='/recommendation')


@router.get('/{user_id}/', response_model=Recommendations, status_code=status.HTTP_200_OK)
def get_recommendations(user_id: int, service: Recommend = Depends()):
    return service.get_recommendations(user_id)


@router.post('/train/', status_code=status.HTTP_204_NO_CONTENT)
def train_model(service: Recommend = Depends()):
    service.train_model()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
