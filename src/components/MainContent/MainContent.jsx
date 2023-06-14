import { useState } from "react";
import { useEffect } from "react";
import dayjs from "dayjs";
import SearchInput from "../Header/components/SearchInput/SearchInput.jsx"
import styles from "./styles.module.scss";

export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [iconCode, setIconCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const api_key = "e5cebe1949b3839661f4b78ddfa60298";

  //obter localização automaticamente
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude
        let lon = position.coords.longitude

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            } else {
              throw new Error('Erro na solicitação de resposta da API');
            }
          })
          .then((data) => {
            setWeatherData(showWeatherInfos(data));
            setIconCode(data.weather[0].icon);
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setIsLoading(true);
          });
      },
      (error) => {
        if (error.code === 1) {
          alert("Geolocalização desativada ou negada pelo usuario, ative-a ou busque manualmente na barra de pesquisa.")
          setIsLoading(true);
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
            throw new Error('Erro na solicitação de resposta da API')
          }
        })
        .then((data) => {
          setWeatherData(showWeatherInfos(data));
          setIconCode(data.weather[0].icon);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          alert("Cidade não encontrada, tente novamente!")
          setIsLoading(true);
        });
    }
  }

  const handleChangeInput = (ev) => {
    setCity(ev.target.value)
  }

  function showWeatherInfos(data) {
    let {
      name,
      weather: [{ icon, description }],
      main: { temp, feels_like, humidity },
      wind: { speed },
      sys: { sunrise, sunset },
    } = data
    return { name, icon, description, temp, feels_like, humidity, speed, sunrise, sunset };
  }

  const iconMap = {
    "01d": "01d.svg", "01n": "01n.svg",
    "02d": "02d.svg", "02n": "02n.svg",
    "03d": "03d.svg", "03n": "03n.svg",
    "04d": "04d.svg", "04n": "04n.svg",
    "05d": "05d.svg", "05n": "05n.svg",
    "06d": "06d.svg", "06n": "06n.svg",
    "09d": "09d.svg", "09n": "09n.svg",
    "10d": "10d.svg", "10n": "10n.svg",
    "11d": "11d.svg", "11n": "11n.svg",
    "13d": "13d.svg", "13n": "13n.svg",
    "50d": "50d.svg", "50n": "50n.svg"
  }

  return (
      <section>
            <SearchInput city={city} handleChangeInput={handleChangeInput} searchBtn={searchBtn}/>
        
            <p id={styles.date}>{dayjs().format('DD/MM/YYYY')}</p>
            <p id={styles.cityName}>{weatherData ? weatherData.name : '...'}</p>
            {isLoading ? (
              <img src="../../../src/assets/loading-icon.svg" alt="Ícone de carregamento" />
            ) : (
              iconCode && <img src={`../../../src/assets/${iconMap[iconCode]}`} alt="Ícone do tempo" />
            )}
            <p id={styles.description}>{weatherData ? weatherData.description : '...'}</p>
            <p id={styles.titleCurrentTemp}>Temperatura Atual</p>
            <p id={styles.currentTemp}>{weatherData ? Math.floor(weatherData.temp) - 1 : '...'}ºC</p>
      </section>
  )
}