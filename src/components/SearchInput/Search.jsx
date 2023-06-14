import loadingIcon from "../../assets/loading-icon.svg"
import SearchIcon from "../../assets/search-icon.svg"
import { useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
import styles from "./styles.module.scss";

export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const api_key = "e5cebe1949b3839661f4b78ddfa60298";

  useEffect(() => {
    //obter localização automaticamente
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error('Erro na solicitação');
            }
          })
          .then((data) => setWeatherData(showWeatherInfos(data)))
          .catch((error) => console.log(error));
      },
      (error) => {
        if (error.code === 1) {
          alert("Geolocalização desativada ou negada pelo usuario, ative-a ou busque manualmente da barra de pesquisa.")
        } else {
          console.log(error)
        }
      }
    );
  }, []);
  // obter localização manualmente
  function searchBtn() {
    if (city) {
      setWeatherData(null)
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${api_key}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error('Erro na solicitação');
          }
        })
        .then((data) => setWeatherData(showWeatherInfos(data)))
        .catch((error) => console.log(error));
    }
  }

  const handleChangeInput = (ev) => {
    setCity(ev.target.value)
  }

  function showWeatherInfos(data) {
    let {
      dt,
      name,
      weather: [{ icon, description }],
      main: { temp, feels_like, humidity },
      wind: { speed },
      sys: { sunrise, sunset },
    } = data
    return { dt, name, icon, description, temp, feels_like, humidity, speed, sunrise, sunset };
  }

  return (
    <>
      <div className={styles.searchContainer}>
        <input type="text"
          name="searchInput"
          id={styles.searchInput} placeholder="Localização"
          value={city}
          onChange={handleChangeInput}
        />
        <button onClick={searchBtn} id={styles.searchBtn}><img src={SearchIcon} alt="" /></button>

      </div>
      <section>
        <div>
          <p id={styles.date}>{dayjs().format("DD/MM/YYYY")}</p>
          {weatherData && (
            <>
              <p id={styles.cityName}>{weatherData.name}</p>
              <img src={loadingIcon} alt="Ícone de carregamento" />
              <p id={styles.description}>{weatherData.description}</p>
              <p id={styles.titleCurrentTemp}>Temperatura Atual</p>
              <p id={styles.currentTemp}>{weatherData.temp}ºC</p>
            </>
          )}
        </div>
      </section>
    </>
  )
}