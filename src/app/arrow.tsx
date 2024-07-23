'use client'
import styles from "./arrow.module.css";
import { useEffect,useState } from 'react';

export default function Arrow({azimuth}:any) {
  const [deviceOrientation, setDeviceOrientation] = useState(0);

  useEffect(() => {
      const handleOrientation = (event:any) => {
          const alpha = event.alpha; // The compass direction the device is facing
          console.log(alpha);
          setDeviceOrientation(alpha);
      };

      window.addEventListener('deviceorientation', handleOrientation);

      return () => {
          window.removeEventListener('deviceorientation', handleOrientation);
      };
  }, [deviceOrientation]);

  const adjustedAzimuth = (azimuth - deviceOrientation + 360) % 360;
  const rotation = `rotate(${adjustedAzimuth}deg)`;

  return (
    <div className={styles.arrowContainer}>
        <div className={styles.arrow} style={{ transform: rotation }}></div>
    </div>
  );
}
