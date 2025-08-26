'use client'

import styles from "./Page.module.css";

interface SearchProps {
  filter: string;
  orderBy: string;
  setFilter: (n: string) => void;
  setOrderBy: (n: string) => void;
}

var SearchBar: React.FC<SearchProps> = ({filter, orderBy, setFilter, setOrderBy}) =>{
  return <div className={styles.filters}>
                <div>
                    <input 
                    type="text"
                    id="search"
                    name='search'
                    placeholder="Search..."
                    value={filter}            
                    onChange={(e) => setFilter(e.target.value)} />
                </div>
                <div className={styles.sorting}>
                    Order By
                    <select name="orderBy" id="orderBy" onChange={(e) => {
                        setOrderBy(e.target.value);
                    }}>
                        <option value="name">Name</option>
                        <option value="date">Oldest</option>
                        <option value="date-desc">Newest</option>
                    </select>
                </div>
            </div>;
}


export default SearchBar;