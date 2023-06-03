import styles from "./styles.module.scss";

export default function SearchInput() {
    return (
        <div>
            <input type="search" name="searchInput" id={styles.searchInput} placeholder="Localização" />
            <button id={styles.SearchBtn}><img src="" alt="" /></button>
        </div>    
    )
}