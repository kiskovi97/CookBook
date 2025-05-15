import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import DBReceipt from './Components/DBReceipt'
import { useState, useEffect } from 'react';
import { fetchDataByTag } from '../dynamoService';

var Dishes = ({tag}) =>
{
    const [dbData, setDBData] = useState([]);

    const fetchAndSetData = async (tag) => {
        const result = await fetchDataByTag(tag);
        if (result.success) {
            console.log(result.data);
            setDBData([...result.data].sort((first, second) => first.title.localeCompare(second.title)));
        } else {
            alert("Error Fetching Data: " + result.message);
        }
    }
    
     useEffect(() => {
        fetchAndSetData(tag);
    }, [tag]);

    return (
    <div className={styles.page}>
        <div className={gStyles.grid_big}>
            {dbData.map((station) => (<DBReceipt proj={station} index={station.id} />))}
        </div>
    </div>);
}

export default Dishes