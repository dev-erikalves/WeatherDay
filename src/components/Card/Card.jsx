import styles from "./styles.module.scss"

export default function Card({ className, children }){
    return(
        <section className={`${styles.card} ${className}`}>
            {children}
        </section>
    )
}