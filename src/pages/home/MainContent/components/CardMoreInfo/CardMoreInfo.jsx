import humidityIcon from "../../../../../assets/humidity-icon.gif"
import sunriseIcon from "../../../../../assets/sunrise-icon.gif"
import sunsetIcon from "../../../../../assets/sunset-icon.gif"
import windIcon from "../../../../../assets/wind-icon.gif"
import temperatureIcon from "../../../../../assets/temperature-icon.gif"
import Card from "../../../../../components/Card/Card"
import styles from "./styles.module.scss"

const formatTime = (epochTime) => {
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes}`
}
export default function CardMoreInfo({ humidity, speed, sunset, sunrise, feels_like }) {
    return (
        <Card>
            <h3 className={styles.title}>Mais Informações</h3>
            <Subtitle name='Vento' weatherInfo={speed} metric='Km/h' icon={windIcon}/>
            <Subtitle name='Humidade' weatherInfo={humidity} metric='%' icon={humidityIcon}/>
            <Subtitle name='Nascer do Sol' weatherInfo={formatTime(sunrise)} metric='hrs' icon={sunriseIcon}/>
            <Subtitle name='Pôr do Sol' weatherInfo={formatTime(sunset)} metric='hrs'icon={sunsetIcon}/>
            <Subtitle name='Sensação' weatherInfo={feels_like} metric='°C' icon={temperatureIcon}/>
        </Card>
    )
}
export const Subtitle = ({ name, weatherInfo, metric, icon }) => {
    return (
        <div className={styles.info}>
            <div>
                <h4 className={styles.subtitles}>{name}</h4>
                <img src={icon} alt={`Icone de ${name}`} />
            </div>
            <span>{weatherInfo}{metric}</span>
        </div>
    )
} 