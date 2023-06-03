import SearchIcon from "../../assets/search-icon.svg"
import styles from "./styles.module.scss";

export default function SearchInput() {
    return (
        <div className={styles.searchContainer}>
            <input type="search" name="searchInput" id={styles.searchInput} placeholder="Localização" />
            <button id={styles.searchBtn}><img src={SearchIcon} alt="" /></button>
        </div>    
    )
}