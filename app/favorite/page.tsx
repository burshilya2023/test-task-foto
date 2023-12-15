"use client"
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { Photo } from '@/components/inerfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
const Favorite = () => {
  const [favoritePhotos, setFavoritePhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavoritePhotos(JSON.parse(storedFavorites));
    }
  }, []);


  const handleRemoveFromFavorites = (id:any) => {
    // Фильтруем фотографии, оставляя только те, чей id не совпадает с id фотографии, которую хотим удалить
    const updatedFavorites = favoritePhotos.filter((photo) => photo.id !== id);
    // Обновляем состояние и сохраняем изменения в localStorage
    setFavoritePhotos(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <h1>Favorite Photos</h1>
      {favoritePhotos.length > 0 ? (
        <div className={styles.photoGrid}>
          {favoritePhotos.map((photo: Photo) => (
            
            <div key={photo.id} className={styles.photoContainer}>
                
                     <FontAwesomeIcon
                  icon={faHeart}                  
                  onClick={() => handleRemoveFromFavorites(photo.id)}              
                  className={styles.heartIcon}
                />
            
              <img src={photo.urls.small} alt={photo.alt_description} className={styles.photo} />
         
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite photos yet.</p>
      )}
    </div>
  );
};

export default Favorite;
