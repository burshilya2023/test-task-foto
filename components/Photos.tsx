"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import styles from './styles/stylesPhoto.module.css';
import { Category, Photo } from './inerfaces';
import useFavorites from './useFavorite';
import PhotoInfo from './PhotoInfo';
const API_KEY = '-R1NIoPats74w7LQjkm6-zdv3ilBtzlCsL8fJOViYpo';
const Photos = () => {
  const [favorites, toggleFavorite] = useFavorites();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [page, setPage] = useState<number>(1);
  const [orderBy, setOrderBy] = useState<string>('notvalue');
  const [hasMore, setHasMore] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [uniquePhotoIds, setUniquePhotoIds] = useState<string[]>([])
  useEffect(() => {
    setIsClient(true);
    axios.get<Category[]>(`https://api.unsplash.com/topics?client_id=${API_KEY}`)
      .then(response => {
        setCategories([{ id: 'all', title: 'All' }, ...response.data]);
      })
      .catch(error => console.error('Error fetching categories:', error));
    fetchPhotos();
  }, [selectedCategory, page, setPage,setSelectedCategory]);
  const fetchPhotos = () => {
    let apiUrl = `https://api.unsplash.com/photos?client_id=${API_KEY}&per_page=14&page=${page}`;
    if (selectedCategory !== 'all') {
      apiUrl += `&topic=${selectedCategory}`;
    }
    axios.get<Photo[]>(apiUrl)
      .then(response => {
        const newPhotos = response.data.filter(photo => !uniquePhotoIds.includes(photo.id));
        if (newPhotos.length > 0) {
          setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
          setUniquePhotoIds(prevIds => [...prevIds, ...newPhotos.map(photo => photo.id)]);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      })
      .catch(error => {
        console.error('Error fetching photos:', error);
        setHasMore(false);
      });
  };
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1); 
  };
  const handleOrderByChange = (orderBy: string) => {
    setOrderBy(orderBy);
  };
  const sortPhotos = (photos: Photo[]) => {
    if (orderBy === 'latest') {
      return photos.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (orderBy === 'likes') {
      return photos.slice().sort((a, b) => b.likes - a.likes);
    }
    return photos;
  };
  // без использования динамической пагинации
  const loadMorePhotos = () => {
    setPage(prevPage => prevPage + 1);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Photo Gallery</h1>
      <div className={styles.selectWrapper}>
        <label className={styles.labelCategory}>Filter by Category: </label>
        <select
          onChange={(e) => handleCategoryChange(e.target.value)}
          value={selectedCategory}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.title}</option>
          ))}
        </select>
      </div>
      <div className={styles.selectWrapper}>
  <label className={styles.labelSort}>Sort by: </label>
  <select
    className={styles.selectInput}
    onChange={(e) => handleOrderByChange(e.target.value)}
    value={orderBy}
  >
    <option value="notvalue">no select</option>
    <option value="latest">Latest</option>
    <option value="likes">likes</option>
  </select>
</div>
      {isClient ? (
        <InfiniteScroll
          dataLength={photos.length}
          next={loadMorePhotos}
          hasMore={hasMore}
          loader={<Skeleton count={5} height={150} style={{ backgroundColor: '#FF0000' }} />}
        >
          <div className={styles.photoGrid}>
            {sortPhotos(photos).map((photo: Photo, index: number) => (
              <div key={index} className={styles.photoContainer}>
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`${styles.heartIcon} ${
                    favorites.some((favPhoto) => favPhoto.id === photo.id) ? styles.redHeart : ''
                  }`}
                  onClick={() => toggleFavorite(photo)}
                />
                <img src={photo.urls.small} alt={photo.alt_description} className={styles.photo} />
                <PhotoInfo photo={photo} />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <Skeleton count={15} height={150}  style={{ backgroundColor: '#FF0000' }}/>
      )}
    </div>
  );
};

export default Photos;
