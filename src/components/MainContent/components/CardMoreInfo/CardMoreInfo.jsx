import styles from "./styles.module.scss"

export const formatTime = (epochTime) => {
    let date = new Date(epochTime * 1000)
    let hours = date.getHours()
    let minutes = date.getMinutes()
    return `${hours}:${minutes}`
}
export default function CardMoreInfo({ humidity, speed, sunset, sunrise }) {
    return (
        <aside className={styles.cards}>
            <h3 className={styles.title}>Mais Informações</h3>
            <Subtitle name='Vento' weatherInfo={speed} metric='Km/h'/>
            <Subtitle name='Humidade' weatherInfo={humidity} metric='%'/>
            <Subtitle name='Nascer do Sol' weatherInfo={formatTime(sunrise)} metric='hrs'/>
            <Subtitle name='Pôr do Sol' weatherInfo={formatTime(sunset)} metric='hrs'/>
        </aside>
    )
}
export const Subtitle = ({ name, weatherInfo, metric }) => {
    return (
        <div className={styles.info}>
            <h4 className={styles.subtitles}>{name}</h4>
            <span>{weatherInfo}{metric}</span>
        </div>
    )
}