import { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import SearchInput from "../../../components/SearchInput/SearchInput"
import Card from "../../../components/Card/Card.jsx"
import CardMoreInfo from "./components/CardMoreInfo/CardMoreInfo"
import CardOthers from "./components/CardOthers/CardOthers"
import celsiusIcon from "../../../assets/celsius-icon.gif"

import styles from "./styles.module.scss"

dayjs.locale('pt-br');

export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [iconCode, setIconCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  const api_key = "your_api_key";

  const fetchWeatherData = (url) => {
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error('Error 400 - Bad Request. You can get error 400 error if either some mandatory parameters in the request are missing or some of request parameters have incorrect format or values out of allowed range. List of all parameters names that are missing or incorrect will be returned in `parameters`attribute of the `ErrorResponse` object')
        } else if (response.status === 401) {
          throw new Error('Error 401 - Unauthorized. You can get 401 error if API token did not providen in the request or in case API token provided in the request does not grant access to this API. You must add API token with granted access to the product to the request before returning it')
        } else if (response.status === 404) {
          throw new Error('Error 404 - Not Found. You can get 404 error if data with requested parameters (`lat`, `lon`, `date`) does not exist in service database. You must not retry the same request')
        } else if (response.status === 429) {
          throw new Error('Error 429 - Too Many Requests. You can get 429 error if key quato of requests for provided API to this API was exceeded. You may retry request after some time or after extending your key quota')
        } else if (response.status >= 500 && response.status < 600 ) {
          throw new Error('Errors 5xx - Unexpected Error. You can get "5xx" error in case of other internal errors. Error Response code will be `5xx`. Please contact us and enclose an example of your API request that receives this error into your email to let us analyze it and find a solution for you promptly. You may retry the request which led to this error.')
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
  if (city.trim()) {
    setWeatherData(null)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&lang=pt_br&appid=${api_key}`
    fetchWeatherData(url)
  } else {
    toast.warning("Digite o nome de uma cidade!")
  }
}
//obter localização ao clicar em enter
function searchPressEnter(ev) {
  if (ev.key === "Enter") {
    searchBtn()
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
      <SearchInput city={city} handleChangeInput={handleChangeInput} searchBtn={searchBtn} onKeyDown={searchPressEnter} />

      <div id={styles.cityNameAndDate}>
        <p id={styles.cityName}>{weatherData ? weatherData.name : '...'}</p>
        <p id={styles.date}>{dayjs().format('DD [de] MMMM [de] YYYY')}</p>
      </div>

      <picture>
        {isLoading ? (
          <img src="../../../src/assets/loading-icon.svg" alt="Ícone de carregamento" />
        ) : (
          iconCode && <img src={`../../../src/assets/${iconCode}.svg`} alt="Icone do clima" />
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