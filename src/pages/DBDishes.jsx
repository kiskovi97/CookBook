import React, { useEffect } from 'react'
import styles from './Page.module.css'
import gStyles from './Grid.module.css'
import Receipt from './Components/Receipt'
import { useState } from 'react';
import { fetchData } from '../dynamoService';

var DBDishes = () =>
{
    const [dbData, setDBData] = useState([]);

    const fetchAndSetData = async () => {
        const result = await fetchData();
        if (result.success) {
            setDBData(result.data);
        } else {
            alert("Error Fetching Data: " + result.message);
        }
    }

    useEffect(() => {
        fetchAndSetData();
    }, []);
    
    return(<div className={styles.page}>
        <div className={gStyles.grid_big}>
            {dbData.map((station, index) => (<Receipt proj={station} index={index} />))}
        </div>
    </div>)
}
    

export default DBDishes