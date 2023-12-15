"use cleint"
import React from 'react';
import styles from './styles/stylesPhoto.module.css';
import { Photo } from './inerfaces';

interface PhotoInfoProps {
  photo: Photo;
}
const PhotoInfo: React.FC<PhotoInfoProps> = ({ photo }) => {
  const addedDate = new Date(photo.created_at);
  const day = addedDate.getDate();
  const month = addedDate.toLocaleString('default', { month: 'long' })
  const year = addedDate.getFullYear();
  const formattedDate = `${day} ${month} ${year}`;
  return (
    <div className={styles.photoInfo}>
      <p>Date_add: {formattedDate}</p>
      <p>likes: {photo.likes}</p>
    </div>
  );
};
export default PhotoInfo;
