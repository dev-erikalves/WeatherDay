import styles from "./styles.module.scss";

export default function TemperatureContainer() {
    return (
        <section>
            <div>
                <p id={styles.data}>
                    ...
                </p>
                <p id={styles.cityName}>
                    ...
                </p>
            </div>
        </section>
    )
}