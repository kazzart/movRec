export interface User {
  id: number;
  nickname: string;
}

export interface Movie {
  id: number;
  title: string;
}

export interface Rating {
  movie_id: number;
  user_id: number;
  rating: number;
}

export interface AvgRating {
  avg: number;
}
