from fastapi import APIRouter
from .data_load import router as data_router
from .recommend import router as recommendation_router

router = APIRouter()
router.include_router(data_router)
router.include_router(recommendation_router)
