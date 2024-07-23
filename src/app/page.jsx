'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { Observer, Equator, Horizon,Body } from 'astronomy-engine';
import Arrow from "./arrow";

export default function Home() {
  const [moonPosition, setMoonPosition] = useState({ azimuth: 0, altitude: 0 });
  const [latitude, setLatitude] = useState(40.7128);
  const [longitude, setLongitude] = useState(-74.0060);

  useEffect(() => {
    // Function to calculate Moon's position
    const getMoonPosition = (lat, lon, date) => {
        const observer = new Observer(lat, lon, 0);
        const utcDate = new Date(date).toISOString();
        const moonEquatorial = Equator(Body.Moon, new Date(utcDate), observer, true, true);
        const moonHorizon = Horizon(new Date(utcDate), observer, moonEquatorial.ra, moonEquatorial.dec, "normal");

        return {
            azimuth: moonHorizon.azimuth,
            altitude: moonHorizon.altitude
        };
    };

    // Get the current date and time
    const currentTime = new Date();
    const position = getMoonPosition(latitude, longitude, currentTime);
    setMoonPosition(position);
}, [latitude, longitude]);


  const geoFindMe = () => {
    const status = document.querySelector("#status");
    const mapLink = document.querySelector("#map-link");
  
    mapLink.href = "";
    mapLink.textContent = "";
  
    const success = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
  
      status.textContent = "";
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }
  
    const error = () => {
      status.textContent = "Unable to retrieve your location";
    }
  
    if (!navigator.geolocation) {
      status.textContent = "Geolocation is not supported by your browser";
    } else {
      status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p className={styles.headerText}>
          Where is the Moon?
        </p>
      </div>

      <button id="find-me" onClick={() => geoFindMe()}>Show my location</button><br />
      <p id="status"></p>
      <a id="map-link" target="_blank"></a>

      <div>
          <h1>Moon Position</h1>
          <p>Azimuth: {moonPosition.azimuth.toFixed(2)} degrees</p>
          <p>Altitude: {moonPosition.altitude.toFixed(2)} degrees</p>
          <Arrow azimuth={moonPosition.azimuth} />
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
