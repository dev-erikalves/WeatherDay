import SearchIcon from "../../assets/search-icon.webp"
import styles from "./styles.module.scss"

export default function SearchInput(props) {
    return (
        <div className={styles.searchContainer}>
        <input type="text"
            name="searchInput"
            id={styles.searchInput} placeholder="Localização"
            value={props.city}
            onChange={props.handleChangeInput}
            autoComplete="off"
            onKeyDown={props.onKeyDown}
            
        />
        
        <button onClick={props.searchBtn} id={styles.searchBtn}>
            <img src={SearchIcon} alt="" />
        </button>
        </div>
    )
}