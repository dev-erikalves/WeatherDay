import Card from "../../../components/Card/Card"
import styles from "./styles.module.scss"

export default function Footer() {
    return (
        <footer>
            <Card className={styles.cardFooter}>
                <p>&copy; 2023 - All rights reserveds</p>
                <p id={styles.devBy}>Developed by <a href="https://www.linkedin.com/in/dev-erikalves/" target="_blank">Erik Alves</a></p>
            </Card>
        </footer>
    )
}