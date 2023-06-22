
"use client"
import { useState, useEffect } from 'react';
import styles from'./HomePage.module.css'
import Image from 'next/image';
import logo from '../../public/logo.png'
import { useRouter } from 'next/navigation';
const HomePage = () => {
  const route=useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ['https://c1.wallpaperflare.com/preview/648/593/286/caucasian-charity-community-donation-thumbnail.jpg',
   'https://img.freepik.com/premium-photo/solidarity-compassion-charity-rescue-hands-man-woman-reaching-each-other-support-giving-helping-hand-hands-man-woman-blue-sky-background-black-white_293990-3286.jpg',
   'https://www.thecareworkerscharity.org.uk/wp-content/uploads/2019/08/endoflife-768x512.jpg'];

  useEffect(() => {
    // Function to change the image every 4 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
       
      <div>
      <div className={styles.logoContainer}>
        <Image className={styles.logo} src={logo} alt='...'/>
      </div>
        <button className={styles.button} onClick={()=>route.push('/Donor')} >Donor</button>
        <button className={styles.button} onClick={()=>route.push('/Organization')}>Organization</button>
      </div>
    </div>
  );
};

export default HomePage;
