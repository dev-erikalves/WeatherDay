import { useEffect } from "react";
import logoHeader from "../../../assets/logo-header.png"
import styles from "./styles.module.scss";

export default function Header() {
    useEffect(() => {
        const time = document.getElementById('time');
    
        function updateTime() {
          const now = new Date();
          const hours = ('0' + now.getHours()).slice(-2);
          const seconds = ('0' + now.getSeconds()).slice(-2);
          const minutes = ('0' + now.getMinutes()).slice(-2);
    
          time.textContent = `${hours}:${minutes}:${seconds}`;
        }
    
        updateTime();
    
        const intervalId = setInterval(updateTime, 1000);
    
        return () => {
          clearInterval(intervalId);
        };
      }, []);
    
    return (
        <header className={styles.header}>
            <div>
                <img src={logoHeader} alt="" />
                <h2>WeatherDay</h2>
            </div>
            <div id="time">
            </div>
        </header>
    )
}