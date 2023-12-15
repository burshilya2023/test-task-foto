"use client"

import { useState, useEffect } from 'react';
import { Photo } from './inerfaces';


const useFavorites = (): [Photo[], (photo: Photo) => void] => {
  const [favorites, setFavorites] = useState<Photo[]>([]);

  // Восстановление избранных из localStorage при монтировании компонента
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Сохранение в localStorage при изменении favorites
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Функция для добавления/удаления избранных
  const toggleFavorite = (photo: Photo) => {
    const isFavorite = favorites.some((favPhoto) => favPhoto.id === photo.id);

    if (isFavorite) {
      const updatedFavorites = favorites.filter((favPhoto) => favPhoto.id !== photo.id);
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = [...favorites, { ...photo, dateFavoriteAdd: new Date() }];
      // @ts-ignore
      setFavorites(updatedFavorites);
    }
  };

  return [favorites, toggleFavorite];
};

export default useFavorites;