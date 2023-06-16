import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import iconMap from "./IconMap.json"
import SearchInput from "./components/SearchInput/SearchInput.jsx"
import CardMoreInfo from "./components/CardMoreInfo/CardMoreInfo";
import styles from "./styles.module.scss";

export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [iconCode, setIconCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const api_key = "e5cebe1949b3839661f4b78ddfa60298";

  const fetchWeatherData = (url) => {
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Erro na solicitação de resposta da API');
        }
      })
      .then((data) => {
        setWeatherData(extractInfosApi(data))
        setIconCode(data.weather[0].icon)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
        toast.info("Cidade não encontrada, por favor tente novamente!")
      });
  };

  //obter localização automaticamente
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`
        fetchWeatherData(url)
      },
      (error) => {
        if (error.code === 1) {
          toast.error("Geolocalização desativada ou negada pelo usuario, ative-a ou busque manualmente na barra de pesquisa.")
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
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${api_key}`
      fetchWeatherData(url)
    } else {
      toast.warning("Digite o nome de uma cidade!")
    }
  }

  const handleChangeInput = (ev) => {
    setCity(ev.target.value)
  }

  function extractInfosApi(data) {
    let {
      name,
      weather: [{ icon, description }],
      main: { temp, feels_like, humidity },
      wind: { speed },
      sys: { sunrise, sunset },
    } = data
    return { name, icon, description, temp, feels_like, humidity, speed, sunrise, sunset };
  }
  
  dayjs.locale('pt-br');
  const formatTime = () => {
    const date = dayjs();
    const formattedDate = date.format('DD [de] MMMM [de] YYYY');
    return formattedDate;
  };

  return (
    <main className={styles.mainContent}>
      <ToastContainer />

      <CardMoreInfo
      speed={weatherData ? weatherData.speed : '...'}
      humidity={weatherData ? weatherData.humidity : '...'}
      sunrise={weatherData ? weatherData.sunrise : ''}
      sunset={weatherData ? weatherData.sunset : ''}
      />

      <section className={styles.weatherMainContent}>
        <SearchInput city={city} handleChangeInput={handleChangeInput} searchBtn={searchBtn}/>

        <div id={styles.cityNameAndDate}>
          <p id={styles.cityName}>{weatherData ? weatherData.name : '...'}</p>
          <p id={styles.date}>{weatherData ? formatTime(weatherData.dt) : '...'}</p>
        </div>

        <picture>
          {isLoading ? (
            <img src="../../../src/assets/loading-icon.svg" alt="Ícone de carregamento" />
            ) : (
              iconCode && <img src={`../../../src/assets/${iconMap[iconCode]}`} alt="Ícone do tempo" />
              )}
        </picture>

        <p id={styles.description}>{weatherData ? weatherData.description : '...'}</p>
        <p id={styles.titleCurrentTemp}>Temperatura Atual</p>
        <p id={styles.currentTemp}>{weatherData ? Math.floor(weatherData.temp) - 1 : '...'}ºC</p>
      </section>
    </main>
  )
}