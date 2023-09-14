import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import styles from './ImageViewer.module.scss'
type Props = {
    images:string[]
};

function ImageSlider ({ images }:Props){
  const [currentImage, setCurrentImage] = useState(0);

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.image_slider}>
      <img src={images[currentImage]} alt={`Image ${currentImage}`} className={styles.main_photo}/>
      <div className={styles.product_additional_photos}>
        <FaArrowLeft onClick={prevImage} className={styles.nav_icon} />
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index}`}
            className={styles.product_additional_photo}
            // className={styles.index === currentImage ? 'active' : ''}
            onClick={() => setCurrentImage(index)}
          />
        ))}
        <FaArrowRight onClick={nextImage} className={styles.nav_icon} />
      </div>
    </div>
  );
};

export default ImageSlider;