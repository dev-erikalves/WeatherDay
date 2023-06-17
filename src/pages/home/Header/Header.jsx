import { useEffect } from "react";
import logoHeader from "../../../assets/logo-header.gif"
import styles from "./styles.module.scss";

export default function Header() {
    useEffect(() => {
        const timeElement = document.getElementById('time');
    
        function updateTime() {
          const now = new Date();
    
          const seconds = ('0' + now.getSeconds()).slice(-2);
    
          timeElement.textContent = `${now.getHours()}:${now.getMinutes()}:${seconds}`;
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