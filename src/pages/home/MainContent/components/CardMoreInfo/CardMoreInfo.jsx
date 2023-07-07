import humidityIcon from "../../../../../assets/humidity-icon.webp"
import sunriseIcon from "../../../../../assets/sunrise-icon.webp"
import sunsetIcon from "../../../../../assets/sunset-icon.webp"
import windIcon from "../../../../../assets/wind-icon.webp"
import temperatureIcon from "../../../../../assets/temperature-icon.webp"
import globalIcon from "../../../../../assets/global-icon.webp"
import visibilityIcon from "../../../../../assets/visibility-icon.webp"
import pressureIcon from "../../../../../assets/pressure-icon.webp"
import cloudsIcon from "../../../../../assets/clouds-icon.webp"
import Card from "../../../../../components/Card/Card"
import styles from "./styles.module.scss"

const formatTime = (epochTime) => {
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes}`
}
export default function CardMoreInfo(
    { title, humidity, speed, sunset, sunrise, feels_like, country, visibility, sea_level, clouds }
) {
    if (title === 'Mais Informações') {
        return (
            <Card>
                <h3 className={styles.title}>{title}</h3>
                <Subtitle name='Vento' weatherInfo={speed} metric='Km/h' icon={windIcon} />
                <Subtitle name='Humidade' weatherInfo={humidity} metric='%' icon={humidityIcon} />
                <Subtitle name='Nascer do Sol' weatherInfo={formatTime(sunrise)} metric='hrs' icon={sunriseIcon} />
                <Subtitle name='Pôr do Sol' weatherInfo={formatTime(sunset)} metric='hrs' icon={sunsetIcon} />
                <Subtitle name='Sensação' weatherInfo={feels_like} metric='°C' icon={temperatureIcon} />
            </Card>
        )
    } else {
        return (
            <Card>
                <h3 className={styles.title}>{title}</h3>
                <Subtitle name='País' weatherInfo={country} icon={globalIcon} />
                <Subtitle name='Visibilidade' weatherInfo={visibility} metric='Km' icon={visibilityIcon} />
                <Subtitle name='Pressão' weatherInfo={sea_level} metric=' hPa' icon={pressureIcon} />
                <Subtitle name='Nuvens' weatherInfo={clouds} metric='%' icon={cloudsIcon} />
            </Card>
        )
    }
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