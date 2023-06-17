import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import iconMap from "./IconMap.json"
import SearchInput from "../../../components/SearchInput/SearchInput"
import Card from "../../../components/Card/Card.jsx";
import CardMoreInfo from "./components/CardMoreInfo/CardMoreInfo";
import CardOthers from "./components/CardOthers/CardOthers";
import celsiusIcon from "../../../assets/celsius-icon.gif"
import styles from "./styles.module.scss";

dayjs.locale('pt-br');

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
      visibility,
      weather: [{ icon, description }],
      main: { temp, feels_like, humidity, sea_level },
      clouds: { all },
      wind: { speed },
      sys: { country, sunrise, sunset },
    } = data
    return { name, visibility, icon, description, all, temp, feels_like, humidity, sea_level, speed, country, sunrise, sunset };
  }

  return (
    <main className={styles.mainContent}>
      <ToastContainer />

      <Card className={styles.weatherMainContent}>
        <SearchInput city={city} handleChangeInput={handleChangeInput} searchBtn={searchBtn} />

        <div id={styles.cityNameAndDate}>
          <p id={styles.cityName}>{weatherData ? weatherData.name : '...'}</p>
          <p id={styles.date}>{dayjs().format('DD [de] MMMM [de] YYYY')}</p>
        </div>

        <picture>
          {isLoading ? (
            <img src="../../../src/assets/loading-icon.svg" alt="Ícone de carregamento" />
          ) : (
            iconCode && <img src={`../../../src/assets/${iconMap[iconCode]}`} alt="Icone do clima" />
          )}
        </picture>

        <p id={styles.description}>{weatherData ? weatherData.description : '...'}</p>
        <p id={styles.titleCurrentTemp}>Temperatura Atual</p>
        <p id={styles.currentTemp}>{weatherData ? Math.floor(weatherData.temp) : '...'}
          <img src={celsiusIcon} alt="Icone de graus Celsius" />
        </p>
      </Card>
      <CardMoreInfo
        speed={weatherData ? weatherData.speed : '...'}
        humidity={weatherData ? weatherData.humidity : '...'}
        sunrise={weatherData ? weatherData.sunrise : ''}
        sunset={weatherData ? weatherData.sunset : ''}
        feels_like={weatherData ? Math.floor(weatherData.feels_like) : '...'}
      />
      <CardOthers
        country={weatherData ? weatherData.country : ''}
        visibility={weatherData ? weatherData.visibility / 1000 : ''}
        sea_level={weatherData ? weatherData.sea_level : ''}
        clouds={weatherData ? weatherData.all : ''}
      />
    </main>
  )
}