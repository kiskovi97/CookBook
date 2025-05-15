import styles from './Page.module.css'
import BigDBReceipt from './Components/BigDBReceipt'

import { fetchDataById } from "../dynamoService.js";
import { useEffect, useState } from 'react';

var DBDish = () => {
    var query = window.location.href.split('/');
    var id = query[query.length - 1];
    const [dbData, setDBData] = useState([]);

    const fetchAndSetData = async (id) => {
        const result = await fetchDataById(id);
        if (result.success) {
            console.log(result.data);
            setDBData(result.data);
        } else {
            alert("Error Fetching Data: " + result.message);
        }
    }

    useEffect(() => {
        fetchAndSetData(id);
    }, [id]);

    if (dbData)
        return (<div className={styles.page}>
            <BigDBReceipt proj={dbData}/>
        </div>);
    return (<div className={styles.page}></div>);
}
    
    
export default DBDish