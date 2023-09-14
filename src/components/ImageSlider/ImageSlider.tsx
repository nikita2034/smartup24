import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './ImageSlider.module.scss'
interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      swipeable={true}
   
    >
      {images.map((image, index) => (
        <div key={index}  className={styles.slider}>
          <img src={image} alt={`Image ${index + 1}`}  className={styles.img}/>
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;