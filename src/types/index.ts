export type Movie = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
  createdAt: string;
  updatedAt: string;
  favoriteByUserIds: string[];
};

export type Movies = Movie[];
